import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { stripe, stripeEnabled } from "@/lib/stripe";

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().max(64),
        quantity: z.number().int().min(1).max(99),
      })
    )
    .min(1)
    .max(50),
  customer: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(254),
    phone: z.string().min(6).max(20),
    address: z.string().min(5).max(300),
    city: z.string().min(2).max(100),
  }),
  paymentMethod: z.enum(["COD", "STRIPE"]),
});

class OutOfStockError extends Error {
  constructor(public productName: string) {
    super(`Not enough stock for ${productName}`);
  }
}

export async function POST(req: Request) {
  const session = await auth();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid checkout data" },
      { status: 400 }
    );
  }

  const { customer, paymentMethod } = parsed.data;

  // Merge duplicate product lines so quantities can't dodge the stock check.
  const quantities = new Map<string, number>();
  for (const item of parsed.data.items) {
    quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.quantity);
  }
  const items = [...quantities.entries()].map(([productId, quantity]) => ({
    productId,
    quantity,
  }));

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  if (products.length !== productIds.length) {
    return NextResponse.json({ error: "Some products no longer exist" }, { status: 400 });
  }

  const productMap = new Map(products.map((p) => [p.id, p]));

  const total = items.reduce((sum, item) => {
    const product = productMap.get(item.productId)!;
    return sum + product.price * item.quantity;
  }, 0);

  const usingStripe = paymentMethod === "STRIPE" && stripeEnabled;

  let order;
  try {
    order = await prisma.$transaction(async (tx) => {
      // Atomic, conditional decrement: only succeeds if stock is still sufficient
      // at write time. This closes the race between concurrent checkouts.
      for (const item of items) {
        const updated = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });
        if (updated.count === 0) {
          throw new OutOfStockError(productMap.get(item.productId)!.name);
        }
      }

      return tx.order.create({
        data: {
          userId: session?.user?.id,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          shippingAddress: customer.address,
          city: customer.city,
          total,
          paymentMethod: usingStripe ? "STRIPE" : "COD",
          paymentStatus: "PENDING",
          items: {
            create: items.map((item) => {
              const product = productMap.get(item.productId)!;
              return {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
              };
            }),
          },
        },
      });
    });
  } catch (e) {
    if (e instanceof OutOfStockError) {
      return NextResponse.json(
        { error: `Not enough stock for ${e.productName}` },
        { status: 400 }
      );
    }
    throw e;
  }

  if (usingStripe && stripe) {
    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: customer.email,
        line_items: items.map((item) => {
          const product = productMap.get(item.productId)!;
          return {
            price_data: {
              currency: "npr",
              product_data: { name: product.name },
              unit_amount: Math.round(product.price * 100),
            },
            quantity: item.quantity,
          };
        }),
        metadata: { orderId: order.id },
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { stripeSessionId: checkoutSession.id },
      });

      return NextResponse.json({ url: checkoutSession.url, orderId: order.id });
    } catch {
      // Stripe session failed — release the reserved stock and drop the order
      // so inventory isn't stranded behind a payment that never started.
      await prisma.$transaction(async (tx) => {
        for (const item of items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }
        await tx.order.delete({ where: { id: order.id } });
      });
      return NextResponse.json(
        { error: "Card payment is unavailable right now. Please try Cash on Delivery." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ orderId: order.id });
}

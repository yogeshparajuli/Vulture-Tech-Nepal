import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { stripe, stripeEnabled } from "@/lib/stripe";

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(1),
      })
    )
    .min(1),
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(6),
    address: z.string().min(5),
    city: z.string().min(2),
  }),
  paymentMethod: z.enum(["COD", "STRIPE"]),
});

export async function POST(req: Request) {
  const session = await auth();
  const body = await req.json();
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid checkout data" },
      { status: 400 }
    );
  }

  const { items, customer, paymentMethod } = parsed.data;

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  if (products.length !== productIds.length) {
    return NextResponse.json({ error: "Some products no longer exist" }, { status: 400 });
  }

  const productMap = new Map(products.map((p) => [p.id, p]));

  for (const item of items) {
    const product = productMap.get(item.productId)!;
    if (product.stock < item.quantity) {
      return NextResponse.json(
        { error: `Not enough stock for ${product.name}` },
        { status: 400 }
      );
    }
  }

  const total = items.reduce((sum, item) => {
    const product = productMap.get(item.productId)!;
    return sum + product.price * item.quantity;
  }, 0);

  const usingStripe = paymentMethod === "STRIPE" && stripeEnabled;

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
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

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return created;
  });

  if (usingStripe && stripe) {
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
  }

  return NextResponse.json({ orderId: order.id });
}

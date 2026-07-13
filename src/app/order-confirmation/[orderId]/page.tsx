import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatNPR } from "@/lib/format";

export const metadata = { title: "Order Confirmed | Vulture Tech Nepal" };

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-sm bg-rust/15">
        <CheckCircle2 className="h-8 w-8 text-gold" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold text-cream">
        Order Confirmed
      </h1>
      <p className="mt-2 text-slate">
        Thank you, {order.customerName}. Your order has been placed successfully.
      </p>

      <div className="mt-8 rounded-sm card-border bg-surface p-6 text-left">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
          <span className="text-sm text-slate">Order ID</span>
          <span className="font-mono text-sm text-cream">{order.id}</span>
        </div>
        <div className="mt-4 space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <span className="text-cream">
                {item.name} <span className="text-slate">× {item.quantity}</span>
              </span>
              <span className="text-gold">{formatNPR(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-4">
          <span className="font-medium text-cream">Total</span>
          <span className="font-display text-xl font-bold text-cream">
            {formatNPR(order.total)}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate">Payment</span>
          <span className="text-cream">
            {order.paymentMethod === "COD" ? "Cash on Delivery" : "Card (Stripe)"} ·{" "}
            {order.paymentStatus}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="text-slate">Delivery Address</span>
          <span className="text-right text-cream">
            {order.shippingAddress}, {order.city}
          </span>
        </div>
      </div>

      <Link
        href="/shop"
        className="mt-8 inline-flex items-center gap-2 rounded-sm bg-rust px-6 py-3 text-sm font-semibold text-cream hover:bg-[#c8501f] transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

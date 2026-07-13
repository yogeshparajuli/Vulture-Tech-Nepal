import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatNPR } from "@/lib/format";
import { Package } from "lucide-react";

export const metadata = { title: "My Orders | Vulture Tech Nepal" };

const STATUS_STYLES: Record<string, string> = {
  PLACED: "bg-gold/15 text-gold",
  PROCESSING: "bg-blue-500/15 text-blue-400",
  SHIPPED: "bg-purple-500/15 text-purple-400",
  DELIVERED: "bg-green-500/15 text-green-400",
  CANCELLED: "bg-rust/15 text-rust",
};

export default async function AccountPage() {
  const session = await auth();
  // Defense in depth: without this, an absent session would make the Prisma
  // filter `userId: undefined` — which matches ALL orders, not none.
  if (!session?.user?.id) redirect("/login?callbackUrl=/account");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-cream">My Orders</h1>
      <p className="mt-2 text-sm text-slate">
        Signed in as {session?.user?.email}
      </p>

      {orders.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center">
          <Package className="h-10 w-10 text-slate" strokeWidth={1.5} />
          <p className="text-slate">You haven&apos;t placed any orders yet.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-sm card-border bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-xs text-slate">{order.id}</p>
                  <p className="mt-1 text-xs text-slate">
                    {order.createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`rounded-sm px-3 py-1 text-xs font-semibold ${STATUS_STYLES[order.status] ?? "bg-surface-2 text-cream"}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="mt-4 space-y-2 border-t border-[var(--line)] pt-4">
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
                <span className="text-sm font-medium text-cream">Total</span>
                <span className="font-display text-lg font-bold text-cream">
                  {formatNPR(order.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

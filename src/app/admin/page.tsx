import { Package, ClipboardList, Wallet, AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatNPR } from "@/lib/format";

export const metadata = { title: "Admin Dashboard | Vulture Tech Nepal" };

export default async function AdminDashboard() {
  const [productCount, orderCount, orders, lowStock] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.findMany({ select: { total: true, paymentStatus: true } }),
    prisma.product.count({ where: { stock: { lte: 5 } } }),
  ]);

  const revenue = orders
    .filter((o) => o.paymentStatus === "PAID" || o.paymentStatus === "PENDING")
    .reduce((sum, o) => sum + o.total, 0);

  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Total Products", value: productCount, icon: Package },
    { label: "Total Orders", value: orderCount, icon: ClipboardList },
    { label: "Revenue", value: formatNPR(revenue), icon: Wallet },
    { label: "Low Stock Items", value: lowStock, icon: AlertTriangle },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-cream">Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl card-border bg-surface p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rust/15 text-rust">
              <s.icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-3 font-display text-2xl font-bold text-cream">{s.value}</p>
            <p className="mt-1 text-xs text-slate">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl card-border bg-surface p-6">
        <h2 className="font-display text-lg font-semibold text-cream">Recent Orders</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs text-slate">
                <th className="pb-2 font-medium">Order ID</th>
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Total</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-white/5 last:border-0">
                  <td className="py-3 font-mono text-xs text-slate">{o.id.slice(0, 10)}…</td>
                  <td className="py-3 text-cream">{o.customerName}</td>
                  <td className="py-3 text-gold">{formatNPR(o.total)}</td>
                  <td className="py-3 text-cream">{o.status}</td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

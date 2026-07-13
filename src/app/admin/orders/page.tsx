import { prisma } from "@/lib/prisma";
import OrdersTable from "@/components/admin/OrdersTable";

export const metadata = { title: "Manage Orders | Vulture Tech Nepal" };

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });

  const rows = orders.map((o) => ({
    id: o.id,
    customerName: o.customerName,
    customerPhone: o.customerPhone,
    city: o.city,
    total: o.total,
    status: o.status,
    paymentStatus: o.paymentStatus,
    paymentMethod: o.paymentMethod,
    createdAt: o.createdAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-cream">Orders</h1>
      <div className="mt-6">
        <OrdersTable orders={rows} />
      </div>
    </div>
  );
}

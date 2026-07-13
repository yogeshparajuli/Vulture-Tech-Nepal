"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatNPR } from "@/lib/format";

type OrderRow = {
  id: string;
  customerName: string;
  customerPhone: string;
  city: string;
  total: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
};

const STATUSES = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrdersTable({ orders }: { orders: OrderRow[] }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdatingId(null);
    router.refresh();
  }

  return (
    <div className="overflow-x-auto rounded-2xl card-border bg-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/5 text-xs text-slate">
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">City</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Payment</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-3">
                <p className="text-cream">{o.customerName}</p>
                <p className="text-xs text-slate">{o.customerPhone}</p>
              </td>
              <td className="px-4 py-3 text-slate">{o.city}</td>
              <td className="px-4 py-3 text-gold">{formatNPR(o.total)}</td>
              <td className="px-4 py-3 text-slate">
                {o.paymentMethod === "COD" ? "COD" : "Stripe"} · {o.paymentStatus}
              </td>
              <td className="px-4 py-3">
                <select
                  value={o.status}
                  disabled={updatingId === o.id}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                  className="rounded-lg border border-white/10 bg-void px-2.5 py-1.5 text-xs text-cream focus:border-gold/40 focus:outline-none disabled:opacity-50"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-slate">
                No orders yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

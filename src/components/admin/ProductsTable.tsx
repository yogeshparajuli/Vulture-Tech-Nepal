"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { formatNPR } from "@/lib/format";
import { categoryByKey } from "@/lib/categories";
import type { ClientProduct } from "@/lib/products";

export default function ProductsTable({ products }: { products: ClientProduct[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    setError("");

    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    setDeletingId(null);

    if (!res.ok) {
      setError(data.error || "Could not delete product.");
      return;
    }

    router.refresh();
  }

  return (
    <div>
      {error && (
        <p className="mb-4 rounded-xl border border-rust/40 bg-rust/10 px-4 py-3 text-sm text-rust">
          {error}
        </p>
      )}
      <div className="overflow-x-auto rounded-2xl card-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs text-slate">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3">
                  <p className="text-cream">{p.name}</p>
                  <p className="text-xs text-slate">{p.brand}</p>
                </td>
                <td className="px-4 py-3 text-slate">{categoryByKey(p.category)?.label}</td>
                <td className="px-4 py-3 text-gold">{formatNPR(p.price)}</td>
                <td className="px-4 py-3">
                  <span className={p.stock <= 5 ? "text-rust" : "text-cream"}>{p.stock}</span>
                </td>
                <td className="px-4 py-3 text-slate">{p.featured ? "Yes" : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="rounded-lg p-2 text-slate hover:bg-surface-2 hover:text-cream transition-colors"
                      aria-label="Edit product"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deletingId === p.id}
                      className="rounded-lg p-2 text-slate hover:bg-surface-2 hover:text-rust transition-colors disabled:opacity-50"
                      aria-label="Delete product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

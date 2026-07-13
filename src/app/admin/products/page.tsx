import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import ProductsTable from "@/components/admin/ProductsTable";

export const metadata = { title: "Manage Products | Vulture Tech Nepal" };

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-cream">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-full bg-rust px-4 py-2.5 text-sm font-semibold text-cream hover:bg-rust/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>
      <div className="mt-6">
        <ProductsTable products={products} />
      </div>
    </div>
  );
}

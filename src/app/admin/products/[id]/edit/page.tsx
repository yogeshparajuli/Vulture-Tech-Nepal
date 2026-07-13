import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import type { ClientProduct } from "@/lib/products";

export const metadata = { title: "Edit Product | Vulture Tech Nepal" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  let specs: string[] = [];
  try {
    specs = JSON.parse(product.specs);
  } catch {
    specs = [];
  }

  const clientProduct: ClientProduct = { ...product, specs, averageRating: null, reviewCount: 0 };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-cream">Edit Product</h1>
      <div className="mt-6">
        <ProductForm product={clientProduct} />
      </div>
    </div>
  );
}

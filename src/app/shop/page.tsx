import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/shop/ShopFilters";
import { getAllProducts } from "@/lib/products";
import { categoryBySlug } from "@/lib/categories";

export const metadata = {
  title: "Shop | Vulture Tech Nepal",
};

type SortOption = "price-asc" | "price-desc" | "newest";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categorySlug = typeof params.category === "string" ? params.category : undefined;
  const search = typeof params.q === "string" ? params.q : undefined;
  const sort = typeof params.sort === "string" ? (params.sort as SortOption) : undefined;

  const category = categorySlug ? categoryBySlug(categorySlug)?.key : undefined;

  const products = await getAllProducts({
    category: category as never,
    search,
    sort,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Shop
        </span>
        <h1 className="mt-2 font-display text-3xl font-bold text-cream sm:text-4xl">
          All Products
        </h1>
        <p className="mt-2 max-w-xl text-sm text-slate">
          Browse genuine CCTV cameras, memory cards, monitors, hard disks and
          accessories.
        </p>
      </div>

      <Suspense>
        <ShopFilters resultCount={products.length} />
      </Suspense>

      {products.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-lg font-medium text-cream">No products found</p>
          <p className="text-sm text-slate">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

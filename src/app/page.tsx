import Link from "next/link";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import WhyUs from "@/components/home/WhyUs";
import CtaBanner from "@/components/home/CtaBanner";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export const revalidate = 60;

export default async function Home() {
  const featured = await getFeaturedProducts(8);

  return (
    <>
      <Hero />
      <CategoryGrid />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Featured
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-cream">
              Popular products
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-medium text-gold hover:text-cream transition-colors sm:block"
          >
            View all products →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <WhyUs />
      <CtaBanner />
    </>
  );
}

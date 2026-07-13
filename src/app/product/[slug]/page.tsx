import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import AddToCartSection from "@/components/shop/AddToCartSection";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { categoryByKey } from "@/lib/categories";
import { formatNPR } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name} | Vulture Tech Nepal` : "Product not found" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.category, product.slug);
  const cat = categoryByKey(product.category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 flex items-center gap-1.5 text-xs text-slate">
        <Link href="/" className="hover:text-cream transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-cream transition-colors">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={`/shop?category=${cat?.slug}`}
          className="hover:text-cream transition-colors"
        >
          {cat?.label}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-cream">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductImage
          category={product.category}
          color={product.imageColor}
          imageUrl={product.imageUrl}
          className="aspect-square w-full"
          iconClassName="w-20 h-20"
        />

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">
            {cat?.label}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-cream sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-slate">Brand: {product.brand}</p>

          <p className="mt-6 font-display text-3xl font-bold text-cream">
            {formatNPR(product.price)}
          </p>

          <p className="mt-2 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-400">
                In stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-rust">Out of stock</span>
            )}
          </p>

          <p className="mt-6 leading-relaxed text-slate">{product.description}</p>

          {product.specs.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-center gap-2 text-sm text-cream">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />
                  {spec}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <AddToCartSection product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold text-cream">
            You may also like
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

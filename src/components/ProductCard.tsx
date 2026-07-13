"use client";

import Link from "next/link";
import { Plus, Star } from "lucide-react";
import ProductImage from "./ProductImage";
import { useCart } from "@/components/cart/CartContext";
import { formatNPR } from "@/lib/format";
import { categoryByKey } from "@/lib/categories";
import type { ClientProduct } from "@/lib/products";

export default function ProductCard({ product }: { product: ClientProduct }) {
  const { addItem } = useCart();
  const cat = categoryByKey(product.category);
  const outOfStock = product.stock <= 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-sm border border-[var(--line)] bg-surface transition-colors hover:border-[var(--line-strong)]">
      <Link href={`/product/${product.slug}`} className="relative block border-b border-[var(--line)]">
        <ProductImage
          category={product.category}
          color={product.imageColor}
          imageUrl={product.imageUrl}
          className="aspect-square w-full"
        />
        <span className="mono absolute left-2.5 top-2.5 rounded-sm bg-void/70 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-gold backdrop-blur-sm">
          {cat?.short ?? product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 text-[13.5px] font-medium leading-snug text-cream transition-colors group-hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <div className="mono flex items-center gap-2 text-[11px] text-slate">
          <span className="uppercase tracking-wider">{product.brand}</span>
          {product.averageRating !== null && (
            <>
              <span className="text-[var(--line-strong)]">/</span>
              <span className="flex items-center gap-1 text-gold">
                <Star className="h-2.5 w-2.5" fill="currentColor" strokeWidth={0} />
                {product.averageRating.toFixed(1)}
              </span>
            </>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <span className="mono text-base font-semibold text-cream">
            {formatNPR(product.price)}
          </span>
          <button
            onClick={() =>
              addItem({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                imageColor: product.imageColor,
                imageUrl: product.imageUrl,
                category: product.category,
                stock: product.stock,
              })
            }
            disabled={outOfStock}
            className="flex h-9 w-9 items-center justify-center rounded-sm bg-rust text-cream transition-colors hover:bg-[#c8501f] disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-slate"
            aria-label="Add to cart"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {outOfStock && (
          <span className="mono text-[10px] uppercase tracking-widest text-rust">
            Out of stock
          </span>
        )}
      </div>
    </div>
  );
}

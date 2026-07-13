"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
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
    <div className="group relative flex flex-col overflow-hidden rounded-2xl card-border bg-surface transition-colors hover:border-gold/30">
      <Link href={`/product/${product.slug}`} className="block">
        <ProductImage
          category={product.category}
          color={product.imageColor}
          imageUrl={product.imageUrl}
          className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-gold">
          {cat?.label ?? product.category}
        </span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-cream hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-slate">{product.brand}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg font-bold text-cream">
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
            className="flex h-9 w-9 items-center justify-center rounded-full bg-rust text-cream transition-colors hover:bg-rust/90 disabled:cursor-not-allowed disabled:bg-slate/30"
            aria-label="Add to cart"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {outOfStock && (
          <span className="text-xs font-medium text-rust">Out of stock</span>
        )}
      </div>
    </div>
  );
}

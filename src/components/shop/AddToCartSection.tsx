"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import type { ClientProduct } from "@/lib/products";

export default function AddToCartSection({ product }: { product: ClientProduct }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  function handleAdd() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        imageColor: product.imageColor,
        imageUrl: product.imageUrl,
        category: product.category,
        stock: product.stock,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-3 rounded-full card-border bg-surface px-2 py-2">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate hover:bg-surface-2 hover:text-cream transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-6 text-center text-sm font-semibold text-cream">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate hover:bg-surface-2 hover:text-cream transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={outOfStock}
        className="flex flex-1 min-w-[200px] items-center justify-center gap-2 rounded-full bg-rust px-6 py-3.5 text-sm font-semibold text-cream shadow-[0_0_30px_rgba(170,73,39,0.35)] transition-all hover:bg-rust/90 disabled:cursor-not-allowed disabled:bg-slate/30 disabled:shadow-none"
      >
        {added ? (
          <>
            <Check className="h-4 w-4" /> Added to Cart
          </>
        ) : outOfStock ? (
          "Out of Stock"
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </>
        )}
      </button>
    </div>
  );
}

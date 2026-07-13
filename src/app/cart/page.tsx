"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import ProductImage from "@/components/ProductImage";
import { formatNPR } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, setQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-32 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="h-12 w-12 text-slate" strokeWidth={1.5} />
        <h1 className="font-display text-2xl font-bold text-cream">
          Your cart is empty
        </h1>
        <p className="text-slate">Browse our catalog and find what you need.</p>
        <Link
          href="/shop"
          className="mt-2 rounded-full bg-rust px-6 py-3 text-sm font-semibold text-cream hover:bg-rust/90 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-cream">Your Cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 rounded-2xl card-border bg-surface p-4"
            >
              <ProductImage
                category={item.category}
                color={item.imageColor}
                imageUrl={item.imageUrl}
                className="h-24 w-24 shrink-0"
                iconClassName="w-8 h-8"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-medium text-cream hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="shrink-0 text-slate hover:text-rust transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-white/10 px-2 py-1.5">
                    <button
                      onClick={() => setQuantity(item.productId, item.quantity - 1)}
                      className="text-slate hover:text-cream transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm text-cream">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="text-slate hover:text-cream transition-colors disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-display text-lg font-bold text-gold">
                    {formatNPR(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl card-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-cream">
            Order Summary
          </h2>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate">Subtotal</span>
            <span className="text-cream">{formatNPR(subtotal)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-slate">Delivery</span>
            <span className="text-cream">Calculated at checkout</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="font-medium text-cream">Total</span>
            <span className="font-display text-xl font-bold text-cream">
              {formatNPR(subtotal)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-rust py-3.5 text-sm font-semibold text-cream hover:bg-rust/90 transition-colors"
          >
            Proceed to Checkout <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

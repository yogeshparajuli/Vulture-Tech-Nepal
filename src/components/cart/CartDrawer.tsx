"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import ProductImage from "@/components/ProductImage";
import { formatNPR } from "@/lib/format";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, setQuantity, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface card-border border-l shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
              <h2 className="font-display text-lg font-semibold text-cream">
                Your Cart {items.length > 0 && `(${items.length})`}
              </h2>
              <button
                onClick={closeCart}
                className="rounded-full p-2 text-slate hover:bg-surface-2 hover:text-cream transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag className="h-10 w-10 text-slate" strokeWidth={1.5} />
                <p className="text-slate">Your cart is empty.</p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-rust px-5 py-2.5 text-sm font-semibold text-cream hover:bg-rust/90 transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <ProductImage
                        category={item.category}
                        color={item.imageColor}
                        imageUrl={item.imageUrl}
                        className="h-16 w-16 shrink-0"
                        iconClassName="w-6 h-6"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="text-sm font-medium text-cream hover:text-gold transition-colors line-clamp-2"
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
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-white/10 px-2 py-1">
                            <button
                              onClick={() => setQuantity(item.productId, item.quantity - 1)}
                              className="text-slate hover:text-cream transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-xs text-cream">
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
                          <span className="text-sm font-semibold text-gold">
                            {formatNPR(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/5 px-6 py-5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate">Subtotal</span>
                    <span className="font-display text-lg font-semibold text-cream">
                      {formatNPR(subtotal)}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full rounded-full bg-rust py-3 text-center text-sm font-semibold text-cream hover:bg-rust/90 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="block w-full rounded-full border border-white/10 py-3 text-center text-sm font-semibold text-cream hover:bg-surface-2 transition-colors"
                  >
                    View Cart
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

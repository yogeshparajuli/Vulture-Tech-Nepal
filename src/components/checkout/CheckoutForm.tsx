"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Truck, CreditCard, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import ProductImage from "@/components/ProductImage";
import { formatNPR } from "@/lib/format";

export default function CheckoutForm({
  stripeEnabled,
  defaultName,
  defaultEmail,
}: {
  stripeEnabled: boolean;
  defaultName?: string;
  defaultEmail?: string;
}) {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "STRIPE">("COD");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const customer = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      city: String(formData.get("city") || ""),
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          customer,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      clear();

      if (data.url) {
        window.location.href = data.url;
      } else {
        router.push(`/order-confirmation/${data.orderId}`);
      }
    } catch {
      setError("Could not reach the server. Please try again.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-slate" strokeWidth={1.5} />
        <p className="text-slate">Your cart is empty.</p>
        <Link
          href="/shop"
          className="rounded-full bg-rust px-6 py-3 text-sm font-semibold text-cream hover:bg-rust/90 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
        <div className="rounded-2xl card-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-cream">
            Shipping Details
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              name="name"
              required
              defaultValue={defaultName}
              placeholder="Full Name"
              className="rounded-xl card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none sm:col-span-2"
            />
            <input
              name="email"
              type="email"
              required
              defaultValue={defaultEmail}
              placeholder="Email Address"
              className="rounded-xl card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
            />
            <input
              name="phone"
              type="tel"
              required
              placeholder="Phone Number"
              className="rounded-xl card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
            />
            <input
              name="address"
              required
              placeholder="Street Address"
              className="rounded-xl card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none sm:col-span-2"
            />
            <input
              name="city"
              required
              placeholder="City"
              className="rounded-xl card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-2xl card-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-cream">
            Payment Method
          </h2>
          <div className="mt-4 space-y-3">
            <label
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors ${
                paymentMethod === "COD"
                  ? "border-gold/50 bg-void"
                  : "border-white/10 bg-void/40"
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
                className="accent-rust"
              />
              <Truck className="h-4 w-4 text-gold" />
              <div>
                <p className="text-sm font-medium text-cream">Cash on Delivery</p>
                <p className="text-xs text-slate">Pay when your order arrives</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors ${
                stripeEnabled
                  ? "cursor-pointer " +
                    (paymentMethod === "STRIPE"
                      ? "border-gold/50 bg-void"
                      : "border-white/10 bg-void/40")
                  : "cursor-not-allowed border-white/5 bg-void/20 opacity-50"
              }`}
            >
              <input
                type="radio"
                name="payment"
                disabled={!stripeEnabled}
                checked={paymentMethod === "STRIPE"}
                onChange={() => setPaymentMethod("STRIPE")}
                className="accent-rust"
              />
              <CreditCard className="h-4 w-4 text-gold" />
              <div>
                <p className="text-sm font-medium text-cream">Card Payment (Stripe)</p>
                <p className="text-xs text-slate">
                  {stripeEnabled
                    ? "Secure card payment via Stripe test mode"
                    : "Not configured yet — add Stripe keys to enable"}
                </p>
              </div>
            </label>
          </div>
        </div>

        {error && (
          <p className="rounded-xl border border-rust/40 bg-rust/10 px-4 py-3 text-sm text-rust">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-rust py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-rust/90 disabled:opacity-60"
        >
          {submitting ? "Placing Order..." : `Place Order — ${formatNPR(subtotal)}`}
        </button>
      </form>

      <div className="h-fit space-y-4 rounded-2xl card-border bg-surface p-6">
        <h2 className="font-display text-lg font-semibold text-cream">Your Order</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <ProductImage
                category={item.category}
                color={item.imageColor}
                imageUrl={item.imageUrl}
                className="h-14 w-14 shrink-0"
                iconClassName="w-5 h-5"
              />
              <div className="flex flex-1 items-center justify-between gap-2">
                <div>
                  <p className="line-clamp-1 text-sm text-cream">{item.name}</p>
                  <p className="text-xs text-slate">Qty {item.quantity}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-gold">
                  {formatNPR(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-medium text-cream">Total</span>
          <span className="font-display text-xl font-bold text-cream">
            {formatNPR(subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import type { ClientProduct } from "@/lib/products";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductForm({ product }: { product?: ClientProduct }) {
  const router = useRouter();
  const isEdit = !!product;
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [category, setCategory] = useState(product?.category ?? CATEGORIES[0].key);
  const [brand, setBrand] = useState(product?.brand ?? "");
  const [stock, setStock] = useState(product?.stock?.toString() ?? "0");
  const [imageColor, setImageColor] = useState(product?.imageColor ?? "AA4927");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [specsText, setSpecsText] = useState(product?.specs?.join("\n") ?? "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const payload = {
      name,
      slug,
      description,
      price: parseFloat(price),
      category,
      brand,
      stock: parseInt(stock, 10),
      imageColor,
      imageUrl: imageUrl.trim() || null,
      featured,
      specs: specsText.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    const url = isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate">Product Name</label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          required
          className="w-full rounded-xl card-border bg-surface px-4 py-2.5 text-sm text-cream focus:border-gold/40 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate">Slug</label>
        <input
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          required
          className="w-full rounded-xl card-border bg-surface px-4 py-2.5 text-sm text-cream focus:border-gold/40 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full rounded-xl card-border bg-surface px-4 py-2.5 text-sm text-cream focus:border-gold/40 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate">Price (NPR)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full rounded-xl card-border bg-surface px-4 py-2.5 text-sm text-cream focus:border-gold/40 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full rounded-xl card-border bg-surface px-4 py-2.5 text-sm text-cream focus:border-gold/40 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="w-full rounded-xl card-border bg-surface px-4 py-2.5 text-sm text-cream focus:border-gold/40 focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate">Brand</label>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className="w-full rounded-xl card-border bg-surface px-4 py-2.5 text-sm text-cream focus:border-gold/40 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate">
          Accent Color (hex, no #)
        </label>
        <div className="flex items-center gap-3">
          <input
            value={imageColor}
            onChange={(e) => setImageColor(e.target.value.replace("#", ""))}
            required
            className="w-full rounded-xl card-border bg-surface px-4 py-2.5 text-sm text-cream focus:border-gold/40 focus:outline-none"
          />
          <span
            className="h-9 w-9 shrink-0 rounded-lg border border-white/10"
            style={{ background: `#${imageColor}` }}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate">
          Photo URL (optional — leave blank to use the icon placeholder)
        </label>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://images.pexels.com/..."
          className="w-full rounded-xl card-border bg-surface px-4 py-2.5 text-sm text-cream placeholder:text-slate/60 focus:border-gold/40 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate">
          Specs (one per line)
        </label>
        <textarea
          value={specsText}
          onChange={(e) => setSpecsText(e.target.value)}
          rows={4}
          className="w-full rounded-xl card-border bg-surface px-4 py-2.5 text-sm text-cream focus:border-gold/40 focus:outline-none"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-cream">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="accent-rust"
        />
        Feature this product on the homepage
      </label>

      {error && <p className="text-sm text-rust">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-rust px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-rust/90 disabled:opacity-60"
      >
        {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}

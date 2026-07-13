"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

export default function ShopFilters({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeSort = searchParams.get("sort") ?? "newest";
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateParams({ q: search || null });
        }}
        className="relative"
      >
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-sm card-border bg-surface py-3 pl-10 pr-4 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
        />
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => updateParams({ category: null })}
          className={`rounded-sm px-4 py-2 text-xs font-medium transition-colors ${
            activeCategory === ""
              ? "bg-rust text-cream"
              : "card-border bg-surface text-slate hover:text-cream"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => updateParams({ category: cat.slug })}
            className={`rounded-sm px-4 py-2 text-xs font-medium transition-colors ${
              activeCategory === cat.slug
                ? "bg-rust text-cream"
                : "card-border bg-surface text-slate hover:text-cream"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[var(--line)] pt-4">
        <p className="text-xs text-slate">{resultCount} products</p>
        <select
          value={activeSort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="rounded-sm card-border bg-surface px-4 py-2 text-xs font-medium text-cream focus:border-gold/40 focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

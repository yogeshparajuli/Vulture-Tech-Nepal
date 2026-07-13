"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, HardDrive, Monitor, MemoryStick, Cable, ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

const ICONS = {
  CCTV_CAMERAS: Camera,
  MEMORY_CARDS: MemoryStick,
  MONITORS: Monitor,
  HARD_DISKS: HardDrive,
  ACCESSORIES: Cable,
} as const;

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between border-b border-[var(--line)] pb-6">
        <div>
          <span className="eyebrow">Catalog index</span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-cream">
            Five lines of equipment
          </h2>
        </div>
        <Link
          href="/shop"
          className="mono hidden text-[11px] uppercase tracking-[0.14em] text-gold hover:text-cream transition-colors sm:block"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-1">
        {CATEGORIES.map((cat, i) => {
          const Icon = ICONS[cat.key];
          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group flex items-center gap-4 border-b border-[var(--line)] px-1 py-6 transition-colors hover:bg-surface sm:gap-6 sm:px-4 lg:py-7"
              >
                <span className="mono w-9 shrink-0 text-sm text-slate">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--line-strong)] text-gold transition-colors group-hover:border-rust group-hover:text-rust">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-display text-lg font-medium text-cream transition-colors group-hover:text-gold">
                    {cat.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[13px] text-slate">
                    {cat.blurb}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-slate transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cream" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

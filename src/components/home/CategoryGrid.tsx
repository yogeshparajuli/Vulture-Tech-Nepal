"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, HardDrive, Monitor, MemoryStick, Cable } from "lucide-react";
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
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Categories
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-cream">
            Shop by category
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden text-sm font-medium text-gold hover:text-cream transition-colors sm:block"
        >
          View all products →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CATEGORIES.map((cat, i) => {
          const Icon = ICONS[cat.key];
          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group flex h-full flex-col rounded-2xl card-border bg-surface p-6 transition-colors hover:border-gold/30 hover:bg-surface-2"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rust/15 text-rust transition-colors group-hover:bg-rust group-hover:text-cream">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-cream">
                  {cat.label}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate">{cat.blurb}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

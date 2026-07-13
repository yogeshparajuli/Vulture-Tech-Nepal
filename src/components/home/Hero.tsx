"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SPECS = [
  ["EST.", "2016"],
  ["INSTALLS", "500+"],
  ["SUPPORT", "24/7"],
  ["WARRANTY", "3 YR"],
];

export default function Hero() {
  return (
    <section className="border-b border-[var(--line)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px lg:grid-cols-[1.05fr_1fr]">
        {/* Thesis */}
        <div className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:py-24 lg:pr-14 lg:pl-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            Vulture Tech — Kathmandu, NP
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mt-5 font-display text-6xl font-bold leading-[0.95] tracking-[-0.03em] text-cream sm:text-7xl lg:text-[5.5rem]"
          >
            Keep watch.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-slate"
          >
            Genuine CCTV, storage and surveillance hardware — sourced authentic and
            fitted right, for shops, homes and businesses across Nepal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-sm bg-rust px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-[#c8501f]"
            >
              Browse the catalog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm border border-[var(--line-strong)] px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-gold/50 hover:text-gold"
            >
              Talk to an installer
            </Link>
          </motion.div>

          {/* Spec plate — the stats as a technical readout, not big-number tiles */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mono mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--line)] pt-6 text-xs"
          >
            {SPECS.map(([label, value]) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="text-[10px] uppercase tracking-[0.16em] text-slate">
                  {label}
                </dt>
                <dd className="font-semibold text-cream">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Monitor feed — the signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative flex items-center justify-center border-t border-[var(--line)] bg-surface p-6 sm:p-10 lg:border-t-0 lg:border-l"
        >
          <div className="crop w-full max-w-md">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--line-strong)] bg-void">
              <Image
                src="/logo.jpg"
                alt="Live surveillance feed"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover opacity-95"
              />
              {/* scan grid */}
              <div className="grid-field pointer-events-none absolute inset-0 opacity-40" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-void/30" />

              {/* OSD — top */}
              <div className="mono absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2.5 text-[10px] tracking-widest text-cream">
                <span className="rounded-sm bg-void/60 px-1.5 py-0.5">CH 01</span>
                <span className="flex items-center gap-1.5 rounded-sm bg-void/60 px-1.5 py-0.5">
                  <span className="rec-dot" /> REC
                </span>
              </div>

              {/* OSD — bottom */}
              <div className="mono absolute inset-x-0 bottom-0 flex items-end justify-between px-3 py-2.5 text-[10px] tracking-widest text-gold">
                <span>27.7172°N 85.3240°E</span>
                <span className="text-cream/80">SYS ONLINE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Radio, Wifi, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-noise">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-rust/20 blur-[120px]" />
        <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full card-border bg-surface px-4 py-1.5 text-xs font-medium text-gold">
            <Radio className="h-3.5 w-3.5" /> Trusted Security Partner in Nepal
          </span>
          <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            See everything.
            <br />
            <span className="bg-gradient-to-r from-rust via-gold to-rust bg-clip-text text-transparent">
              Miss nothing.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-balance text-base leading-relaxed text-slate sm:text-lg">
            Vulture Tech Nepal supplies genuine CCTV cameras, high-endurance storage,
            monitors and surveillance accessories — with expert installation support
            across Kathmandu and beyond.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-rust px-6 py-3.5 text-sm font-semibold text-cream shadow-[0_0_30px_rgba(170,73,39,0.35)] transition-all hover:bg-rust/90 hover:shadow-[0_0_40px_rgba(170,73,39,0.5)]"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full card-border bg-surface px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-surface-2"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/5 pt-8">
            {[
              ["500+", "Installations"],
              ["24/7", "Support Line"],
              ["3 Yr", "Warranty"],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="font-display text-2xl font-bold text-cream">{stat}</p>
                <p className="mt-1 text-xs text-slate">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative rounded-3xl card-border bg-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-medium text-cream">
                <span className="h-2 w-2 animate-pulse rounded-full bg-rust" /> LIVE
                MONITORING
              </span>
              <Wifi className="h-4 w-4 text-gold" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {["Front Gate", "Warehouse", "Parking", "Reception"].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-surface-2 to-void"
                >
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(237,229,220,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(237,229,220,0.06) 1px, transparent 1px)",
                      backgroundSize: "10px 10px",
                    }}
                  />
                  <span className="absolute bottom-1.5 left-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-medium text-cream">
                    {label}
                  </span>
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rust" />
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-surface-2 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rust/20">
                  <ShieldCheck className="h-4.5 w-4.5 text-rust" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-cream">System Status</p>
                  <p className="text-[11px] text-slate">All zones secure</p>
                </div>
              </div>
              <span className="rounded-full bg-rust/15 px-2.5 py-1 text-[10px] font-semibold text-gold">
                ACTIVE
              </span>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-6 -top-6 rounded-2xl card-border bg-surface p-3 shadow-xl hidden sm:block"
          >
            <p className="text-[10px] text-slate">Storage Used</p>
            <p className="font-display text-sm font-bold text-gold">68%</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

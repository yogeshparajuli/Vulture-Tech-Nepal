"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Wrench, Truck, HeadphonesIcon } from "lucide-react";

const POINTS = [
  {
    icon: BadgeCheck,
    title: "Genuine Equipment",
    desc: "Only authorized-dealer stock from Hikvision, Dahua, Seagate, WD and other trusted brands.",
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    desc: "Certified technicians handle setup, cabling and configuration across the Kathmandu valley.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Same-day dispatch in the valley and reliable nationwide shipping across Nepal.",
  },
  {
    icon: HeadphonesIcon,
    title: "After-Sales Support",
    desc: "Warranty-backed support and maintenance whenever your system needs attention.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-y border-white/5 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Why Vulture Tech
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-cream">
            Built on reliability
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-void/40 p-6 card-border"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <p.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-cream">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

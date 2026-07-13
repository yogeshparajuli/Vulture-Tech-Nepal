import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-maroon via-surface to-surface card-border p-10 text-center sm:p-16">
        <div className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-rust/25 blur-[100px]" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold text-cream sm:text-4xl">
            Need a custom surveillance setup for your home or business?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-slate">
            Our team can design a full CCTV and storage solution tailored to your
            property, and handle the installation end to end.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-rust px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_0_30px_rgba(170,73,39,0.35)] transition-all hover:bg-rust/90"
          >
            Talk to an Expert
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

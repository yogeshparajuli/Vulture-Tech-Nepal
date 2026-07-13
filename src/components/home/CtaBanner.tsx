import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="crop relative overflow-hidden border border-[var(--line-strong)] bg-surface">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative grid grid-cols-1 items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:p-16">
          <div>
            <p className="eyebrow">Site survey — free of charge</p>
            <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-cream sm:text-4xl">
              Planning a full setup? We&apos;ll design and fit it end to end.
            </h2>
            <p className="mt-4 max-w-lg text-balance text-[15px] text-slate">
              Tell us the property and what you need covered. Our engineers spec the
              cameras, storage and cabling, then install and configure the whole system.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-sm bg-rust px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-[#c8501f]"
            >
              Request a survey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

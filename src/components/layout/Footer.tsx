import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";
import { CATEGORIES } from "@/lib/categories";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.5c0-.93.26-1.56 1.59-1.56h1.7V3.1C15.98 3.02 15 2.94 13.86 2.94c-2.36 0-3.98 1.44-3.98 4.08v2.58H7.12v3.2h2.76V21h3.62Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate">
              Genuine CCTV cameras, storage and surveillance accessories for homes and
              businesses across Nepal — backed by expert installation support.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full border border-white/10 p-2 text-slate hover:text-gold hover:border-gold/40 transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full border border-white/10 p-2 text-slate hover:text-gold hover:border-gold/40 transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-cream">Shop</h3>
            <ul className="mt-4 space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.key}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="text-sm text-slate hover:text-gold transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-cream">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-slate hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-slate hover:text-gold transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-sm text-slate hover:text-gold transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-cream">Get in touch</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                New Baneshwor, Kathmandu, Nepal
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                +977 1-4XXXXXX
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                hello@vulturetech.com.np
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-slate">
            © {new Date().getFullYear()} Vulture Tech Nepal. All rights reserved.
          </p>
          <p className="text-xs text-slate">Genuine equipment · Local installation support</p>
        </div>
      </div>
    </footer>
  );
}

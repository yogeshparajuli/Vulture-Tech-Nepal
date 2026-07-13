"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { CATEGORIES } from "@/lib/categories";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-void/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              if (link.href === "/shop") {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setShopMenuOpen(true)}
                    onMouseLeave={() => setShopMenuOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`relative px-3.5 py-2 text-[13px] font-medium transition-colors after:absolute after:inset-x-3.5 after:-bottom-[1px] after:h-px after:transition-colors ${
                        active
                          ? "text-cream after:bg-rust"
                          : "text-slate hover:text-cream after:bg-transparent"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {shopMenuOpen && (
                      <div className="absolute left-0 top-full pt-2 w-64">
                        <div className="rounded-sm card-border bg-surface p-2 shadow-2xl">
                          {CATEGORIES.map((cat) => (
                            <Link
                              key={cat.key}
                              href={`/shop?category=${cat.slug}`}
                              className="flex flex-col rounded-sm px-3 py-2.5 hover:bg-surface-2 transition-colors"
                            >
                              <span className="text-sm font-medium text-cream">
                                {cat.label}
                              </span>
                              <span className="text-xs text-slate">{cat.blurb}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                    active ? "text-cream bg-surface-2" : "text-slate hover:text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              className="relative rounded-sm p-2.5 text-cream hover:bg-surface-2 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-sm bg-rust px-1 text-[10px] font-bold text-cream">
                  {count}
                </span>
              )}
            </button>

            <div className="hidden sm:block">
              {status === "authenticated" ? (
                <div className="group relative">
                  <button className="flex items-center gap-2 rounded-sm p-2.5 text-cream hover:bg-surface-2 transition-colors">
                    <User className="h-5 w-5" />
                  </button>
                  <div className="absolute right-0 top-full hidden pt-2 group-hover:block">
                    <div className="w-52 rounded-sm card-border bg-surface p-2 shadow-2xl">
                      <p className="truncate px-3 py-2 text-xs text-slate">
                        {session.user?.email}
                      </p>
                      {session.user?.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-cream hover:bg-surface-2 transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" /> Admin Panel
                        </Link>
                      )}
                      <Link
                        href="/account"
                        className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-cream hover:bg-surface-2 transition-colors"
                      >
                        <User className="h-4 w-4" /> My Orders
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-cream hover:bg-surface-2 transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="rounded-sm bg-rust px-5 py-2.5 text-sm font-semibold text-cream hover:bg-[#c8501f] transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-sm p-2.5 text-cream hover:bg-surface-2 transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-[var(--line)] px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-sm px-3 py-2.5 text-sm font-medium text-cream hover:bg-surface-2 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-white/5" />
              {status === "authenticated" ? (
                <>
                  {session.user?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-sm px-3 py-2.5 text-sm font-medium text-cream hover:bg-surface-2 transition-colors"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-sm px-3 py-2.5 text-sm font-medium text-cream hover:bg-surface-2 transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-sm px-3 py-2.5 text-left text-sm font-medium text-cream hover:bg-surface-2 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-sm bg-rust px-3 py-2.5 text-sm font-semibold text-cream"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
      <CartDrawer />
    </>
  );
}

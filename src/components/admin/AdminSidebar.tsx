"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ClipboardList, ArrowLeft } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-[var(--line)] bg-surface p-4 lg:w-56 lg:border-b-0 lg:border-r lg:p-6">
      <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex shrink-0 items-center gap-2.5 rounded-sm px-3.5 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-rust text-cream" : "text-slate hover:bg-surface-2 hover:text-cream"
              }`}
            >
              <Icon className="h-4 w-4" /> {link.label}
            </Link>
          );
        })}
        <Link
          href="/"
          className="mt-0 flex shrink-0 items-center gap-2.5 rounded-sm px-3.5 py-2.5 text-sm font-medium text-slate hover:bg-surface-2 hover:text-cream transition-colors lg:mt-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Site
        </Link>
      </nav>
    </aside>
  );
}

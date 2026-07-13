import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rust to-maroon shadow-[0_0_20px_rgba(170,73,39,0.45)] transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-cream"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            d="M12 3 4 6v5c0 4.4 3.2 8 8 10 4.8-2 8-5.6 8-10V6l-8-3Z"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2.4" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight text-cream">
          Vulture Tech
        </span>
        <span className="text-[10px] font-medium tracking-[0.25em] text-gold uppercase">
          Nepal
        </span>
      </span>
    </Link>
  );
}

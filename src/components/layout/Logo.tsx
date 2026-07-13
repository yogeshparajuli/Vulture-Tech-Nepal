import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-[var(--line-strong)]">
        <Image src="/logo.jpg" alt="Vulture Tech Nepal" fill className="object-cover" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-cream">
          Vulture Tech
        </span>
        <span className="mono mt-0.5 text-[9px] font-medium tracking-[0.32em] text-gold uppercase">
          Nepal
        </span>
      </span>
    </Link>
  );
}

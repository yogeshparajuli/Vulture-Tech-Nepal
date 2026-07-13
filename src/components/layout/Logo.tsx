import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-[0_0_20px_rgba(170,73,39,0.45)] transition-transform group-hover:scale-105">
        <Image src="/logo.jpg" alt="Vulture Tech Nepal" fill className="object-cover" />
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

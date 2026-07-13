import Image from "next/image";
import { Camera, HardDrive, Monitor, MemoryStick, Cable } from "lucide-react";
import type { CategoryKey } from "@/lib/categories";

const ICONS: Record<CategoryKey, typeof Camera> = {
  CCTV_CAMERAS: Camera,
  MEMORY_CARDS: MemoryStick,
  MONITORS: Monitor,
  HARD_DISKS: HardDrive,
  ACCESSORIES: Cable,
};

export default function ProductImage({
  category,
  color,
  imageUrl,
  className = "",
  iconClassName = "w-10 h-10",
}: {
  category: string;
  color: string;
  imageUrl?: string | null;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = ICONS[category as CategoryKey] ?? Camera;
  const hex = color.startsWith("#") ? color : `#${color}`;

  if (imageUrl) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-surface-2 ${className}`}
      >
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 300px"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, ${hex}22 0%, transparent 45%)`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
      style={{
        background: `radial-gradient(circle at 30% 20%, ${hex}33, transparent 60%), linear-gradient(160deg, #0e0a09 0%, #191211 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(237,229,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(237,229,220,0.05) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div
        className="relative flex items-center justify-center rounded-full p-5"
        style={{
          background: `${hex}22`,
          boxShadow: `0 0 40px ${hex}55`,
        }}
      >
        <Icon className={iconClassName} style={{ color: hex }} strokeWidth={1.5} />
      </div>
    </div>
  );
}

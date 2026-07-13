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
  imageUrl,
  className = "",
  iconClassName = "w-10 h-10",
  rounded = "rounded-sm",
}: {
  category: string;
  color?: string;
  imageUrl?: string | null;
  className?: string;
  iconClassName?: string;
  rounded?: string;
}) {
  const Icon = ICONS[category as CategoryKey] ?? Camera;

  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden bg-surface-2 ${rounded} ${className}`}>
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 300px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-surface ${rounded} ${className}`}
    >
      <div className="grid-field pointer-events-none absolute inset-0 opacity-60" />
      <Icon className={`relative text-slate ${iconClassName}`} strokeWidth={1.25} />
    </div>
  );
}

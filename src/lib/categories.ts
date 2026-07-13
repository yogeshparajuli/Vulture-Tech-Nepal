export type CategoryKey =
  | "CCTV_CAMERAS"
  | "MEMORY_CARDS"
  | "MONITORS"
  | "HARD_DISKS"
  | "ACCESSORIES";

export const CATEGORIES: {
  key: CategoryKey;
  slug: string;
  label: string;
  short: string;
  blurb: string;
}[] = [
  {
    key: "CCTV_CAMERAS",
    slug: "cctv-cameras",
    label: "CCTV Cameras",
    short: "Cameras",
    blurb: "Dome, bullet & PTZ cameras with night vision and AI detection.",
  },
  {
    key: "MEMORY_CARDS",
    slug: "memory-cards",
    label: "Memory Cards",
    short: "Memory",
    blurb: "High-endurance microSD & SD cards built for 24/7 recording.",
  },
  {
    key: "MONITORS",
    slug: "monitors",
    label: "Monitors",
    short: "Monitors",
    blurb: "CCTV & workstation displays for control rooms and offices.",
  },
  {
    key: "HARD_DISKS",
    slug: "hard-disks",
    label: "Hard Disks",
    short: "Storage",
    blurb: "Surveillance-grade HDDs & SSDs for continuous NVR/DVR storage.",
  },
  {
    key: "ACCESSORIES",
    slug: "accessories",
    label: "Accessories",
    short: "Accessories",
    blurb: "Cables, connectors, power supplies, mounts and network switches.",
  },
];

export function categoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoryByKey(key: string) {
  return CATEGORIES.find((c) => c.key === key);
}

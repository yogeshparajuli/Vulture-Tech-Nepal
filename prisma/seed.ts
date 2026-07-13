import { PrismaClient, Category, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Low-size (w=400) free-to-use stock photos from Pexels (pexels.com/license — free for
// commercial & personal use, no attribution required). One representative photo per
// product, varied within each category.
const IMG = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`;

const products: {
  name: string;
  description: string;
  price: number;
  category: Category;
  brand: string;
  stock: number;
  imageColor: string;
  imageUrl: string;
  featured?: boolean;
  specs: string[];
}[] = [
  // CCTV CAMERAS
  {
    name: "Hikvision 4MP Dome Camera DS-2CE",
    description:
      "Weatherproof 4MP HD dome camera with 20m IR night vision and vandal-resistant housing — built for entrances and hallways.",
    price: 4500,
    category: "CCTV_CAMERAS",
    brand: "Hikvision",
    stock: 42,
    imageColor: "AA4927",
    imageUrl: IMG("11384993"),
    featured: true,
    specs: ["4MP resolution", "20m night vision", "IP67 weatherproof", "Vandal-resistant"],
  },
  {
    name: "Dahua 5MP Bullet Camera IPC-HFW",
    description:
      "Outdoor bullet camera with 30m IR range and smart motion detection, ideal for perimeter and gate monitoring.",
    price: 5800,
    category: "CCTV_CAMERAS",
    brand: "Dahua",
    stock: 35,
    imageColor: "581F11",
    imageUrl: IMG("3205737"),
    featured: true,
    specs: ["5MP resolution", "30m night vision", "Smart motion alerts", "IP67 rated"],
  },
  {
    name: "CP Plus 2MP Wi-Fi Indoor Camera",
    description:
      "Compact Wi-Fi indoor camera with two-way audio and mobile app viewing, perfect for home and small office monitoring.",
    price: 3500,
    category: "CCTV_CAMERAS",
    brand: "CP Plus",
    stock: 60,
    imageColor: "BAA175",
    imageUrl: IMG("5966513"),
    specs: ["2MP resolution", "Two-way audio", "Wi-Fi + app viewing", "Night vision"],
  },
  {
    name: "EZVIZ 4MP PTZ Auto-Tracking Camera",
    description:
      "Pan-tilt-zoom camera with AI auto-tracking that follows movement across large open areas like warehouses and yards.",
    price: 14500,
    category: "CCTV_CAMERAS",
    brand: "EZVIZ",
    stock: 18,
    imageColor: "AA4927",
    imageUrl: IMG("9229362"),
    featured: true,
    specs: ["4MP resolution", "355° pan / 90° tilt", "AI auto-tracking", "40m night vision"],
  },
  {
    name: "Hikvision 8MP 4K Turret Camera",
    description:
      "Ultra HD 4K turret camera delivering license-plate-level detail for parking lots and commercial entrances.",
    price: 12800,
    category: "CCTV_CAMERAS",
    brand: "Hikvision",
    stock: 22,
    imageColor: "5C5350",
    imageUrl: IMG("3205737"),
    specs: ["8MP / 4K UHD", "WDR 120dB", "30m night vision", "Built-in mic"],
  },
  {
    name: "Dahua 4-Channel NVR Kit with 4 Cameras",
    description:
      "Complete surveillance starter kit: 4-channel NVR plus four 2MP bullet cameras, cabling included, ready to install.",
    price: 24500,
    category: "CCTV_CAMERAS",
    brand: "Dahua",
    stock: 12,
    imageColor: "581F11",
    imageUrl: IMG("11384993"),
    featured: true,
    specs: ["4-channel NVR", "4x 2MP cameras", "1TB-ready", "Cables included"],
  },
  // MEMORY CARDS
  {
    name: "SanDisk High Endurance 128GB microSD",
    description:
      "Built for continuous dash-cam and CCTV recording, rated for thousands of hours of write cycles without failure.",
    price: 2800,
    category: "MEMORY_CARDS",
    brand: "SanDisk",
    stock: 80,
    imageColor: "BAA175",
    imageUrl: IMG("175449"),
    featured: true,
    specs: ["128GB", "High endurance", "microSDXC + adapter", "Up to 100MB/s"],
  },
  {
    name: "Kingston Endurance 64GB microSD",
    description:
      "Reliable microSD card engineered for security cameras and body cams that record around the clock.",
    price: 1650,
    category: "MEMORY_CARDS",
    brand: "Kingston",
    stock: 95,
    imageColor: "5C5350",
    imageUrl: IMG("2147082"),
    specs: ["64GB", "Endurance series", "A1 rated", "Wide temp range"],
  },
  {
    name: "Samsung PRO Endurance 256GB microSD",
    description:
      "Top-tier endurance card for NVR/DVR and dash-cam systems needing large, dependable storage capacity.",
    price: 4900,
    category: "MEMORY_CARDS",
    brand: "Samsung",
    stock: 40,
    imageColor: "AA4927",
    imageUrl: IMG("27742572"),
    specs: ["256GB", "Up to 43,800 hours write", "Waterproof", "Temperature proof"],
  },
  {
    name: "Western Digital Purple 32GB microSD",
    description:
      "Purple-series card purpose-built for surveillance workloads, rated for extreme temperature tolerance.",
    price: 950,
    category: "MEMORY_CARDS",
    brand: "Western Digital",
    stock: 110,
    imageColor: "581F11",
    imageUrl: IMG("30758132"),
    specs: ["32GB", "Surveillance grade", "-25°C to 85°C", "Class 10"],
  },
  // MONITORS
  {
    name: 'Samsung 24" FHD LED Monitor',
    description:
      "Crisp full-HD display suited for control rooms, back-office desks, and general CCTV playback stations.",
    price: 14500,
    category: "MONITORS",
    brand: "Samsung",
    stock: 28,
    imageColor: "5C5350",
    imageUrl: IMG("20213722"),
    featured: true,
    specs: ['24" FHD 1920x1080', "75Hz refresh", "HDMI + VGA", "Slim bezel"],
  },
  {
    name: 'LG 27" IPS Monitor',
    description:
      "Wide-viewing IPS panel with accurate colour for multi-camera split-screen monitoring walls.",
    price: 22800,
    category: "MONITORS",
    brand: "LG",
    stock: 20,
    imageColor: "AA4927",
    imageUrl: IMG("13988977"),
    specs: ['27" IPS FHD', "178° viewing angle", "HDMI x2", "Flicker-safe"],
  },
  {
    name: 'ViewSonic 32" 4K Security Monitor',
    description:
      "Large 4K display built for 16-camera video walls, giving operators a sharp overview of every feed at once.",
    price: 42500,
    category: "MONITORS",
    brand: "ViewSonic",
    stock: 9,
    imageColor: "BAA175",
    imageUrl: IMG("326512"),
    featured: true,
    specs: ['32" 4K UHD', "Video-wall ready", "HDMI + DP", "16-camera split support"],
  },
  {
    name: 'Dell 22" Business Monitor',
    description:
      "Dependable everyday monitor for admin desks and reception areas running store or office software.",
    price: 12900,
    category: "MONITORS",
    brand: "Dell",
    stock: 33,
    imageColor: "581F11",
    imageUrl: IMG("115655"),
    specs: ['22" FHD', "VESA mountable", "Low blue light", "3-year warranty"],
  },
  // HARD DISKS
  {
    name: "Seagate SkyHawk 2TB Surveillance HDD",
    description:
      "Purpose-built surveillance hard drive rated for 24/7 recording across up to 32 cameras with reliable write endurance.",
    price: 8900,
    category: "HARD_DISKS",
    brand: "Seagate",
    stock: 50,
    imageColor: "AA4927",
    imageUrl: IMG("32923609"),
    featured: true,
    specs: ["2TB capacity", "24/7 rated", "Up to 32 camera support", "3-year warranty"],
  },
  {
    name: "WD Purple 4TB Surveillance HDD",
    description:
      "AllFrame technology reduces frame loss and improves playback for large multi-camera NVR setups.",
    price: 14200,
    category: "HARD_DISKS",
    brand: "Western Digital",
    stock: 38,
    imageColor: "581F11",
    imageUrl: IMG("32920312"),
    featured: true,
    specs: ["4TB capacity", "AllFrame AI tech", "180TB/yr workload", "64MB cache"],
  },
  {
    name: "Toshiba 1TB Surveillance HDD",
    description:
      "Budget-friendly entry-level surveillance drive ideal for small 4-8 camera home and shop setups.",
    price: 5400,
    category: "HARD_DISKS",
    brand: "Toshiba",
    stock: 46,
    imageColor: "5C5350",
    imageUrl: IMG("209666"),
    specs: ["1TB capacity", "24/7 rated", "Low power draw", "2-year warranty"],
  },
  {
    name: "Samsung 1TB SSD 870 EVO",
    description:
      "Fast solid-state storage for NVR systems or workstations needing quick footage retrieval and export.",
    price: 10800,
    category: "HARD_DISKS",
    brand: "Samsung",
    stock: 25,
    imageColor: "BAA175",
    imageUrl: IMG("19658260"),
    specs: ["1TB SSD", "SATA III", "Up to 560MB/s read", "5-year warranty"],
  },
  {
    name: "Seagate SkyHawk 6TB Surveillance HDD",
    description:
      "High-capacity surveillance drive for large installations recording dozens of cameras continuously for months.",
    price: 21500,
    category: "HARD_DISKS",
    brand: "Seagate",
    stock: 15,
    imageColor: "AA4927",
    imageUrl: IMG("117729"),
    specs: ["6TB capacity", "Up to 64 camera support", "256MB cache", "Rescue data recovery"],
  },
  // ACCESSORIES
  {
    name: "8-Port PoE Network Switch",
    description:
      "Power-over-Ethernet switch that powers and connects up to 8 IP cameras through a single cable run each.",
    price: 6200,
    category: "ACCESSORIES",
    brand: "TP-Link",
    stock: 30,
    imageColor: "581F11",
    imageUrl: IMG("32698413"),
    featured: true,
    specs: ["8 PoE ports", "Up to 250m extend mode", "Plug and play", "Metal housing"],
  },
  {
    name: "CCTV Power Supply Adapter 12V 5A",
    description:
      "Reliable multi-output power adapter for distributing power to several analog cameras from one box.",
    price: 1450,
    category: "ACCESSORIES",
    brand: "Generic",
    stock: 70,
    imageColor: "5C5350",
    imageUrl: IMG("37929911"),
    specs: ["12V 5A output", "9-way distribution", "Overload protection", "Indoor use"],
  },
  {
    name: "BNC Video + Power Cable 20m",
    description:
      "Pre-terminated coaxial cable bundling video and power in one run for fast analog camera installation.",
    price: 950,
    category: "ACCESSORIES",
    brand: "Generic",
    stock: 90,
    imageColor: "AA4927",
    imageUrl: IMG("97975"),
    specs: ["20m length", "Video + power combined", "Copper conductor", "UV-resistant jacket"],
  },
  {
    name: "Camera Junction Mounting Bracket",
    description:
      "Sturdy aluminium wall/ceiling mount bracket compatible with most dome and bullet camera housings.",
    price: 650,
    category: "ACCESSORIES",
    brand: "Generic",
    stock: 120,
    imageColor: "BAA175",
    imageUrl: IMG("4740157"),
    specs: ["Aluminium alloy", "Wall & ceiling mount", "Weatherproof", "Universal fit"],
  },
  {
    name: "HDMI Cable 4K 5m",
    description:
      "High-speed HDMI cable for connecting NVR/DVR units to monitors or video walls without signal loss.",
    price: 850,
    category: "ACCESSORIES",
    brand: "Generic",
    stock: 100,
    imageColor: "581F11",
    imageUrl: IMG("12997230"),
    specs: ["5m length", "4K @ 60Hz", "Gold-plated connectors", "Braided shielding"],
  },
  {
    name: "Uninterruptible Power Supply (UPS) 650VA",
    description:
      "Backup power unit that keeps NVR, cameras, and network switches running through short outages.",
    price: 5200,
    category: "ACCESSORIES",
    brand: "APC",
    stock: 24,
    imageColor: "5C5350",
    imageUrl: IMG("11457403"),
    featured: true,
    specs: ["650VA / 360W", "Automatic voltage regulation", "2 battery outlets", "LED status display"],
  },
];

// Free-to-use Nepali portrait photos from Pexels (pexels.com/license) used as reviewer avatars.
const REVIEWERS: { name: string; image: string }[] = [
  {
    name: "Anish Shrestha",
    image:
      "https://images.pexels.com/photos/35045742/pexels-photo-35045742/free-photo-of-portrait-of-local-man-in-karnali-province-nepal.png?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Bikash Tamang",
    image: "https://images.pexels.com/photos/4145377/pexels-photo-4145377.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Prakash Thapa",
    image:
      "https://images.pexels.com/photos/34140359/pexels-photo-34140359/free-photo-of-stylish-man-in-nepali-hat-outdoors.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Suresh Magar",
    image: "https://images.pexels.com/photos/13157781/pexels-photo-13157781.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Nabin Adhikari",
    image:
      "https://images.pexels.com/photos/36799484/pexels-photo-36799484/free-photo-of-smiling-man-with-hat-on-rural-dirt-road.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Rajesh Khadka",
    image: "https://images.pexels.com/photos/1324921/pexels-photo-1324921.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Dipesh Shakya",
    image: "https://images.pexels.com/photos/8160812/pexels-photo-8160812.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Sabina Gurung",
    image:
      "https://images.pexels.com/photos/19324443/pexels-photo-19324443/free-photo-of-portrait-of-a-pretty-brunette-wearing-a-traditional-robe.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Anjali Karki",
    image:
      "https://images.pexels.com/photos/36024428/pexels-photo-36024428/free-photo-of-portrait-of-a-smiling-nepali-woman-in-traditional-attire.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Sunita Rai",
    image:
      "https://images.pexels.com/photos/34962108/pexels-photo-34962108/free-photo-of-smiling-elderly-woman-in-traditional-nepalese-attire.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Puja Lama",
    image:
      "https://images.pexels.com/photos/24994360/pexels-photo-24994360/free-photo-of-woman-in-traditional-clothing-on-dirt-road.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Kritika Basnet",
    image:
      "https://images.pexels.com/photos/34463075/pexels-photo-34463075/free-photo-of-smiling-woman-in-traditional-dress-outdoors.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Manisha Poudel",
    image: "https://images.pexels.com/photos/8791229/pexels-photo-8791229.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Sarita Chhetri",
    image: "https://images.pexels.com/photos/12889460/pexels-photo-12889460.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Rukmini Ghimire",
    image:
      "https://images.pexels.com/photos/20265603/pexels-photo-20265603/free-photo-of-woman-wearing-traditional-costume-in-nepal.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

const REVIEW_COMMENTS: Record<Category, string[]> = {
  CCTV_CAMERAS: [
    "Picture quality at night is genuinely impressive — caught someone at our gate at 2 AM crystal clear.",
    "Been running this for six months straight with zero downtime. Exactly what our shop needed for the entrance.",
    "Setup was straightforward and the mobile alerts are instant. Worth every rupee for the peace of mind.",
    "Solid build quality, handled the whole monsoon season without a single issue. Highly recommend for outdoor use.",
    "Ordered through Vulture Tech and their technician helped with the install too. Footage is sharp even in low light.",
  ],
  MEMORY_CARDS: [
    "Been recording 24/7 on my CCTV setup for months and this card hasn't failed once. Reliable as promised.",
    "Fast enough for continuous NVR recording without any dropped frames. No complaints so far.",
    "Good value for the endurance rating — replaced a cheaper card that kept corrupting footage and this one's flawless.",
    "Handles the constant read-write cycle of dashcam recording without heating up. Solid choice.",
  ],
  MONITORS: [
    "Colors are sharp and the viewing angle is great even with a few of us watching the control room feed together.",
    "Perfect size for split-screen CCTV viewing, no lag noticed even with several cameras running at once.",
    "Good build and the stand is sturdy. Been using it daily at the front desk without any issues.",
    "Display is crisp for the price and setup took just a few minutes with the included cables.",
  ],
  HARD_DISKS: [
    "Running 8 cameras continuously for over a year now and the drive is still going strong. Genuinely surveillance-grade.",
    "Quiet operation and it handles the constant write load from our NVR without any hiccups.",
    "No corrupted footage even after a power outage at our building. Solid reliability for the price.",
    "Exactly what was recommended for a multi-camera setup — no dropped recordings months in.",
  ],
  ACCESSORIES: [
    "Well-built and easy to install, exactly matched what was described on the listing.",
    "Been through two dry seasons and one monsoon without any issues. Good quality for the price.",
    "Simple, does the job perfectly. The Vulture Tech team even explained the setup over the phone.",
    "Arrived quickly and worked immediately with our existing setup, no compatibility issues at all.",
  ],
};

function pickN<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const picked: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    picked.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return picked;
}

async function main() {
  console.log("Seeding database...");

  // For anything public-facing, set ADMIN_PASSWORD (and DEMO_PASSWORD) in the
  // environment — the defaults below are for local development only.
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@123", 10);
  await prisma.user.upsert({
    where: { email: "admin@vulturetech.com.np" },
    update: {},
    create: {
      name: "Vulture Tech Admin",
      email: "admin@vulturetech.com.np",
      passwordHash: adminPassword,
      role: Role.ADMIN,
    },
  });

  const demoPassword = await bcrypt.hash(process.env.DEMO_PASSWORD || "Demo@123", 10);
  await prisma.user.upsert({
    where: { email: "demo@vulturetech.com.np" },
    update: {},
    create: {
      name: "Demo Customer",
      email: "demo@vulturetech.com.np",
      passwordHash: demoPassword,
      role: Role.USER,
    },
  });

  let reviewCount = 0;

  for (const p of products) {
    const slug = slugify(p.name);
    const product = await prisma.product.upsert({
      where: { slug },
      update: {
        imageUrl: p.imageUrl,
        imageColor: p.imageColor,
      },
      create: {
        name: p.name,
        slug,
        description: p.description,
        price: p.price,
        category: p.category,
        brand: p.brand,
        stock: p.stock,
        imageColor: p.imageColor,
        imageUrl: p.imageUrl,
        featured: p.featured ?? false,
        specs: JSON.stringify(p.specs),
      },
    });

    await prisma.review.deleteMany({ where: { productId: product.id } });

    const numReviews = 2 + Math.round(Math.random());
    const reviewers = pickN(REVIEWERS, numReviews);
    const comments = pickN(REVIEW_COMMENTS[p.category], numReviews);

    for (let i = 0; i < numReviews; i++) {
      await prisma.review.create({
        data: {
          productId: product.id,
          reviewerName: reviewers[i].name,
          reviewerImage: reviewers[i].image,
          rating: Math.random() < 0.75 ? 5 : 4,
          comment: comments[i],
        },
      });
      reviewCount++;
    }
  }

  console.log(`Seeded ${products.length} products, ${reviewCount} reviews, admin + demo users.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

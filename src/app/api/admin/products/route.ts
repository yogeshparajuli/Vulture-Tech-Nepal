import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(5),
  price: z.number().positive(),
  category: z.enum([
    "CCTV_CAMERAS",
    "MEMORY_CARDS",
    "MONITORS",
    "HARD_DISKS",
    "ACCESSORIES",
  ]),
  brand: z.string().min(1),
  stock: z.number().int().min(0),
  imageColor: z.string().min(3),
  imageUrl: z.string().url().nullable().optional(),
  featured: z.boolean().optional(),
  specs: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid product data" },
      { status: 400 }
    );
  }

  const existing = await prisma.product.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "A product with this slug already exists" }, { status: 409 });
  }

  const product = await prisma.product.create({
    data: {
      ...parsed.data,
      featured: parsed.data.featured ?? false,
      specs: JSON.stringify(parsed.data.specs ?? []),
    },
  });

  return NextResponse.json(product, { status: 201 });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

const productUpdateSchema = z.object({
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

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const parsed = productUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid product data" },
      { status: 400 }
    );
  }

  const clash = await prisma.product.findUnique({ where: { slug: parsed.data.slug } });
  if (clash && clash.id !== id) {
    return NextResponse.json(
      { error: "A product with this slug already exists" },
      { status: 409 }
    );
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...parsed.data,
      featured: parsed.data.featured ?? false,
      specs: JSON.stringify(parsed.data.specs ?? []),
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  const usedInOrder = await prisma.orderItem.findFirst({ where: { productId: id } });
  if (usedInOrder) {
    return NextResponse.json(
      { error: "Cannot delete a product that has existing orders. Set stock to 0 instead." },
      { status: 409 }
    );
  }

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

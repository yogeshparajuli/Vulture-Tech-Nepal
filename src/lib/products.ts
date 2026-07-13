import { prisma } from "@/lib/prisma";
import type { Category } from "@prisma/client";

export type ClientProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: Category;
  brand: string;
  stock: number;
  imageColor: string;
  imageUrl: string | null;
  featured: boolean;
  specs: string[];
};

function serialize(p: {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: Category;
  brand: string;
  stock: number;
  imageColor: string;
  imageUrl: string | null;
  featured: boolean;
  specs: string;
}): ClientProduct {
  let specs: string[] = [];
  try {
    specs = JSON.parse(p.specs);
  } catch {
    specs = [];
  }
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    category: p.category,
    brand: p.brand,
    stock: p.stock,
    imageColor: p.imageColor,
    imageUrl: p.imageUrl,
    featured: p.featured,
    specs,
  };
}

export async function getFeaturedProducts(limit = 6): Promise<ClientProduct[]> {
  const products = await prisma.product.findMany({
    where: { featured: true },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return products.map(serialize);
}

export async function getAllProducts(filters?: {
  category?: Category;
  search?: string;
  sort?: "price-asc" | "price-desc" | "newest";
}): Promise<ClientProduct[]> {
  const products = await prisma.product.findMany({
    where: {
      category: filters?.category,
      ...(filters?.search
        ? {
            OR: [
              { name: { contains: filters.search, mode: "insensitive" } },
              { brand: { contains: filters.search, mode: "insensitive" } },
              { description: { contains: filters.search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy:
      filters?.sort === "price-asc"
        ? { price: "asc" }
        : filters?.sort === "price-desc"
          ? { price: "desc" }
          : { createdAt: "desc" },
  });
  return products.map(serialize);
}

export async function getProductBySlug(slug: string): Promise<ClientProduct | null> {
  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? serialize(product) : null;
}

export async function getRelatedProducts(
  category: Category,
  excludeSlug: string,
  limit = 4
): Promise<ClientProduct[]> {
  const products = await prisma.product.findMany({
    where: { category, slug: { not: excludeSlug } },
    take: limit,
  });
  return products.map(serialize);
}

import ProductForm from "@/components/admin/ProductForm";

export const metadata = { title: "Add Product | Vulture Tech Nepal" };

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-cream">Add Product</h1>
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}

import { auth } from "@/auth";
import { stripeEnabled } from "@/lib/stripe";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata = { title: "Checkout | Vulture Tech Nepal" };

export default async function CheckoutPage() {
  const session = await auth();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-cream">Checkout</h1>
      <div className="mt-8">
        <CheckoutForm
          stripeEnabled={stripeEnabled}
          defaultName={session?.user?.name ?? undefined}
          defaultEmail={session?.user?.email ?? undefined}
        />
      </div>
    </div>
  );
}

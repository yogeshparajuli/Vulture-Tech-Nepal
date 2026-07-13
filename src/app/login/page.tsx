"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setSubmitting(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-sm card-border bg-surface p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-rust/15 text-rust">
          <LogIn className="h-5 w-5" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold text-cream">Sign In</h1>
        <p className="mt-1 text-sm text-slate">
          Welcome back to Vulture Tech Nepal.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            className="w-full rounded-sm card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-sm card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
          />

          {error && <p className="text-sm text-rust">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-sm bg-rust py-3 text-sm font-semibold text-cream transition-colors hover:bg-[#c8501f] disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-gold hover:text-cream transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

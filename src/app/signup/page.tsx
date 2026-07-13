"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setSubmitting(false);
      return;
    }

    const signInRes = await signIn("credentials", { email, password, redirect: false });
    setSubmitting(false);

    if (signInRes?.error) {
      router.push("/login");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-sm card-border bg-surface p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-rust/15 text-rust">
          <UserPlus className="h-5 w-5" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold text-cream">
          Create Account
        </h1>
        <p className="mt-1 text-sm text-slate">
          Join Vulture Tech Nepal to track your orders.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="name"
            required
            placeholder="Full Name"
            className="w-full rounded-sm card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
          />
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
            minLength={6}
            placeholder="Password (min. 6 characters)"
            className="w-full rounded-sm card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
          />

          {error && <p className="text-sm text-rust">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-sm bg-rust py-3 text-sm font-semibold text-cream transition-colors hover:bg-[#c8501f] disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-gold hover:text-cream transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

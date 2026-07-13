"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold" />
        <p className="font-display text-lg font-semibold text-cream">Message sent</p>
        <p className="text-sm text-slate">
          Thanks for reaching out — our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Full Name"
          className="rounded-sm card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          className="rounded-sm card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
        />
      </div>
      <input
        placeholder="Phone Number (optional)"
        className="w-full rounded-sm card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
      />
      <textarea
        required
        rows={5}
        placeholder="How can we help?"
        className="w-full rounded-sm card-border bg-void px-4 py-3 text-sm text-cream placeholder:text-slate focus:border-gold/40 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-sm bg-rust px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-[#c8501f]"
      >
        Send Message
      </button>
    </form>
  );
}

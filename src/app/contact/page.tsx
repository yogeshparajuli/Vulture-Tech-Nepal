import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact Us | Vulture Tech Nepal" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Contact
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-cream">Get in Touch</h1>
        <p className="mx-auto mt-3 max-w-xl text-slate">
          Have a question about a product, or need help planning a surveillance
          setup? Reach out and our team will get back to you.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl card-border bg-surface p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rust/15 text-rust">
              <MapPin className="h-4.5 w-4.5" />
            </span>
            <h3 className="mt-3 font-medium text-cream">Visit our showroom</h3>
            <p className="mt-1 text-sm text-slate">New Baneshwor, Kathmandu, Nepal</p>
          </div>
          <div className="rounded-2xl card-border bg-surface p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rust/15 text-rust">
              <Phone className="h-4.5 w-4.5" />
            </span>
            <h3 className="mt-3 font-medium text-cream">Call us</h3>
            <p className="mt-1 text-sm text-slate">+977 1-4XXXXXX</p>
          </div>
          <div className="rounded-2xl card-border bg-surface p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rust/15 text-rust">
              <Mail className="h-4.5 w-4.5" />
            </span>
            <h3 className="mt-3 font-medium text-cream">Email us</h3>
            <p className="mt-1 text-sm text-slate">hello@vulturetech.com.np</p>
          </div>
          <div className="rounded-2xl card-border bg-surface p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rust/15 text-rust">
              <Clock className="h-4.5 w-4.5" />
            </span>
            <h3 className="mt-3 font-medium text-cream">Business hours</h3>
            <p className="mt-1 text-sm text-slate">Sun–Fri, 9:00 AM – 6:00 PM</p>
          </div>
        </div>

        <div className="rounded-2xl card-border bg-surface p-6 lg:col-span-2 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

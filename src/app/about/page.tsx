import { ShieldCheck, Users, Award, MapPin } from "lucide-react";

export const metadata = { title: "About Us | Vulture Tech Nepal" };

const STATS = [
  { label: "Years in Business", value: "8+" },
  { label: "Installations Completed", value: "500+" },
  { label: "Cities Served", value: "12+" },
  { label: "Support Response", value: "24/7" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Reliability First",
    desc: "We only stock equipment we would install in our own homes and businesses — genuine, tested, and backed by manufacturer warranty.",
  },
  {
    icon: Users,
    title: "People Over Products",
    desc: "Every recommendation starts with understanding what you actually need to protect, not what's easiest to sell.",
  },
  {
    icon: Award,
    title: "Certified Expertise",
    desc: "Our technicians are trained on the latest CCTV, NVR/DVR and network video systems from every major brand we carry.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-noise border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            About Us
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-bold text-cream sm:text-5xl">
            Security equipment you can actually trust
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-slate">
            Vulture Tech Nepal was founded to solve a simple problem: too many
            businesses were installing cheap, unreliable surveillance gear that
            failed exactly when it mattered most. We supply genuine CCTV
            cameras, storage and accessories — and stand behind every
            installation with real support.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-cream">{s.value}</p>
              <p className="mt-1 text-xs text-slate">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-cream">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl bg-void/40 p-6 card-border">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <v.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-cream">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-rust/15 text-rust">
          <MapPin className="h-5 w-5" />
        </span>
        <h2 className="mt-4 font-display text-2xl font-bold text-cream">
          Based in Kathmandu, serving all of Nepal
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate">
          From our showroom in New Baneshwor, we deliver and install across the
          Kathmandu valley and ship equipment nationwide.
        </p>
      </section>
    </div>
  );
}

# Vulture Tech Nepal

E-commerce site for CCTV cameras, memory cards, monitors, hard disks and
surveillance accessories, built with Next.js (App Router), Prisma + Postgres,
NextAuth (Auth.js), and optional Stripe checkout.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Prisma + Postgres** — product catalog, orders, users (works great with free hosts like [Neon](https://neon.tech))
- **NextAuth v5 (Auth.js)** — credentials-based signup/login, role-gated admin panel
- **Stripe** (optional) — test-mode card checkout; falls back to Cash on Delivery when not configured
- **Framer Motion** — hero and section animations
- **lucide-react** — icon set

## Getting Started

1. Create a free Postgres database at [neon.tech](https://neon.tech) (or any Postgres host) and grab its connection string(s).
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL` (and `DIRECT_URL`, `AUTH_SECRET`).
3. Run:

```bash
npm install
npx prisma db push      # create tables from the schema
npx prisma db seed      # seed 25 sample products (with photos) + admin/demo accounts
npm run dev
```

Visit http://localhost:3000.

## Environment Variables

Copy `.env.example` to `.env` and fill in as needed:

| Variable | Required? | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | Postgres connection string (pooled, if your host provides one) |
| `DIRECT_URL` | Yes | Direct (non-pooled) Postgres connection string, used for migrations |
| `AUTH_SECRET` | Yes | NextAuth session encryption secret. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `NEXTAUTH_URL` | Yes (prod) | Base URL of the deployed site |
| `STRIPE_SECRET_KEY` | No | Enables Stripe test-mode card checkout when set |
| `STRIPE_PUBLISHABLE_KEY` | No | Stripe publishable key (client-side, currently unused but reserved) |
| `STRIPE_WEBHOOK_SECRET` | No | Verifies Stripe webhook signatures at `/api/webhooks/stripe` |
| `NEXT_PUBLIC_BASE_URL` | Yes | Used to build Stripe success/cancel redirect URLs |

**Without Stripe keys**, checkout works fully via **Cash on Delivery** — orders
are still created and stored in the database normally.

**With Stripe keys** (get free test keys at https://dashboard.stripe.com/test/apikeys):
1. Set `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`.
2. For local webhook testing, run `stripe listen --forward-to localhost:3000/api/webhooks/stripe` and put the printed secret in `STRIPE_WEBHOOK_SECRET`.
3. The "Card Payment (Stripe)" option will automatically become available at checkout.

## Seeded Accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@vulturetech.com.np` | `Admin@123` |
| Customer | `demo@vulturetech.com.np` | `Demo@123` |

Sign in as the admin to access `/admin` (dashboard, product CRUD, order status management).

## Deploying to Production (Free) — Vercel + Neon

This combo is free for a project at this scale: Vercel's Hobby plan and Neon's
free Postgres tier both have generous limits with no credit card required.

1. **Create the production database** at [neon.tech](https://neon.tech) → New Project.
   Copy the **pooled connection string** (for `DATABASE_URL`) and the
   **direct connection string** (for `DIRECT_URL`) from the connection details panel.

2. **Push the schema and seed data** to that database from your machine:
   ```bash
   # put the Neon URLs in .env as DATABASE_URL / DIRECT_URL first
   npx prisma db push
   npx prisma db seed
   ```

3. **Push this project to GitHub** (a new, empty repo — public or private, either works).

4. **Import the repo into Vercel**: [vercel.com](https://vercel.com) → New Project → import your GitHub repo. Vercel auto-detects Next.js; no config changes needed.

5. **Add environment variables** in the Vercel project's Settings → Environment Variables (same names as `.env.example`):
   - `DATABASE_URL`, `DIRECT_URL` — the Neon strings from step 1
   - `AUTH_SECRET` — generate a **new** one for production (don't reuse your local dev secret)
   - `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL` — your Vercel URL, e.g. `https://your-project.vercel.app`
   - Stripe keys — optional, leave blank for Cash on Delivery only

6. **Deploy.** Vercel builds and hosts it for free. Every future `git push` auto-deploys.

## Project Structure

```
prisma/schema.prisma       Database models (User, Product, Order, OrderItem)
prisma/seed.ts             Seed script — sample products across 5 categories
src/app/                   Pages (App Router)
  admin/                   Admin dashboard, product & order management (role-gated)
  api/                     Route handlers (auth, checkout, admin CRUD, Stripe webhook)
  product/[slug]/          Product detail page
  shop/                    Catalog with category/search/sort filters
  checkout/, cart/         Cart + checkout flow
  account/                 Customer order history
src/components/            UI components (cart, layout, admin, shop)
src/lib/                   Prisma client, product queries, categories, formatting
src/auth.ts                NextAuth configuration
src/proxy.ts                Route protection for /admin and /account
```

## Notes

- Product photos come from free-license Pexels stock images (`imageUrl` field on `Product`); if a product has no `imageUrl`, it falls back to a stylized icon placeholder. Change a product's photo anytime from the admin panel's "Photo URL" field.
- Stock is decremented automatically on order placement; product deletion is blocked once a product has order history (to preserve order records) — set stock to 0 instead.

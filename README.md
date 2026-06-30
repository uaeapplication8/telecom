# Nexa Telecom — Premium Telecom Web Platform

A production-ready, full-stack telecom e-commerce platform built with
**Next.js 15 (App Router)**, **React 18**, **TypeScript**, **Tailwind CSS**,
**Firebase Authentication & Firestore**, and **Stripe Checkout**. Inspired by
premium UAE telecom experiences (e.g. e&), covering postpaid, prepaid, home
WiFi/fiber, device sales, cart/checkout, order tracking, and customer/admin
dashboards.

## ✨ Features

- Browse & search **Postpaid**, **Prepaid**, and **Home WiFi** plans
- **Compare plans** side by side (up to 3 at a time)
- **Devices** catalog with color/storage selection
- **Offers** page with live promotions
- Persistent **Cart** (localStorage) + **Stripe Checkout** payment flow
- **Firebase Authentication**: Email/Password + Phone **OTP**
- **Firestore**-backed orders with real-time status
- **Order Tracking** (public lookup by Order ID) with visual progress stepper
- **Customer Dashboard** (order history, account stats)
- **Admin Dashboard** (all orders, revenue stats, status management)
- **PDF Invoice generation** (client-side, via jsPDF)
- **WhatsApp Chat** floating button
- **Dark / Light mode** with system preference detection
- Fully **responsive**, accessible, and **Vercel-ready**

## 🧱 Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Framework    | Next.js 15 (App Router) + React 18   |
| Language     | TypeScript                          |
| Styling      | Tailwind CSS                        |
| Auth & DB    | Firebase Authentication + Firestore |
| Payments     | Stripe Checkout                     |
| Hosting      | Vercel                              |
| Icons        | lucide-react                        |
| PDF          | jsPDF                               |
| State        | React Context (Auth, Cart, Theme)   |

## 📂 Project Structure

```
nexa-telecom/
├── app/
│   ├── page.tsx                  # Home
│   ├── home-wifi/page.tsx
│   ├── postpaid/page.tsx
│   ├── prepaid/page.tsx
│   ├── devices/page.tsx
│   ├── offers/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── my-orders/page.tsx
│   ├── order-tracking/page.tsx
│   ├── order-tracking/[id]/page.tsx
│   ├── dashboard/page.tsx        # Customer dashboard
│   ├── admin/page.tsx            # Admin dashboard
│   ├── faq/page.tsx
│   ├── contact/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms/page.tsx
│   ├── api/checkout/route.ts     # Stripe Checkout session
│   ├── api/webhook/route.ts      # Stripe webhook
│   ├── api/orders/route.ts       # Create order in Firestore
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/ (Header, Footer)
│   ├── ui/ (Button, ThemeToggle, WhatsAppButton, SearchBar, OrderStatusBadge, ProtectedRoute)
│   └── plans/ (PlanCard, DeviceCard, PlanCategoryPage)
├── context/ (AuthContext, CartContext, ThemeContext)
├── hooks/ (useAuth, useCart)
├── firebase/ (config, auth, firestore)
├── lib/ (utils, stripe, invoice, data/plans, data/devices, data/offers)
├── types/index.ts
├── public/
├── firestore.rules
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_WHATSAPP_NUMBER=971500000000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set up Firebase

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** → Email/Password and Phone providers
3. Enable **Firestore Database** (production mode)
4. Deploy the included `firestore.rules` file:
   ```bash
   firebase deploy --only firestore:rules
   ```
5. To make a user an admin, manually set `role: "admin"` on their document in
   the `users` collection in the Firebase console.

### 4. Set up Stripe

1. Create an account at [stripe.com](https://stripe.com)
2. Grab your **Secret Key** and **Publishable Key** from the dashboard
3. Create a webhook endpoint pointing to `/api/webhook` and copy the signing
   secret into `STRIPE_WEBHOOK_SECRET`

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## ☁️ Deploying to Vercel

1. Push this project to a GitHub repository
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env.example` in the Vercel project
   settings
4. Deploy — Vercel automatically detects Next.js and builds the project

## 📝 Notes

- Mock plan/device/offer data lives in `lib/data/` — replace with Firestore
  collections or a CMS for a fully dynamic catalog.
- Email notifications (order confirmation, etc.) are designed to be wired
  into the `/api/orders` and `/api/webhook` routes using a provider such as
  Resend, SendGrid, or Firebase Extensions ("Trigger Email").
- Invoice PDFs are generated client-side; for production you may wish to
  generate and store them server-side (e.g. Firebase Cloud Functions) and
  persist the `invoiceUrl` field already present on the `Order` type.

## 📄 License

This project is provided as a starter/reference implementation and is free
to use and modify for your own telecom or e-commerce product.

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How do I activate a new SIM card?",
    a: "Once your order is delivered, visit the activation link sent via SMS and email, or call our 24/7 support line. Activation typically completes within 30 minutes.",
  },
  {
    q: "Can I switch my existing number to Nexa?",
    a: "Yes. Choose any postpaid or prepaid plan at checkout and select 'Port my number'. We'll handle the transfer with your current provider — it usually takes 24-48 hours.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit and debit cards via Stripe, including Visa, Mastercard, and American Express.",
  },
  {
    q: "How does Home WiFi installation work?",
    a: "After you order a Home Fiber plan, our technician will contact you to schedule a free installation visit, typically within 2-3 business days.",
  },
  {
    q: "Can I track my order?",
    a: "Yes, use the 'Order Tracking' page with your order ID, or check 'My Orders' from your dashboard if you're logged in.",
  },
  {
    q: "What is your return policy for devices?",
    a: "Devices can be returned within 7 days of delivery if unused and in original packaging. Refer to our Terms & Conditions for full details.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-bold">Frequently Asked Questions</h1>
      <p className="mt-3 text-slate dark:text-mist/60">
        Can't find what you're looking for? Reach out via our Contact page or WhatsApp.
      </p>

      <div className="mt-10 space-y-3">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-xl2 border border-ink/10 bg-white dark:border-white/10 dark:bg-midnight"
          >
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold"
            >
              {faq.q}
              <ChevronDown
                size={18}
                className={cn("shrink-0 transition-transform", open === idx && "rotate-180")}
              />
            </button>
            {open === idx && (
              <div className="px-6 pb-5 text-sm text-slate dark:text-mist/60">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // In production, this posts to an API route that sends an email via
    // a provider like Resend, SendGrid, or Firebase Cloud Functions.
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", message: "" });
    setSending(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold">Contact Us</h1>
      <p className="mt-3 max-w-xl text-slate dark:text-mist/60">
        Questions about a plan, an order, or a technical issue? We're here to help.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
          />
          <input
            required
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
          />
          <textarea
            required
            placeholder="How can we help?"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
          />
          <Button type="submit" disabled={sending}>
            {sending ? "Sending..." : "Send message"}
          </Button>
        </form>

        <div className="space-y-6">
          <ContactItem icon={Phone} label="Call us" value="800-NEXA (6392)" />
          <ContactItem icon={Mail} label="Email us" value="support@nexatelecom.ae" />
          <ContactItem icon={MapPin} label="Visit us" value="Nexa Tower, Sheikh Zayed Road, Dubai, UAE" />
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-xl2 border border-ink/10 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-midnight">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal/15 text-signal">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

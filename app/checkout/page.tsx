"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { formatAED, generateOrderId } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { Order, Address } from "@/types";
import toast from "react-hot-toast";

const EMIRATES = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<Address>({
    fullName: user?.displayName || "",
    phone: "",
    emirate: EMIRATES[0],
    city: "",
    street: "",
    building: "",
  });

  const grandTotal = total * 1.05;

  const handleChange = (field: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePay = async () => {
    if (!user) {
      toast.error("Please login to continue");
      router.push("/login");
      return;
    }
    if (!address.fullName || !address.phone || !address.street) {
      toast.error("Please fill in all required address fields");
      return;
    }

    setLoading(true);
    const orderId = generateOrderId();
    const order: Order = {
      id: orderId,
      userId: user.uid,
      items,
      total: grandTotal,
      status: "pending",
      createdAt: new Date().toISOString(),
      shippingAddress: address,
    };

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          orderId,
          customerEmail: user.email,
        }),
      });
      const data = await res.json();

      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Payment initialization failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-xl2 border border-ink/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-midnight">
            <h2 className="font-display text-lg font-bold">Delivery Address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={address.fullName} onChange={(v) => handleChange("fullName", v)} />
              <Field label="Phone number" value={address.phone} onChange={(v) => handleChange("phone", v)} />
              <div>
                <label className="text-xs font-semibold text-slate">Emirate</label>
                <select
                  value={address.emirate}
                  onChange={(e) => handleChange("emirate", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal dark:border-white/15"
                >
                  {EMIRATES.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
              <Field label="City" value={address.city} onChange={(v) => handleChange("city", v)} />
              <Field label="Street address" value={address.street} onChange={(v) => handleChange("street", v)} />
              <Field label="Building / Apt (optional)" value={address.building || ""} onChange={(v) => handleChange("building", v)} />
            </div>
          </div>
        </div>

        <div className="h-fit rounded-xl2 border border-ink/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-midnight">
          <h2 className="font-display text-lg font-bold">Order Summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between">
                <span>{i.name} x{i.quantity}</span>
                <span>{formatAED(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 font-display text-lg font-bold dark:border-white/10">
            <span>Total (incl. VAT)</span>
            <span>{formatAED(grandTotal)}</span>
          </div>
          <Button onClick={handlePay} disabled={loading} className="mt-6 w-full">
            {loading ? "Redirecting to payment..." : "Pay with Stripe"}
          </Button>
          <p className="mt-3 text-center text-xs text-slate dark:text-mist/50">
            Secured by Stripe. You will be redirected to complete payment.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal dark:border-white/15"
      />
    </div>
  );
}

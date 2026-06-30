"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function OrderTrackingLookupPage() {
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) router.push(`/order-tracking/${orderId.trim()}`);
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Track your order</h1>
      <p className="mt-2 text-slate dark:text-mist/60">
        Enter your order ID to check its current status.
      </p>
      <form onSubmit={handleTrack} className="mt-6 flex gap-2">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="e.g. NX-LX2P9Q-4821"
          className="flex-1 rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
        />
        <Button type="submit">Track</Button>
      </form>
    </div>
  );
}

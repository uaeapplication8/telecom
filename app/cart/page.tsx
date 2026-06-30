"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatAED } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
        <ShoppingBag size={48} className="text-slate" />
        <h1 className="mt-4 font-display text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-slate dark:text-mist/60">
          Browse our plans and devices to get started.
        </p>
        <Link href="/postpaid">
          <Button className="mt-6">Explore plans</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Your Cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-xl2 border border-ink/10 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-midnight"
            >
              <div>
                <p className="font-display font-bold">{item.name}</p>
                <p className="text-xs uppercase tracking-wide text-slate">{item.type}</p>
                <p className="mt-1 text-sm font-semibold text-signal">{formatAED(item.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-ink/15 px-2 py-1 dark:border-white/15">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded-full p-1 hover:bg-ink/5 dark:hover:bg-white/10"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-5 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-full p-1 hover:bg-ink/5 dark:hover:bg-white/10"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  className="rounded-full p-2 text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-xl2 border border-ink/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-midnight">
          <h2 className="font-display text-lg font-bold">Order Summary</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-slate dark:text-mist/60">Subtotal</span>
            <span className="font-semibold">{formatAED(total)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-slate dark:text-mist/60">VAT (5%)</span>
            <span className="font-semibold">{formatAED(total * 0.05)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 font-display text-lg font-bold dark:border-white/10">
            <span>Total</span>
            <span>{formatAED(total * 1.05)}</span>
          </div>
          <Button onClick={() => router.push("/checkout")} className="mt-6 w-full">
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

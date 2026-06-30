"use client";

import { Check } from "lucide-react";
import { Plan } from "@/types";
import { formatAED, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";

export default function PlanCard({ plan }: { plan: Plan }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: `plan-${plan.id}`,
      type: "plan",
      refId: plan.id,
      name: plan.name,
      price: plan.price,
      quantity: 1,
      meta: { category: plan.category },
    });
    toast.success(`${plan.name} added to cart`);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl2 border p-6 shadow-soft transition-transform hover:-translate-y-1",
        plan.popular
          ? "border-signal bg-white dark:bg-midnight"
          : "border-ink/10 bg-white/70 dark:border-white/10 dark:bg-midnight/60"
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-signal px-3 py-1 text-xs font-bold text-ink">
          MOST POPULAR
        </span>
      )}
      <h3 className="font-display text-xl font-bold">{plan.name}</h3>
      <p className="mt-1 text-sm text-slate dark:text-mist/60">{plan.tagline}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-3xl font-bold">{formatAED(plan.price)}</span>
        <span className="text-sm text-slate dark:text-mist/60">/month</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-mist p-3 text-center text-xs dark:bg-ink/40">
        <div>
          <p className="font-bold">{plan.data}</p>
          <p className="text-slate dark:text-mist/50">Data</p>
        </div>
        <div>
          <p className="font-bold">{plan.minutes}</p>
          <p className="text-slate dark:text-mist/50">Minutes</p>
        </div>
        <div>
          <p className="font-bold">{plan.speed || plan.sms}</p>
          <p className="text-slate dark:text-mist/50">{plan.speed ? "Speed" : "SMS"}</p>
        </div>
      </div>

      <ul className="mt-5 flex-1 space-y-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check size={16} className="mt-0.5 shrink-0 text-signal" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button onClick={handleAdd} className="mt-6 w-full" variant={plan.popular ? "primary" : "outline"}>
        Choose plan
      </Button>
    </div>
  );
}

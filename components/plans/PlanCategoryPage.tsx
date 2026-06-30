"use client";

import { useMemo, useState } from "react";
import { Plan, PlanCategory } from "@/types";
import PlanCard from "@/components/plans/PlanCard";
import SearchBar from "@/components/ui/SearchBar";
import { Scale } from "lucide-react";
import { cn, formatAED } from "@/lib/utils";

export default function PlanCategoryPage({
  title,
  subtitle,
  plans,
}: {
  title: string;
  subtitle: string;
  plans: Plan[];
}) {
  const [query, setQuery] = useState("");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return plans;
    return plans.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.data.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        String(p.price).includes(q)
    );
  }, [query, plans]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const compared = plans.filter((p) => compareIds.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold">{title}</h1>
        <p className="mt-3 text-slate dark:text-mist/60">{subtitle}</p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="sm:max-w-md sm:flex-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        {compareIds.length > 0 && (
          <button
            onClick={() => setShowCompare(true)}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-mist dark:bg-white dark:text-ink"
          >
            <Scale size={16} /> Compare ({compareIds.length})
          </button>
        )}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((plan) => (
          <div key={plan.id} className="relative">
            <label className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold shadow-soft dark:bg-ink/80">
              <input
                type="checkbox"
                checked={compareIds.includes(plan.id)}
                onChange={() => toggleCompare(plan.id)}
                className="accent-signal"
              />
              Compare
            </label>
            <PlanCard plan={plan} />
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-slate dark:text-mist/60">
            No plans match "{query}". Try a different search.
          </p>
        )}
      </div>

      {showCompare && compared.length > 0 && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 p-4 sm:items-center">
          <div className="max-h-[85vh] w-full max-w-4xl overflow-auto rounded-xl2 bg-white p-6 dark:bg-midnight">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">Plan comparison</h3>
              <button
                onClick={() => setShowCompare(false)}
                className="rounded-full px-3 py-1 text-sm hover:bg-ink/5 dark:hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-ink/10 dark:border-white/10">
                    <th className="py-2 pr-4 font-semibold text-slate">Feature</th>
                    {compared.map((p) => (
                      <th key={p.id} className="py-2 pr-4 font-display font-bold">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Price", get: (p: Plan) => formatAED(p.price) + "/mo" },
                    { label: "Data", get: (p: Plan) => p.data },
                    { label: "Minutes", get: (p: Plan) => p.minutes },
                    { label: "Speed / SMS", get: (p: Plan) => p.speed || p.sms },
                  ].map((row, idx) => (
                    <tr key={idx} className={cn("border-b border-ink/5 dark:border-white/5")}>
                      <td className="py-2 pr-4 font-medium text-slate">{row.label}</td>
                      {compared.map((p) => (
                        <td key={p.id} className="py-2 pr-4">{row.get(p)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

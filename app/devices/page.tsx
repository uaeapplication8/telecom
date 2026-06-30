"use client";

import { useState } from "react";
import Image from "next/image";
import { devices } from "@/lib/data/devices";
import { formatAED } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function DevicesPage() {
  const { addItem } = useCart();
  const [selections, setSelections] = useState<Record<string, { color: string; storage: string }>>(
    Object.fromEntries(devices.map((d) => [d.id, { color: d.colors[0], storage: d.storageOptions[0] }]))
  );

  const handleAdd = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId)!;
    const sel = selections[deviceId];
    addItem({
      id: `device-${deviceId}-${sel.color}-${sel.storage}`,
      type: "device",
      refId: deviceId,
      name: `${device.name} (${sel.storage}, ${sel.color})`,
      price: device.price,
      quantity: 1,
      meta: { color: sel.color, storage: sel.storage },
    });
    toast.success(`${device.name} added to cart`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold">Devices</h1>
      <p className="mt-3 max-w-2xl text-slate dark:text-mist/60">
        The latest smartphones and home networking devices, with flexible monthly installments when bundled with a plan.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {devices.map((device) => (
          <div
            key={device.id}
            id={device.id}
            className="grid gap-6 rounded-xl2 border border-ink/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-midnight sm:grid-cols-2"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-mist dark:bg-ink/40">
              <Image src={device.image} alt={device.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-wide text-signal">{device.brand}</p>
              <h3 className="mt-1 font-display text-xl font-bold">{device.name}</h3>
              <p className="mt-2 font-display text-2xl font-bold">{formatAED(device.price)}</p>
              <p className="text-sm text-slate dark:text-mist/60">or from {formatAED(device.monthlyFrom)}/mo</p>

              <div className="mt-4">
                <p className="text-xs font-semibold text-slate">Storage</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {device.storageOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() =>
                        setSelections((prev) => ({ ...prev, [device.id]: { ...prev[device.id], storage: s } }))
                      }
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        selections[device.id].storage === s
                          ? "border-signal bg-signal/15 text-signal"
                          : "border-ink/15 dark:border-white/15"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs font-semibold text-slate">Color</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {device.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() =>
                        setSelections((prev) => ({ ...prev, [device.id]: { ...prev[device.id], color: c } }))
                      }
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        selections[device.id].color === c
                          ? "border-signal bg-signal/15 text-signal"
                          : "border-ink/15 dark:border-white/15"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="mt-4 space-y-1 text-xs text-slate dark:text-mist/50">
                {device.specs.map((s) => (
                  <li key={s.label}>
                    <span className="font-semibold">{s.label}:</span> {s.value}
                  </li>
                ))}
              </ul>

              <Button onClick={() => handleAdd(device.id)} className="mt-5">
                Add to cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

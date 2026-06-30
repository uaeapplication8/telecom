"use client";

import Image from "next/image";
import Link from "next/link";
import { Device } from "@/types";
import { formatAED } from "@/lib/utils";

export default function DeviceCard({ device }: { device: Device }) {
  return (
    <Link
      href={`/devices#${device.id}`}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-ink/10 bg-white shadow-soft transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-midnight"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-mist dark:bg-ink/40">
        <Image
          src={device.image}
          alt={device.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-signal">{device.brand}</p>
        <h3 className="mt-1 font-display text-lg font-bold">{device.name}</h3>
        <p className="mt-2 text-sm text-slate dark:text-mist/60">
          From {formatAED(device.monthlyFrom)}/mo or {formatAED(device.price)}
        </p>
      </div>
    </Link>
  );
}

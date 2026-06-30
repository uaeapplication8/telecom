import Image from "next/image";
import { offers } from "@/lib/data/offers";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Offers | Nexa Telecom" };

export default function OffersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold">Latest Offers</h1>
      <p className="mt-3 max-w-2xl text-slate dark:text-mist/60">
        Limited-time deals across postpaid, prepaid, home WiFi, and devices.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="overflow-hidden rounded-xl2 border border-ink/10 bg-white shadow-soft dark:border-white/10 dark:bg-midnight"
          >
            <div className="relative h-48 w-full">
              <Image src={offer.image} alt={offer.title} fill className="object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-amber px-3 py-1 text-xs font-bold text-ink">
                {offer.discount}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-bold">{offer.title}</h3>
              <p className="mt-2 text-sm text-slate dark:text-mist/60">{offer.description}</p>
              <p className="mt-4 text-xs font-semibold text-signal">
                Valid till {formatDate(offer.validTill)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Wifi, Smartphone, Signal, ShieldCheck } from "lucide-react";
import { plans } from "@/lib/data/plans";
import { offers } from "@/lib/data/offers";
import PlanCard from "@/components/plans/PlanCard";

export default function HomePage() {
  const popularPlans = plans.filter((p) => p.popular);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-mist">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-signal blur-3xl" />
          <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-amber blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <div className="bar-divider mb-6">
              <span style={{ height: "30%" }}></span>
              <span style={{ height: "55%" }}></span>
              <span style={{ height: "75%" }}></span>
              <span style={{ height: "100%" }}></span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Full bars, everywhere
              <br />
              <span className="text-signal">you live and work.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-mist/70">
              Nexa brings together 5G postpaid, flexible prepaid, gigabit
              home fiber, and the newest devices — under one fast, fair network.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/postpaid"
                className="inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 font-semibold text-ink transition-transform hover:scale-105"
              >
                Explore plans <ArrowRight size={18} />
              </Link>
              <Link
                href="/home-wifi"
                className="inline-flex items-center gap-2 rounded-full border border-mist/30 px-7 py-3.5 font-semibold transition-colors hover:bg-mist/10"
              >
                Get Home WiFi
              </Link>
            </div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-mist/10 pt-6">
              <div>
                <p className="font-display text-2xl font-bold text-signal">4.2M+</p>
                <p className="text-xs text-mist/60">Connections nationwide</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-signal">99.9%</p>
                <p className="text-xs text-mist/60">Network uptime</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-signal">24/7</p>
                <p className="text-xs text-mist/60">Customer support</p>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative h-full w-full overflow-hidden rounded-xl2">
              <Image
                src="https://images.unsplash.com/photo-1551703599-31aff42a3b0d?w=1000"
                alt="Connected city skyline at night representing Nexa's 5G network"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category quick links */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { href: "/postpaid", icon: Signal, label: "Postpaid Plans" },
            { href: "/prepaid", icon: Smartphone, label: "Prepaid SIM" },
            { href: "/home-wifi", icon: Wifi, label: "Home WiFi" },
            { href: "/devices", icon: ShieldCheck, label: "Devices" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center gap-3 rounded-xl2 border border-ink/10 bg-white p-6 text-center shadow-soft transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-midnight"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-signal/15 text-signal">
                <Icon size={22} />
              </span>
              <span className="font-semibold">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular plans */}
      <section className="bg-white py-16 dark:bg-midnight/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-wide text-signal">
                Best sellers
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold">Our most popular plans</h2>
            </div>
            <Link href="/postpaid" className="hidden text-sm font-semibold text-signal sm:flex items-center gap-1">
              Compare all plans <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {popularPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Offers strip */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold">Live offers</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative overflow-hidden rounded-xl2 border border-ink/10 shadow-soft dark:border-white/10"
            >
              <div className="relative h-40 w-full">
                <Image src={offer.image} alt={offer.title} fill className="object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-amber px-3 py-1 text-xs font-bold text-ink">
                  {offer.discount}
                </span>
              </div>
              <div className="bg-white p-5 dark:bg-midnight">
                <h3 className="font-display font-bold">{offer.title}</h3>
                <p className="mt-1 text-sm text-slate dark:text-mist/60">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

const columns = [
  {
    title: "Plans",
    links: [
      { href: "/postpaid", label: "Postpaid" },
      { href: "/prepaid", label: "Prepaid" },
      { href: "/home-wifi", label: "Home WiFi" },
      { href: "/devices", label: "Devices" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/my-orders", label: "My Orders" },
      { href: "/login", label: "Login" },
      { href: "/register", label: "Register" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact Us" },
      { href: "/order-tracking", label: "Track Order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white dark:border-white/10 dark:bg-midnight">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-display text-xl font-bold">
              <span className="signal-bars text-signal">
                <span></span><span></span><span></span><span></span>
              </span>
              Nexa
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate dark:text-mist/60">
              UAE's smartest network. 5G postpaid, prepaid, fiber home WiFi
              and the latest devices — all in one place.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-slate dark:text-mist/50">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm hover:text-signal">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 text-xs text-slate dark:border-white/10 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Nexa Telecom LLC. All rights reserved.</p>
          <p>Made for the UAE 🇦🇪</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User as UserIcon, Search } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/home-wifi", label: "Home WiFi" },
  { href: "/postpaid", label: "Postpaid" },
  { href: "/prepaid", label: "Prepaid" },
  { href: "/devices", label: "Devices" },
  { href: "/offers", label: "Offers" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass-card border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <span className="signal-bars text-signal">
            <span></span><span></span><span></span><span></span>
          </span>
          Nexa
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-signal",
                pathname === link.href ? "text-signal" : "text-ink/80 dark:text-mist/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/postpaid"
            aria-label="Search plans"
            className="hidden rounded-full p-2 hover:bg-ink/5 dark:hover:bg-white/10 sm:block"
          >
            <Search size={20} />
          </Link>
          <ThemeToggle />
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative rounded-full p-2 hover:bg-ink/5 dark:hover:bg-white/10"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-signal text-[10px] font-bold text-ink">
                {count}
              </span>
            )}
          </Link>
          <Link
            href={user ? "/dashboard" : "/login"}
            aria-label="Account"
            className="hidden rounded-full p-2 hover:bg-ink/5 dark:hover:bg-white/10 sm:block"
          >
            <UserIcon size={20} />
          </Link>
          <button
            className="rounded-full p-2 hover:bg-ink/5 dark:hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-mist px-4 py-4 dark:border-white/10 dark:bg-ink lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link href={user ? "/dashboard" : "/login"} onClick={() => setOpen(false)} className="text-base font-medium">
              {user ? "My Dashboard" : "Login / Register"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

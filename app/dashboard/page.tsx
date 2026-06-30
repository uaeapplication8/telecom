"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, User, Headset, LogOut } from "lucide-react";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { getOrdersByUser } from "@/firebase/firestore";
import { logout } from "@/firebase/auth";
import { Order } from "@/types";
import { formatAED, formatDate } from "@/lib/utils";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import { useRouter } from "next/navigation";

function DashboardContent() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;
    getOrdersByUser(user.uid).then(setOrders);
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold">
            Hi, {profile?.displayName || user?.displayName || "there"} 👋
          </h1>
          <p className="mt-1 text-slate dark:text-mist/60">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold hover:bg-ink/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <StatCard icon={Package} label="Total Orders" value={String(orders.length)} />
        <StatCard
          icon={Headset}
          label="Active Plans"
          value={String(orders.filter((o) => o.status !== "cancelled").length)}
        />
        <StatCard
          icon={User}
          label="Account Status"
          value={profile?.role === "admin" ? "Admin" : "Active Customer"}
        />
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Recent Orders</h2>
          <Link href="/my-orders" className="text-sm font-semibold text-signal">
            View all
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {orders.slice(0, 5).map((order) => (
            <Link
              key={order.id}
              href={`/order-tracking/${order.id}`}
              className="flex items-center justify-between rounded-xl2 border border-ink/10 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-midnight"
            >
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-xs text-slate dark:text-mist/50">{formatDate(order.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{formatAED(order.total)}</span>
                <OrderStatusBadge status={order.status} />
              </div>
            </Link>
          ))}
          {orders.length === 0 && (
            <p className="text-sm text-slate dark:text-mist/60">No orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl2 border border-ink/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-midnight">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-signal/15 text-signal">
        <Icon size={22} />
      </span>
      <div>
        <p className="font-display text-xl font-bold">{value}</p>
        <p className="text-xs text-slate dark:text-mist/50">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

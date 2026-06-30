"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { getOrdersByUser } from "@/firebase/firestore";
import { Order } from "@/types";
import { formatAED, formatDate } from "@/lib/utils";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";

function MyOrdersContent() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getOrdersByUser(user.uid)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">My Orders</h1>

      {loading ? (
        <p className="mt-8 text-slate">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="mt-8 text-slate dark:text-mist/60">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/order-tracking/${order.id}`}
              className="flex flex-col gap-2 rounded-xl2 border border-ink/10 bg-white p-5 shadow-soft transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-midnight sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-display font-bold">{order.id}</p>
                <p className="text-xs text-slate dark:text-mist/50">
                  {formatDate(order.createdAt)} &middot; {order.items.length} item(s)
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">{formatAED(order.total)}</span>
                <OrderStatusBadge status={order.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyOrdersPage() {
  return (
    <ProtectedRoute>
      <MyOrdersContent />
    </ProtectedRoute>
  );
}

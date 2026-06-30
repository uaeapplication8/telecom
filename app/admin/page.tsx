"use client";

import { useEffect, useMemo, useState } from "react";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import { getAllOrders, updateOrderStatus } from "@/firebase/firestore";
import { Order, OrderStatus } from "@/types";
import { formatAED, formatDate } from "@/lib/utils";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import toast from "react-hot-toast";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

function AdminContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    return {
      totalOrders: orders.length,
      totalRevenue,
      pending: orders.filter((o) => o.status === "pending").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
    };
  }, [orders]);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
      toast.success(`Order ${orderId} updated to ${status}`);
    } catch {
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Orders" value={String(stats.totalOrders)} />
        <Stat label="Total Revenue" value={formatAED(stats.totalRevenue)} />
        <Stat label="Pending" value={String(stats.pending)} />
        <Stat label="Delivered" value={String(stats.delivered)} />
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        <FilterChip label="All" active={filter === "all"} onClick={() => setFilter("all")} />
        {STATUS_OPTIONS.map((s) => (
          <FilterChip key={s} label={s} active={filter === s} onClick={() => setFilter(s)} />
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl2 border border-ink/10 bg-white shadow-soft dark:border-white/10 dark:bg-midnight">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-ink/10 text-xs uppercase text-slate dark:border-white/10">
            <tr>
              <th className="px-5 py-3">Order ID</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Items</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Update</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-slate">
                  Loading orders...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-slate">
                  No orders found.
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id} className="border-b border-ink/5 dark:border-white/5">
                  <td className="px-5 py-3 font-semibold">{order.id}</td>
                  <td className="px-5 py-3">{formatDate(order.createdAt)}</td>
                  <td className="px-5 py-3">{order.items.length}</td>
                  <td className="px-5 py-3">{formatAED(order.total)}</td>
                  <td className="px-5 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as OrderStatus)
                      }
                      className="rounded-lg border border-ink/15 bg-transparent px-2 py-1.5 text-xs outline-none dark:border-white/15"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl2 border border-ink/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-midnight">
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-slate dark:text-mist/50">{label}</p>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-semibold capitalize ${
        active
          ? "border-signal bg-signal/15 text-signal"
          : "border-ink/15 dark:border-white/15"
      }`}
    >
      {label}
    </button>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminContent />
    </ProtectedRoute>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Check } from "lucide-react";
import { getOrderById } from "@/firebase/firestore";
import { Order, OrderStatus } from "@/types";
import { formatAED, formatDate, cn } from "@/lib/utils";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import { generateInvoicePdf } from "@/lib/invoice";
import Button from "@/components/ui/Button";
import { Download } from "lucide-react";

const STEPS: OrderStatus[] = ["pending", "confirmed", "processing", "shipped", "delivered"];

export default function OrderTrackingDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getOrderById(id)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="mx-auto max-w-3xl px-4 py-20 text-center text-slate">Looking up order...</p>;
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Order not found</h1>
        <p className="mt-2 text-slate dark:text-mist/60">
          We couldn't find an order with ID "{id}". Please check and try again.
        </p>
      </div>
    );
  }

  const currentStepIndex = STEPS.indexOf(order.status);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Order {order.id}</h1>
        <OrderStatusBadge status={order.status} />
      </div>
      <p className="mt-1 text-sm text-slate dark:text-mist/60">Placed on {formatDate(order.createdAt)}</p>
      <Button
        variant="outline"
        size="sm"
        onClick={() => generateInvoicePdf(order)}
        className="mt-4"
      >
        <Download size={14} /> Download Invoice
      </Button>

      {order.status !== "cancelled" && (
        <div className="mt-10 flex items-center justify-between">
          {STEPS.map((step, idx) => (
            <div key={step} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    idx <= currentStepIndex ? "bg-signal text-ink" : "bg-ink/10 text-slate dark:bg-white/10"
                  )}
                >
                  {idx <= currentStepIndex ? <Check size={14} /> : idx + 1}
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1",
                      idx < currentStepIndex ? "bg-signal" : "bg-ink/10 dark:bg-white/10"
                    )}
                  />
                )}
              </div>
              <p className="mt-2 text-center text-[10px] capitalize text-slate dark:text-mist/50">{step}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-xl2 border border-ink/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-midnight">
        <h2 className="font-display font-bold">Items</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {order.items.map((i) => (
            <li key={i.id} className="flex justify-between">
              <span>{i.name} x{i.quantity}</span>
              <span>{formatAED(i.price * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 font-display font-bold dark:border-white/10">
          <span>Total</span>
          <span>{formatAED(order.total)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-xl2 border border-ink/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-midnight">
        <h2 className="font-display font-bold">Delivery address</h2>
        <p className="mt-2 text-sm text-slate dark:text-mist/60">
          {order.shippingAddress.fullName}, {order.shippingAddress.street}
          {order.shippingAddress.building ? `, ${order.shippingAddress.building}` : ""},{" "}
          {order.shippingAddress.city}, {order.shippingAddress.emirate}
          <br />
          {order.shippingAddress.phone}
        </p>
      </div>
    </div>
  );
}

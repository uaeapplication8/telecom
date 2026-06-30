import { OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

const styles: Record<OrderStatus, string> = {
  pending: "bg-amber/20 text-amber",
  confirmed: "bg-signal/20 text-signal",
  processing: "bg-blue-500/20 text-blue-500",
  shipped: "bg-purple-500/20 text-purple-500",
  delivered: "bg-green-500/20 text-green-600",
  cancelled: "bg-red-500/20 text-red-500",
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-bold capitalize",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}

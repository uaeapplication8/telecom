import type { Metadata } from "next";
import PlanCategoryPage from "@/components/plans/PlanCategoryPage";
import { getPlansByCategory } from "@/lib/data/plans";

export const metadata: Metadata = { title: "Home WiFi Plans | Nexa Telecom" };

export default function HomeWifiPage() {
  return (
    <PlanCategoryPage
      title="Home WiFi & Fiber Plans"
      subtitle="Gigabit fiber, free mesh routers, and free installation. Built for streaming, gaming, and work-from-home."
      plans={getPlansByCategory("home-wifi")}
    />
  );
}

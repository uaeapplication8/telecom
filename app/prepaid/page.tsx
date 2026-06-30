import type { Metadata } from "next";
import PlanCategoryPage from "@/components/plans/PlanCategoryPage";
import { getPlansByCategory } from "@/lib/data/plans";

export const metadata: Metadata = { title: "Prepaid Plans | Nexa Telecom" };

export default function PrepaidPage() {
  return (
    <PlanCategoryPage
      title="Prepaid SIM Plans"
      subtitle="No contracts, no surprises. Top up and go — perfect for residents and visitors alike."
      plans={getPlansByCategory("prepaid")}
    />
  );
}

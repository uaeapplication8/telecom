import type { Metadata } from "next";
import PlanCategoryPage from "@/components/plans/PlanCategoryPage";
import { getPlansByCategory } from "@/lib/data/plans";

export const metadata: Metadata = { title: "Postpaid Plans | Nexa Telecom" };

export default function PostpaidPage() {
  return (
    <PlanCategoryPage
      title="Postpaid Plans"
      subtitle="Unlimited calls, generous data, and 5G speeds. Pick a plan that fits your lifestyle and pay monthly."
      plans={getPlansByCategory("postpaid")}
    />
  );
}

"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: ReactNode;
  adminOnly?: boolean;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (adminOnly && profile?.role !== "admin") {
        router.replace("/dashboard");
      }
    }
  }, [user, profile, loading, adminOnly, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="signal-bars h-8 animate-pulse text-signal">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

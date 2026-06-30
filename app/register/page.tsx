"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerWithEmail } from "@/firebase/auth";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerWithEmail(form.email, form.password, form.name, form.phone);
      toast.success("Account created! Welcome to Nexa.");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Create your account</h1>
      <p className="mt-2 text-slate dark:text-mist/60">
        Join Nexa to track orders, manage plans, and get exclusive offers.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          required
          placeholder="Full name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
        />
        <input
          required
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
        />
        <input
          placeholder="Phone number (+971...)"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
        />
        <input
          required
          type="password"
          placeholder="Password (min. 6 characters)"
          minLength={6}
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate dark:text-mist/60">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-signal">
          Login
        </Link>
      </p>
    </div>
  );
}

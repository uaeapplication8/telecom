"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginWithEmail, sendOtp, verifyOtp } from "@/firebase/auth";
import { ConfirmationResult } from "firebase/auth";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phone) return toast.error("Enter a phone number");
    setLoading(true);
    try {
      const confirmationResult = await sendOtp(phone);
      setConfirmation(confirmationResult);
      toast.success("OTP sent via SMS");
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmation) return;
    setLoading(true);
    try {
      await verifyOtp(confirmation, otpCode);
      toast.success("Phone verified!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-slate dark:text-mist/60">Login to manage your plans and orders.</p>

      <div className="mt-6 flex gap-2 rounded-full bg-mist p-1 dark:bg-ink/40">
        <button
          onClick={() => setMode("email")}
          className={`flex-1 rounded-full py-2 text-sm font-semibold ${mode === "email" ? "bg-white shadow dark:bg-midnight" : ""}`}
        >
          Email
        </button>
        <button
          onClick={() => setMode("otp")}
          className={`flex-1 rounded-full py-2 text-sm font-semibold ${mode === "otp" ? "bg-white shadow dark:bg-midnight" : ""}`}
        >
          Phone OTP
        </button>
      </div>

      {mode === "email" ? (
        <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      ) : (
        <div className="mt-6 space-y-4">
          <input
            type="tel"
            placeholder="+971 5X XXX XXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
          />
          {!confirmation ? (
            <Button onClick={handleSendOtp} disabled={loading} className="w-full">
              Send OTP
            </Button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-signal dark:border-white/15"
              />
              <Button onClick={handleVerifyOtp} disabled={loading} className="w-full">
                Verify & Login
              </Button>
            </>
          )}
          <div id="recaptcha-container" />
        </div>
      )}

      <p className="mt-6 text-center text-sm text-slate dark:text-mist/60">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold text-signal">
          Register
        </Link>
      </p>
    </div>
  );
}

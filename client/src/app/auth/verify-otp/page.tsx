"use client";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/InputBox";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/email/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      toast.success("OTP verified! Redirecting...");
      setTimeout(() => router.push("/"), 1500);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  function obfuscateEmail(email: string) {
    const [user, domain] = email.split("@");
    return `${user.slice(0, 4)}****@${domain}`;
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4">
      <div className="max-w-md w-full bg-white/10 rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
        <p className="text-gray-400 text-sm text-center">
          OTP sent to your email {" "}
          <span className="text-purple-300 font-bold">{obfuscateEmail(email)}</span>
        </p>

        <form onSubmit={handleVerifyOtp} className=" flex text-sm flex-col justify-center items-center">
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            />

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full"
          
            text={loading ? "Verifying..." : "Verify OTP"}
          />
        </form>
      </div>
    </div>
  );
}

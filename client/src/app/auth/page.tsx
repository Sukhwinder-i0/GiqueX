"use client";

import { useState } from "react";
import Input from "@/components/ui/InputBox";
import { Button } from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { handleEmailLogin, handleEmailSignup, handleGoogleLogin } from "@/lib/handleAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuthStore()

  const validateInputs = () => {
    if (!email?.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!password?.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (!login && !name?.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSignupClick = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const result = await handleEmailSignup(name, email, password);
      if (result?.success) {
        toast.success("OTP sent to email");
        router.push("/auth/verify-otp?email=" + encodeURIComponent(email));
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const result = await handleEmailLogin(email, password);
      if (result?.success) {
        toast.success("Login successful");
        if(user?.role === "seller") router.push("./seller/dashboard")
        else router.push("/");
        setUser(result.data.user); 
        console.log(result.data.user)
      } else {
        toast.error(result?.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginClick = async () => {
    setLoading(true);
    try {
      await handleGoogleLogin();
    } catch (err: any) {
      toast.error(err.message || "Google login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl text-white shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-2">
          {login ? "Welcome back!" : "Start with GiqueX"}
        </h2>
        <p className="text-sm text-center text-gray-200 mb-6">
          {login
            ? "continue your journey, gigs, and daily grind."
            : "Hire experts or offer your talent "}
        </p>

        <div className="space-y-4">
          {!login && (
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {login && (
          <div className="flex justify-end text-xs mt-2 text-gray-200">
            <button className="hover:underline" disabled={loading}>
              Forgot password?
            </button>
          </div>
        )}

        <Button
          text={loading ? "Processing..." : login ? "Sign In" : "Sign Up"}
          variant="login"
          onClick={login ? handleLoginClick : handleSignupClick}
        />

        <div className="flex items-center my-4 gap-2 text-gray-300 text-sm">
          <div className="flex-grow h-px bg-gray-500" />
          OR
          <div className="flex-grow h-px bg-gray-500" />
        </div>

        <Button
          text="Continue with Google"
          variant="google"
          startIcon={<FcGoogle />}
          onClick={handleGoogleLoginClick}
        />

        <p className="text-sm text-center text-gray-300 mt-4">
          {login ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => !loading && setLogin(!login)}
            className={`text-blue-400 hover:underline ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            {login ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}
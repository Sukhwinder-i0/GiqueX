'use client'

import { useState } from "react";
import Input from "@/components/ui/InputBox";
import { Button } from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";

export default function Page () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl text-white shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-2">
          {login? 'Welcome back!' : 'Start with GiqueX'}
        </h2>
        <p className="text-sm text-center text-gray-200 mb-6">
          {login
            ? "continue your journey, gigs, and daily grind."
            : "Hire experts or offer your talent "}
        </p>

        <div className="space-y-4">

          {login ? null : 
            <Input 
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
             />
          }

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

        { login && <div className="flex justify-end text-xs mt-2 text-gray-200">
          <button className="hover:underline">Forgot password?</button>
        </div> }

        <Button 
          text={login ? "Log In" : 'Sign Up'} 
          variant="login" 
          // onClick={() => handleEmailLogin(email, password)}
        />

        <div className="flex items-center my-4 gap-2 text-gray-300 text-sm">
          <div className="flex-grow h-px bg-gray-500" />
          OR
          <div className="flex-grow h-px bg-gray-500" />
        </div>

        <Button
          text="continue with google"
          variant="google"
          startIcon={<FcGoogle />}
          // onClick={handleGoogleLogin}
        />

        <p className="text-sm text-center text-gray-300 mt-4">
          {login ? 'Don’t have an account?' : 'Already have an account?'} {" "}
          <span
            onClick={() => setLogin(!login)}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            {login ? 'sign-up' : 'sign-in'}
          </span>
        </p>
      </div>
    </div>
  );
}

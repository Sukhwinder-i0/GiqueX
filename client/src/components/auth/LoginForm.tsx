'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {TextInput} from './Login';
import GoogleButton from './GoogleButton';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      router.push('/dashboard');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center mb-2">Welcome back!</h2>
      <p className="text-sm text-center text-gray-200 mb-6">
        Sign in to access your journey, gigs, and daily grind.
      </p>

      <div className="space-y-4">
        <TextInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-end text-xs mt-2 text-gray-200">
        <button className="hover:underline">Forgot password?</button>
      </div>

      <button
        onClick={handleLogin}
        className="w-full text-sm mt-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white font-semibold"
      >
        Log In
      </button>

      <div className="flex items-center my-4 gap-2 text-gray-300 text-sm">
        <div className="flex-grow h-px bg-gray-500" />
        OR
        <div className="flex-grow h-px bg-gray-500" />
      </div>

      <GoogleButton />

      <p className="text-sm text-center text-gray-300 mt-4">
        Don’t have an account?{' '}
        <span
          onClick={() => router.push('/auth/signup')}
          className="text-blue-400 hover:underline cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </>
  );
};

export default LoginForm;

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import AuthInput from '@/components/auth/AuthInput';
import AuthLayout from '@/components/auth/AuthLayout';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      router.push('/dashboard');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-center mb-2">Join us!</h2>
      <p className="text-sm text-center text-gray-200 mb-6">
        Create an account to explore and start your journey.
      </p>

      <div className="space-y-4">
        <AuthInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <AuthInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <AuthInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />
      </div>

      <button
        onClick={handleSignup}
        className="w-full text-sm mt-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white font-semibold"
      >
        Sign Up
      </button>

      <p className="text-sm text-center text-gray-300 mt-4">
        Already have an account?{' '}
        <span
          onClick={() => router.push('/login')}
          className="text-blue-400 hover:underline cursor-pointer"
        >
          Log In
        </span>
      </p>
    </AuthLayout>
  );
}

// pages/verify.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState(router.query.email as string || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      setMessage('OTP verified! Redirecting...');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
        <p className="text-gray-400 text-sm text-center">Enter the OTP sent to your email</p>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input
            type="text"
            value={email}
            placeholder="Enter your email"
            disabled
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
          />

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-400 text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
}

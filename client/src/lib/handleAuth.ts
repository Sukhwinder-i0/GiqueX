// lib/handleAuth.ts
export const handleGoogleLogin = async () => {
  try {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  } catch (err) {
    console.error("Google login failed", err);
  }
};

export const handleEmailLogin = async (email: string, password: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Email login failed", err);
    throw err;
  }
};

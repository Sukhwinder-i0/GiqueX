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


export const handleEmailSignup = async (name: string, email: string, password: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || 'Signup failed');
    }

    return data; 
  } catch (err) {
    console.error('Email signup failed:', err);
    throw err;
  }
};

export const handleOtpVerification = async (email: string, otp: string) => {
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
      throw new Error(data?.message || 'OTP verification failed');
    }

    return data;
  } catch (err) {
    console.error('OTP verification failed:', err);
    throw err;
  }
};

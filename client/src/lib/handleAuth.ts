// lib/handleAuth.ts
export const handleGoogleLogin = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      throw new Error("API base URL not configured");
    }
    window.location.href = `${baseUrl}/auth/google`;
  } catch (err) {
    console.error("Google login failed", err);
    throw err;
  }
};

export const handleEmailLogin = async (email: string, password: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      throw new Error("API base URL not configured");
    }

    const res = await fetch(`${baseUrl}/auth/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Include cookies if using them
    });

    const data = await res.json();

    if (!res.ok) {
      // Handle different error status codes
      if (res.status === 404) {
        throw new Error("User not found with this email");
      } else if (res.status === 403) {
        throw new Error("Please verify your email before logging in");
      } else if (res.status === 401) {
        throw new Error("Incorrect password");
      } else {
        throw new Error(data?.message || "Login failed");
      }
    }

    // Store the token in localStorage or cookies
    if (data?.data?.token) {
      localStorage.setItem('authToken', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }

    return {
      success: true,
      data: data.data,
      message: data.message
    };

  } catch (err: any) {
    console.error("Email login failed", err);
    return {
      success: false,
      message: err.message || "Network error. Please check your connection."
    };
  }
};

export const handleEmailSignup = async (name: string, email: string, password: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      throw new Error("API base URL not configured");
    }

    // Basic validation
    if (!name?.trim()) {
      throw new Error("Name is required");
    }
    if (!email?.trim()) {
      throw new Error("Email is required");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const res = await fetch(`${baseUrl}/auth/email/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 409) {
        throw new Error("User already exists with this email");
      } else {
        throw new Error(data?.message || "Signup failed");
      }
    }

    return {
      success: true,
      data: data.data,
      message: data.message
    };

  } catch (error: any) {
    console.error("Email signup failed:", error);
    return {
      success: false,
      message: error.message || "Network error. Please check your connection."
    };
  }
};

export const handleOtpVerification = async (email: string, otp: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      throw new Error("API base URL not configured");
    }

    if (!email?.trim()) {
      throw new Error("Email is required");
    }
    if (!otp?.trim()) {
      throw new Error("OTP is required");
    }

    const res = await fetch(`${baseUrl}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 400) {
        throw new Error("Invalid or expired OTP");
      } else if (res.status === 404) {
        throw new Error("No user found with this email");
      } else {
        throw new Error(data?.message || 'OTP verification failed');
      }
    }

    return {
      success: true,
      data: data.data,
      message: data.message
    };

  } catch (err: any) {
    console.error('OTP verification failed:', err);
    return {
      success: false,
      message: err.message || "Network error. Please check your connection."
    };
  }
};
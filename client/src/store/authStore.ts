import { api } from '@/lib/api';
import { create } from 'zustand';

interface Review {
  from: string;
  rating: number;
  comment: string;
  date: string;
}

interface User {
  name: string;
  email: string;
  googleId?: string;
  avatar: string;
  isVerified: boolean;
  reviews: Review[];
  role: 'buyer' | 'seller';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isLoggedIn: false,

  setUser: (user) => set({ user, isLoggedIn: !!user }),

  fetchUser: async () => {
    try {
      set({ isLoading: true });
      const res = await api.get('/user/me');
      set({ user: res.data.user, isLoggedIn: true, isLoading: false });
    } catch (err) {
      console.error('Fetch user failed', err);
      set({ user: null, isLoggedIn: false, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      set({ user: null, isLoggedIn: false });
    } catch (err) {
      console.error('Logout failed', err);
    }
  },
}));

import { api } from '@/lib/api';
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';


interface Review {
  from: string;
  rating: number;
  comment: string;
  date: string;
}
interface Language {
  name: string;
  level: 'Native/Bilingual' | 'Fluent' | 'Conversational';
}

interface User {
  name: string;
  email: string;
  googleId?: string;
  avatar: string;
  isVerified: boolean;
  reviews: Review[];
  role: 'buyer' | 'seller';
  languages?: Language[];
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  fetchUser: () => Promise<void>;
  logout: (router?: AppRouterInstance) => Promise<void>; 
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

 logout: async (router) => {
  try {
    await api.post('/user/logout');
    set({ user: null, isLoggedIn: false });
    
    toast.success('Logged out successfully');
    
    if (router) {
      setTimeout(() => router.push('/auth'), 200);
    }
  } catch (err) {
    console.error('Logout failed', err);
    toast.error('Logout failed');
  }
}
}));

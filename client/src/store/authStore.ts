import { api } from '@/lib/api';
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type Role = 'buyer' | 'seller';

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
  role: Role;
  languages?: Language[];
}

interface AuthState {
  user: User | null;
  switchRole: () => Promise<void>; 
  isLoading: boolean;
  isLoggedIn: boolean;
  fetchUser: () => Promise<void>;
  logout: (router?: AppRouterInstance) => Promise<void>; 
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  isLoggedIn: false,

  setUser: (user) => set({ user, isLoggedIn: !!user }),

  switchRole: async () => {
    const currentState = get().user;
    if (!currentState) {
      toast.error('No user is logged in.');
      return;
    }

    const newRole: Role = currentState.role === 'buyer' ? 'seller' : 'buyer';
    const endpoint = `/user/role/${newRole}`;

    try {
      const res = await api.post(endpoint);
      set({ user: res.data.user });
      toast.success(`You are now a ${newRole}!`);
    } catch (err) {
      console.error('Failed to switch role', err);
      toast.error('Failed to switch role');
    }
  },

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get('/user/me');
      set({ user: res.data.user, isLoggedIn: true });
    } catch (err) {
      console.error('Fetch user failed', err);
      set({ user: null, isLoggedIn: false });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async (router) => {
    try {
      await api.post('/user/logout');
      set({ user: null, isLoggedIn: false });
      toast.success('Logged out successfully');
    } catch (err) {
      console.error('Logout failed', err);
      toast.error('Logout failed');
    } finally {
      if (router) {
        router.push('/auth');
      }
    }
  }
}));
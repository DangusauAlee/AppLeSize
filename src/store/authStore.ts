import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  resettingPassword: boolean; // new flag
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setResettingPassword: (value: boolean) => void; // setter
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  resettingPassword: false,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ isLoading: loading }),
  setResettingPassword: (value) => set({ resettingPassword: value }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, resettingPassword: false });
  },
}));

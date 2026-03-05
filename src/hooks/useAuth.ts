import { useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { 
    user, 
    session, 
    isLoading, 
    resettingPassword,
    setUser, 
    setSession, 
    setLoading, 
    setResettingPassword,
    signOut 
  } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Auth session error:', error);
        setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { 
    user, 
    session, 
    isLoading, 
    resettingPassword,
    setResettingPassword,
    signOut 
  };
};

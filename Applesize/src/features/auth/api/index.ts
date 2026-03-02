import { supabase } from '@/shared/lib/supabase';
import { AuthCredentials } from '../types';

export const signIn = async ({ email, password }: AuthCredentials) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async ({ email, password }: AuthCredentials) => {
  return await supabase.auth.signUp({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

import { supabase } from '../../../services/supabase';
import type { Profile, UpdateProfileData } from '../types';

export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
    return data;
  },

  async updateProfile(userId: string, updates: UpdateProfileData): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)  // ← removed updated_at here
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    return data;
  },

  async isProfileComplete(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('is_profile_complete', { user_id: userId });

    if (error) {
      console.error('RPC is_profile_complete error:', error);
      throw error;
    }

    return data === true;
  },
};

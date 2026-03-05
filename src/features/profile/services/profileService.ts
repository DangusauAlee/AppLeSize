import { supabase } from '../../../services/supabase';
import { Profile, UpdateProfileData } from '../types';

export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  },

  async updateProfile(userId: string, updates: UpdateProfileData): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    return data;
  },

  async markWelcomeSeen(userId: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({ has_seen_welcome: true })
      .eq('id', userId);

    if (error) {
      console.error('Error marking welcome seen:', error);
      throw error;
    }
  },

  async isProfileComplete(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('is_profile_complete', { user_id: userId });

    if (error) {
      console.error('Error checking profile completion:', error);
      return false;
    }
    return data;
  }
};

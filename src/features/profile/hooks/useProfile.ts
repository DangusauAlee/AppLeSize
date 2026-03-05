import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { profileService } from '../services/profileService';
import { Profile, UpdateProfileData } from '../types';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await profileService.getProfile(user.id);
      setProfile(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateProfile = useCallback(async (updates: UpdateProfileData) => {
    if (!user) throw new Error('No user logged in');
    try {
      setLoading(true);
      const updated = await profileService.updateProfile(user.id, updates);
      setProfile(updated);
      return updated;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const markWelcomeSeen = useCallback(async () => {
    if (!user) throw new Error('No user logged in');
    try {
      await profileService.markWelcomeSeen(user.id);
      // Refresh profile
      await loadProfile();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [user, loadProfile]);

  // Memoize return value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    profile,
    loading,
    error,
    updateProfile,
    markWelcomeSeen,
    refetch: loadProfile,
  }), [profile, loading, error, updateProfile, markWelcomeSeen, loadProfile]);

  return value;
};

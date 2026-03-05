import { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { profileService } from '../services/profileService';
import { Profile, UpdateProfileData } from '../types';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
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
    };

    loadProfile();
  }, [user?.id]); // Use user.id instead of whole user object to avoid unnecessary re-runs

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
      setProfile(prev => prev ? { ...prev, has_seen_welcome: true } : null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [user]);

  const isProfileComplete = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    return profileService.isProfileComplete(user.id);
  }, [user]);

  // Memoize the return value to prevent unnecessary re-renders in consumers
  const value = useMemo(() => ({
    profile,
    loading,
    error,
    updateProfile,
    markWelcomeSeen,
    isProfileComplete,
  }), [profile, loading, error, updateProfile, markWelcomeSeen, isProfileComplete]);

  return value;
};

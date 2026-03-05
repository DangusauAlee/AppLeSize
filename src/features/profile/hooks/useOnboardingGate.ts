import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { profileService } from '../services/profileService';

// Simple promise cache to deduplicate concurrent calls
let profileCheckPromise: Promise<boolean> | null = null;

export const useOnboardingGate = () => {
  const { user } = useAuth();
  const [needsOnboarding, setNeedsOnboarding] = useState(true);
  const [loading, setLoading] = useState(true);

  const checkOnboardingStatus = useCallback(async () => {
    if (!user) {
      setNeedsOnboarding(false);
      setLoading(false);
      return;
    }

    try {
      // Fetch profile once
      const profile = await profileService.getProfile(user.id);
      if (!profile) {
        setNeedsOnboarding(true);
        setLoading(false);
        return;
      }

      // Check completeness (with deduplication)
      if (!profileCheckPromise) {
        profileCheckPromise = profileService.isProfileComplete(user.id)
          .finally(() => {
            profileCheckPromise = null; // Clear after resolve/reject
          });
      }
      const complete = await profileCheckPromise;

      const needs = !complete || !profile.has_seen_welcome;
      setNeedsOnboarding(needs);
    } catch (error) {
      console.error('Onboarding gate error:', error);
      // On error, assume onboarding needed (safe fallback)
      setNeedsOnboarding(true);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    checkOnboardingStatus();
  }, [checkOnboardingStatus]);

  return { needsOnboarding, loading };
};

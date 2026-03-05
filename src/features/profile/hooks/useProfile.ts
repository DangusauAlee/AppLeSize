import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth';
import { profileService } from '../services/profileService';
import type { Profile, UpdateProfileData } from '../types';

const PROFILE_QUERY_KEY = (userId?: string) => ['profile', userId] as const;
const PROFILE_COMPLETE_KEY = (userId?: string) => ['profile-complete', userId] as const;

export function useProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Profile data query
  const profileQuery = useQuery<Profile | null, Error>({
    queryKey: PROFILE_QUERY_KEY(user?.id),
    queryFn: () => {
      if (!user?.id) throw new Error('No authenticated user');
      return profileService.getProfile(user.id);
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,   // 5 minutes
    gcTime: 10 * 60 * 1000,
  });

  // Completion status query (via RPC)
  const completeQuery = useQuery<boolean, Error>({
    queryKey: PROFILE_COMPLETE_KEY(user?.id),
    queryFn: () => {
      if (!user?.id) throw new Error('No authenticated user');
      return profileService.isProfileComplete(user.id);
    },
    enabled: !!user?.id,
    staleTime: 2 * 60 * 1000,   // shorter cache since it's a boolean
    gcTime: 5 * 60 * 1000,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updates: UpdateProfileData) => {
      if (!user?.id) throw new Error('No authenticated user');
      return profileService.updateProfile(user.id, updates);
    },
    onSuccess: (updatedProfile) => {
      // Update profile cache
      queryClient.setQueryData(PROFILE_QUERY_KEY(user?.id), updatedProfile);
      // Invalidate completion check → will refetch RPC on next render
      queryClient.invalidateQueries({ queryKey: PROFILE_COMPLETE_KEY(user?.id) });
    },
  });

  return {
    profile: profileQuery.data,
    isProfileLoading: profileQuery.isLoading,
    profileError: profileQuery.error,

    isProfileComplete: completeQuery.data ?? false,
    isCompleteLoading: completeQuery.isLoading,
    completeError: completeQuery.error,

    updateProfile: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,

    refetchProfile: profileQuery.refetch,
    refetchComplete: completeQuery.refetch,
  };
}

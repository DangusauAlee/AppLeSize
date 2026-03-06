import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth';
import { profileService } from '../services/profileService';
import type { Profile, UpdateProfileData } from '../types';

const PROFILE_QUERY_KEY = (userId?: string) => ['profile', userId] as const;

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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Derived completion status
  const isProfileComplete = Boolean(
    profileQuery.data?.first_name &&
    profileQuery.data?.last_name &&
    profileQuery.data?.phone &&
    profileQuery.data?.country &&
    profileQuery.data?.state &&
    profileQuery.data?.address
  );

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (updates: UpdateProfileData) => {
      if (!user?.id) throw new Error('No authenticated user');
      return profileService.updateProfile(user.id, updates);
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY(user?.id), updatedProfile);
    },
  });

  return {
    profile: profileQuery.data,
    isProfileLoading: profileQuery.isLoading,
    profileError: profileQuery.error,

    isProfileComplete,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,

    refetchProfile: profileQuery.refetch,
  };
}

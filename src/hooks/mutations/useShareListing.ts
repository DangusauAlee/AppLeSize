import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../services/supabase';
import { useAuth } from '../useAuth';

export const useShareListing = () => {
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation({
    mutationFn: async ({ listingId }: { listingId: string }) => {
      if (!userId) throw new Error('User not authenticated');
      const { error } = await supabase.rpc('add_interaction', {
        p_user_id: userId,
        p_listing_id: listingId,
        p_interaction_type: 'share',
      });
      if (error) throw error;
    },
  });
};
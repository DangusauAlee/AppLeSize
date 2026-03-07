import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../services/supabase';
import { useAuth } from '../useAuth';
import type { InfiniteData } from '@tanstack/react-query';
import type { FeedPage } from '../../features/feed/types';

export const useFavoriteListing = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ listingId }: { listingId: string }) => {
      if (!userId) throw new Error('User not authenticated');
      const { error } = await supabase.rpc('add_interaction', {
        p_user_id: userId,
        p_listing_id: listingId,
        p_interaction_type: 'favorite',
      });
      if (error) throw error;
    },

    onMutate: async ({ listingId }) => {
      await queryClient.cancelQueries({ queryKey: ['feed'] });

      const previousData = queryClient.getQueriesData<InfiniteData<FeedPage>>({
        queryKey: ['feed'],
      });

      queryClient.setQueriesData<InfiniteData<FeedPage>>(
        { queryKey: ['feed'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              listings: page.listings.map((item) =>
                item.id === listingId
                  ? {
                      ...item,
                      favorite_count: item.favorite_count + 1,
                      user_favorited: true,
                    }
                  : item
              ),
            })),
          };
        }
      );

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
  });
};
import { useInfiniteQuery } from '@tanstack/react-query';
import { feedService } from '../services/feedService';
import { useAuth } from '../../../hooks/useAuth';
import type { SearchFilters } from '../types';

const PAGE_LIMIT = 20;

export const useSearch = (filters: SearchFilters, enabled = true) => {
  const { user } = useAuth();
  const userId = user?.id;

  return useInfiniteQuery({
    queryKey: ['search', filters, userId],
    queryFn: ({ pageParam = 0 }) => {
      if (!userId) throw new Error('User not authenticated');
      return feedService.searchListings(userId, filters, PAGE_LIMIT, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage.hasMore) return undefined;
      return lastPageParam + PAGE_LIMIT;
    },
    enabled: enabled && !!userId,
    staleTime: 1000 * 60 * 2,
  });
};

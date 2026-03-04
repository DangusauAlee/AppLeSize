import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFeed } from '../services/feedService';
import { useAuth } from '../../../hooks/useAuth';

export const useFeed = (feedType: 'products' | 'demands') => {
  const { user } = useAuth();

  return useInfiniteQuery({
    queryKey: ['feed', feedType, user?.id],
    queryFn: ({ pageParam = 1 }) => fetchFeed(user?.id || '', pageParam, 10, feedType),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    enabled: !!user,
    initialPageParam: 1,
  });
};

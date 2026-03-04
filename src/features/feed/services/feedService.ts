import { supabase } from '../../../services/supabase';
import { FeedItem } from '../types';

export const fetchFeed = async (userId: string, page: number, limit: number = 10, feedType: 'products' | 'demands'): Promise<FeedItem[]> => {
  // This is a mock implementation. Replace with actual RPC call.
  // Example: const { data } = await supabase.rpc('get_personalised_feed', { user_id: userId, page, limit, feed_type: feedType });
  // For now, return mock data.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: limit }, (_, i) => ({
        id: `item-${page}-${i}`,
        title: `${feedType === 'products' ? 'Product' : 'Demand'} ${page * limit + i + 1}`,
        price: feedType === 'products' ? Math.random() * 100 : undefined,
        images: ['https://via.placeholder.com/300'],
        type: feedType === 'products' ? 'product' : 'demand',
        isSaved: Math.random() > 0.5,
        urgent: Math.random() > 0.8,
      })));
    }, 1000);
  });
};

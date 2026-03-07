import { supabase } from '../../../services/supabase';
import type { FeedPage, SearchFilters, ListingType } from '../types';

export const feedService = {
  async getPersonalizedFeed(
    userId: string,
    type: ListingType,
    limit: number,
    offset: number
  ): Promise<FeedPage> {
    const { data, error } = await supabase.rpc('get_personalized_feed', {
      p_user_id: userId,
      p_type: type,
      p_limit: limit,
      p_offset: offset,
    });

    if (error) throw error;

    const listings = data || [];
    return {
      listings,
      hasMore: listings.length === limit,
    };
  },

  async searchListings(
    userId: string,
    filters: SearchFilters,
    limit: number,
    offset: number
  ): Promise<FeedPage> {
    // Transform filters for RPC
    const rpcFilters: any = { ...filters };
    if (filters.condition) rpcFilters.conditions = filters.condition;

    const { data, error } = await supabase.rpc('search_listings', {
      p_filters: rpcFilters,
      p_user_id: userId,
      p_limit: limit,
      p_offset: offset,
    });

    if (error) throw error;

    const listings = data || [];
    return {
      listings,
      hasMore: listings.length === limit,
    };
  },
};
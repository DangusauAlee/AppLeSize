export type ListingType = 'product' | 'demand';

export interface ListingMedia {
  url: string;
  type: 'image' | 'video';
}

export interface Listing {
  id: string;
  user_id: string;
  type: ListingType;
  device_type: string;
  model: string;
  memory?: string;
  color?: string;
  usage?: string;
  conditions?: string[];
  description?: string;
  price: number;
  is_negotiable: boolean;
  created_at: string;
  updated_at: string;
  view_count: number;
  like_count: number;
  favorite_count: number;
  share_count: number;
  user_liked: boolean;
  user_favorited: boolean;
  lister_name: string;
  lister_avatar?: string;
  shop_name?: string;
  shop_id?: string;
  media: ListingMedia[];
}

export interface FeedPage {
  listings: Listing[];
  hasMore: boolean;
}

export interface SearchFilters {
  device_type?: string;
  model?: string;
  memory?: string;
  usage?: string[];
  condition?: string[];
  min_price?: number;
  max_price?: number;
  query?: string;
}
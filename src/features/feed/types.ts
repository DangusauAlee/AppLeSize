export interface FeedItem {
  id: string;
  title: string;
  price?: number;
  images: string[];
  type: 'product' | 'demand';
  isSaved: boolean;
  urgent?: boolean;
}

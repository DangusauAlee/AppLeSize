export interface Profile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  country: string | null;
  state: string | null;
  address: string | null;
  id_number: string | null;
  business_name: string | null;
  avatar_url: string | null;
  role: 'Broadcaster' | 'Retailer' | null;
  has_seen_welcome: boolean;
  applesized: boolean;
  created_at: string;
}

export type UpdateProfileData = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  state?: string;
  address?: string;
  id_number?: string;
  business_name?: string;
  avatar_url?: string;
  role?: 'Broadcaster' | 'Retailer';
};

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://jzbeclypgbqlviqnhksq.supabase.co';
const supabaseAnonKey = 'sb_publishable_DzooqKbR2DRVUUqnI7fkfg_K2v8WZG7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

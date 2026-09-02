import { createClient } from '@supabase/supabase-js';

// Read Supabase credentials from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  '';

/**
 * Checks if Supabase has been properly configured with valid non-placeholder keys.
 * @returns {boolean}
 */
export const isSupabaseConfigured = () => {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (
    supabaseUrl.includes('your-project') ||
    supabaseAnonKey.includes('your-anon') ||
    supabaseAnonKey.includes('your-supabase') ||
    supabaseAnonKey.includes('your_')
  ) {
    return false;
  }
  return true;
};

// Initialize the browser-safe Supabase client with local session persistence
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export default supabase;

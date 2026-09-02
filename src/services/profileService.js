import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

/**
 * Profile Service
 * Manages user profile fetching and updates from public.profiles table in Supabase.
 */

export const profileService = {
  /**
   * Fetch a user profile by user UUID
   * @param {string} userId
   */
  async getProfile(userId) {
    if (!userId) return { data: null, error: 'User ID is required' };

    if (!isSupabaseConfigured() || !supabase) {
      return { data: null, error: 'Supabase environment variables are missing.' };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If profile doesn't exist yet, try creating it
        if (error.code === 'PGRST116') {
          return { data: null, error: 'Profile not found' };
        }
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Fetch profile error:', error);
      return { data: null, error: error.message || 'Failed to fetch profile' };
    }
  },

  /**
   * Update profile information
   * @param {string} userId
   * @param {Object} updates
   */
  async updateProfile(userId, updates) {
    if (!userId) return { data: null, error: 'User ID is required' };

    if (!isSupabaseConfigured() || !supabase) {
      return { data: null, error: 'Supabase environment variables are missing.' };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { data: null, error: error.message || 'Failed to update profile' };
    }
  },
};

export default profileService;

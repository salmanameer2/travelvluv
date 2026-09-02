import { supabase } from '../lib/supabase.js';

export const favoriteService = {
  /**
   * Fetch all favorites for the authenticated user
   */
  async getMyFavorites() {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return { data: [], error: 'User not authenticated' };

      const { data, error } = await supabase
        .from('favorites')
        .select('destination_id')
        .eq('user_id', user.id);

      if (error) throw error;
      
      const destinationIds = data.map(fav => Number(fav.destination_id));
      return { data: destinationIds, error: null };
    } catch (error) {
      console.error('Fetch favorites error:', error);
      return { data: [], error: error.message };
    }
  },

  /**
   * Add a destination to favorites
   */
  async addFavorite(destinationId) {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('favorites')
        .insert([{ user_id: user.id, destination_id: String(destinationId) }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Add favorite error:', error);
      return { data: null, error: error.message };
    }
  },

  /**
   * Remove a destination from favorites
   */
  async removeFavorite(destinationId) {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('destination_id', String(destinationId));

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Remove favorite error:', error);
      return { error: error.message };
    }
  }
};

export default favoriteService;

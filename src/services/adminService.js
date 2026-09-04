import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

export const adminService = {
  async getAllBookings() {
    if (!isSupabaseConfigured() || !supabase) {
      return { data: [], error: 'Supabase environment variables are missing.' };
    }
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles:user_id (name, full_name, email, role)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Fetch all bookings error:', error);
      return { data: [], error: error.message || 'Failed to retrieve bookings' };
    }
  },

  async updateBookingStatus(bookingId, status, rejectionReason = null) {
    if (!isSupabaseConfigured() || !supabase) {
      return { data: null, error: 'Supabase environment variables are missing.' };
    }
    try {
      const { data, error } = await supabase.rpc('admin_update_booking_status', {
        p_booking_id: String(bookingId),
        p_status: status,
        p_rejection_reason: rejectionReason || null
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Update booking status error:', error);
      return { data: null, error: error.message || 'Failed to update booking' };
    }
  }
};
export default adminService;

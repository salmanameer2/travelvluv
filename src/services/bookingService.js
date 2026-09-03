import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

/**
 * Booking Service
 * Handles itinerary creation, user booking queries, status updates, and cancellations.
 */

// Helper to normalize Supabase snake_case columns into frontend-friendly objects
const mapDbBookingToFrontend = (b) => {
  if (!b) return null;
  return {
    id: b.id,
    confirmationNumber: b.confirmation_number,
    userId: b.user_id,
    destinationId: b.destination_id,
    destination: b.destination_name,
    country: b.destination_country,
    image: b.destination_image,
    leadTraveler: b.full_name,
    email: b.email,
    phone: b.phone,
    departureDate: b.travel_date,
    returnDate: b.return_date || 'Flexible return',
    bookingDate: b.created_at ? b.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
    adults: b.adults,
    children: b.children,
    travelers: b.travelers_summary || `${b.adults} Adults${b.children > 0 ? `, ${b.children} Children` : ''}`,
    accommodation: b.accommodation_type,
    accommodationId: b.accommodation_id,
    travelClass: b.travel_class,
    travelClassId: b.travel_class_id,
    travelPackage: b.travel_package,
    transportation: b.transportation,
    selectedActivities: Array.isArray(b.preferred_activities) ? b.preferred_activities : [],
    specialRequests: b.special_requests,
    total: Number(b.estimated_price || 0),
    status: (b.status ? b.status.charAt(0).toUpperCase() + b.status.slice(1) : 'Confirmed'),
  };
};

export const bookingService = {
  /**
   * Create a new booking in Supabase public.bookings table
   * @param {Object} bookingData
   */
  async createBooking(bookingData) {
    if (!isSupabaseConfigured() || !supabase) {
      return { data: null, error: 'Supabase environment variables are missing.' };
    }

    try {
      // 1. Get current authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('You must be logged in to create a booking.');
      }

      // 2. Generate clean confirmation number
      const confirmationNumber =
        'RS-' + Math.floor(100000 + Math.random() * 900000);

      // 3. Prepare payload mapping
      const payload = {
        confirmation_number: confirmationNumber,
        user_id: user.id,
        destination_id: String(bookingData.destinationId),
        destination_name: bookingData.destination || 'Luxury Destination',
        destination_country: bookingData.country || '',
        destination_image: bookingData.image || '',
        full_name: bookingData.leadTraveler || bookingData.fullName,
        email: bookingData.email,
        phone: bookingData.phone,
        travel_date: bookingData.departureDate,
        return_date: bookingData.returnDate && bookingData.returnDate !== 'Flexible return' ? bookingData.returnDate : null,
        adults: Number(bookingData.adults) || 1,
        children: Number(bookingData.children) || 0,
        travelers_summary: `${bookingData.adults} Adults${bookingData.children > 0 ? `, ${bookingData.children} Children` : ''}`,
        travel_package: bookingData.package || 'Custom Bespoke',
        accommodation_type: bookingData.accommodation || 'Luxury Villa',
        accommodation_id: bookingData.accommodationId || '',
        transportation: bookingData.transportation || 'Private Chauffeur',
        travel_class: bookingData.travelClass || 'Business Class VIP',
        travel_class_id: bookingData.travelClassId || '',
        preferred_activities: bookingData.selectedActivities || [],
        special_requests: bookingData.specialRequests || '',
        estimated_price: Number(bookingData.total) || 0,
        status: 'confirmed',
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      return { data: mapDbBookingToFrontend(data), error: null };
    } catch (error) {
      console.error('Create booking error:', error);
      return { data: null, error: error.message || 'Failed to create booking' };
    }
  },

  /**
   * Fetch all bookings belonging to the currently logged in user
   */
  async getMyBookings() {
    if (!isSupabaseConfigured() || !supabase) {
      return { data: [], error: 'Supabase environment variables are missing.' };
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        return { data: [], error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .neq('status', 'cancelled')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formatted = (data || []).map(mapDbBookingToFrontend);
      return { data: formatted, error: null };
    } catch (error) {
      console.error('Fetch bookings error:', error);
      return { data: [], error: error.message || 'Failed to retrieve bookings' };
    }
  },

  /**
   * Get single booking by ID
   * @param {string} bookingId
   */
  async getBookingById(bookingId) {
    if (!isSupabaseConfigured() || !supabase) {
      return {
        data: null,
        error: 'Supabase environment variables are missing.',
      };
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        return {
          data: null,
          error: 'User not authenticated',
        };
      }

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      return {
        data: mapDbBookingToFrontend(data),
        error: null,
      };
    } catch (error) {
      console.error('Get booking error:', error);

      return {
        data: null,
        error: error.message || 'Booking not found',
      };
    }
  },

  /**
   * Cancel an existing booking by setting status = 'cancelled'
   * @param {string} bookingId
   */
  async cancelBooking(bookingId) {
    if (!isSupabaseConfigured() || !supabase) {
      return {
        data: null,
        error: 'Supabase environment variables are missing.',
      };
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        return {
          data: null,
          error: 'User not authenticated',
        };
      }

      const { data, error } = await supabase
        .from('bookings')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .or(`id.eq.${bookingId},confirmation_number.eq.${bookingId}`)
        .select()
        .single();

      if (error) throw error;

      return {
        data: mapDbBookingToFrontend(data),
        error: null,
      };
    } catch (error) {
      console.error('Cancel booking error:', error);

      return {
        data: null,
        error: error.message || 'Failed to cancel booking',
      };
    }
  },
};

export default bookingService;

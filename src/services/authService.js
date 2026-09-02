import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

/**
 * Authentication Service
 * Handles user sign-up, email login, Google OAuth, session retrieval, password reset, and logout.
 */

export const authService = {
  /**
   * Sign up with Email and Password
   * @param {Object} params
   * @param {string} params.email
   * @param {string} params.password
   * @param {string} params.fullName
   * @param {string} [params.phone]
   */
  async signUp({ email, password, fullName, phone = '' }) {
    if (!isSupabaseConfigured() || !supabase) {
      return { data: null, error: 'Supabase environment variables are missing.' };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error: error.message || 'Registration failed' };
    }
  },

  /**
   * Sign in with Email and Password
   * @param {Object} params
   * @param {string} params.email
   * @param {string} params.password
   */
  async signIn({ email, password }) {
    if (!isSupabaseConfigured() || !supabase) {
      return { data: null, error: 'Supabase environment variables are missing.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error: error.message || 'Invalid email or password' };
    }
  },

  /**
   * Sign in / Continue with Google OAuth
   */
  async signInWithGoogle() {
    if (!isSupabaseConfigured() || !supabase) {
      return { data: null, error: 'Supabase environment variables are missing.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Google OAuth error:', error);
      return { data: null, error: error.message || 'Google authentication failed' };
    }
  },

  /**
   * Send Password Reset Email
   * @param {string} email
   */
  async resetPassword(email) {
    if (!isSupabaseConfigured() || !supabase) {
      return { data: true, error: null };
    }

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Password reset error:', error);
      return { data: null, error: error.message || 'Failed to send reset link' };
    }
  },

  /**
   * Sign Out current authenticated session
   */
  async signOut() {
    if (!isSupabaseConfigured() || !supabase) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error.message || 'Failed to sign out' };
    }
  },

  /**
   * Get active user session
   */
  async getSession() {
    if (!isSupabaseConfigured() || !supabase) {
      return { session: null, error: null };
    }

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { session: data.session, error: null };
    } catch (error) {
      console.error('Get session error:', error);
      return { session: null, error: error.message };
    }
  },

  /**
   * Get currently logged-in user
   */
  async getCurrentUser() {
    if (!isSupabaseConfigured() || !supabase) {
      return { user: null, error: null };
    }

    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  },
};

export default authService;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { authService } from '../services/authService.js';
import { profileService } from '../services/profileService.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  // Load active session and subscribe to auth changes
  useEffect(() => {
    let subscription = null;

    const initializeAuth = async () => {
      setLoading(true);

      if (!isConfigured || !supabase) {
        setLoading(false);
        return;
      }

      try {
        // 1. Get initial session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        if (initialSession?.user) {
          const { data: userProfile } = await profileService.getProfile(initialSession.user.id);
          if (userProfile) {
            setProfile({
              ...userProfile,
              name: userProfile.full_name || initialSession.user.email?.split('@')[0],
              avatar: userProfile.avatar_url,
              membershipTier: userProfile.membership_tier || 'Silver Explorer',
              rewardPoints: userProfile.reward_points || 500,
            });
          }
        }

        // 2. Listen for auth state transitions (SIGN_IN, SIGN_OUT, TOKEN_REFRESHED)
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, currentSession) => {
            setSession(currentSession);
            const currentUser = currentSession?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
              const { data: userProfile } = await profileService.getProfile(currentUser.id);
              if (userProfile) {
                setProfile({
                  ...userProfile,
                  name: userProfile.full_name || currentUser.email?.split('@')[0],
                  avatar: userProfile.avatar_url,
                  membershipTier: userProfile.membership_tier || 'Silver Explorer',
                  rewardPoints: userProfile.reward_points || 500,
                });
              } else {
                setProfile({
                  id: currentUser.id,
                  email: currentUser.email,
                  name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0],
                  full_name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0],
                  avatar: currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture,
                  avatar_url: currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture,
                  membershipTier: 'Silver Explorer',
                  rewardPoints: 500,
                });
              }
            } else {
              setProfile(null);
            }
          }
        );

        subscription = authListener?.subscription;
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [isConfigured]);

  // Sign up action
  const signUp = async ({ email, password, fullName, phone }) => {
    setLoading(true);
    const { data, error } = await authService.signUp({ email, password, fullName, phone });
    setLoading(false);
    return { data, error };
  };

  // Sign in action
  const signIn = async ({ email, password }) => {
    setLoading(true);
    const { data, error } = await authService.signIn({ email, password });
    setLoading(false);
    return { data, error };
  };

  // Sign in with Google OAuth
  const signInWithGoogle = async () => {
    setLoading(true);
    const { data, error } = await authService.signInWithGoogle();
    setLoading(false);
    return { data, error };
  };

  // Reset Password action
  const resetPassword = async (email) => {
    return await authService.resetPassword(email);
  };

  // Sign out action
  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  // Update profile action
  const updateUserProfile = async (updates) => {
    if (!user) return { data: null, error: 'No authenticated user' };

    const { data, error } = await profileService.updateProfile(user.id, updates);
    if (!error && data) {
      setProfile((prev) => ({
        ...prev,
        ...data,
        name: data.full_name || prev.name,
      }));
    }
    return { data, error };
  };

  const value = {
    user,
    session,
    profile,
    loading,
    isConfigured,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

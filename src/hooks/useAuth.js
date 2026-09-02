import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * Custom React hook for accessing the Supabase Authentication context.
 *
 * @returns {{
 *   user: Object|null,
 *   session: Object|null,
 *   profile: Object|null,
 *   loading: boolean,
 *   isConfigured: boolean,
 *   signUp: Function,
 *   signIn: Function,
 *   signInWithGoogle: Function,
 *   signOut: Function,
 *   resetPassword: Function,
 *   updateUserProfile: Function
 * }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;


import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user type
export interface User {
  id: string;
  email: string;
  name?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    // In a real implementation with Supabase, we would check for an existing session
    // For now, we'll check localStorage for a mock user
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      // In a real implementation with Supabase, we would use supabase.auth.signInWithPassword
      // For now, we'll create a mock user
      const mockUser = { id: '1', email };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string) => {
    try {
      // In a real implementation with Supabase, we would use supabase.auth.signUp
      // For now, we'll create a mock user
      const mockUser = { id: '1', email, name };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      // In a real implementation with Supabase, we would use supabase.auth.signOut
      // For now, we'll just remove the mock user from localStorage
      localStorage.removeItem('mockUser');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Language } from '../types';
import { languages } from '../data/mockData';

// Define user profile type
export interface UserProfile {
  userId: string;
  selectedLanguage: Language | null;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | null;
  completedTopics: string[];
  favoriteTopics: string[];
}

// Define context type
interface UserProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  setLanguage: (language: Language) => void;
  setProficiencyLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  addCompletedTopic: (topicId: string) => void;
  toggleFavoriteTopic: (topicId: string) => void;
}

// Create context with default values
const UserProfileContext = createContext<UserProfileContextType>({
  profile: null,
  isLoading: true,
  setLanguage: () => {},
  setProficiencyLevel: () => {},
  addCompletedTopic: () => {},
  toggleFavoriteTopic: () => {},
});

// Custom hook to use the user profile context
export const useUserProfile = () => useContext(UserProfileContext);

// Provider component
export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile when user changes
  useEffect(() => {
    if (user) {
      // In a real implementation with Supabase, we would fetch the user's profile
      // For now, we'll check localStorage for a mock profile
      const storedProfile = localStorage.getItem(`mockProfile-${user.id}`);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        // Create a new profile if none exists
        const newProfile: UserProfile = {
          userId: user.id,
          selectedLanguage: null,
          proficiencyLevel: null,
          completedTopics: [],
          favoriteTopics: [],
        };
        localStorage.setItem(`mockProfile-${user.id}`, JSON.stringify(newProfile));
        setProfile(newProfile);
      }
    } else {
      setProfile(null);
    }
    setIsLoading(false);
  }, [user]);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (user && profile) {
      localStorage.setItem(`mockProfile-${user.id}`, JSON.stringify(profile));
    }
  }, [user, profile]);

  // Set language
  const setLanguage = (language: Language) => {
    if (profile) {
      setProfile({
        ...profile,
        selectedLanguage: language,
      });
    }
  };

  // Set proficiency level
  const setProficiencyLevel = (level: 'beginner' | 'intermediate' | 'advanced') => {
    if (profile) {
      setProfile({
        ...profile,
        proficiencyLevel: level,
      });
    }
  };

  // Add completed topic
  const addCompletedTopic = (topicId: string) => {
    if (profile) {
      if (!profile.completedTopics.includes(topicId)) {
        setProfile({
          ...profile,
          completedTopics: [...profile.completedTopics, topicId],
        });
      }
    }
  };

  // Toggle favorite topic
  const toggleFavoriteTopic = (topicId: string) => {
    if (profile) {
      const isFavorite = profile.favoriteTopics.includes(topicId);
      setProfile({
        ...profile,
        favoriteTopics: isFavorite
          ? profile.favoriteTopics.filter(id => id !== topicId)
          : [...profile.favoriteTopics, topicId],
      });
    }
  };

  const value = {
    profile,
    isLoading,
    setLanguage,
    setProficiencyLevel,
    addCompletedTopic,
    toggleFavoriteTopic,
  };

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
};
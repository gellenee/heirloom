
export interface Language {
  id: string;
  name: string;
  code: string;
}

export interface ConversationTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  emotionalContext: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl?: string;
}

export interface ConversationScenario {
  id: string;
  topicId: string;
  title: string;
  description: string;
  prompts: ConversationPrompt[];
}

export interface ConversationPrompt {
  id: string;
  text: string;
  translation?: string;
  audioUrl?: string;
  order: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetLanguage: Language;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced';
  learningGoals: string[];
  completedTopics: string[];
  favoriteTopics: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'podcast' | 'book' | 'website';
  url: string;
  language: string;
  tags: string[];
}
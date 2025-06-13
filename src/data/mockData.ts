
import { ConversationTopic, ConversationScenario, Resource, Language } from '../types';

export const languages: Language[] = [
  { id: '1', name: 'Spanish', code: 'es' },
  { id: '2', name: 'Mandarin Chinese', code: 'zh' },
  { id: '3', name: 'Hindi', code: 'hi' },
  { id: '4', name: 'Arabic', code: 'ar' },
  { id: '5', name: 'Portuguese', code: 'pt' },
  { id: '6', name: 'Bengali', code: 'bn' },
  { id: '7', name: 'Russian', code: 'ru' },
  { id: '8', name: 'Japanese', code: 'ja' },
  { id: '9', name: 'Punjabi', code: 'pa' },
  { id: '10', name: 'German', code: 'de' },
  { id: '11', name: 'Korean', code: 'ko' },
  { id: '12', name: 'French', code: 'fr' },
  { id: '13', name: 'Italian', code: 'it' },
  { id: '14', name: 'Vietnamese', code: 'vi' },
  { id: '15', name: 'Tagalog', code: 'tl' },
];

export const conversationTopics: ConversationTopic[] = [
  {
    id: '1',
    title: 'Family Gatherings',
    description: 'Practice conversations for family reunions, dinners, and celebrations.',
    category: 'Family',
    emotionalContext: 'Warmth, nostalgia, belonging',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Expressing Love and Appreciation',
    description: 'Learn how to express deep feelings of love and gratitude to family members.',
    category: 'Relationships',
    emotionalContext: 'Love, gratitude, vulnerability',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Cultural Traditions and Celebrations',
    description: 'Discuss important cultural traditions, holidays, and ceremonies.',
    category: 'Culture',
    emotionalContext: 'Pride, connection, celebration',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1514222788835-3a1a1d5b32f8?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Cooking and Food',
    description: 'Talk about traditional recipes, cooking techniques, and food memories.',
    category: 'Culture',
    emotionalContext: 'Nostalgia, joy, sharing',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Resolving Conflicts',
    description: 'Practice difficult conversations about disagreements and misunderstandings.',
    category: 'Relationships',
    emotionalContext: 'Tension, resolution, understanding',
    difficulty: 'advanced',
    imageUrl: 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Childhood Memories',
    description: 'Share stories and memories from your childhood with family members.',
    category: 'Personal',
    emotionalContext: 'Nostalgia, joy, reflection',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=500&auto=format&fit=crop'
  },
];

export const conversationScenarios: ConversationScenario[] = [
  {
    id: '1',
    topicId: '1',
    title: 'Family Dinner Conversation',
    description: 'A typical conversation during a family dinner gathering.',
    prompts: [
      {
        id: '1-1',
        text: '¿Cómo has estado? Hace mucho tiempo que no nos vemos.',
        translation: 'How have you been? It\'s been a long time since we\'ve seen each other.',
        order: 1
      },
      {
        id: '1-2',
        text: 'La comida está deliciosa. ¿Quién preparó este plato?',
        translation: 'The food is delicious. Who prepared this dish?',
        order: 2
      },
      {
        id: '1-3',
        text: 'Cuéntame sobre tu trabajo. ¿Cómo te va?',
        translation: 'Tell me about your job. How is it going?',
        order: 3
      },
      {
        id: '1-4',
        text: '¿Recuerdas cuando éramos niños y jugábamos en el patio de la abuela?',
        translation: 'Do you remember when we were children and played in grandmother\'s yard?',
        order: 4
      }
    ]
  },
  {
    id: '2',
    topicId: '2',
    title: 'Expressing Gratitude to Parents',
    description: 'A heartfelt conversation expressing appreciation to your parents.',
    prompts: [
      {
        id: '2-1',
        text: 'Mamá, papá, quiero agradecerles por todo lo que han hecho por mí.',
        translation: 'Mom, dad, I want to thank you for everything you\'ve done for me.',
        order: 1
      },
      {
        id: '2-2',
        text: 'Aprecio todos los sacrificios que hicieron para darnos una buena vida.',
        translation: 'I appreciate all the sacrifices you made to give us a good life.',
        order: 2
      },
      {
        id: '2-3',
        text: 'Los quiero mucho y estoy orgulloso/a de ser su hijo/a.',
        translation: 'I love you very much and I\'m proud to be your son/daughter.',
        order: 3
      }
    ]
  }
];

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Heritage Language Learning: A Literature Review',
    description: 'An academic article exploring the unique challenges and opportunities of heritage language learning.',
    type: 'article',
    url: 'https://example.com/heritage-language-learning',
    language: 'English',
    tags: ['research', 'academic', 'heritage language']
  },
  {
    id: '2',
    title: 'Reconnecting with Your Roots Through Language',
    description: 'A podcast series featuring interviews with heritage language speakers who have reconnected with their cultural roots.',
    type: 'podcast',
    url: 'https://example.com/reconnecting-podcast',
    language: 'English',
    tags: ['podcast', 'personal stories', 'cultural identity']
  },
  {
    id: '3',
    title: 'Cultural Phrases and Expressions',
    description: 'A video series explaining common cultural phrases, idioms, and expressions in various languages.',
    type: 'video',
    url: 'https://example.com/cultural-phrases',
    language: 'Multiple',
    tags: ['video', 'phrases', 'expressions', 'idioms']
  },
  {
    id: '4',
    title: 'Heritage Language Communities Online',
    description: 'A directory of online communities and forums for heritage language speakers.',
    type: 'website',
    url: 'https://example.com/heritage-communities',
    language: 'English',
    tags: ['community', 'forums', 'social']
  },
  {
    id: '5',
    title: 'Emotional Vocabulary in Your Heritage Language',
    description: 'A guide to expressing emotions and feelings in different languages, with cultural context.',
    type: 'book',
    url: 'https://example.com/emotional-vocabulary',
    language: 'Multiple',
    tags: ['emotions', 'vocabulary', 'cultural context']
  }
];
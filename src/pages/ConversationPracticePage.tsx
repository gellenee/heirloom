
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useUserProfile } from '../contexts/UserProfileContext';
import { conversationTopics, conversationScenarios } from '../data/mockData';
import { toast } from 'sonner';

type ConversationMode = 'english' | 'characters' | 'voice';
type TopicType = 'predefined' | 'custom';

const ConversationPracticePage = () => {
  const { profile, addCompletedTopic, toggleFavoriteTopic } = useUserProfile();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get topicId from URL query params if available
  const queryParams = new URLSearchParams(location.search);
  const topicIdFromQuery = queryParams.get('topicId');
  
  // State for conversation flow
  const [step, setStep] = useState<'mode' | 'topic' | 'conversation'>(
    topicIdFromQuery ? 'mode' : 'topic'
  );
  const [conversationMode, setConversationMode] = useState<ConversationMode>('characters');
  const [topicType, setTopicType] = useState<TopicType>('predefined');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topicIdFromQuery || '');
  const [customTopic, setCustomTopic] = useState('');
  
  // State for conversation interaction
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find the selected topic and scenario
  const selectedTopic = conversationTopics.find(t => t.id === selectedTopicId);
  const scenario = conversationScenarios.find(s => s.topicId === selectedTopicId);
  
  // Check if topic is in favorites
  useEffect(() => {
    if (profile && selectedTopicId) {
      setIsFavorite(profile.favoriteTopics.includes(selectedTopicId));
    }
  }, [profile, selectedTopicId]);
  
  // Reset conversation state when topic changes
  useEffect(() => {
    if (selectedTopicId) {
      setCurrentPromptIndex(0);
      setUserResponse('');
      setFeedback(null);
    }
  }, [selectedTopicId]);
  
  // Handle conversation mode selection
  const handleModeSelect = (mode: ConversationMode) => {
    setConversationMode(mode);
    if (selectedTopicId) {
      setStep('conversation');
    } else {
      setStep('topic');
    }
  };
  
  // Handle topic type selection
  const handleTopicTypeSelect = (type: TopicType) => {
    setTopicType(type);
  };
  
  // Handle topic selection
  const handleTopicSelect = (topicId: string) => {
    setSelectedTopicId(topicId);
    setStep('conversation');
  };
  
  // Handle custom topic submission
  const handleCustomTopicSubmit = () => {
    if (!customTopic.trim()) {
      toast.error('Please enter a topic');
      return;
    }
    
    // In a real implementation with Supabase, we would save the custom topic
    // For now, we'll just show a message and redirect to dashboard
    toast.success('Custom topic submitted! This feature is coming soon.');
    navigate('/dashboard');
  };
  
  // Handle next prompt
  const handleNext = () => {
    if (scenario && currentPromptIndex < scenario.prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setUserResponse('');
      setFeedback(null);
    } else {
      // Conversation completed
      if (selectedTopicId) {
        addCompletedTopic(selectedTopicId);
      }
      toast.success('Conversation practice completed!');
      
      // Show completion screen or navigate back
      setStep('mode');
    }
  };
  
  // Handle previous prompt
  const handlePrevious = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
      setUserResponse('');
      setFeedback(null);
    }
  };
  
  // Toggle recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop speech recording
    if (!isRecording) {
      // Simulate recording starting
      setTimeout(() => {
        setIsRecording(false);
        // Simulate a response
        setUserResponse("This is where your spoken response would appear...");
      }, 3000);
    }
  };
  
  // Submit response
  const submitResponse = () => {
    // In a real implementation with Supabase, this would send the response for feedback
    // For now, we'll simulate feedback
    setFeedback("Great job! Your response was clear and appropriate for this context. You used good emotional vocabulary.");
  };
  
  // Toggle favorite
  const handleToggleFavorite = () => {
    if (selectedTopicId) {
      toggleFavoriteTopic(selectedTopicId);
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    }
  };
  
  // Render conversation mode selection
  if (step === 'mode') {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-4 text-primary text-center">Choose Your Conversation Style</h1>
          <p className="text-center text-muted-foreground mb-8">
            Select how you'd like to practice your heritage language conversations
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              className="bg-card border rounded-lg p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors heritage-pattern"
              onClick={() => handleModeSelect('english')}
            >
              <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Chat in English</h3>
              <p className="text-sm text-muted-foreground">
                Practice with English prompts and responses
              </p>
            </button>
            
            <button
              className="bg-card border rounded-lg p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors heritage-pattern"
              onClick={() => handleModeSelect('characters')}
            >
              <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/></svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Chat through Characters</h3>
              <p className="text-sm text-muted-foreground">
                Type responses in your heritage language
              </p>
            </button>
            
            <button
              className="bg-card border rounded-lg p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors heritage-pattern"
              onClick={() => handleModeSelect('voice')}
            >
              <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Voice Conversation</h3>
              <p className="text-sm text-muted-foreground">
                Speak responses in your heritage language
              </p>
            </button>
          </div>
          
          <div className="text-center">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Render topic selection
  if (step === 'topic') {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => setStep('mode')}>
              ← Back to Conversation Modes
            </Button>
          </div>
          
          <h1 className="text-3xl font-serif font-bold mb-4 text-primary text-center">Choose a Family Conversation</h1>
          <p className="text-center text-muted-foreground mb-8">
            Select a conversation scenario to practice in your heritage language
          </p>
          
          <div className="bg-card border rounded-lg p-6 mb-8 heritage-pattern">
            <div className="flex space-x-4 mb-6">
              <Button
                variant={topicType === 'predefined' ? 'default' : 'outline'}
                onClick={() => handleTopicTypeSelect('predefined')}
              >
                Predefined Topics
              </Button>
              <Button
                variant={topicType === 'custom' ? 'default' : 'outline'}
                onClick={() => handleTopicTypeSelect('custom')}
              >
                Custom Topic
              </Button>
            </div>
            
            {topicType === 'predefined' ? (
              <div className="space-y-4">
                <h2 className="text-xl font-serif font-semibold mb-4">Select a Topic</h2>
                
                {conversationTopics
                  .filter(topic => !profile?.proficiencyLevel || topic.difficulty === profile.proficiencyLevel)
                  .map(topic => (
                    <button
                      key={topic.id}
                      className="w-full text-left p-4 border rounded-lg bg-background hover:bg-primary/5 hover:border-primary/50 transition-colors"
                      onClick={() => handleTopicSelect(topic.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{topic.title}</h3>
                          <p className="text-sm text-muted-foreground">{topic.description}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          topic.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          topic.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}>
                          {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-serif font-semibold mb-4">Create a Custom Topic</h2>
                <p className="text-muted-foreground mb-4">
                  Describe a specific family conversation scenario you'd like to practice
                </p>
                
                <div className="mb-4">
                  <textarea
                    className="w-full p-3 border rounded-md bg-background min-h-[100px]"
                    placeholder="Describe the conversation topic or scenario..."
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                  />
                </div>
                
                <Button onClick={handleCustomTopicSubmit}>
                  Create Custom Conversation
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Render conversation practice
  if (!selectedTopic || !scenario) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
        <p className="mb-6">The conversation topic you're looking for doesn't exist.</p>
        <Button onClick={() => setStep('topic')}>
          Choose Another Topic
        </Button>
      </div>
    );
  }
  
  const currentPrompt = scenario.prompts[currentPromptIndex];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Topic header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => setStep('topic')}>
            ← Back to Topics
          </Button>
          <div className="flex justify-between items-start mt-4">
            <h1 className="text-3xl font-serif font-bold text-primary">{selectedTopic.title}</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleFavorite}
              className="flex items-center gap-1"
            >
              {isFavorite ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  Favorited
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  Add to Favorites
                </>
              )}
            </Button>
          </div>
          <p className="text-muted-foreground mb-4">{selectedTopic.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full">
              {selectedTopic.category}
            </span>
            <span className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full">
              {selectedTopic.difficulty}
            </span>
            <span className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full">
              {conversationMode === 'english' ? 'English Mode' : 
               conversationMode === 'characters' ? 'Text Mode' : 'Voice Mode'}
            </span>
          </div>
        </div>
        
        {/* Scenario */}
        <div className="bg-card border rounded-lg p-6 mb-8 heritage-pattern">
          <h2 className="text-xl font-serif font-semibold mb-2">{scenario.title}</h2>
          <p className="text-muted-foreground">{scenario.description}</p>
        </div>
        
        {/* Conversation practice */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-serif font-medium">Practice Conversation</h3>
            <div className="flex items-center">
              <span className="text-sm mr-2">Show Translation</span>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${showTranslation ? 'bg-primary' : 'bg-muted'}`}
                onClick={() => setShowTranslation(!showTranslation)}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${showTranslation ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Prompt {currentPromptIndex + 1} of {scenario.prompts.length}</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentPromptIndex + 1) / scenario.prompts.length) * 100)}% complete
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ width: `${((currentPromptIndex + 1) / scenario.prompts.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Prompt */}
          <div className="mb-6">
            <div className="bg-muted p-4 rounded-lg mb-2">
              <p className="font-medium">{currentPrompt.text}</p>
              {showTranslation && currentPrompt.translation && (
                <p className="text-muted-foreground mt-2 text-sm">{currentPrompt.translation}</p>
              )}
            </div>
          </div>
          
          {/* User response */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Response:</label>
            {conversationMode === 'voice' ? (
              <div className="text-center p-6 border rounded-md bg-muted/30">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  onClick={toggleRecording}
                  className="flex items-center gap-2 mb-4"
                  size="lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg>
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
                {userResponse && (
                  <div className="mt-4">
                    <p className="text-muted-foreground mb-2">Your recorded response:</p>
                    <p className="font-medium">{userResponse}</p>
                  </div>
                )}
              </div>
            ) : (
              <textarea
                className="w-full p-3 border rounded-md min-h-[100px]"
                placeholder={`Type your response ${conversationMode === 'english' ? 'in English' : 'in your heritage language'}...`}
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              />
            )}
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={submitResponse}
                disabled={!userResponse.trim()}
              >
                Submit Response
              </Button>
            </div>
          </div>
          
          {/* Feedback */}
          {feedback && (
            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-6">
              <h4 className="font-medium mb-2">Feedback:</h4>
              <p>{feedback}</p>
            </div>
          )}
          
          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentPromptIndex === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNext}>
              {currentPromptIndex === scenario.prompts.length - 1 ? 'Complete Practice' : 'Next Prompt'}
            </Button>
          </div>
        </div>
        
        {/* Tips */}
        <div className="bg-card border rounded-lg p-6 heritage-pattern">
          <h3 className="text-lg font-serif font-medium mb-4 text-primary">Cultural Context</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              <span>Focus on expressing your emotions authentically, not just getting the grammar perfect.</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              <span>Try to use cultural expressions that would be natural in this context.</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              <span>It's okay to make mistakes—this is a safe space to practice.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConversationPracticePage;
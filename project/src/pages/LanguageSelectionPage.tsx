
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { languages } from '../data/mockData';
import { useUserProfile } from '../contexts/UserProfileContext';
import { toast } from 'sonner';

const LanguageSelectionPage = () => {
  const [selectedLanguageId, setSelectedLanguageId] = useState('');
  const { setLanguage } = useUserProfile();
  const navigate = useNavigate();
  
  const handleContinue = () => {
    if (!selectedLanguageId) {
      toast.error('Please select a language to continue');
      return;
    }
    
    const language = languages.find(lang => lang.id === selectedLanguageId);
    if (language) {
      setLanguage(language);
      toast.success(`Selected ${language.name} as your heritage language`);
      navigate('/proficiency-quiz');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold mb-2 text-primary">Your Family's Language</h1>
          <p className="text-lg text-muted-foreground">
            Select the language that connects you to your heritage and cultural roots
          </p>
        </div>
        
        <div className="bg-card border rounded-lg p-6 mb-8 heritage-pattern">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {languages.map((language) => (
              <button
                key={language.id}
                className={`p-4 rounded-lg border transition-all bg-background ${
                  selectedLanguageId === language.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
                }`}
                onClick={() => setSelectedLanguageId(language.id)}
              >
                <div className="text-lg font-medium">{language.name}</div>
              </button>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={handleContinue}
              disabled={!selectedLanguageId}
            >
              Continue
            </Button>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-serif font-semibold mb-4 text-primary">The Power of Your Heritage Language</h2>
          <p className="mb-4">
            Your heritage language is a vital connection to your family history, cultural identity, and ancestral roots. 
            By selecting your heritage language, we can provide you with personalized conversation practice that's 
            meaningful and relevant to your specific cultural context.
          </p>
          <p>
            Don't see your language? We're constantly expanding our language offerings. Let us know what language 
            you're looking for, and we'll prioritize adding it to our platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionPage;
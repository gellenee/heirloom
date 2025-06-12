
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useUserProfile } from '../contexts/UserProfileContext';
import { toast } from 'sonner';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    level: 'beginner' | 'intermediate' | 'advanced';
  }[];
}

const ProficiencyQuizPage = () => {
  const { profile, setProficiencyLevel } = useUserProfile();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [skippingQuiz, setSkippingQuiz] = useState(false);
  
  // Mock quiz questions - in a real app, these would be specific to the selected language
  const quizQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      question: 'How well can you understand conversations in your heritage language?',
      options: [
        { id: 'q1-a', text: 'I can understand basic greetings and simple phrases', level: 'beginner' },
        { id: 'q1-b', text: 'I can understand the main points of everyday conversations', level: 'intermediate' },
        { id: 'q1-c', text: 'I can understand most conversations, including complex topics', level: 'advanced' },
      ],
    },
    {
      id: 'q2',
      question: 'How comfortable are you speaking in your heritage language?',
      options: [
        { id: 'q2-a', text: 'I know some words but rarely form complete sentences', level: 'beginner' },
        { id: 'q2-b', text: 'I can have basic conversations but sometimes struggle with vocabulary', level: 'intermediate' },
        { id: 'q2-c', text: 'I can express myself fluently on most topics', level: 'advanced' },
      ],
    },
    {
      id: 'q3',
      question: 'How often do you use your heritage language?',
      options: [
        { id: 'q3-a', text: 'Rarely or never', level: 'beginner' },
        { id: 'q3-b', text: 'Occasionally with family or friends', level: 'intermediate' },
        { id: 'q3-c', text: 'Regularly in multiple contexts', level: 'advanced' },
      ],
    },
  ];
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const handleAnswer = (optionId: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId,
    });
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateProficiencyLevel();
    }
  };
  
  const calculateProficiencyLevel = () => {
    // Count the number of answers for each level
    const levelCounts = {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    };
    
    Object.keys(answers).forEach(questionId => {
      const question = quizQuestions.find(q => q.id === questionId);
      if (question) {
        const selectedOption = question.options.find(opt => opt.id === answers[questionId]);
        if (selectedOption) {
          levelCounts[selectedOption.level]++;
        }
      }
    });
    
    // Determine the most common level
    let proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    let maxCount = levelCounts.beginner;
    
    if (levelCounts.intermediate > maxCount) {
      proficiencyLevel = 'intermediate';
      maxCount = levelCounts.intermediate;
    }
    
    if (levelCounts.advanced > maxCount) {
      proficiencyLevel = 'advanced';
    }
    
    // Set the proficiency level and navigate to dashboard
    setProficiencyLevel(proficiencyLevel);
    toast.success(`Your proficiency level has been set to ${proficiencyLevel}`);
    navigate('/dashboard');
  };
  
  const skipQuiz = () => {
    setSkippingQuiz(true);
  };
  
  const confirmSkip = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setProficiencyLevel(level);
    toast.success(`Your proficiency level has been set to ${level}`);
    navigate('/dashboard');
  };
  
  if (skippingQuiz) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Choose Your Starting Level</h1>
            <p className="text-muted-foreground">
              Select the level that best describes your current proficiency in {profile?.selectedLanguage?.name}
            </p>
          </div>
          
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <Button 
              variant="outline" 
              className="w-full py-6 flex flex-col items-center justify-center h-auto"
              onClick={() => confirmSkip('beginner')}
            >
              <span className="text-lg font-medium mb-2">Beginner</span>
              <span className="text-sm text-muted-foreground text-center">
                I understand some words and phrases but rarely speak the language
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full py-6 flex flex-col items-center justify-center h-auto"
              onClick={() => confirmSkip('intermediate')}
            >
              <span className="text-lg font-medium mb-2">Intermediate</span>
              <span className="text-sm text-muted-foreground text-center">
                I can have basic conversations but sometimes struggle with vocabulary or grammar
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full py-6 flex flex-col items-center justify-center h-auto"
              onClick={() => confirmSkip('advanced')}
            >
              <span className="text-lg font-medium mb-2">Advanced</span>
              <span className="text-sm text-muted-foreground text-center">
                I can express myself fluently on most topics but want to improve specific areas
              </span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => setSkippingQuiz(false)}
            >
              Back to Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Proficiency Assessment</h1>
          <p className="text-lg text-muted-foreground">
            Let's determine your current level in {profile?.selectedLanguage?.name} to personalize your experience
          </p>
        </div>
        
        <div className="bg-card border rounded-lg p-6 mb-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}% complete
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                className="w-full text-left p-4 border rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-colors"
                onClick={() => handleAnswer(option.id)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Button variant="ghost" onClick={skipQuiz}>
            Skip Quiz and Set Level Manually
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProficiencyQuizPage;
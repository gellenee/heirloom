
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

type AuthMode = 'signin' | 'signup';

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  
  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    // Clear form when switching modes
    setEmail('');
    setPassword('');
    setName('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        toast.success('Signed in successfully');
        navigate('/dashboard');
      } else {
        await signUp(email, password, name);
        toast.success('Account created successfully');
        navigate('/language-selection');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(mode === 'signin' 
        ? 'Failed to sign in. Please check your credentials.' 
        : 'Failed to create account. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2 text-primary">
            Heirloom
          </h1>
          <h2 className="text-2xl mb-4">
            {mode === 'signin' ? 'Welcome Back' : 'Join Our Community'}
          </h2>
          <p className="text-muted-foreground">
            {mode === 'signin' 
              ? 'Sign in to continue your language learning journey' 
              : 'Create an account to start reconnecting with your heritage language'
            }
          </p>
        </div>
        
        <div className="bg-card border rounded-lg p-6 heritage-pattern">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-3 border rounded-md bg-background"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={mode === 'signup'}
                  disabled={isLoading}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-3 border rounded-md bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full p-3 border rounded-md bg-background"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading 
                ? 'Processing...' 
                : mode === 'signin' ? 'Sign In' : 'Create Account'
              }
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === 'signin' 
                ? "Don't have an account?" 
                : "Already have an account?"
              }
              <button
                type="button"
                onClick={toggleMode}
                className="ml-1 text-primary hover:underline"
                disabled={isLoading}
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../contexts/UserProfileContext';
import { languages } from '../data/mockData';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { user, signOut } = useAuth();
  const { profile, setLanguage, setProficiencyLevel } = useUserProfile();
  const navigate = useNavigate();
  
  const [selectedLanguageId, setSelectedLanguageId] = useState(
    profile?.selectedLanguage?.id || ''
  );
  const [proficiencyLevel, setProficiencyLevelState] = useState(
    profile?.proficiencyLevel || 'beginner'
  );
  
  const handleSaveSettings = () => {
    // Update language
    if (selectedLanguageId) {
      const language = languages.find(lang => lang.id === selectedLanguageId);
      if (language) {
        setLanguage(language);
      }
    }
    
    // Update proficiency level
    setProficiencyLevel(proficiencyLevel as 'beginner' | 'intermediate' | 'advanced');
    
    toast.success('Settings saved successfully');
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };
  
  if (!user || !profile) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Not Signed In</h1>
        <p className="mb-6">Please sign in to access settings.</p>
        <Button onClick={() => navigate('/auth')}>Sign In</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-md bg-muted/50"
                value={user.email}
                disabled
              />
              <p className="text-xs text-muted-foreground mt-1">
                Your email address cannot be changed
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Language Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Heritage Language</label>
              <select
                className="w-full p-3 border rounded-md"
                value={selectedLanguageId}
                onChange={(e) => setSelectedLanguageId(e.target.value)}
              >
                <option value="">Select a language</option>
                {languages.map(language => (
                  <option key={language.id} value={language.id}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Proficiency Level</label>
              <select
                className="w-full p-3 border rounded-md"
                value={proficiencyLevel}
                onChange={(e) => setProficiencyLevelState(e.target.value as any)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div>
              <Button onClick={handleSaveSettings}>
                Save Language Settings
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new conversation topics and practice reminders
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full bg-muted`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Show Translations</h3>
                <p className="text-sm text-muted-foreground">
                  Show translations by default in conversation practice
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full bg-primary`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6`}
                />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Data & Privacy</h2>
          
          <div className="space-y-4">
            <Button variant="outline">Download My Data</Button>
            <Button variant="outline" className="text-destructive">Delete My Account</Button>
          </div>
        </div>
        
        <div className="text-center">
          <Button variant="destructive" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
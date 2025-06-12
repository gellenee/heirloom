
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { languages } from '../data/mockData';

const ProfilePage = () => {
  // In a real implementation with Supabase, we would fetch this data from the database
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    targetLanguageId: '',
    proficiencyLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    learningGoals: [''],
    isEditing: true
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleGoalChange = (index: number, value: string) => {
    const updatedGoals = [...profile.learningGoals];
    updatedGoals[index] = value;
    setProfile(prev => ({
      ...prev,
      learningGoals: updatedGoals
    }));
  };
  
  const addGoal = () => {
    setProfile(prev => ({
      ...prev,
      learningGoals: [...prev.learningGoals, '']
    }));
  };
  
  const removeGoal = (index: number) => {
    const updatedGoals = profile.learningGoals.filter((_, i) => i !== index);
    setProfile(prev => ({
      ...prev,
      learningGoals: updatedGoals
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation with Supabase, we would save the profile data to the database
    setProfile(prev => ({
      ...prev,
      isEditing: false
    }));
    
    // For demo purposes, show a success message
    alert('Profile saved successfully!');
  };
  
  const startEditing = () => {
    setProfile(prev => ({
      ...prev,
      isEditing: true
    }));
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Your Profile</h1>
        
        {!profile.isEditing && profile.name ? (
          <div>
            <div className="bg-card border rounded-lg p-6 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.email}</p>
                </div>
                <Button onClick={startEditing}>Edit Profile</Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">Target Language</h3>
                  <p>{languages.find(l => l.id === profile.targetLanguageId)?.name || 'Not selected'}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Proficiency Level</h3>
                  <p className="capitalize">{profile.proficiencyLevel}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Learning Goals</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {profile.learningGoals.map((goal, index) => (
                      goal && <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
              <p className="text-muted-foreground mb-6">
                Track your conversation practice and language learning journey.
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
                <p className="text-muted-foreground">
                  You haven't practiced any conversations yet. Start practicing to see your activity here!
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Favorite Topics</h3>
                <p className="text-muted-foreground">
                  You haven't saved any favorite topics yet.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {profile.name ? 'Edit Your Profile' : 'Create Your Profile'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full p-3 border rounded-md"
                  value={profile.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full p-3 border rounded-md"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="targetLanguageId">
                  Target Heritage Language
                </label>
                <select
                  id="targetLanguageId"
                  name="targetLanguageId"
                  required
                  className="w-full p-3 border rounded-md"
                  value={profile.targetLanguageId}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium mb-2" htmlFor="proficiencyLevel">
                  Current Proficiency Level
                </label>
                <select
                  id="proficiencyLevel"
                  name="proficiencyLevel"
                  required
                  className="w-full p-3 border rounded-md"
                  value={profile.proficiencyLevel}
                  onChange={handleInputChange}
                >
                  <option value="beginner">Beginner - I understand some but rarely speak</option>
                  <option value="intermediate">Intermediate - I can have basic conversations</option>
                  <option value="advanced">Advanced - I'm conversational but want to improve</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Learning Goals
                </label>
                <p className="text-sm text-muted-foreground mb-4">
                  What do you hope to achieve with your heritage language practice?
                </p>
                
                {profile.learningGoals.map((goal, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      className="flex-1 p-3 border rounded-md"
                      value={goal}
                      onChange={(e) => handleGoalChange(index, e.target.value)}
                      placeholder="e.g., Talk to my grandparents in their native language"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => removeGoal(index)}
                      disabled={profile.learningGoals.length <= 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addGoal}
                  className="mt-2"
                >
                  Add Another Goal
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <Button type="submit" className="w-full">
                  Save Profile
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
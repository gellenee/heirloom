
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useUserProfile } from '../contexts/UserProfileContext';
import { conversationTopics } from '../data/mockData';

const DashboardPage = () => {
  const { profile } = useUserProfile();
  
  if (!profile?.selectedLanguage) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Setup Required</h1>
        <p className="mb-6">Please select your heritage language to continue.</p>
        <Link to="/language-selection">
          <Button>Select Language</Button>
        </Link>
      </div>
    );
  }
  
  // Get recommended topics based on proficiency level
  const recommendedTopics = conversationTopics.filter(topic => 
    topic.difficulty === profile.proficiencyLevel
  ).slice(0, 3);
  
  // Get favorite topics
  const favoriteTopics = conversationTopics.filter(topic => 
    profile.favoriteTopics.includes(topic.id)
  ).slice(0, 3);
  
  // Get completed topics
  const completedTopics = conversationTopics.filter(topic => 
    profile.completedTopics.includes(topic.id)
  ).slice(0, 3);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border rounded-lg p-6 mb-8 heritage-pattern">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2 text-primary">Welcome Back!</h1>
              <p className="text-muted-foreground">
                Continue your journey with {profile.selectedLanguage.name}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/practice">
                <Button size="lg">Start Conversation Practice</Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Heritage Language</h3>
              <p className="text-2xl font-bold">{profile.selectedLanguage.name}</p>
            </div>
            
            <div className="bg-background p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Proficiency Level</h3>
              <p className="text-2xl font-bold capitalize">{profile.proficiencyLevel}</p>
            </div>
            
            <div className="bg-background p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Topics Completed</h3>
              <p className="text-2xl font-bold">{profile.completedTopics.length}</p>
            </div>
          </div>
        </div>
        
        {/* Recommended Topics */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif font-semibold text-primary">Recommended for You</h2>
            <Link to="/practice" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          
          {recommendedTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedTopics.map(topic => (
                <div key={topic.id} className="border rounded-lg overflow-hidden bg-card">
                  {topic.imageUrl && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={topic.imageUrl} 
                        alt={topic.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                    <Link to={`/practice?topicId=${topic.id}`}>
                      <Button variant="outline" className="w-full">Practice</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 p-6 rounded-lg text-center border">
              <p className="mb-4">No recommendations available yet. Start practicing to get personalized recommendations!</p>
              <Link to="/practice">
                <Button>Browse Topics</Button>
              </Link>
            </div>
          )}
        </section>
        
        {/* Favorite Topics */}
        {favoriteTopics.length > 0 && (
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-serif font-semibold text-primary">Your Favorites</h2>
              <Link to="/practice" className="text-primary hover:underline">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {favoriteTopics.map(topic => (
                <div key={topic.id} className="border rounded-lg overflow-hidden bg-card">
                  {topic.imageUrl && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={topic.imageUrl} 
                        alt={topic.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                    <Link to={`/practice?topicId=${topic.id}`}>
                      <Button variant="outline" className="w-full">Practice</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Recent Activity */}
        <section>
          <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">Recent Activity</h2>
          
          {completedTopics.length > 0 ? (
            <div className="bg-card border rounded-lg divide-y">
              {completedTopics.map(topic => (
                <div key={topic.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                  <Link to={`/practice?topicId=${topic.id}`}>
                    <Button variant="outline" size="sm">Practice Again</Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 p-6 rounded-lg text-center border">
              <p className="mb-4">You haven't completed any conversation practice yet.</p>
              <Link to="/practice">
                <Button>Start Practicing</Button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
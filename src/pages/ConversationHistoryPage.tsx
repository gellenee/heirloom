
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useUserProfile } from '../contexts/UserProfileContext';
import { conversationTopics } from '../data/mockData';

type HistoryFilter = 'all' | 'completed' | 'favorites';

const ConversationHistoryPage = () => {
  const { profile } = useUserProfile();
  const [filter, setFilter] = useState<HistoryFilter>('all');
  
  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p className="mb-6">Please sign in to view your conversation history.</p>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }
  
  // Get completed topics
  const completedTopics = conversationTopics.filter(topic => 
    profile.completedTopics.includes(topic.id)
  );
  
  // Get favorite topics
  const favoriteTopics = conversationTopics.filter(topic => 
    profile.favoriteTopics.includes(topic.id)
  );
  
  // Filter topics based on selected filter
  const filteredTopics = filter === 'all' 
    ? [...new Set([...completedTopics, ...favoriteTopics])]
    : filter === 'completed' 
      ? completedTopics 
      : favoriteTopics;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Conversation History</h1>
        
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedTopics.length})
            </Button>
            <Button 
              variant={filter === 'favorites' ? 'default' : 'outline'}
              onClick={() => setFilter('favorites')}
            >
              Favorites ({favoriteTopics.length})
            </Button>
          </div>
          
          {filteredTopics.length > 0 ? (
            <div className="divide-y">
              {filteredTopics.map(topic => (
                <div key={topic.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        topic.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        topic.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      }`}>
                        {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                      </span>
                      {profile.completedTopics.includes(topic.id) && (
                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                      {profile.favoriteTopics.includes(topic.id) && (
                        <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-1 rounded-full flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          Favorite
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link to={`/practice?topicId=${topic.id}`}>
                      <Button variant="outline" size="sm">
                        Practice Again
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                {filter === 'all' 
                  ? "You haven't practiced any conversations yet." 
                  : filter === 'completed' 
                    ? "You haven't completed any conversations yet." 
                    : "You haven't added any favorites yet."
                }
              </p>
              <Link to="/practice">
                <Button>Start Practicing</Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Statistics */}
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Topics Completed</h3>
              <p className="text-2xl font-bold">{profile.completedTopics.length}</p>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Favorite Topics</h3>
              <p className="text-2xl font-bold">{profile.favoriteTopics.length}</p>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Current Language</h3>
              <p className="text-2xl font-bold">{profile.selectedLanguage?.name || 'None'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationHistoryPage;
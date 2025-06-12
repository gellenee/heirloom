
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { conversationTopics } from '../data/mockData';

type DifficultyLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';
type Category = 'all' | 'Family' | 'Relationships' | 'Culture' | 'Personal';

const ConversationTopicsPage = () => {
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel>('all');
  const [categoryFilter, setCategoryFilter] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = conversationTopics.filter(topic => {
    // Apply difficulty filter
    if (difficultyFilter !== 'all' && topic.difficulty !== difficultyFilter) {
      return false;
    }
    
    // Apply category filter
    if (categoryFilter !== 'all' && topic.category !== categoryFilter) {
      return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.emotionalContext.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const categories = ['Family', 'Relationships', 'Culture', 'Personal'];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Conversation Topics</h1>
      
      {/* Filters */}
      <div className="mb-8 space-y-6">
        <div>
          <input
            type="text"
            placeholder="Search topics..."
            className="w-full p-3 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Difficulty Level</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={difficultyFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter('all')}
              >
                All Levels
              </Button>
              <Button 
                variant={difficultyFilter === 'beginner' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter('beginner')}
              >
                Beginner
              </Button>
              <Button 
                variant={difficultyFilter === 'intermediate' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter('intermediate')}
              >
                Intermediate
              </Button>
              <Button 
                variant={difficultyFilter === 'advanced' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter('advanced')}
              >
                Advanced
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={categoryFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter('all')}
              >
                All Categories
              </Button>
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={categoryFilter === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter(category as Category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map(topic => (
          <div key={topic.id} className="border rounded-lg overflow-hidden bg-card">
            {topic.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={topic.imageUrl} 
                  alt={topic.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{topic.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  topic.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  topic.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                }`}>
                  {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{topic.description}</p>
              <div className="mb-4">
                <span className="text-sm font-medium">Emotional Context: </span>
                <span className="text-sm text-muted-foreground">{topic.emotionalContext}</span>
              </div>
              <div className="mb-6">
                <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md">
                  {topic.category}
                </span>
              </div>
              <Link to={`/practice/${topic.id}`}>
                <Button className="w-full">Practice This Topic</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No topics found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
          <Button onClick={() => {
            setDifficultyFilter('all');
            setCategoryFilter('all');
            setSearchQuery('');
          }}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConversationTopicsPage;
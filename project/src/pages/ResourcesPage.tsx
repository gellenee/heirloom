
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { resources } from '../data/mockData';

type ResourceType = 'all' | 'article' | 'video' | 'podcast' | 'book' | 'website';

const ResourcesPage = () => {
  const [typeFilter, setTypeFilter] = useState<ResourceType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredResources = resources.filter(resource => {
    // Apply type filter
    if (typeFilter !== 'all' && resource.type !== typeFilter) {
      return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  const resourceTypeIcons = {
    article: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
    ),
    video: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
    ),
    podcast: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones"><path d="M3 14h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h2"/></svg>
    ),
    book: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
    ),
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    )
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Heritage Language Resources</h1>
      
      <div className="mb-8 space-y-6">
        <div>
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full p-3 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Resource Type</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={typeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('all')}
            >
              All Types
            </Button>
            <Button 
              variant={typeFilter === 'article' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('article')}
            >
              Articles
            </Button>
            <Button 
              variant={typeFilter === 'video' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('video')}
            >
              Videos
            </Button>
            <Button 
              variant={typeFilter === 'podcast' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('podcast')}
            >
              Podcasts
            </Button>
            <Button 
              variant={typeFilter === 'book' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('book')}
            >
              Books
            </Button>
            <Button 
              variant={typeFilter === 'website' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('website')}
            >
              Websites
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="border rounded-lg p-6 bg-card">
            <div className="flex items-start mb-4">
              <div className="mr-4 text-primary">
                {resourceTypeIcons[resource.type]}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{resource.title}</h3>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{resource.description}</p>
            <div className="mb-4">
              <span className="text-sm font-medium">Language: </span>
              <span className="text-sm text-muted-foreground">{resource.language}</span>
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
              {resource.tags.map((tag, index) => (
                <span key={index} className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline" className="w-full">
                View Resource
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </Button>
            </a>
          </div>
        ))}
      </div>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No resources found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
          <Button onClick={() => {
            setTypeFilter('all');
            setSearchQuery('');
          }}>
            Reset Filters
          </Button>
        </div>
      )}
      
      <div className="mt-12 p-6 bg-muted/30 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Suggest a Resource</h2>
        <p className="mb-6">
          Do you know of a great resource for heritage language learners? We'd love to add it to our collection!
        </p>
        <Button>
          Submit a Resource
        </Button>
      </div>
    </div>
  );
};

export default ResourcesPage;
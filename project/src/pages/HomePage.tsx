
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { languages } from '../data/mockData';
import { useState } from 'react';

const HomePage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 heritage-pattern">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-primary">
            Heirloom
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
            Reconnect with your family's language and cultural roots
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Practice meaningful conversations in your heritage language in a supportive, 
            emotionally rich environment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/topics">
              <Button size="lg" className="font-medium">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Language Selection */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-primary">
            Your Family's Language
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Select the language that connects you to your heritage and family traditions
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {languages.map((language) => (
              <button
                key={language.id}
                className={`p-4 rounded-lg border transition-all ${
                  selectedLanguage === language.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
                }`}
                onClick={() => setSelectedLanguage(language.id)}
              >
                <div className="text-lg font-medium">{language.name}</div>
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            {selectedLanguage ? (
              <Link to="/topics">
                <Button size="lg">
                  Continue with {languages.find(l => l.id === selectedLanguage)?.name}
                </Button>
              </Link>
            ) : (
              <Button size="lg" disabled>
                Select a language to continue
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-primary">
            Nurture Your Cultural Roots
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Heirloom helps you strengthen your connection to your heritage through language
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/></svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Family Conversations</h3>
              <p className="text-muted-foreground">
                Practice the conversations that matter most - expressing love, sharing memories, discussing traditions with family members.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/></svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Cultural Context</h3>
              <p className="text-muted-foreground">
                Learn language within its authentic cultural context, including traditions, customs, and values.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"/><path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z"/><path d="M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z"/></svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Intergenerational Bonds</h3>
              <p className="text-muted-foreground">
                Bridge the gap between generations by learning to communicate with older family members in their native language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-primary">
            Family Stories
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Hear from people who've reconnected with their heritage through language
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Maria C.</h4>
                  <p className="text-sm text-muted-foreground">Spanish Heritage Speaker</p>
                </div>
              </div>
              <p className="italic">
                "For years I could understand Spanish but froze when trying to speak with my grandparents. 
                Heirloom helped me practice the exact conversations I wanted to have with them. 
                Last month, I finally told my abuela how much she means to me—in Spanish!"
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">David L.</h4>
                  <p className="text-sm text-muted-foreground">Mandarin Heritage Speaker</p>
                </div>
              </div>
              <p className="italic">
                "I always felt disconnected from my Chinese heritage because I couldn't express myself 
                well in Mandarin. The emotional vocabulary practice here helped me finally discuss 
                deeper topics with my parents instead of just small talk."
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Priya K.</h4>
                  <p className="text-sm text-muted-foreground">Hindi Heritage Speaker</p>
                </div>
              </div>
              <p className="italic">
                "Growing up in America, I lost touch with Hindi. When my grandmother got sick, 
                I couldn't express my feelings to her. Heirloom helped me practice those 
                emotional conversations I was afraid to have."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 heritage-pattern">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4 text-primary">
            Reclaim Your Family's Language
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your journey to confident, meaningful conversations in your heritage language today.
          </p>
          <Link to="/topics">
            <Button size="lg" className="font-medium">
              Begin Your Practice
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
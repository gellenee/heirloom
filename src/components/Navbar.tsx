
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../contexts/UserProfileContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { profile } = useUserProfile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-serif font-bold text-primary">Heirloom</span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Desktop navigation */}
        {user ? (
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/practice" className="text-foreground hover:text-primary transition-colors">
              Practice
            </Link>
            <Link to="/history" className="text-foreground hover:text-primary transition-colors">
              History
            </Link>
            <Link to="/settings" className="text-foreground hover:text-primary transition-colors">
              Settings
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <ModeToggle />
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
            <ModeToggle />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <div className="flex flex-col space-y-4">
            {user ? (
              <>
                <div className="py-2 border-b">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user.email}</span>
                  </div>
                  {profile?.selectedLanguage && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Learning: {profile.selectedLanguage.name}
                    </div>
                  )}
                </div>
                <Link 
                  to="/dashboard" 
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/practice" 
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Practice
                </Link>
                <Link 
                  to="/history" 
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </Link>
                <Link 
                  to="/settings" 
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full">Sign In</Button>
              </Link>
            )}
            <div className="py-2 flex justify-center">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
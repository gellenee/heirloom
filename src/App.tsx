
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import LanguageSelectionPage from './pages/LanguageSelectionPage';
import ProficiencyQuizPage from './pages/ProficiencyQuizPage';
import DashboardPage from './pages/DashboardPage';
import ConversationPracticePage from './pages/ConversationPracticePage';
import ConversationHistoryPage from './pages/ConversationHistoryPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="heritage-language-theme">
      <Router>
        <AppRoutes />
        <Toaster position="top-center" />
      </Router>
    </ThemeProvider>
  );
}

function AppRoutes() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
          
          {/* Protected routes */}
          <Route path="/language-selection" element={user ? <LanguageSelectionPage /> : <Navigate to="/auth" />} />
          <Route path="/proficiency-quiz" element={user ? <ProficiencyQuizPage /> : <Navigate to="/auth" />} />
          <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/auth" />} />
          <Route path="/practice" element={user ? <ConversationPracticePage /> : <Navigate to="/auth" />} />
          <Route path="/history" element={user ? <ConversationHistoryPage /> : <Navigate to="/auth" />} />
          <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/auth" />} />
          
          {/* Redirect root to auth or dashboard */}
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LanguageProvider } from "@/hooks/use-language";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import { FloatingShapes } from "@/components/background/floating-shapes";
import { LoadingScreen } from "@/components/ui/loading-screen";

// Pages
import Dashboard from "@/pages/dashboard";
import Messages from "@/pages/messages";
import AiReplies from "@/pages/ai-replies";
import Analytics from "@/pages/analytics";
import Stores from "@/pages/stores";
import Subscriptions from "@/pages/subscriptions";
import Tickets from "@/pages/tickets";
import Admins from "@/pages/admins";
import KnowledgeBase from "@/pages/knowledge-base";
import Notifications from "@/pages/notifications";
import SystemSettings from "@/pages/system-settings";
import Feedback from "@/pages/feedback";
import NotFound from "@/pages/not-found";
import Auth from "@/pages/auth";
import StoreDashboard from "@/pages/store-dashboard";
import InvitesOffers from "@/pages/invites-offers";
import Tutorials from "@/pages/tutorials";

import { queryClient } from "@/lib/queryClient";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user was previously authenticated
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Add useNavigate hook
  let navigate: ReturnType<typeof useNavigate> | null = null;
  try {
    // Only call useNavigate inside Router context
    navigate = useNavigate();
  } catch {}

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    // Redirect to dashboard after login
    if (navigate) {
      navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/auth';
  };

  // Check if user is on auth page
  const isAuthPage = window.location.pathname === '/auth';

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <LanguageProvider>
          <LoadingScreen isLoading={isLoading} onComplete={handleLoadingComplete} />

          {!isLoading && (
            <Router>
              {!isAuthenticated ? (
                <Auth onAuth={handleAuth} />
              ) : (
                <div className="min-h-screen text-foreground relative overflow-hidden">
                  <FloatingShapes />
                  <div className="flex h-screen relative z-10">
                    <Sidebar />
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <TopBar onLogout={handleLogout} />
                      <main className="flex-1 overflow-auto p-6 space-y-6">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/messages" element={<Messages />} />
                          <Route path="/ai-replies" element={<AiReplies />} />
                          <Route path="/analytics" element={<Analytics />} />
                          <Route path="/stores" element={<Stores />} />
                          <Route path="/stores/:id/dashboard" element={<StoreDashboard />} />
                          <Route path="/subscriptions" element={<Subscriptions />} />
                          <Route path="/tickets" element={<Tickets />} />
                          <Route path="/admins" element={<Admins />} />
                          <Route path="/knowledge-base" element={<KnowledgeBase />} />
                          <Route path="/notifications" element={<Notifications />} />
                          <Route path="/system-settings" element={<SystemSettings />} />
                          <Route path="/feedback" element={<Feedback />} />
                          <Route path="/invites-offers" element={<InvitesOffers />} />
                          <Route path="/tutorials" element={<Tutorials />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </div>
              )}
              <Toaster />
            </Router>
          )}
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
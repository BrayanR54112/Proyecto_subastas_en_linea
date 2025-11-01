import { useState } from 'react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { PublicHeader } from './components/PublicHeader';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardSidebar } from './components/DashboardSidebar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { LoginPage } from './components/pages/LoginPage';

// Dashboard Views
import { DashboardMain } from './components/dashboard/DashboardMain';
import { UploadProduct } from './components/dashboard/UploadProduct';
import { UserProfile } from './components/dashboard/UserProfile';
import { LiveAuctionView } from './components/dashboard/LiveAuctionView';
import { ChatView } from './components/dashboard/ChatView';
import { OrderTracking } from './components/dashboard/OrderTracking';
import { HeatMap } from './components/dashboard/HeatMap';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [dashboardView, setDashboardView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setDashboardView('browse');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Public pages
  if (!isAuthenticated) {
    if (currentPage === 'login') {
      return <LoginPage />;
    }

    return (
      <div className="min-h-screen bg-black">
        <PublicHeader onNavigate={setCurrentPage} currentPage={currentPage} />
        
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        
        <Footer />
      </div>
    );
  }

  // Dashboard (authenticated)
  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader 
        onViewChange={setDashboardView} 
        onSearch={handleSearch} 
        onToggleSidebar={toggleSidebar}
      />
      <DashboardSidebar 
        activeView={dashboardView} 
        onViewChange={setDashboardView}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="ml-0 lg:ml-64 pt-24 pb-12 px-4 lg:px-8">
        {dashboardView === 'dashboard' && <DashboardMain onViewLive={() => setDashboardView('buy')} />}
        {dashboardView === 'upload' && <UploadProduct />}
        {dashboardView === 'buy' && <LiveAuctionView onNavigateToChat={() => setDashboardView('chat')} />}
        {dashboardView === 'browse' && <DashboardMain onViewLive={() => setDashboardView('buy')} />}
        {dashboardView === 'profile' && <UserProfile />}
        {dashboardView === 'orders' && <OrderTracking />}
        {dashboardView === 'chat' && <ChatView />}
        {dashboardView === 'heatmap' && <HeatMap />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

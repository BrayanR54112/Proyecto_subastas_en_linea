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
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [dashboardView, setDashboardView] = useState('dashboard');
  const [selectedAuctionId, setSelectedAuctionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setDashboardView('browse');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // --- FUNCIÓN PARA USUARIOS AUTENTICADOS ---
  const handleViewAuction = (auctionId: string) => {
    setSelectedAuctionId(auctionId);
    setDashboardView('buy'); 
  };

  // --- ¡NUEVA FUNCIÓN! ---
  // Para usuarios PÚBLICOS. Si hacen clic en una subasta, los mandamos al login.
  const handlePublicViewAuction = () => {
    setCurrentPage('login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-red-600 tracking-wider text-2xl">
          Cargando...
        </h1>
      </div>
    );
  }

  // Public pages
  if (!isAuthenticated) {
    if (currentPage === 'login') {
      return <LoginPage />;
    }

    return (
      <div className="min-h-screen bg-black">
        <PublicHeader onNavigate={setCurrentPage} currentPage={currentPage} />
        
        {/* --- ¡AQUÍ ESTÁ LA LÍNEA QUE ARREGLA EL ERROR! --- */}
        {/* Le pasamos la nueva función 'handlePublicViewAuction' a HomePage */}
        {currentPage === 'home' && <HomePage onViewAuction={handlePublicViewAuction} />}
        
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
        {/* --- ¡LÓGICA ACTUALIZADA AQUÍ! --- */}
        
        {dashboardView === 'dashboard' && <DashboardMain onViewLive={handleViewAuction} />}
        {dashboardView === 'upload' && <UploadProduct />}
        
        {/* Solo mostramos LiveAuctionView SI tenemos un ID seleccionado */}
        {dashboardView === 'buy' && selectedAuctionId && (
          <LiveAuctionView 
            auctionId={selectedAuctionId}
            onNavigateToChat={() => setDashboardView('chat')} 
          />
        )}

        {dashboardView === 'browse' && <DashboardMain onViewLive={handleViewAuction} />}
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
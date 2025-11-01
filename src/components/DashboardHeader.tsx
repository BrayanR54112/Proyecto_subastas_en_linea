import { Bell, LogOut, Search, User, Menu } from 'lucide-react';
import { Badge } from './ui/badge';
import { useState, useEffect, useRef } from 'react';
import { mockNotifications } from '../lib/mockData';
import { useAuth } from '../lib/AuthContext';

interface DashboardHeaderProps {
  onViewChange: (view: string) => void;
  onSearch: (query: string) => void;
  onToggleSidebar: () => void;
}

export function DashboardHeader({ onViewChange, onSearch, onToggleSidebar }: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notificationsRef = useRef<HTMLDivElement>(null);
  
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  // Cerrar notificaciones al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-900/20">
      <div className="flex items-center justify-between h-20 px-4 lg:px-8 ml-0 lg:ml-64">
        {/* Logo & Search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Menu button para móviles */}
          <button 
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <h1 className="text-red-600 tracking-wider hidden md:block">¿QUIÉN DA MÁS?</h1>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
              <Search className="w-4 h-4 text-white/50" />
              <input 
                type="text" 
                placeholder="Buscar subastas, categorías..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder:text-white/50 w-full"
              />
            </div>
          </form>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5 text-white/80" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-600 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-white">Notificaciones</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer ${
                        !notif.read ? 'bg-red-600/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <p className="text-white text-sm mb-1">{notif.title}</p>
                          <p className="text-white/60 text-xs mb-2">{notif.message}</p>
                          <p className="text-white/40 text-xs">
                            {notif.timestamp.toLocaleTimeString('es-ES', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <button 
            onClick={() => onViewChange('profile')}
            className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-white hidden md:block">{user?.name}</span>
          </button>

          {/* Logout */}
          <button 
            onClick={logout}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/80 hover:text-red-600"
            title="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

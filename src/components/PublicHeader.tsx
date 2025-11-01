import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface PublicHeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function PublicHeader({ onNavigate, currentPage }: PublicHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-900/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="hover:opacity-80 transition-opacity">
            <h1 className="text-red-600 tracking-wider">¿QUIÉN DA MÁS?</h1>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => onNavigate('home')}
              className={`transition-colors ${currentPage === 'home' ? 'text-red-600' : 'text-white/80 hover:text-white'}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className={`transition-colors ${currentPage === 'about' ? 'text-red-600' : 'text-white/80 hover:text-white'}`}
            >
              Acerca de Nosotros
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className={`transition-colors ${currentPage === 'contact' ? 'text-red-600' : 'text-white/80 hover:text-white'}`}
            >
              Contacto
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => onNavigate('login')}
              className="hidden md:flex bg-red-600 hover:bg-red-700"
            >
              Iniciar Sesión
            </Button>

            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className={`text-left py-2 ${currentPage === 'home' ? 'text-red-600' : 'text-white/80'}`}
              >
                Inicio
              </button>
              <button 
                onClick={() => {
                  onNavigate('about');
                  setIsMenuOpen(false);
                }}
                className={`text-left py-2 ${currentPage === 'about' ? 'text-red-600' : 'text-white/80'}`}
              >
                Acerca de Nosotros
              </button>
              <button 
                onClick={() => {
                  onNavigate('contact');
                  setIsMenuOpen(false);
                }}
                className={`text-left py-2 ${currentPage === 'contact' ? 'text-red-600' : 'text-white/80'}`}
              >
                Contacto
              </button>
              <Button 
                onClick={() => {
                  onNavigate('login');
                  setIsMenuOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 w-full"
              >
                Iniciar Sesión
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

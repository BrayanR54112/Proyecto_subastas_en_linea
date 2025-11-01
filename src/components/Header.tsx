import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-900/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <h1 className="text-red-600 tracking-wider">¿QUIÉN DA MÁS?</h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors">Inicio</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Subastas</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Categorías</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Mis Ofertas</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Contacto</a>
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
              <Search className="w-4 h-4 text-white/50" />
              <input 
                type="text" 
                placeholder="Buscar subastas..." 
                className="bg-transparent border-none outline-none text-white placeholder:text-white/50 w-48"
              />
            </div>
            
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-white/80" />
            </button>
            
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <User className="w-5 h-5 text-white/80" />
            </button>

            <Button className="hidden md:flex bg-red-600 hover:bg-red-700">
              Crear Subasta
            </Button>

            <button className="lg:hidden p-2">
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

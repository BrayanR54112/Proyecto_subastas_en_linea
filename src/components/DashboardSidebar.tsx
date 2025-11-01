import { Upload, ShoppingCart, Gavel, Home, User, Package, Map, X } from 'lucide-react';

interface DashboardSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ activeView, onViewChange, isOpen, onClose }: DashboardSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'upload', label: 'Subir Artículo', icon: Upload },
    { id: 'buy', label: 'Comprar Artículo', icon: ShoppingCart },
    { id: 'browse', label: 'Navegar Subastas', icon: Gavel },
    { id: 'profile', label: 'Mi Perfil', icon: User },
    { id: 'orders', label: 'Mis Pedidos', icon: Package },
    { id: 'heatmap', label: 'Mapa de Calor', icon: Map }
  ];

  const handleItemClick = (viewId: string) => {
    onViewChange(viewId);
    // Cerrar el sidebar en móviles después de seleccionar
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-20 bottom-0 w-64 bg-zinc-900 border-r border-white/5 overflow-y-auto z-50 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Close button para móviles */}
        <div className="lg:hidden p-4 flex justify-end border-b border-white/5">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeView === item.id
                      ? 'bg-red-600 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

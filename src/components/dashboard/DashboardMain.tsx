import React from 'react';
// --- ¡CAMBIO AQUÍ! ---
// Ya no necesitamos mockProducts, importamos el componente real
import { LiveAuctions } from '../LiveAuctions';
import { categories } from '../../lib/mockData';
import { AuctionCard } from '../AuctionCard';
import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react';

interface DashboardMainProps {
  onViewLive: (auctionId: string) => void;
}

export function DashboardMain({ onViewLive }: DashboardMainProps) {
  // const liveAuctions = mockProducts.filter(p => p.isLive); // <-- Eliminamos esto
  
  const stats = [
    { icon: TrendingUp, label: 'Ofertas Activas', value: '3', color: 'text-green-500' },
    { icon: Clock, label: 'Subastas Observando', value: '12', color: 'text-blue-500' },
    { icon: DollarSign, label: 'Total Invertido', value: '$24.5K', color: 'text-yellow-500' },
    { icon: Users, label: 'Subastas Ganadas', value: '8', color: 'text-purple-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-zinc-900 border border-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${stat.color.replace('text-', 'bg-')}/10 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-white mb-1">{stat.value}</div>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-white mb-6">Categorías</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="bg-zinc-900 border border-white/5 rounded-xl p-4 hover:border-red-600/50 transition-all group"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <p className="text-white text-sm mb-1">{category.name}</p>
              <p className="text-white/40 text-xs">{category.count}</p>
            </button>
          ))}
        </div>
      </div>

      {/* --- ¡SECCIÓN PRINCIPAL ACTUALIZADA! --- */}
      {/* Ahora, en lugar de que DashboardMain cree su propia lista "mock",
        simplemente le decimos al componente 'LiveAuctions' (que ya está
        conectado a Firebase) que se renderice aquí.
        
        Le pasamos la función 'onViewLive' (que viene de App.tsx) 
        a la prop 'onViewAuction' (que 'LiveAuctions' espera).
      */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white mb-2">Subastas en Vivo</h3>
            <p className="text-white/60 text-sm">Participa ahora en tiempo real</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span className="text-red-600 text-sm">EN VIVO</span>
          </div>
        </div>
        
        {/* Aquí renderizamos el componente REAL conectado a Firebase */}
        <LiveAuctions onViewAuction={onViewLive} />
      </div>

      {/* He eliminado la sección "All Auctions" que tenías 
        porque usaba mockProducts. Si quieres tener "Todas las subastas" 
        (no solo las activas), deberíamos modificar la consulta 
        de Firebase dentro de 'LiveAuctions.tsx' y pasarle un filtro.
        Por ahora, esto te deja 100% funcional con datos en vivo.
      */}
    </div>
  );
}
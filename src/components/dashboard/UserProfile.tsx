import { Star, Package, Clock, Award, Edit } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { mockProducts } from '../../lib/mockData';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function UserProfile() {
  const { user } = useAuth();

  const userProducts = mockProducts.slice(0, 3);
  const upcomingProducts = mockProducts.slice(3, 5);

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white flex-shrink-0">
            <span className="text-5xl">{user?.name.charAt(0)}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white mb-2">{user?.name}</h3>
                <p className="text-white/60">{user?.email}</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <Edit className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(user?.rating || 0)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white">{user?.rating}</span>
              <span className="text-white/40">({user?.totalAuctions} valoraciones)</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-red-600" />
                  <span className="text-white/60 text-sm">Subastas Activas</span>
                </div>
                <div className="text-white">{user?.activeSales}</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-white/60 text-sm">Próximas</span>
                </div>
                <div className="text-white">{user?.upcomingSales}</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-yellow-600" />
                  <span className="text-white/60 text-sm">Total Subastas</span>
                </div>
                <div className="text-white">{user?.totalAuctions}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Auctions */}
      <div>
        <h3 className="text-white mb-6">Productos que Estoy Subastando</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userProducts.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-zinc-800">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-white mb-2 line-clamp-1">{product.title}</h4>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/50 text-sm">Oferta actual</span>
                  <span className="text-red-500">${product.currentBid.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Ofertas: {product.bids}</span>
                  <span className="text-white/80">{product.timeLeft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Auctions */}
      <div>
        <h3 className="text-white mb-6">Próximas Subastas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingProducts.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-white/5 rounded-xl p-6">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-zinc-800 rounded-lg flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white mb-2">{product.title}</h4>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/50">Precio inicial</span>
                    <span className="text-red-500">${product.startingBid.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/40" />
                    <span className="text-white/60 text-sm">Inicia en 2 días</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
        <h3 className="text-white mb-6">Resumen de Rendimiento</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-white/50 text-sm mb-2">Tasa de Éxito</p>
            <p className="text-white text-2xl mb-1">87%</p>
            <p className="text-green-500 text-sm">+5% este mes</p>
          </div>
          <div>
            <p className="text-white/50 text-sm mb-2">Tiempo Promedio</p>
            <p className="text-white text-2xl mb-1">4.2h</p>
            <p className="text-blue-500 text-sm">Por subasta</p>
          </div>
          <div>
            <p className="text-white/50 text-sm mb-2">Valor Total Vendido</p>
            <p className="text-white text-2xl mb-1">$145K</p>
            <p className="text-yellow-500 text-sm">Último año</p>
          </div>
          <div>
            <p className="text-white/50 text-sm mb-2">Calificación</p>
            <p className="text-white text-2xl mb-1">{user?.rating}/5.0</p>
            <p className="text-purple-500 text-sm">Excelente</p>
          </div>
        </div>
      </div>
    </div>
  );
}

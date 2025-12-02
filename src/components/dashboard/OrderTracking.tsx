import { Package, Truck, CheckCircle, MapPin, Clock } from 'lucide-react';
import { type ShippingStatus } from '../../lib/mockData'; 
import { Badge } from '../ui/badge';


const medellinShippingStatus: ShippingStatus = {
  productId: 'macbook-demo-123',
  status: 'shipped', 
  trackingNumber: 'SERVI123456COL',
  estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 
  updates: [
    {
      status: 'Empacado',
      location: 'Bodega Central - Bogotá, Cundinamarca',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) 
    },
    {
      status: 'En tránsito',
      location: 'Centro de distribución - Itagüí, Antioquia',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) 
    },
    {
      status: 'En ruta de entrega',
      location: 'Medellín, Antioquia',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ],
  
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  endTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), 
  
} as any; 

export function OrderTracking() {
 
  const status = medellinShippingStatus;

  const getStatusIcon = (s: string) => {
    if (s === 'packed') return Package;
    if (s === 'shipped') return Truck;
    return CheckCircle;
  };

  const StatusIcon = getStatusIcon(status.status);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h3 className="text-white mb-2">Seguimiento de Pedidos</h3>
        <p className="text-white/60">Rastrea tus artículos ganados</p>
      </div>

      {/* Order Card */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden mb-8">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-white mb-2">MacBook Pro M3 Max 2024</h4>
              <p className="text-white/60 text-sm mb-2">Pedido #{status.trackingNumber}</p>
              <Badge className={`${
                status.status === 'packed' ? 'bg-blue-600' :
                status.status === 'shipped' ? 'bg-yellow-600' :
                'bg-green-600'
              }`}>
                {status.status === 'packed' ? 'Empacado' :
                  status.status === 'shipped' ? 'En Tránsito' :
                  'Entregado'}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-sm mb-1">Entrega estimada</p>
              <p className="text-white">
                {status.estimatedDelivery.toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Status Progress */}
        <div className="p-6">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/10" />
            <div 
              className="absolute left-5 top-0 w-0.5 bg-red-600 transition-all duration-1000"
              style={{ height: `${(status.updates.length / 4) * 100}%` }}
            />

            {/* Status Points */}
            <div className="space-y-8">
              {status.updates.map((update: any, index: number) => { 
                const isLatest = index === status.updates.length - 1;
                return (
                  <div key={index} className="relative pl-12">
                    <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isLatest ? 'bg-red-600' : 'bg-zinc-800'
                    }`}>
                      {isLatest ? (
                        <StatusIcon className="w-5 h-5 text-white" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-white/60" />
                      )}
                    </div>
                    <div>
                      <h4 className={`mb-1 ${isLatest ? 'text-white' : 'text-white/80'}`}>
                        {update.status}
                      </h4>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-white/40" />
                        <p className="text-white/60 text-sm">{update.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white/40" />
                        <p className="text-white/40 text-sm">
                          {update.timestamp.toLocaleDateString('es-ES')} - {' '}
                          {update.timestamp.toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Future Steps */}
              {status.status !== 'delivered' && (
                <div className="relative pl-12 opacity-50">
                  <div className="absolute left-0 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <h4 className="text-white/60 mb-1">Entregado</h4>
                    <p className="text-white/40 text-sm">Pendiente</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h4 className="text-white mb-4">Dirección de Entrega</h4>
          <div className="space-y-2 text-sm">
            <p className="text-white">Brayan Rivera (Tú)</p>
            <p className="text-white/60">Calle 10 # 43A - 30</p>
            <p className="text-white/60">El Poblado, Medellín, Antioquia</p>
            <p className="text-white/60">Colombia</p>
            <p className="text-white/60">Tel: +57 300 123 4567</p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h4 className="text-white mb-4">Información del Vendedor</h4>
          <div className="space-y-2 text-sm">
            <p className="text-white">Vendido por: Sara (Equipo)</p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">★</span>
              <span className="text-white/60">4.9 (102 valoraciones)</span>
            </div>
            <p className="text-white/60">Envío desde: Bogotá, Cundinamarca</p>
            <p className="text-white/60">Método: Envío Express</p>
          </div>
        </div>
      </div>
    </div>
  );
}
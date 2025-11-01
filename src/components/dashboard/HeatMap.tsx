import { mockHeatMapData } from '../../lib/mockData';
import { TrendingUp, MapPin, DollarSign } from 'lucide-react';

export function HeatMap() {
  // Normalize data for visualization
  const maxSales = Math.max(...mockHeatMapData.map(d => d.sales));
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-white mb-2">Mapa de Calor de Ventas</h3>
        <p className="text-white/60">Visualiza dónde se venden más productos en tu zona</p>
      </div>

      {/* Map Visualization */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
        <div className="aspect-video bg-zinc-950 rounded-lg overflow-hidden relative">
          {/* Simulated map background */}
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            alt="Map"
            className="w-full h-full object-cover opacity-20"
          />
          
          {/* Heat points overlay */}
          <div className="absolute inset-0 p-8">
            {mockHeatMapData.map((data, index) => {
              const intensity = (data.sales / maxSales);
              const size = 40 + (intensity * 80);
              
              // Position points in different areas of the map
              const positions = [
                { top: '30%', left: '45%' }, // CDMX
                { top: '25%', left: '35%' }, // Guadalajara
                { top: '15%', left: '60%' }, // Monterrey
                { top: '35%', left: '50%' }, // Puebla
                { top: '30%', left: '52%' }, // Querétaro
                { top: '12%', left: '20%' }, // Tijuana
                { top: '45%', left: '30%' }, // Mérida
                { top: '48%', left: '28%' }  // Cancún
              ];

              const position = positions[index] || { top: '50%', left: '50%' };

              return (
                <div
                  key={data.location}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    top: position.top,
                    left: position.left
                  }}
                >
                  {/* Heat circle */}
                  <div
                    className="rounded-full bg-red-600 opacity-30 animate-pulse"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                    }}
                  />
                  
                  {/* Center dot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full" />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-zinc-900 border border-white/10 rounded-lg p-3 whitespace-nowrap shadow-xl">
                      <p className="text-white mb-1">{data.location}</p>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <TrendingUp className="w-3 h-3" />
                        <span>{data.sales} ventas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <DollarSign className="w-3 h-3" />
                        <span>${(data.value / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600 opacity-20" />
            <span className="text-white/60 text-sm">Baja actividad</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600 opacity-50" />
            <span className="text-white/60 text-sm">Media actividad</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600 opacity-100" />
            <span className="text-white/60 text-sm">Alta actividad</span>
          </div>
        </div>
      </div>

      {/* Statistics Table */}
      <div>
        <h4 className="text-white mb-4">Estadísticas por Región</h4>
        <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="text-left text-white/80 p-4 text-sm">Región</th>
                  <th className="text-left text-white/80 p-4 text-sm">Ventas</th>
                  <th className="text-left text-white/80 p-4 text-sm">Valor Total</th>
                  <th className="text-left text-white/80 p-4 text-sm">Promedio</th>
                  <th className="text-left text-white/80 p-4 text-sm">Tendencia</th>
                </tr>
              </thead>
              <tbody>
                {mockHeatMapData
                  .sort((a, b) => b.sales - a.sales)
                  .map((data, index) => {
                    const average = data.value / data.sales;
                    return (
                      <tr key={data.location} className="border-t border-white/5 hover:bg-white/5">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-600" />
                            <span className="text-white">{data.location}</span>
                          </div>
                        </td>
                        <td className="p-4 text-white/80">{data.sales.toLocaleString()}</td>
                        <td className="p-4 text-white/80">${(data.value / 1000).toFixed(0)}K</td>
                        <td className="p-4 text-white/80">${average.toFixed(0)}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-green-500 text-sm">
                              +{(12 + Math.random() * 20).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top Categories by Region */}
      <div>
        <h4 className="text-white mb-4">Categorías Más Vendidas por Región</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHeatMapData.slice(0, 6).map((data) => (
            <div key={data.location} className="bg-zinc-900 border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-red-600" />
                <h4 className="text-white">{data.location}</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">1. Electrónica</span>
                  <span className="text-white">35%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">2. Vehículos</span>
                  <span className="text-white">28%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">3. Arte</span>
                  <span className="text-white">18%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

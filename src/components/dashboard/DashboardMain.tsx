import React, { useState, useEffect } from 'react'; // ¡Importamos hooks!
import { categories as staticCategories } from '../../lib/mockData'; // Renombramos
import { AuctionCard } from '../AuctionCard';
import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react';
// --- ¡Importamos Firebase! ---
import { db } from '../../lib/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
// --- ¡Importamos el componente real de subastas! ---
import { LiveAuctions } from '../LiveAuctions';

interface DashboardMainProps {
  onViewLive: (auctionId: string) => void;
}

export function DashboardMain({ onViewLive }: DashboardMainProps) {
  // const liveAuctions = mockProducts.filter(p => p.isLive); // <-- Ya no usamos mocks

  // --- ¡NUEVO ESTADO! ---
  // Un objeto para guardar los conteos: { watches: 10, art: 5, ... }
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});

  const stats = [
    { icon: TrendingUp, label: 'Ofertas Activas', value: '3', color: 'text-green-500' },
    { icon: Clock, label: 'Subastas Observando', value: '12', color: 'text-blue-500' },
    { icon: DollarSign, label: 'Total Invertido', value: '$24.5K', color: 'text-yellow-500' },
    { icon: Users, label: 'Subastas Ganadas', value: '8', color: 'text-purple-500' }
  ];

  // --- ¡NUEVO USEEFFECT! ---
  // Este hook "escuchará" la base de datos y contará las categorías
  useEffect(() => {
    // Apuntamos a la colección 'subastas'
    const auctionsRef = collection(db, 'subastas');
    // (Opcional: si solo quieres contar las activas)
    // const q = query(auctionsRef, where("status", "==", "active"));

    // onSnapshot se actualiza en tiempo real
    const unsubscribe = onSnapshot(auctionsRef, (snapshot) => {
      const counts: { [key: string]: number } = {};

      // Recorremos cada documento de subasta
      snapshot.forEach((doc) => {
        const data = doc.data();
        const category = data.category; // Ej: "watches", "art", ...

        if (category) {
          // Si la categoría ya existe en nuestro conteo, le sumamos 1
          // Si no, la inicializamos en 1
          counts[category] = (counts[category] || 0) + 1;
        }
      });
      
      // Guardamos el objeto de conteos en el estado
      setCategoryCounts(counts);
    });

    // Limpiamos el "listener" cuando el componente se desmonta
    return () => unsubscribe();
  }, []); // El array vacío [] significa que esto se ejecuta 1 sola vez


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
          {/* Usamos el array estático para los nombres e iconos */}
          {staticCategories.map((category) => (
            <button
              key={category.id}
              className="bg-zinc-900 border border-white/5 rounded-xl p-4 hover:border-red-600/50 transition-all group"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <p className="text-white text-sm mb-1">{category.name}</p>
              
              {/* --- ¡AQUÍ ESTÁ EL CAMBIO! --- */}
              {/* Mostramos el conteo REAL desde nuestro estado */}
              <p className="text-white/40 text-xs">
                {categoryCounts[category.id] || 0}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Live Auctions */}
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
        
        {/* --- ¡CAMBIO IMPORTANTE! --- */}
        {/* Renderizamos el componente que SÍ está conectado a Firebase */}
        <LiveAuctions onViewAuction={onViewLive} />
        
        {/* (Eliminamos el .map() que usaba mockProducts) */}
      </div>

      {/* All Auctions (Eliminado porque usaba mocks) */}
    </div>
  );
}
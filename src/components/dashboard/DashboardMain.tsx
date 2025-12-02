import React, { useState, useEffect } from 'react'; 
import { categories as staticCategories } from '../../lib/mockData';
import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react';
import { db } from '../../lib/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { LiveAuctions } from '../LiveAuctions';
import { useAuth } from '../../lib/AuthContext'; // ¡Importante!

interface DashboardMainProps {
  onViewLive: (auctionId: string) => void;
}

export function DashboardMain({ onViewLive }: DashboardMainProps) {
  const { user } = useAuth(); // Necesitamos al usuario actual
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});

  
  const [dynamicStats, setDynamicStats] = useState({
    activeSales: 0,
    watching: 12, 
    totalSpent: 0,
    auctionsWon: 0,
  });

  // Este useEffect cuenta las categorias en tiempo real
  useEffect(() => {
    const auctionsRef = collection(db, 'subastas');
    const unsubscribe = onSnapshot(auctionsRef, (snapshot) => {
      const counts: { [key: string]: number } = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        const category = data.category; 
        if (category) {
          counts[category] = (counts[category] || 0) + 1;
        }
      });
      setCategoryCounts(counts);
    });
    return () => unsubscribe();
  }, []); 

  // USERFFECT PARA LOS STATS
  useEffect(() => {
    if (!user) return; // Si no hay usuario, no hacemos nada

    // 1. Query para "Ofertas Activas" (las que estoy vendiendo)
    const activeSalesQuery = query(
      collection(db, 'subastas'),
      where("sellerId", "==", user.id),
      where("status", "==", "active")
    );
    const unsubActive = onSnapshot(activeSalesQuery, (snapshot) => {
      setDynamicStats(prev => ({ ...prev, activeSales: snapshot.size }));
    });

    // 2. Query para "Subastas Ganadas" y "Total Invertido"
    const wonAuctionsQuery = query(
      collection(db, 'subastas'),
      where("lastBidderId", "==", user.id),
      where("status", "==", "ended") // Asumimos que 'ended' es el estado final
    );
    const unsubWon = onSnapshot(wonAuctionsQuery, (snapshot) => {
      let totalSpent = 0;
      snapshot.forEach((doc) => {
        totalSpent += doc.data().currentBid;
      });
      setDynamicStats(prev => ({
        ...prev,
        auctionsWon: snapshot.size,
        totalSpent: totalSpent,
      }));
    });

    // Limpiamos los listeners
    return () => {
      unsubActive();
      unsubWon();
    };
  }, [user]); // Se ejecuta cada vez que el usuario cambie


  //stats para cambio dinamico
  const stats = [
    { icon: TrendingUp, label: 'Ofertas Activas', value: dynamicStats.activeSales, color: 'text-green-500' },
    { icon: Clock, label: 'Subastas Observando', value: dynamicStats.watching, color: 'text-blue-500' },
    { icon: DollarSign, label: 'Total Invertido', value: `$${dynamicStats.totalSpent.toLocaleString('es-CO')}`, color: 'text-yellow-500' },
    { icon: Users, label: 'Subastas Ganadas', value: dynamicStats.auctionsWon, color: 'text-purple-500' }
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
              {/* Ahora el 'value' viene del estado dinámico */}
              <div className="text-white text-2xl mb-1">{stat.value}</div>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-white mb-6">Categorías</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {staticCategories.map((category) => (
            <button
              key={category.id}
              className="bg-zinc-900 border border-white/5 rounded-xl p-4 hover:border-red-600/50 transition-all group"
            >
              
              {/* Este es el ÍCONO */}
              <div className="text-3xl mb-2">{category.icon}</div>
              <p className="text-white text-sm mb-1 break-words">
                {category.name}
              </p>
              
              {/* Este es el CONTEO */}
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
        
        <LiveAuctions onViewAuction={onViewLive} />
        
      </div>
    </div>
  );
}
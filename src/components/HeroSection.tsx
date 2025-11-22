import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Button } from './ui/button';
import { db, auth } from '../lib/firebaseConfig'; 
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 

// --- ¡AÑADIMOS LA INTERFAZ DE PROPS! ---
interface HeroSectionProps {
  onExplore: () => void;
}

// --- Recibimos la prop aquí ---
export function HeroSection({ onExplore }: HeroSectionProps) {
  const [stats, setStats] = useState({
    activeAuctions: 0,
    activeUsers: 0,
    soldThisMonth: 0,
  });

  useEffect(() => {
    // 1. Contar Subastas Activas
    const auctionsRef = collection(db, 'subastas');
    const activeQuery = query(auctionsRef, where("status", "==", "active"));
    const unsubActive = onSnapshot(activeQuery, (snapshot) => {
      setStats(prev => ({ ...prev, activeAuctions: snapshot.size }));
    });

    // 2. Contar Usuarios Registrados
    const usersRef = collection(db, 'users');
    const unsubUsers = onSnapshot(usersRef, (snapshot) => {
      setStats(prev => ({ ...prev, activeUsers: snapshot.size }));
    });

    // 3. Contar "Vendido este mes"
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoTimestamp = Timestamp.fromDate(thirtyDaysAgo);

    const soldQuery = query(
      collection(db, 'subastas'),
      where("status", "==", "ended"),
      where("endTime", ">=", thirtyDaysAgoTimestamp)
    );

    const unsubSold = onSnapshot(soldQuery, (snapshot) => {
      let total = 0;
      snapshot.forEach((doc) => {
        total += doc.data().currentBid;
      });
      setStats(prev => ({ ...prev, soldThisMonth: total }));
    }, (error) => {
      console.error("Error al cargar 'Vendido este mes'.", error);
    });

    return () => {
      unsubActive();
      unsubUsers();
      unsubSold();
    };
  }, []); 

  const formatStat = (num: number, type: 'money' | 'k' | 'number') => {
    if (type === 'money') {
      if (num > 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num > 1000) return `$${(num / 1000).toFixed(0)}K`;
      return `$${num.toLocaleString('es-CO')}`;
    }
    if (type === 'k') {
      if (num > 1000) return `${(num / 1000).toFixed(0)}K+`;
      return num.toLocaleString('es-CO');
    }
    return num.toLocaleString('es-CO');
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-10" />
        <img 
          src="/hero.png"
          alt="Auction Commerce"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          <div className="inline-block mb-6">
            <span className="text-red-600 tracking-widest uppercase">Subastas en vivo</span>
          </div>
          
          <h2 className="text-white mb-6 leading-tight">
            TU PRÓXIMA
            <br />
            <span className="text-red-600">GRAN ADQUISICIÓN</span>
          </h2>
          
          <p className="text-white/70 mb-8 max-w-xl">
            Descubre artículos únicos, coleccionables y tesoros exclusivos. 
            Participa en subastas en tiempo real y consigue los mejores precios. 
            La emoción de ganar está a un clic de distancia.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            {/* --- ¡BOTÓN CONECTADO! --- */}
            <Button 
              onClick={onExplore} // <-- Aquí está la magia
              className="bg-red-600 hover:bg-red-700 px-8 py-6"
            >
              Explorar Subastas
            </Button>
            
            <Button variant="outline" className="bg-white text-black border-white hover:bg-black hover:text-white hover:border-black transition-all duration-300 px-8 py-6">
              <Play className="w-4 h-4 mr-2" />
              Ver Tutorial
            </Button>
          </div>

          {/* Stats Dinámicos */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-red-600 mb-1 text-2xl font-bold">
                {formatStat(stats.activeAuctions, 'number')}
              </div>
              <div className="text-white/60 text-sm">Subastas Activas</div>
            </div>
            <div>
              <div className="text-red-600 mb-1 text-2xl font-bold">
                {formatStat(stats.activeUsers, 'k')}
              </div>
              <div className="text-white/60 text-sm">Usuarios Registrados</div>
            </div>
            <div>
              <div className="text-red-600 mb-1 text-2xl font-bold">
                {formatStat(stats.soldThisMonth, 'money')}
              </div>
              <div className="text-white/60 text-sm">Vendido este mes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
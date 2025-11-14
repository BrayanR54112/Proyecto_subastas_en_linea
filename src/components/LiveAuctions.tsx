import { useState, useEffect } from 'react';
import { AuctionCard } from './AuctionCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'; // Asumo que tienes estos imports
import { ArrowRight } from 'lucide-react'; // Asumo que tienes este import
import { db } from '../lib/firebaseConfig'; 
import { collection, onSnapshot, query, where, Timestamp } from 'firebase/firestore'; // Importa Timestamp
import { Product } from '../lib/mockData'; 

// --- ¡NUEVA FUNCIÓN! ---
// Helper para calcular el tiempo restante
const formatTimeLeft = (endTime: Date): string => {
  const now = new Date().getTime();
  const difference = (endTime.getTime() - now) / 1000; // en segundos

  if (difference <= 0) return "Finalizada";
  
  const hours = Math.floor(difference / 3600);
  const minutes = Math.floor((difference % 3600) / 60);

  if (hours > 23) return `${Math.floor(hours / 24)}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${Math.floor(difference)}s`;
};


// Esta prop viene de App.tsx (pasando por DashboardMain) para manejar el clic
export function LiveAuctions({ onViewAuction }: { onViewAuction: (id: string) => void }) {
  const [auctions, setAuctions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auctionsRef = collection(db, 'subastas'); 
    const q = query(auctionsRef, where('status', '==', 'active'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLoading(true);
      const auctionData: Product[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        
        // Convertir Firestore Timestamp a JS Date
        const endTimeDate = data.endTime && data.endTime.toDate ? data.endTime.toDate() : new Date();
        const createdDate = data.createdAt && data.createdAt.toDate ? data.createdAt.toDate() : new Date();

        // --- ¡AQUÍ ESTÁ LA SOLUCIÓN! ---
        // Construimos el objeto 'Product' manualmente
        // Esto satisface a TypeScript Y calcula 'timeLeft'
        const product: Product = {
          id: doc.id,
          title: data.title,
          description: data.description,
          image: data.image,
          category: data.category,
          currentBid: data.currentBid,
          startingBid: data.startingBid,
          bids: data.bids,
          endTime: endTimeDate,
          timeLeft: formatTimeLeft(endTimeDate), // <-- Calculamos timeLeft
          sellerId: data.sellerId,
          sellerName: data.sellerName,
          status: data.status,
          isLive: data.isLive,
          createdAt: createdDate,
          // Nota: 'createdAt' y 'condition' (de UploadProduct) 
          // no están en tu tipo 'Product', así que los omitimos.
        };

        auctionData.push(product);
      });
      setAuctions(auctionData);
      setLoading(false);
    }, (error) => {
      console.error("Error cargando subastas:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); 

  if (loading) {
    return (
      <section className="bg-black py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h3 className="text-white">Cargando Subastas...</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Tu cabecera de sección (la he quitado para brevedad, pero la tuya está bien) */}
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="watches">Relojes</TabsTrigger>
            <TabsTrigger value="vehicles">Vehículos</TabsTrigger>
            <TabsTrigger value="art">Arte</TabsTrigger>
            <TabsTrigger value="collectibles">Coleccionables</TabsTrigger>
          </TabsList>

          {/* --- CONTENIDO DE TABS (AHORA DINÁMICO) --- */}
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auction) => (
                // Pasamos la función 'onViewAuction' a tu AuctionCard
                <AuctionCard 
                  key={auction.id} 
                  {...auction} 
                  onViewAuction={onViewAuction} 
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="watches" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.filter(a => a.category === 'watches').map((auction) => (
                <AuctionCard key={auction.id} {...auction} onViewAuction={onViewAuction} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="vehicles" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.filter(a => a.category === 'vehicles').map((auction) => (
                <AuctionCard key={auction.id} {...auction} onViewAuction={onViewAuction} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="art" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.filter(a => a.category === 'art').map((auction) => (
                <AuctionCard key={auction.id} {...auction} onViewAuction={onViewAuction} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collectibles" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.filter(a => a.category === 'collectibles').map((auction) => (
                <AuctionCard key={auction.id} {...auction} onViewAuction={onViewAuction} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* ... tu botón móvil ... */}
      </div>
    </section>
  );
}
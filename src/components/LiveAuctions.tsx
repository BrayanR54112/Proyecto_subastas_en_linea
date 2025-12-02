import { useState, useEffect } from 'react';
import { AuctionCard } from './AuctionCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'; 
import { ArrowRight } from 'lucide-react'; 
import { db } from '../lib/firebaseConfig'; 
import { collection, onSnapshot, query, where, Timestamp } from 'firebase/firestore'; 
import { Product } from '../lib/mockData'; 

const formatTimeLeft = (endTime: Date): string => {
  const now = new Date().getTime();
  const difference = (endTime.getTime() - now) / 1000; 
  if (difference <= 0) return "Finalizada";
  const hours = Math.floor(difference / 3600);
  const minutes = Math.floor((difference % 3600) / 60);
  if (hours > 23) return `${Math.floor(hours / 24)}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${Math.floor(difference)}s`;
};

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
        const endTimeDate = data.endTime && data.endTime.toDate ? data.endTime.toDate() : new Date();
        const createdDate = data.createdAt && data.createdAt.toDate ? data.createdAt.toDate() : new Date();

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
          timeLeft: formatTimeLeft(endTimeDate),
          sellerId: data.sellerId,
          sellerName: data.sellerName,
          status: data.status,
          isLive: data.isLive,
          createdAt: createdDate,
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
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="all" className="text-white/60 data-[state=active]:text-black">Todas</TabsTrigger>
            <TabsTrigger value="watches" className="text-white/60 data-[state=active]:text-black">Relojes</TabsTrigger>
            <TabsTrigger value="vehicles" className="text-white/60 data-[state=active]:text-black">Vehículos</TabsTrigger>
            <TabsTrigger value="art" className="text-white/60 data-[state=active]:text-black">Arte</TabsTrigger>
            <TabsTrigger value="collectibles" className="text-white/60 data-[state=active]:text-black">Coleccionables</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auction) => (
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

      </div>
    </section>
  );
}
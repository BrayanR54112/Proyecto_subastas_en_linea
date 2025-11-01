import { AuctionCard } from './AuctionCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ArrowRight } from 'lucide-react';

export function LiveAuctions() {
  const auctions = [
    {
      id: '1',
      title: 'Reloj de Lujo Vintage Edición Limitada',
      image: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjE3Mzg1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      currentBid: 8500,
      startingBid: 5000,
      bids: 23,
      timeLeft: '2h 34m',
      category: 'Relojes',
      featured: true
    },
    {
      id: '2',
      title: 'Automóvil Clásico Restaurado 1965',
      image: 'https://images.unsplash.com/photo-1604940500627-d3f44d1d21c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FyfGVufDF8fHx8MTc2MTczODY5NXww&ixlib=rb-4.1.0&q=80&w=1080',
      currentBid: 45000,
      startingBid: 30000,
      bids: 47,
      timeLeft: '5h 12m',
      category: 'Vehículos',
      featured: true
    },
    {
      id: '3',
      title: 'Martillo de Subasta Profesional Antiguo',
      image: 'https://images.unsplash.com/photo-1580920145071-5ea566b9f9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWN0aW9uJTIwZ2F2ZWx8ZW58MXx8fHwxNzYxNzc2MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      currentBid: 650,
      startingBid: 400,
      bids: 12,
      timeLeft: '1h 45m',
      category: 'Coleccionables'
    },
    {
      id: '4',
      title: 'Obra de Arte Contemporánea Original',
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2MTc0NDA3MXww&ixlib=rb-4.1.0&q=80&w=1080',
      currentBid: 12000,
      startingBid: 8000,
      bids: 31,
      timeLeft: '3h 20m',
      category: 'Arte'
    },
    {
      id: '5',
      title: 'Colección Exclusiva de Artículos Vintage',
      image: 'https://images.unsplash.com/photo-1758779529327-4cbf5f8989b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWN0aWJsZSUyMGl0ZW1zfGVufDF8fHx8MTc2MTcxOTI4MHww&ixlib=rb-4.1.0&q=80&w=1080',
      currentBid: 3200,
      startingBid: 2000,
      bids: 18,
      timeLeft: '4h 55m',
      category: 'Coleccionables'
    },
    {
      id: '6',
      title: 'Reloj Deportivo de Alta Gama',
      image: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjE3Mzg1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      currentBid: 5600,
      startingBid: 4000,
      bids: 25,
      timeLeft: '6h 10m',
      category: 'Relojes'
    }
  ];

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-red-600 tracking-widest uppercase text-sm mb-3 block">
              Subastas en vivo
            </span>
            <h3 className="text-white">Ofertas Activas Ahora</h3>
          </div>
          <button className="hidden md:flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors group">
            Ver todas las subastas
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="watches">Relojes</TabsTrigger>
            <TabsTrigger value="vehicles">Vehículos</TabsTrigger>
            <TabsTrigger value="art">Arte</TabsTrigger>
            <TabsTrigger value="collectibles">Coleccionables</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auction) => (
                <AuctionCard key={auction.id} {...auction} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="watches" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.filter(a => a.category === 'Relojes').map((auction) => (
                <AuctionCard key={auction.id} {...auction} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vehicles" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.filter(a => a.category === 'Vehículos').map((auction) => (
                <AuctionCard key={auction.id} {...auction} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="art" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.filter(a => a.category === 'Arte').map((auction) => (
                <AuctionCard key={auction.id} {...auction} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collectibles" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.filter(a => a.category === 'Coleccionables').map((auction) => (
                <AuctionCard key={auction.id} {...auction} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile View All Button */}
        <div className="md:hidden flex justify-center mt-8">
          <button className="flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors group">
            Ver todas las subastas
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

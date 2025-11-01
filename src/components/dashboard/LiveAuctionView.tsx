import { useState, useEffect } from 'react';
import { Clock, Gavel, TrendingUp, Users, MessageCircle, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Bid {
  id: string;
  user: string;
  amount: number;
  time: Date;
}

export function LiveAuctionView({ onNavigateToChat }: { onNavigateToChat: () => void }) {
  const [currentBid, setCurrentBid] = useState(12500);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState(9240); // seconds
  const [isEnded, setIsEnded] = useState(false);
  
  const [bids, setBids] = useState<Bid[]>([
    { id: '1', user: 'Carlos M.', amount: 12500, time: new Date(Date.now() - 2 * 60 * 1000) },
    { id: '2', user: 'Ana R.', amount: 12000, time: new Date(Date.now() - 5 * 60 * 1000) },
    { id: '3', user: 'Luis F.', amount: 11500, time: new Date(Date.now() - 8 * 60 * 1000) },
    { id: '4', user: 'María G.', amount: 11000, time: new Date(Date.now() - 12 * 60 * 1000) }
  ]);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsEnded(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handlePlaceBid = () => {
    const amount = parseFloat(bidAmount);
    if (amount > currentBid) {
      const newBid: Bid = {
        id: Date.now().toString(),
        user: 'Tú',
        amount,
        time: new Date()
      };
      setBids([newBid, ...bids]);
      setCurrentBid(amount);
      setBidAmount('');
      alert('¡Oferta realizada exitosamente!');
    } else {
      alert('La oferta debe ser mayor que la oferta actual');
    }
  };

  const product = {
    title: 'Reloj Rolex Submariner Vintage 1965',
    description: 'Reloj clásico en excelente condición, con caja original y certificado de autenticidad. Este reloj ha sido cuidadosamente preservado y mantiene su valor histórico.',
    image: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    seller: 'Carlos Martínez',
    sellerRating: 4.9,
    startingBid: 8000
  };

  if (isEnded) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gavel className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-white mb-4">¡Subasta Finalizada!</h3>
          <p className="text-white/60 mb-2">Oferta ganadora: ${currentBid.toLocaleString()}</p>
          <p className="text-white/60 mb-8">Ganador: {bids[0].user}</p>
          
          {bids[0].user === 'Tú' ? (
            <div>
              <p className="text-green-500 mb-6">¡Felicidades! Ganaste esta subasta</p>
              <Button onClick={onNavigateToChat} className="bg-red-600 hover:bg-red-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chatear con el Vendedor
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-white/60 mb-6">No ganaste esta subasta</p>
              <Button className="bg-red-600 hover:bg-red-700">
                Ver Subastas Similares
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Product Image */}
        <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
          <div className="relative">
            <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 flex items-center gap-2 z-10">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              EN VIVO
            </Badge>
            <div className="aspect-video bg-zinc-800">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h3 className="text-white mb-4">{product.title}</h3>
          <p className="text-white/70 mb-6">{product.description}</p>
          
          <div className="flex items-center gap-3 pt-6 border-t border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm">{product.seller}</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-sm">★</span>
                <span className="text-white/60 text-sm">{product.sellerRating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bid History */}
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h4 className="text-white mb-4">Historial de Ofertas</h4>
          <div className="space-y-3">
            {bids.map((bid, index) => (
              <div
                key={bid.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index === 0 ? 'bg-red-600/10 border border-red-600/20' : 'bg-black/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  {index === 0 && <Gavel className="w-4 h-4 text-red-600" />}
                  <div>
                    <p className={`text-sm ${index === 0 ? 'text-white' : 'text-white/80'}`}>
                      {bid.user}
                    </p>
                    <p className="text-white/40 text-xs">
                      {bid.time.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <p className={`${index === 0 ? 'text-red-500' : 'text-white/80'}`}>
                  ${bid.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Timer */}
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-red-600" />
            <span className="text-white/60">Tiempo Restante</span>
          </div>
          <div className="text-white text-3xl mb-2">{formatTime(timeLeft)}</div>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 10800) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Bid */}
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <span className="text-white/60 text-sm block mb-2">Oferta Actual</span>
          <div className="text-white text-3xl mb-4">${currentBid.toLocaleString()}</div>
          
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm">
              +{(((currentBid - product.startingBid) / product.startingBid) * 100).toFixed(0)}%
            </span>
            <span className="text-white/40 text-sm">desde inicio</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/60">
            <Users className="w-4 h-4" />
            <span>{bids.length} ofertas</span>
          </div>
        </div>

        {/* Place Bid */}
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h4 className="text-white mb-4">Hacer Oferta</h4>
          
          <div className="space-y-4">
            <div>
              <label className="text-white/80 text-sm mb-2 block">Tu oferta</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">$</span>
                <Input
                  type="number"
                  placeholder={`Mínimo ${(currentBid + 100).toLocaleString()}`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="bg-black/50 border-white/10 text-white pl-7"
                />
              </div>
            </div>

            <Button
              onClick={handlePlaceBid}
              disabled={!bidAmount || parseFloat(bidAmount) <= currentBid}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              <Gavel className="w-4 h-4 mr-2" />
              Pujar Ahora
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={() => setBidAmount((currentBid + 100).toString())}
                variant="outline"
                className="flex-1 border-white/10 text-white hover:bg-white/5 text-sm"
              >
                +$100
              </Button>
              <Button
                onClick={() => setBidAmount((currentBid + 500).toString())}
                variant="outline"
                className="flex-1 border-white/10 text-white hover:bg-white/5 text-sm"
              >
                +$500
              </Button>
              <Button
                onClick={() => setBidAmount((currentBid + 1000).toString())}
                variant="outline"
                className="flex-1 border-white/10 text-white hover:bg-white/5 text-sm"
              >
                +$1K
              </Button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h4 className="text-white text-sm mb-4">Información</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Precio inicial</span>
              <span className="text-white">${product.startingBid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Total ofertas</span>
              <span className="text-white">{bids.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Categoría</span>
              <span className="text-white">Relojes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

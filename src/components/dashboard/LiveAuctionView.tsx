import { useState, useEffect } from 'react';
import { Clock, Gavel, TrendingUp, Users, MessageCircle, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { db } from '../../lib/firebaseConfig';
import { doc, onSnapshot, collection, query, orderBy, writeBatch, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useAuth } from '../../lib/AuthContext';
import { Product } from '../../lib/mockData';

interface Bid {
  id: string;
  amount: number;
  timestamp: Timestamp;
  userId: string;
  userName: string;
}

// Helper para calcular el tiempo restante desde una fecha (para el objeto Product)
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

export function LiveAuctionView({ auctionId, onNavigateToChat }: { auctionId: string, onNavigateToChat: () => void }) {
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isEnded, setIsEnded] = useState(false);

  // 1. Cargar datos
  useEffect(() => {
    if (!auctionId) return;
    setLoading(true);
    const auctionRef = doc(db, 'subastas', auctionId);
    
    const unsubscribeProduct = onSnapshot(auctionRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const endTimeDate = data.endTime && data.endTime.toDate ? data.endTime.toDate() : new Date();
        const createdDate = data.createdAt && data.createdAt.toDate ? data.createdAt.toDate() : new Date();

        const productData: Product = {
          id: docSnap.id,
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
          lastBidderName: data.lastBidderName, 
          lastBidderId: data.lastBidderId
        };

        setProduct(productData);
        setLoading(false);
      } else {
        setError("No se encontró la subasta.");
        setLoading(false);
      }
    }, (err) => {
      console.error(err);
      setError("Error al cargar.");
      setLoading(false);
    });

    const bidsRef = collection(db, 'subastas', auctionId, 'bids');
    const q = query(bidsRef, orderBy('timestamp', 'desc'));
    const unsubscribeBids = onSnapshot(q, (snapshot) => {
      const bidsData: Bid[] = [];
      snapshot.forEach((doc) => bidsData.push({ id: doc.id, ...doc.data() } as Bid));
      setBids(bidsData);
    });

    return () => { unsubscribeProduct(); unsubscribeBids(); };
  }, [auctionId]);

  // 2. Temporizador
  useEffect(() => {
    if (!product || isEnded) return;
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTimeMs = product.endTime.getTime();
      const difference = (endTimeMs - now) / 1000;
      if (difference <= 0) {
        setTimeLeft(0);
        setIsEnded(true);
      } else {
        setTimeLeft(Math.floor(difference));
      }
    };
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [product, isEnded]);

  // 3. Pujar
  const handlePlaceBid = async () => {
    if (!user || !product) return;
    const newBidAmount = parseFloat(bidAmount);
    if (isNaN(newBidAmount) || newBidAmount <= product.currentBid) {
      alert(`La oferta debe ser mayor que $${product.currentBid.toLocaleString()}`);
      return;
    }
    try {
      const batch = writeBatch(db);
      const auctionRef = doc(db, 'subastas', auctionId);
      batch.update(auctionRef, {
        currentBid: newBidAmount,
        lastBidderId: user.id,
        lastBidderName: user.name,
        bids: product.bids + 1
      });
      const newBidRef = doc(collection(db, 'subastas', auctionId, 'bids'));
      batch.set(newBidRef, {
        amount: newBidAmount,
        userId: user.id,
        userName: user.name,
        timestamp: serverTimestamp()
      });
      await batch.commit();
      setBidAmount('');
    } catch (error) {
      console.error(error);
      alert("Error al pujar.");
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  if (loading) return <div className="text-white text-center p-10">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center p-10">{error}</div>;
  if (!product) return null;

  const totalDurationInSeconds = (product.endTime.getTime() - product.createdAt.getTime()) / 1000;
  const timePercentage = (timeLeft / totalDurationInSeconds) * 100;

  // --- LÓGICA DE GANADOR Y VENDEDOR ---
  const winnerName = product.lastBidderName || "Nadie";
  const isWinner = product.lastBidderId === user?.id;
  const isSeller = product.sellerId === user?.id; 

  if (isEnded) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gavel className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-white mb-4">¡Subasta Finalizada!</h3>
          <p className="text-white/60 mb-2">Oferta ganadora: ${product.currentBid.toLocaleString()}</p>
          
          <p className="text-white text-xl font-bold mb-8">
            Ganador: <span className="text-red-500">{isWinner ? "¡Tú!" : winnerName}</span>
          </p>
          
          {/* --- ¡CONDICIONAL ACTUALIZADO! --- */}
          {/* Si eres el Ganador O el Vendedor, puedes chatear */}
          {isWinner || isSeller ? (
            <div>
              <p className="text-green-500 mb-6">
                {isWinner 
                  ? "¡Felicidades! Ganaste esta subasta." 
                  : "¡Tu producto se ha vendido con éxito!"}
              </p>
              <Button onClick={onNavigateToChat} className="bg-red-600 hover:bg-red-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                {isWinner ? "Chatear con el Vendedor" : "Chatear con el Ganador"}
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-white/60 mb-6">No ganaste esta subasta</p>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => window.location.reload()}>
                Ver Otras Subastas
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
        <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
          <div className="relative">
            <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 flex items-center gap-2 z-10">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              EN VIVO
            </Badge>
            <div className="aspect-video bg-zinc-800">
              <ImageWithFallback src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h3 className="text-white mb-4">{product.title}</h3>
          <p className="text-white/70 mb-6">{product.description}</p>
          <div className="flex items-center gap-3 pt-6 border-t border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div><p className="text-white text-sm">{product.sellerName}</p></div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h4 className="text-white mb-4">Historial de Ofertas</h4>
          <div className="space-y-3">
            {bids.length === 0 && <p className="text-white/40 text-center p-4">Aún no hay ofertas.</p>}
            {bids.map((bid, index) => (
              <div key={bid.id} className={`flex items-center justify-between p-3 rounded-lg ${index === 0 ? 'bg-red-600/10 border border-red-600/20' : 'bg-black/30'}`}>
                <div className="flex items-center gap-3">
                  {index === 0 && <Gavel className="w-4 h-4 text-red-600" />}
                  <div>
                    <p className={`text-sm ${index === 0 ? 'text-white' : 'text-white/80'}`}>{bid.userId === user?.id ? 'Tú' : bid.userName}</p>
                    <p className="text-white/40 text-xs">{bid.timestamp?.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
                <p className={`${index === 0 ? 'text-red-500' : 'text-white/80'}`}>${bid.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-red-600" />
            <span className="text-white/60">Tiempo Restante</span>
          </div>
          <div className="text-white text-3xl mb-2">{formatTime(timeLeft)}</div>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div className="bg-red-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${timePercentage}%` }} />
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <span className="text-white/60 text-sm block mb-2">Oferta Actual</span>
          <div className="text-white text-3xl mb-4">${product.currentBid.toLocaleString()}</div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-white/40 text-sm">desde inicio</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Users className="w-4 h-4" />
            <span>{product.bids} ofertas</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h4 className="text-white mb-4">Hacer Oferta</h4>
          <div className="space-y-4">
            <div>
              <label className="text-white/80 text-sm mb-2 block">Tu oferta</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">$</span>
                <Input
                  type="number"
                  placeholder={`Mínimo ${(product.currentBid + 1).toLocaleString()}`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="bg-black/50 border-white/10 text-white pl-7"
                />
              </div>
            </div>
            <Button onClick={handlePlaceBid} disabled={!bidAmount || parseFloat(bidAmount) <= product.currentBid || !user} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50">
              <Gavel className="w-4 h-4 mr-2" /> Pujar Ahora
            </Button>
            <div className="flex gap-2">
              <Button onClick={() => setBidAmount((product.currentBid + 100).toString())} className="flex-1 border border-white/10 text-white hover:bg-white/5 text-xs px-2 bg-black/50">+$100</Button>
              <Button onClick={() => setBidAmount((product.currentBid + 500).toString())} className="flex-1 border border-white/10 text-white hover:bg-white/5 text-xs px-2 bg-black/50">+$500</Button>
              <Button onClick={() => setBidAmount((product.currentBid + 1000).toString())} className="flex-1 border border-white/10 text-white hover:bg-white/5 text-xs px-2 bg-black/50">+$1K</Button>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h4 className="text-white text-sm mb-4">Información</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-white/60">Precio inicial</span><span className="text-white">${product.startingBid.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Total ofertas</span><span className="text-white">{product.bids}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Categoría</span><span className="text-white">{product.category}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
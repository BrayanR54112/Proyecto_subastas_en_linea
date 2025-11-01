import { Clock, TrendingUp, Gavel } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AuctionCardProps {
  id: string;
  title: string;
  image: string;
  currentBid: number;
  startingBid: number;
  bids: number;
  timeLeft: string;
  category: string;
  featured?: boolean;
  isLive?: boolean;
  onViewLive?: () => void;
}

export function AuctionCard({ 
  title, 
  image, 
  currentBid, 
  startingBid,
  bids, 
  timeLeft, 
  category,
  featured = false,
  isLive = false,
  onViewLive
}: AuctionCardProps) {
  const percentIncrease = ((currentBid - startingBid) / startingBid * 100).toFixed(0);

  return (
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-red-600 hover:bg-red-700">
          {category}
        </Badge>

        {featured && (
          <Badge className="absolute top-3 right-3 bg-yellow-600 hover:bg-yellow-700">
            Destacado
          </Badge>
        )}

        {isLive && (
          <Badge className="absolute top-3 right-3 bg-green-600 hover:bg-green-700 flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            EN VIVO
          </Badge>
        )}

        {/* Time Left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <Clock className="w-4 h-4 text-red-500" />
          <span className="text-white text-sm">{timeLeft}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white mb-3 line-clamp-2 group-hover:text-red-500 transition-colors">
          {title}
        </h3>

        {/* Bid Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-sm">Oferta actual</span>
            <div className="flex items-center gap-2">
              <span className="text-red-500">${currentBid.toLocaleString()}</span>
              {percentIncrease !== '0' && (
                <div className="flex items-center gap-1 text-green-500 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{percentIncrease}%</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50">Ofertas</span>
            <div className="flex items-center gap-1">
              <Gavel className="w-3 h-3 text-white/50" />
              <span className="text-white/80">{bids}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={onViewLive}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          {isLive ? 'Ver Subasta en Vivo' : 'Hacer Oferta'}
        </Button>
      </div>
    </div>
  );
}

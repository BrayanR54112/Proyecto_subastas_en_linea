import { useState, useEffect } from 'react'; // ¡Importante!
import { Star, Package, Clock, Award, Edit } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { db } from '../../lib/firebaseConfig';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { Product } from '../../lib/mockData'; // Importamos el TIPO, no los datos
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Helper para calcular el tiempo restante (¡lo necesitamos!)
const formatTimeLeft = (endTime: Date): string => {
  const now = new Date().getTime();
  const difference = (endTime.getTime() - now) / 1000;
  if (difference <= 0) return "Finalizada";
  const hours = Math.floor(difference / 3600);
  if (hours > 23) return `${Math.floor(hours / 24)}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${Math.floor((difference % 3600) / 60)}m`;
  return `${Math.floor((difference % 3600) / 60)}m`;
};

export function UserProfile() {
  const { user } = useAuth(); 

  //  estados separados para los productos 
  const [activeProducts, setActiveProducts] = useState<Product[]>([]);
  const [upcomingProducts, setUpcomingProducts] = useState<Product[]>([]);

  // useEffect para cargar los productos del usuario ---
  useEffect(() => {
    // Si no hay usuario, no hay nada que cargar
    if (!user) return;

    // Creamos una consulta a Firestore:
    // "subastas donde el 'sellerId' sea igual al ID del usuario actual"
    const auctionsRef = collection(db, 'subastas');
    const q = query(auctionsRef, where("sellerId", "==", user.id));

    // Nos suscribimos en tiempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allProducts: Product[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const endTimeDate = data.endTime.toDate();
        
        // Construimos el objeto Product
        allProducts.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          image: data.image,
          category: data.category,
          currentBid: data.currentBid,
          startingBid: data.startingBid,
          bids: data.bids,
          endTime: endTimeDate,
          createdAt: data.createdAt.toDate(),
          timeLeft: formatTimeLeft(endTimeDate),
          sellerId: data.sellerId,
          sellerName: data.sellerName,
          status: data.status,
          isLive: data.isLive,
        });
      });
      
    
      setActiveProducts(allProducts.filter(p => p.status === 'active'));
      setUpcomingProducts(allProducts.filter(p => p.status === 'upcoming'));
    });

    
    return () => unsubscribe();

  }, [user]); 

  if (!user) {
    return <div className="text-white">Cargando perfil...</div>
  }

  // Renderizado
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white flex-shrink-0">
            <span className="text-5xl">{user.name.charAt(0)}</span>
          </div>          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white mb-2">{user.name}</h3>
                <p className="text-white/60">{user.email}</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <Edit className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
            </div>
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(user.rating || 0)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white">{user.rating}</span>
              <span className="text-white/40">({user.totalAuctions} valoraciones)</span>
            </div>          
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-red-600" />
                  <span className="text-white/60 text-sm">Subastas Activas</span>
                </div>            
                <div className="text-white">{activeProducts.length}</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-white/60 text-sm">Próximas</span>
                </div>
                <div className="text-white">{upcomingProducts.length}</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-yellow-600" />
                  <span className="text-white/60 text-sm">Total Subastas</span>
                </div>
                <div className="text-white">{user.totalAuctions}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-white mb-6">Productos que Estoy Subastando</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeProducts.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-zinc-800">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-white mb-2 line-clamp-1">{product.title}</h4>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/50 text-sm">Oferta actual</span>
                  <span className="text-red-500">${product.currentBid.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Ofertas: {product.bids}</span>
                  <span className="text-white/80">{product.timeLeft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-white mb-6">Próximas Subastas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingProducts.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-white/5 rounded-xl p-6">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-zinc-800 rounded-lg flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white mb-2">{product.title}</h4>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/50">Precio inicial</span>
                    <span className="text-red-500">${product.startingBid.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/40" />
                    <span className="text-white/60 text-sm">{product.timeLeft}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
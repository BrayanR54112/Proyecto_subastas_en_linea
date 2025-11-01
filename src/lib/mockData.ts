// Mock data para la aplicación

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rating: number;
  totalAuctions: number;
  activeSales: number;
  upcomingSales: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  currentBid: number;
  startingBid: number;
  bids: number;
  timeLeft: string;
  endTime: Date;
  sellerId: string;
  sellerName: string;
  status: 'active' | 'upcoming' | 'ended';
  isLive?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  type: 'bid' | 'won' | 'outbid' | 'message' | 'shipping';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface ShippingStatus {
  productId: string;
  status: 'packed' | 'shipped' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: Date;
  updates: {
    status: string;
    location: string;
    timestamp: Date;
  }[];
}

export interface HeatMapData {
  location: string;
  lat: number;
  lng: number;
  sales: number;
  value: number;
}

export const mockUser: User = {
  id: '1',
  name: 'María González',
  email: 'maria@example.com',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  rating: 4.8,
  totalAuctions: 47,
  activeSales: 3,
  upcomingSales: 2
};

export const categories = [
  { id: 'watches', name: 'Relojes', icon: '⌚', count: 234 },
  { id: 'vehicles', name: 'Vehículos', icon: '🚗', count: 156 },
  { id: 'art', name: 'Arte', icon: '🎨', count: 445 },
  { id: 'collectibles', name: 'Coleccionables', icon: '💎', count: 678 },
  { id: 'jewelry', name: 'Joyería', icon: '💍', count: 289 },
  { id: 'electronics', name: 'Electrónica', icon: '📱', count: 523 },
  { id: 'fashion', name: 'Moda', icon: '👗', count: 392 },
  { id: 'furniture', name: 'Muebles', icon: '🪑', count: 187 }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Reloj Rolex Submariner Vintage 1965',
    description: 'Reloj clásico en excelente condición, con caja original y certificado de autenticidad.',
    image: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    category: 'watches',
    currentBid: 12500,
    startingBid: 8000,
    bids: 23,
    timeLeft: '2h 34m',
    endTime: new Date(Date.now() + 2.5 * 60 * 60 * 1000),
    sellerId: '2',
    sellerName: 'Carlos Martínez',
    status: 'active',
    isLive: true
  },
  {
    id: '2',
    title: 'Ford Mustang Clásico 1967 Restaurado',
    description: 'Totalmente restaurado, motor V8 original, transmisión manual.',
    image: 'https://images.unsplash.com/photo-1604940500627-d3f44d1d21c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    category: 'vehicles',
    currentBid: 65000,
    startingBid: 45000,
    bids: 47,
    timeLeft: '5h 12m',
    endTime: new Date(Date.now() + 5.2 * 60 * 60 * 1000),
    sellerId: '3',
    sellerName: 'Roberto Silva',
    status: 'active',
    isLive: true
  },
  {
    id: '3',
    title: 'Pintura Original de Artista Reconocido',
    description: 'Óleo sobre lienzo, 120x90cm, firmado y certificado.',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    category: 'art',
    currentBid: 8900,
    startingBid: 5000,
    bids: 31,
    timeLeft: '3h 20m',
    endTime: new Date(Date.now() + 3.3 * 60 * 60 * 1000),
    sellerId: '4',
    sellerName: 'Ana Rodríguez',
    status: 'active',
    isLive: false
  },
  {
    id: '4',
    title: 'Colección de Monedas Antiguas',
    description: 'Set completo de monedas de plata del siglo XIX.',
    image: 'https://images.unsplash.com/photo-1758779529327-4cbf5f8989b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    category: 'collectibles',
    currentBid: 3200,
    startingBid: 2000,
    bids: 18,
    timeLeft: '4h 55m',
    endTime: new Date(Date.now() + 4.9 * 60 * 60 * 1000),
    sellerId: '5',
    sellerName: 'Luis Fernández',
    status: 'active',
    isLive: false
  },
  {
    id: '5',
    title: 'Collar de Diamantes 18K',
    description: 'Oro blanco de 18K con diamantes naturales certificados.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    category: 'jewelry',
    currentBid: 15600,
    startingBid: 12000,
    bids: 25,
    timeLeft: '6h 10m',
    endTime: new Date(Date.now() + 6.2 * 60 * 60 * 1000),
    sellerId: '6',
    sellerName: 'Elena Vargas',
    status: 'active',
    isLive: false
  },
  {
    id: '6',
    title: 'MacBook Pro M3 Max 2024 Sellado',
    description: 'Nuevo en caja, 16 pulgadas, 64GB RAM, 2TB SSD.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    category: 'electronics',
    currentBid: 3800,
    startingBid: 3000,
    bids: 42,
    timeLeft: '1h 15m',
    endTime: new Date(Date.now() + 1.25 * 60 * 60 * 1000),
    sellerId: '7',
    sellerName: 'Pedro Sánchez',
    status: 'active',
    isLive: true
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'outbid',
    title: 'Te han superado',
    message: 'Alguien superó tu oferta en "Reloj Rolex Submariner"',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false
  },
  {
    id: '2',
    type: 'won',
    title: '¡Felicidades!',
    message: 'Ganaste la subasta de "MacBook Pro M3"',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false
  },
  {
    id: '3',
    type: 'shipping',
    title: 'Producto enviado',
    message: 'Tu artículo ha sido enviado. Tracking: ABC123456',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true
  },
  {
    id: '4',
    type: 'message',
    title: 'Nuevo mensaje',
    message: 'Carlos Martínez te envió un mensaje',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    senderName: 'Carlos Martínez',
    message: 'Hola, gracias por tu interés en el reloj.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000)
  },
  {
    id: '2',
    senderId: '1',
    senderName: 'María González',
    message: '¿El reloj tiene todos los documentos originales?',
    timestamp: new Date(Date.now() - 50 * 60 * 1000)
  },
  {
    id: '3',
    senderId: '2',
    senderName: 'Carlos Martínez',
    message: 'Sí, incluye caja, papeles y certificado de autenticidad.',
    timestamp: new Date(Date.now() - 40 * 60 * 1000)
  },
  {
    id: '4',
    senderId: '1',
    senderName: 'María González',
    message: 'Perfecto, ¿cuándo puedo recogerlo si gano?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  }
];

export const mockShippingStatus: ShippingStatus = {
  productId: '6',
  status: 'shipped',
  trackingNumber: 'ABC123456789',
  estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  updates: [
    {
      status: 'Empacado',
      location: 'Centro de distribución - Ciudad de México',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      status: 'En tránsito',
      location: 'Hub regional - Guadalajara',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      status: 'En ruta de entrega',
      location: 'Centro de distribución local',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ]
};

export const mockHeatMapData: HeatMapData[] = [
  { location: 'Ciudad de México', lat: 19.4326, lng: -99.1332, sales: 1245, value: 2500000 },
  { location: 'Guadalajara', lat: 20.6597, lng: -103.3496, sales: 834, value: 1800000 },
  { location: 'Monterrey', lat: 25.6866, lng: -100.3161, sales: 756, value: 1650000 },
  { location: 'Puebla', lat: 19.0414, lng: -98.2063, sales: 432, value: 890000 },
  { location: 'Querétaro', lat: 20.5888, lng: -100.3899, sales: 389, value: 780000 },
  { location: 'Tijuana', lat: 32.5149, lng: -117.0382, sales: 298, value: 620000 },
  { location: 'Mérida', lat: 20.9674, lng: -89.5926, sales: 267, value: 540000 },
  { location: 'Cancún', lat: 21.1619, lng: -86.8515, sales: 234, value: 480000 }
];

export const teamMembers = [
  {
    id: '1',
    name: 'Roberto Sánchez',
    position: 'CEO & Fundador',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    bio: '15 años de experiencia en e-commerce y subastas'
  },
  {
    id: '2',
    name: 'Laura Martínez',
    position: 'Directora de Operaciones',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    bio: 'Experta en logística y gestión de plataformas'
  },
  {
    id: '3',
    name: 'Carlos Díaz',
    position: 'Director de Tecnología',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    bio: 'Especialista en desarrollo de sistemas en tiempo real'
  },
  {
    id: '4',
    name: 'Ana Rodríguez',
    position: 'Gerente de Atención al Cliente',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    bio: 'Comprometida con la mejor experiencia del usuario'
  }
];

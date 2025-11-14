import { useState, useEffect } from 'react';
import { Award, Users, Target, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
// --- ¡IMPORTS DE FIREBASE! ---
import { db } from '../../lib/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

// --- DATOS DEL EQUIPO REAL ---
// (Ya no importamos 'teamMembers' de mockData)
const teamMembers = [
  {
    id: '1',
    name: 'Brayan Rivera',
    position: 'Desarrollador Full-Stack',
    image: 'https://placehold.co/400x400/ef4444/white?text=BR', // Placeholder
    bio: 'Apasionado por crear experiencias de usuario fluidas y tecnología en tiempo real.'
  },
  {
    id: '2',
    name: 'Michael',
    position: 'Gerente del Proyecto',
    image: 'https://placehold.co/400x400/3b82f6/white?text=M', // Placeholder
    bio: 'Asegurando que el proyecto cumpla con las metas y la visión del equipo.'
  },
  {
    id: '3',
    name: 'Sara',
    position: 'Diseñador UI/UX',
    image: 'https://placehold.co/400x400/22c55e/white?text=S', // Placeholder
    bio: 'Enfocado en diseñar interfaces intuitivas y atractivas para el usuario.'
  }
];

export function AboutPage() {
  
  // --- ¡ESTADO DINÁMICO PARA STATS! ---
  const [dynamicStats, setDynamicStats] = useState({
    activeUsers: 0,
    completedAuctions: 0,
  });

  // --- ¡USEEFFECT PARA CARGAR STATS! ---
  useEffect(() => {
    // 1. Contar Usuarios Registrados (desde la colección 'users')
    const usersRef = collection(db, 'users');
    const unsubUsers = onSnapshot(usersRef, (snapshot) => {
      setDynamicStats(prev => ({ ...prev, activeUsers: snapshot.size }));
    });

    // 2. Contar Subastas Completadas (status == 'ended')
    const auctionsRef = collection(db, 'subastas');
    const completedQuery = query(auctionsRef, where("status", "==", "ended"));
    const unsubCompleted = onSnapshot(completedQuery, (snapshot) => {
      setDynamicStats(prev => ({ ...prev, completedAuctions: snapshot.size }));
    });

    // Limpiamos los listeners
    return () => {
      unsubUsers();
      unsubCompleted();
    };
  }, []); // Se ejecuta solo una vez

  // --- ARRAY DE STATS (AHORA MIXTO) ---
  const stats = [
    { icon: Users, label: 'Usuarios Registrados', value: `${dynamicStats.activeUsers.toLocaleString('es-CO')}` },
    { icon: Award, label: 'Subastas Completadas', value: `${dynamicStats.completedAuctions.toLocaleString('es-CO')}` },
    { icon: Target, label: 'Tasa de Satisfacción', value: '98%' }, // Quemado
    { icon: TrendingUp, label: 'Crecimiento Anual', value: '+145%' } // Quemado
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-red-600 tracking-widest uppercase text-sm mb-4 block">
            Acerca de Nosotros
          </span>
          <h2 className="text-white mb-6">
            La Plataforma de Subastas
            <br />
            <span className="text-red-600">Más Confiable</span>
          </h2>
          <p className="text-white/70 leading-relaxed">
            En ¿Quién da más? conectamos compradores y vendedores en un entorno seguro,
            transparente y emocionante. Nuestra misión es democratizar el acceso a artículos
            únicos y valiosos, creando una experiencia de subasta moderna y accesible para todos.
          </p>
        </div>

        {/* Stats (AHORA CON DATOS REALES) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-zinc-900 border border-white/5 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-red-600 text-2xl font-bold mb-2">{stat.value}</div>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-zinc-900 border border-white/5 rounded-xl p-8">
            <h3 className="text-white mb-4">Nuestra Misión</h3>
            <p className="text-white/70 leading-relaxed">
              Crear la plataforma de subastas en línea más segura, transparente y accesible
              de Latinoamérica, donde cada usuario pueda encontrar artículos únicos y realizar
              transacciones con total confianza.
            </p>
          </div>
          <div className="bg-zinc-900 border border-white/5 rounded-xl p-8">
            <h3 className="text-white mb-4">Nuestra Visión</h3>
            <p className="text-white/70 leading-relaxed">
              Convertirnos en el líder del mercado de subastas digitales, reconocidos por
              nuestra innovación tecnológica, excelente servicio al cliente y compromiso
              con la satisfacción de nuestra comunidad.
            </p>
          </div>
        </div>

        {/* Team (AHORA CON TU EQUIPO REAL) */}
        <div className="text-center mb-12">
          <span className="text-red-600 tracking-widest uppercase text-sm mb-4 block">
            Nuestro Equipo
          </span>
          <h3 className="text-white mb-4">Conoce a los Creadores</h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            Un equipo apasionado dedicado a crear la mejor experiencia de subastas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Ajustado a 3 columnas */}
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden hover:border-red-600/50 transition-all group">
              <div className="aspect-square overflow-hidden bg-zinc-800">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h4 className="text-white mb-1">{member.name}</h4>
                <p className="text-red-600 text-sm mb-3">{member.position}</p>
                <p className="text-white/60 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
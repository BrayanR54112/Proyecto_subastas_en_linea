import { Play } from 'lucide-react';
import { Button } from './ui/button';
import heroImage from 'figma:asset/363632de4d494eba9450d193adcdeec143279f4f.png';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-10" />
        <img 
          src={heroImage}
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
            <Button className="bg-red-600 hover:bg-red-700 px-8 py-6">
              Explorar Subastas
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6">
              <Play className="w-4 h-4 mr-2" />
              Ver Tutorial
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-red-600 mb-1">1,234</div>
              <div className="text-white/60 text-sm">Subastas Activas</div>
            </div>
            <div>
              <div className="text-red-600 mb-1">45K+</div>
              <div className="text-white/60 text-sm">Usuarios Activos</div>
            </div>
            <div>
              <div className="text-red-600 mb-1">$2.5M</div>
              <div className="text-white/60 text-sm">Vendido este mes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

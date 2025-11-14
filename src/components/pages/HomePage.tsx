import { HeroSection } from '../HeroSection';
import { LiveAuctions } from '../LiveAuctions';
import { HowItWorks } from '../HowItWorks';

// --- ¡CAMBIO 1: Definimos las props! ---
// Le decimos a HomePage que va a recibir la función 'onViewAuction'
// que viene de App.tsx (la que manda al login)
interface HomePageProps {
  onViewAuction: () => void;
}

// --- ¡CAMBIO 2: Recibimos la prop! ---
export function HomePage({ onViewAuction }: HomePageProps) {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      
      {/* --- ¡CAMBIO 3: Pasamos la prop a LiveAuctions! ---
        LiveAuctions espera una prop: 'onViewAuction' que es de tipo (id: string) => void.
        Pero en la página pública, no nos importa QUÉ subasta clicó, solo que lo
        mandemos al login.
        
        Así que creamos una función flecha que ignore el ID y simplemente
        llame a la función 'onViewAuction' (que viene de App.tsx y manda al login).
      */}
      <LiveAuctions onViewAuction={() => onViewAuction()} />
      
      <HowItWorks />
    </div>
  );
}
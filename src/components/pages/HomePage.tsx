import { HeroSection } from '../HeroSection';
import { LiveAuctions } from '../LiveAuctions';
import { HowItWorks } from '../HowItWorks';


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
      <LiveAuctions onViewAuction={() => onViewAuction()} />     
      <HowItWorks />
    </div>
  );
}
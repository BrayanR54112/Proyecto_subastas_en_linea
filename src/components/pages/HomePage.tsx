import { HeroSection } from '../HeroSection';
import { LiveAuctions } from '../LiveAuctions';
import { HowItWorks } from '../HowItWorks';

interface HomePageProps {
  onViewAuction: () => void;
}

export function HomePage({ onViewAuction }: HomePageProps) {
  return (
    <div className="min-h-screen bg-black">

      <HeroSection onExplore={onViewAuction} />

      <LiveAuctions onViewAuction={() => onViewAuction()} />
      
      <HowItWorks />
      
    </div>
  );
}
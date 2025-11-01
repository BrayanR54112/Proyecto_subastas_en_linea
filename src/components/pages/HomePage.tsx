import { HeroSection } from '../HeroSection';
import { LiveAuctions } from '../LiveAuctions';
import { HowItWorks } from '../HowItWorks';

export function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <LiveAuctions />
      <HowItWorks />
    </div>
  );
}

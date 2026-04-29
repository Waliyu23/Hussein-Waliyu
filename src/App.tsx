import { lazy, Suspense, useEffect, useState } from 'react';
import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ManifestoSection from './sections/ManifestoSection';
import ProfileSection from './sections/ProfileSection';
import CompetenciesSection from './sections/CompetenciesSection';
import ExperienceSection from './sections/ExperienceSection';
import TechnicalSkillsSection from './sections/TechnicalSkillsSection';
import WorksSection from './sections/WorksSection';
import ContactSection from './sections/ContactSection';

const ParticleField = lazy(() => import('./components/ParticleField'));

export default function App() {
  useLenis();
  const [showParticleField, setShowParticleField] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 1024) {
      return;
    }

    const enableParticleField = () => setShowParticleField(true);
    const hasIdleCallback =
      typeof window.requestIdleCallback === 'function' &&
      typeof window.cancelIdleCallback === 'function';

    if (hasIdleCallback) {
      const idleId = window.requestIdleCallback(enableParticleField, { timeout: 1500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(enableParticleField, 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1A1A1A]">
      {showParticleField ? (
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      ) : null}
      <Navigation />
      <main className="relative" style={{ zIndex: 1 }}>
        <HeroSection />
        <ManifestoSection />
        <ProfileSection />
        <CompetenciesSection />
        <ExperienceSection />
        <TechnicalSkillsSection />
        <WorksSection />
        <ContactSection />
      </main>
    </div>
  );
}

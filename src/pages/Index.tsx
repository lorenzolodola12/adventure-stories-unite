import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from '@/components/Header';
import { PageIntro } from '@/components/PageIntro';
import { MarqueeStrip } from '@/components/MarqueeStrip';
import { HeroSection } from '@/components/sections/HeroSection';
import { MissionSection } from '@/components/sections/MissionSection';
import { ProgramsSection } from '@/components/sections/ProgramsSection';
import { FilmsSection } from '@/components/sections/FilmsSection';

import { EventsSection } from '@/components/sections/EventsSection';
import { JoinSection } from '@/components/sections/JoinSection';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ScrollToTop } from '@/components/ScrollToTop';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useEffect(() => {
    // Set initial season based on localStorage or current month
    const saved = localStorage.getItem('adventurabile-season');
    if (!saved) {
      const month = new Date().getMonth() + 1;
      const season = month >= 3 && month <= 8 ? 'spring-summer' : 'autumn-winter';
      localStorage.setItem('adventurabile-season', season);
      if (season === 'autumn-winter') {
        document.documentElement.setAttribute('data-season', 'autumn-winter');
      } else {
        document.documentElement.setAttribute('data-season', 'spring-summer');
      }
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full">
      {showIntro && <PageIntro onComplete={() => setShowIntro(false)} />}
      <Header />
      <LanguageToggle />
      <ScrollToTop />
      <main className="pt-16 overflow-x-hidden">
        <HeroSection />
        <MarqueeStrip />
        <MissionSection />
        <ProgramsSection />
        <FilmsSection />
        <EventsSection />
        <JoinSection />
      </main>
    </div>
  );
};

export default Index;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '@/assets/logo.png';

interface PageIntroProps {
  onComplete: () => void;
}

export const PageIntro = ({ onComplete }: PageIntroProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Safety fallback — always dismiss within 3.5s no matter what
    const fallback = setTimeout(onComplete, 3500);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(logoRef.current, { opacity: 0, scale: 0.88, y: 10 });

      const tl = gsap.timeline({
        onComplete: () => { clearTimeout(fallback); onComplete(); }
      });
      tl
        .to(logoRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .to({}, { duration: 1.4 })
        .to(overlayRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });

      return () => { tl.kill(); clearTimeout(fallback); };
    } else {
      clearTimeout(fallback);
      onComplete();
    }
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: '#111' }}
    >
      <img ref={logoRef} src={logo} alt="Adventurabile" className="h-24 w-auto" />
    </div>
  );
};

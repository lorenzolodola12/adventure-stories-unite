import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { gsap } from 'gsap';
import heroImage from '@/assets/hero-bg.jpg';

export const HeroSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    const element = document.getElementById('mission');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const words = Array.from(section.querySelectorAll<HTMLElement>('.hero-word'));
      const bridge = bridgeRef.current!;
      const subtitle = subtitleRef.current!;
      const cta = ctaRef.current!;
      const bg = bgRef.current!;

      // Always pre-hide text elements so there's no flash before the timeline runs
      gsap.set([bridge, ...words, subtitle, cta], { opacity: 0 });

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const isMobile = window.innerWidth < 768;
        gsap.set(words, { y: isMobile ? 20 : 40 });
        gsap.set([bridge, subtitle, cta], { y: isMobile ? 10 : 20 });

        // Text reveal — delay matches PageIntro (0.6s in + 1.4s hold + starts fading at 2s)
        const tl = gsap.timeline({ delay: 2.1 });
        tl
          .to(bridge, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
          .to(words, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
          }, '-=0.2')
          .to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
          .to(cta, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');

        // Parallax: subtle 0.15x so the subject stays in frame (desktop only)
        if (!isMobile) {
          gsap.to(bg, {
            y: () => -(window.innerHeight * 0.15),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      } else {
        gsap.set([bridge, ...words, subtitle, cta], { opacity: 1, y: 0 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = t.hero.headline.split(' ');

  return (
    <section
      ref={sectionRef}
      id="home"
      className="scroll-section min-w-full h-screen relative flex items-start justify-center overflow-hidden pt-24 md:pt-32"
    >
      {/* Background — extra tall so parallax movement never shows white space */}
      <div
        ref={bgRef}
        className="absolute w-full"
        style={{ top: '-20%', height: '160%' }}
      >
        <img
          src={heroImage}
          alt="Mountain landscape with wildlife showcasing inclusive outdoor adventure opportunities in natural wilderness"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 animate-fade-in" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <p
          ref={bridgeRef}
          className="text-sm md:text-base uppercase tracking-wider mb-4 font-bold"
        >
          {t.hero.bridge}
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {words.map((word, i) => (
            <span
              key={i}
              className="hero-word inline-block"
              style={{ marginRight: i < words.length - 1 ? '0.3em' : 0 }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl mb-10 opacity-90 leading-relaxed"
        >
          {t.hero.subline}
        </p>

        <div ref={ctaRef}>
          <Button
            size="lg"
            onClick={scrollToAbout}
            className="bg-white text-foreground hover:bg-white/90 hover:shadow-xl"
          >
            {t.hero.cta}
          </Button>
        </div>
      </div>
    </section>
  );
};

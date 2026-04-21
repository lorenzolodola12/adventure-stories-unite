import { useEffect, useRef } from 'react';
import { Mountain, Users, Target } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { gsap } from 'gsap';
import missionPhoto from '@/assets/mission-adaptive-ski.jpg';

export const MissionSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  const bullets = [
    { title: t.mission.bullet1, subtitle: t.mission.bullet1Sub, icon: Target },
    { title: t.mission.bullet2, subtitle: t.mission.bullet2Sub, icon: Mountain },
    { title: t.mission.bullet3, subtitle: t.mission.bullet3Sub, icon: Users },
  ];

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const ctx = gsap.context(() => {
        const section = sectionRef.current!;
        const photo = photoRef.current!;
        const rows = Array.from(section.querySelectorAll<HTMLElement>('.mission-card'));
        const heading = section.querySelector<HTMLElement>('.mission-heading');
        const subline = section.querySelector<HTMLElement>('.mission-subline');
        const isMobile = window.innerWidth < 768;

        if (heading) {
          gsap.fromTo(heading,
            { y: isMobile ? 15 : 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 75%', once: true } }
          );
        }

        if (subline) {
          gsap.fromTo(subline,
            { y: isMobile ? 10 : 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 75%', once: true } }
          );
        }

        gsap.fromTo(photo,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: photo, start: 'top 85%', once: true } }
        );

        if (rows.length) {
          gsap.fromTo(rows,
            { y: isMobile ? 15 : 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.15,
              scrollTrigger: { trigger: rows[0], start: 'top 85%', once: true } }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="scroll-section min-w-full bg-background py-20"
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="mission-heading text-4xl md:text-6xl font-bold mb-6">
          {t.mission.title}
        </h2>
        <p className="mission-subline text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t.mission.subline}
        </p>
      </div>

      {/* Full-width editorial photo */}
      <div className="relative overflow-hidden mb-16" style={{ height: '55vh', minHeight: '320px' }}>
        <img
          ref={photoRef}
          src={missionPhoto}
          alt="Athlete training in adaptive skiing equipment on snowy mountain slope, demonstrating inclusive winter sports"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
      </div>

      {/* Value rows — editorial numbered list */}
      <div className="max-w-7xl mx-auto px-4">
        {bullets.map((bullet, i) => {
          const Icon = bullet.icon;
          return (
            <div
              key={i}
              className="mission-card group flex items-center gap-6 md:gap-10 py-10 border-b border-border last:border-b-0 rounded-xl hover:bg-primary/[0.03] px-2 transition-colors duration-300"
            >
              <span className="text-7xl md:text-8xl font-black text-primary/[0.08] w-20 md:w-28 flex-shrink-0 leading-none select-none tabular-nums">
                0{i + 1}
              </span>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {bullet.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {bullet.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

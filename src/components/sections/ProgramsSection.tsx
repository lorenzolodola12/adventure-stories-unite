import { useEffect, useRef } from 'react';
import { Mountain, Video, Calendar, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { gsap } from 'gsap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import lorenzoPhoto from '@/assets/lorenzo-profile.jpg';
import dragosPhoto from '@/assets/dragos-profile.jpg';

export const ProgramsSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const ctx = gsap.context(() => {
        const section = sectionRef.current!;
        const isMobile = window.innerWidth < 768;

        gsap.fromTo(
          section.querySelector('.programs-heading'),
          { y: isMobile ? 15 : 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%', once: true } }
        );

        const pillarCards = Array.from(section.querySelectorAll<HTMLElement>('.pillar-card'));
        if (pillarCards.length) {
          gsap.fromTo(pillarCards,
            { y: isMobile ? 25 : 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.15,
              scrollTrigger: { trigger: pillarCards[0], start: 'top 80%', once: true } }
          );
        }

        const behindHeading = section.querySelector<HTMLElement>('.behind-heading');
        if (behindHeading) {
          gsap.fromTo(behindHeading,
            { y: isMobile ? 15 : 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: behindHeading, start: 'top 82%', once: true } }
          );
        }

        const portraitCards = Array.from(section.querySelectorAll<HTMLElement>('.portrait-wrapper'));
        if (portraitCards.length) {
          gsap.fromTo(portraitCards,
            { y: isMobile ? 30 : 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.2,
              scrollTrigger: { trigger: portraitCards[0], start: 'top 85%', once: true } }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const pillarList = (points: string[], color: string) => (
    <ul className="space-y-4">
      {points.map((pt, i) => (
        <li key={i} className="flex gap-3 items-start group/item">
          <span className={`${color} mt-1 transition-transform group-hover/item:scale-125`}>•</span>
          <span className="leading-relaxed text-sm">{pt}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="scroll-section min-w-full min-h-screen bg-gradient-to-b from-sand/30 to-sand/60 px-4 py-20"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="programs-heading text-5xl md:text-6xl font-serif font-bold mb-16 text-center">
          {t.programs.title}
        </h2>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {/* 01 — Sport & Growth */}
          <Card className="pillar-card group relative border-none bg-white shadow-lg hover:shadow-2xl hover-lift overflow-hidden">
            <span className="pillar-number">01</span>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mountain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t.programs.sport.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {pillarList(
                [t.programs.sport.point1, t.programs.sport.point2, t.programs.sport.point3, t.programs.sport.point4],
                'text-primary'
              )}
              <div className="pt-4 border-t border-primary/10">
                <p className="text-sm font-medium italic text-primary/80">"{t.programs.quote1}"</p>
              </div>
            </CardContent>
          </Card>

          {/* 02 — Storytelling & Communication */}
          <Card className="pillar-card group relative border-none bg-white shadow-lg hover:shadow-2xl hover-lift overflow-hidden">
            <span className="pillar-number">02</span>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Video className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">{t.programs.storytelling.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {pillarList(
                [t.programs.storytelling.point1, t.programs.storytelling.point2, t.programs.storytelling.point3, t.programs.storytelling.point4],
                'text-accent'
              )}
              <div className="pt-4 border-t border-accent/10">
                <p className="text-sm font-medium italic text-accent/80">"{t.programs.quote2}"</p>
              </div>
            </CardContent>
          </Card>

          {/* 03 — Events & Community */}
          <Card className="pillar-card group relative border-none bg-white shadow-lg hover:shadow-2xl hover-lift overflow-hidden md:col-span-2 lg:col-span-1">
            <span className="pillar-number">03</span>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t.programs.events.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {pillarList(
                [t.programs.events.point1, t.programs.events.point2, t.programs.events.point3, t.programs.events.point4],
                'text-primary'
              )}
              <div className="pt-4 border-t border-primary/10">
                <p className="text-sm font-medium italic text-primary/80">"{t.programs.quote3}"</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Behind the Project — editorial portrait cards */}
        <div className="mt-8">
          <h3 className="behind-heading text-4xl md:text-5xl font-bold mb-16 text-center">
            {t.programs.behind}
          </h3>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* Dragos */}
            <div
              className="portrait-wrapper group relative overflow-hidden rounded-2xl cursor-default"
              style={{ height: '580px' }}
            >
              <img
                src={dragosPhoto}
                alt="Dragoș Ciolan, co-founder of Adventurabile APS, outdoor adventure specialist and inclusion advocate"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
              {/* Default: name + title */}
              <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                <h4 className="text-3xl font-bold text-white mb-1">{t.programs.dragos.name}</h4>
                <p className="text-white/60 text-sm">{t.programs.dragos.title}</p>
              </div>
              {/* Hover: bio panel slides up */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-black/82 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h4 className="text-2xl font-bold text-white mb-1">{t.programs.dragos.name}</h4>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-4">{t.programs.dragos.title}</p>
                <p className="text-white/75 text-sm leading-relaxed line-clamp-7">{t.programs.dragos.bio}</p>
                <div className="flex gap-4 mt-6">
                  <a href="https://www.linkedin.com/in/dragos-ciolan/" target="_blank" rel="noopener noreferrer"
                     className="text-white/50 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:dragosciolan14@gmail.com"
                     className="text-white/50 hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Lorenzo */}
            <div
              className="portrait-wrapper group relative overflow-hidden rounded-2xl cursor-default"
              style={{ height: '580px' }}
            >
              <img
                src={lorenzoPhoto}
                alt="Lorenzo Lodola, co-founder of Adventurabile APS, adaptive athlete and storytelling filmmaker"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
              {/* Default: name + title */}
              <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                <h4 className="text-3xl font-bold text-white mb-1">{t.programs.lorenzo.name}</h4>
                <p className="text-white/60 text-sm">{t.programs.lorenzo.title}</p>
              </div>
              {/* Hover: bio panel slides up */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-black/82 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h4 className="text-2xl font-bold text-white mb-1">{t.programs.lorenzo.name}</h4>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-4">{t.programs.lorenzo.title}</p>
                <p className="text-white/75 text-sm leading-relaxed line-clamp-7">{t.programs.lorenzo.bio}</p>
                <div className="flex gap-4 mt-6">
                  <a href="https://www.linkedin.com/in/lorenzo-lodola-478087353/" target="_blank" rel="noopener noreferrer"
                     className="text-white/50 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:lorenzolodola12@gmail.com"
                     className="text-white/50 hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

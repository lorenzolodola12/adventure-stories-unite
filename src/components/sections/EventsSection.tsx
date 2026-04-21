import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { gsap } from 'gsap';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import communityData from '@/data/community.json';
import expertsData from '@/data/experts.json';
import lorenzoProfile from '@/assets/lorenzo-profile.jpg';
import edoardoProfile from '@/assets/edoardo-profile.jpg';
import fabioProfile from '@/assets/fabio-profile.jpg';
import elenaProfile from '@/assets/elena-profile.jpg';

const profileImages: Record<string, string> = {
  'lorenzo-profile.jpg': lorenzoProfile,
  'edoardo-profile.jpg': edoardoProfile,
  'fabio-profile.jpg': fabioProfile,
  'elena-profile.jpg': elenaProfile,
};

export const EventsSection = () => {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedStory, setSelectedStory] = useState<any>(null);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const ctx = gsap.context(() => {
        const section = sectionRef.current!;
        const isMobile = window.innerWidth < 768;

        const heading = section.querySelector<HTMLElement>('.community-heading');
        const subline = section.querySelector<HTMLElement>('.community-subline');
        const storiesLabel = section.querySelector<HTMLElement>('.stories-label');
        const expertBlock = section.querySelector<HTMLElement>('.expert-block');

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
        if (storiesLabel) {
          gsap.fromTo(storiesLabel,
            { y: isMobile ? 15 : 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: storiesLabel, start: 'top 82%', once: true } }
          );
        }

        const adventurableCards = Array.from(section.querySelectorAll<HTMLElement>('.adventurable-card'));
        if (adventurableCards.length) {
          gsap.fromTo(adventurableCards,
            { scale: 0.94, opacity: 0, y: isMobile ? 20 : 40 },
            { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.15,
              scrollTrigger: { trigger: adventurableCards[0], start: 'top 85%', once: true } }
          );
        }

        if (expertBlock) {
          gsap.fromTo(expertBlock,
            { y: isMobile ? 20 : 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: expertBlock, start: 'top 85%', once: true } }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const data = communityData as { adventurables: any[]; team: any[] };
  const elena = (expertsData as { experts: any[] }).experts[0];

  return (
    <section
      ref={sectionRef}
      id="community"
      className="scroll-section min-w-full bg-background px-4 py-20"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-20 text-center">
          <h2 className="community-heading text-5xl md:text-6xl font-serif font-bold mb-6">
            {t.community.title}
          </h2>
          <p className="community-subline text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.community.subline}
          </p>
        </div>

        {/* Adventurables — editorial portrait cards */}
        <div className="mb-24">
          <p className="stories-label text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8 text-center">
            {language === 'en' ? 'Their Stories' : 'Le Loro Storie'}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {data.adventurables.map((story, i) => (
              <button
                key={i}
                className="adventurable-card group relative overflow-hidden rounded-2xl cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{ height: '520px' }}
                onClick={() => setSelectedStory(story)}
                aria-label={`Read ${language === 'en' ? story.name_en : story.name_it}'s story`}
              >
                {/* Photo */}
                <img
                  src={profileImages[story.image]}
                  alt={language === 'en' ? story.name_en : story.name_it}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />

                {/* Permanent gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

                {/* Default label */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {language === 'en' ? story.name_en : story.name_it}
                  </h3>
                  <p className="text-white/55 text-sm capitalize">{story.category}</p>
                </div>

                {/* Hover panel */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-black/80 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {language === 'en' ? story.name_en : story.name_it}
                  </h3>
                  <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-4 capitalize">
                    {story.category}
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed line-clamp-5 mb-6">
                    {language === 'en' ? story.excerpt_en : story.excerpt_it}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white text-sm font-semibold border border-white/30 rounded-full px-5 py-2.5 w-fit hover:bg-white/10 transition-colors">
                    {language === 'en' ? 'Read story' : 'Leggi la storia'}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Expert feature — editorial horizontal split */}
        <div className="expert-block relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="grid md:grid-cols-[2fr_3fr] gap-0">

            {/* Photo column */}
            <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>
              <img
                src={profileImages[elena.image]}
                alt={elena.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 md:block hidden pointer-events-none" />
            </div>

            {/* Bio column */}
            <div className="flex flex-col justify-center px-10 py-12 md:py-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                {language === 'en' ? 'Our Expert' : 'La Nostra Esperta'}
              </p>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-foreground">
                {elena.name}
              </h3>
              <p className="text-primary font-semibold text-sm mb-1">
                {language === 'en' ? elena.role_en : elena.role_it}
              </p>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-6">
                {language === 'en' ? elena.team_en : elena.team_it}
              </p>
              <p className="text-foreground/70 leading-relaxed text-base max-w-md">
                {language === 'en' ? elena.description_en : elena.description_it}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Story dialog */}
      <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-4">
              {selectedStory && (language === 'en' ? selectedStory.name_en : selectedStory.name_it)}
            </DialogTitle>
          </DialogHeader>
          {selectedStory && (
            <div className="space-y-4">
              <img
                src={profileImages[selectedStory.image]}
                alt={language === 'en' ? selectedStory.name_en : selectedStory.name_it}
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {language === 'en' ? selectedStory.story_en : selectedStory.story_it}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

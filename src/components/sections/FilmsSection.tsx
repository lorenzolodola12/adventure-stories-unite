import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { X, ChevronLeft, ChevronRight, MapPin, ExternalLink, Play } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { gsap } from 'gsap';

// Editorial hero photos — the best material front and center
import sportWheelchair from '@/assets/sport-wheelchair-mountain.jpg';
import wolfSnow from '@/assets/wolf-snow.jpg';
import mountainEagle from '@/assets/nature-mountain-eagle.jpg';
import sportMonoski from '@/assets/sport-monoski.jpg';
import deerSunrise from '@/assets/nature-deer-sunrise.jpg';
import mountainGoatRocks from '@/assets/mountain-goat-rocks.jpg';
import mountainMist from '@/assets/nature-mountain-mist.jpg';
import videoCover from '@/assets/video-cover.jpg';

// Full gallery data (for lightbox)
import sport1TheRush from '@/assets/sport-1-the-rush.jpg';
import sport2Connections from '@/assets/sport-2-connections.jpg';
import sport3EdgeOfSpeed from '@/assets/sport-3-edge-of-speed.jpg';
import sport4IntoTheGates from '@/assets/sport-4-into-the-gates.jpg';
import sport5SharedJoy from '@/assets/sport-5-shared-joy.jpg';
import natureAutumnForest from '@/assets/nature-autumn-forest.jpg';
import natureDeerSunrise from '@/assets/nature-deer-sunrise.jpg';
import natureAccessiblePath from '@/assets/nature-accessible-path.jpg';
import natureWinterForest from '@/assets/nature-winter-forest.jpg';
import natureMountainView from '@/assets/nature-mountain-view.jpg';
import natureChamois from '@/assets/nature-chamois.jpg';
import natureMountainGoat from '@/assets/nature-mountain-goat.jpg';
import natureMistyForest from '@/assets/nature-misty-forest.jpg';
import natureForestAbstract from '@/assets/nature-forest-abstract.jpg';
import eventLiveEvents from '@/assets/event-live-events.jpg';
import eventSocialImpact from '@/assets/event-social-impact.jpg';
import eventOutdoorCommunity from '@/assets/event-outdoor-community.jpg';
import eventYoungAge from '@/assets/event-young-age.jpg';

interface GalleryImage {
  src: string;
  title_it: string;
  title_en: string;
  description_it?: string;
  description_en?: string;
  location?: string;
  coordinates?: { lat: number; lng: number };
  links?: { title: string; url: string }[];
}

const galleryCategories: Array<{
  title_it: string;
  title_en: string;
  description_it: string;
  description_en: string;
  keywords_it: string;
  keywords_en: string;
  coverImage: string;
  gallery: GalleryImage[];
}> = [
  {
    title_it: 'Sport',
    title_en: 'Sport',
    description_it: 'La forza del movimento. Lo sport come linguaggio universale dell\'inclusione.',
    description_en: 'The power of movement. Sport as the universal language of inclusion.',
    keywords_it: 'adrenalina, focus, equilibrio, determinazione',
    keywords_en: 'adrenaline, focus, balance, determination',
    coverImage: sport1TheRush,
    gallery: [
      { src: sport1TheRush, title_it: 'The Rush', title_en: 'The Rush', description_en: 'Lorenzo in action during a breathtaking descent — the pure adrenaline of adaptive sports.', description_it: 'Lorenzo in azione durante una discesa mozzafiato — la pura adrenalina degli sport adattivi.', location: 'Pila, Italia' },
      { src: sport2Connections, title_it: 'Connections', title_en: 'Connections', description_en: 'Growth is a shared journey — thanks to the people who believe in you.', description_it: 'La crescita è un viaggio condiviso — grazie alle persone che credono in te.', location: 'Sansicario, Italia' },
      { src: sport3EdgeOfSpeed, title_it: 'Edge of Speed', title_en: 'Edge of Speed', description_en: 'The thrill of speed and freedom — a feeling like no other.', description_it: 'Il brivido della velocità e della libertà — una sensazione senza paragoni.', location: 'Pila, Italia' },
      { src: sport4IntoTheGates, title_it: 'Into the Gates', title_en: 'Into the Gates', description_en: 'Lorenzo during a slalom race — one of the trickiest disciplines in adaptive skiing.', description_it: 'Lorenzo durante una gara di slalom — una delle discipline più tecniche dello sci adattivo.', location: 'Pila, Italia' },
      { src: sportWheelchair, title_it: 'In Alta Quota', title_en: 'High Altitude', description_en: 'Where limits dissolve and the mountain opens up to everyone.', description_it: 'Dove i limiti si dissolvono e la montagna si apre a tutti.', location: 'Alpi Italiane' },
      { src: sportMonoski, title_it: 'Mono-sci', title_en: 'Monoski', description_en: 'Precision, balance, speed — adaptive skiing at its finest.', description_it: 'Precisione, equilibrio, velocità — lo sci adattivo al suo meglio.' },
      { src: sport5SharedJoy, title_it: 'Shared Joy', title_en: 'Shared Joy', description_en: 'The smiles, the people, the bonds — what makes every challenge worthwhile.', description_it: 'I sorrisi, le persone, i legami — quello che rende ogni sfida preziosa.', location: 'Sansicario, Italia' },
    ]
  },
  {
    title_it: 'Natura',
    title_en: 'Nature',
    description_it: 'La forza della natura. Luoghi che diventano accessibili.',
    description_en: 'The Power of Nature. Places that become accessible to all.',
    keywords_it: 'luce, silenzio, accessibilità, bellezza',
    keywords_en: 'light, silence, accessibility, beauty',
    coverImage: natureMistyForest,
    gallery: [
      { src: wolfSnow, title_it: 'Lupo nella Neve', title_en: 'Wolf in Snow', description_en: 'Wild and free — the wolf embodies the spirit of the untamed mountain.', description_it: 'Selvatico e libero — il lupo incarna lo spirito della montagna indomita.', location: 'Alpi' },
      { src: mountainEagle, title_it: 'Aquila in Volo', title_en: 'Eagle in Flight', description_en: 'An eagle soars over snowy peaks, symbol of freedom and strength.', description_it: 'Un\'aquila sorvola le vette innevate, simbolo di libertà e forza.', location: 'Gran Paradiso, Italia', coordinates: { lat: 45.5, lng: 7.3 } },
      { src: mountainGoatRocks, title_it: 'Stambecco sulle Rocce', title_en: 'Ibex on Rocks', description_en: 'Majestic and solitary, the ibex rules the steepest peaks with natural grace.', description_it: 'Maestoso e solitario, lo stambecco domina le vette più impervie con grazia naturale.', location: 'Gran Paradiso, Italia', coordinates: { lat: 45.5, lng: 7.3 } },
      { src: mountainMist, title_it: 'Montagna nella Nebbia', title_en: 'Mountain in Mist', description_en: 'The mountains disappear into clouds — wild and mysterious.', description_it: 'Le montagne scompaiono tra le nuvole — selvagge e misteriose.' },
      { src: deerSunrise, title_it: 'Risveglio Silenzioso', title_en: 'Silent Awakening', description_en: 'Sun rays pierce through morning mist as a deer watches the new day.', description_it: 'I raggi del sole attraversano la nebbia mattutina, mentre un cervo osserva il nuovo giorno.', location: 'Parco del Gran Paradiso, Italia', coordinates: { lat: 45.5, lng: 7.2 } },
      { src: natureChamois, title_it: 'Camoscio al Tramonto', title_en: 'Chamois at Sunset', description_en: 'A chamois emerges from the shadows, lit by the golden light of dying day.', description_it: 'Un camoscio emerge dalla penombra, illuminato dalla luce dorata del giorno che muore.', location: 'Alpi Marittime, Italia', coordinates: { lat: 44.2, lng: 7.4 } },
      { src: natureAutumnForest, title_it: 'Foresta d\'Oro', title_en: 'Golden Forest', description_en: 'Sunset light illuminates the autumn larches, creating a golden carpet of nature.', description_it: 'La luce del tramonto illumina i larici autunnali, creando un tappeto dorato di natura.', location: 'Valle d\'Aosta, Italia', coordinates: { lat: 45.7, lng: 7.3 } },
      { src: natureWinterForest, title_it: 'Foresta Silenziosa', title_en: 'Silent Forest', description_en: 'Winter\'s white wraps the trees in an embrace of pure quiet.', description_it: 'Il bianco dell\'inverno avvolge gli alberi in un abbraccio di pura quiete.', location: 'Alpi Italiane' },
      { src: natureMountainView, title_it: 'Vista Senza Confini', title_en: 'View Without Boundaries', description_en: 'Before the greatness of mountains, every limit becomes possibility.', description_it: 'Di fronte alla grandezza delle montagne, ogni limite diventa possibilità.', location: 'Gran Paradiso, Italia' },
      { src: natureMountainGoat, title_it: 'Stambecco delle Rocce', title_en: 'Rock Ibex', description_en: 'Majestic and solitary, the ibex rules the steepest peaks with natural grace.', description_it: 'Maestoso e solitario, lo stambecco domina le vette più impervie con grazia naturale.', location: 'Gran Paradiso, Italia' },
      { src: natureMistyForest, title_it: 'Nebbie Misteriose', title_en: 'Mysterious Mists', description_en: 'Mist wraps the forest in a veil of mystery and contemplation.', description_it: 'La nebbia avvolge la foresta in un velo di mistero e contemplazione.', location: 'Dolomiti, Italia' },
      { src: natureForestAbstract, title_it: 'Essenza del Bosco', title_en: 'Forest Essence', description_en: 'Movement and light merge in a dreamlike vision of the winter forest.', description_it: 'Movimento e luce si fondono in una visione onirica della foresta invernale.', location: 'Alpi Italiane' },
      { src: natureAccessiblePath, title_it: 'Sentiero Accessibile', title_en: 'Accessible Path', description_en: 'A path that shows how nature\'s beauty can be for everyone.', description_it: 'Un percorso che dimostra come la bellezza della natura possa essere per tutti.', location: 'Scozia', coordinates: { lat: 57.3, lng: -5.5 } },
    ]
  },
  {
    title_it: 'Eventi',
    title_en: 'Events',
    description_it: 'Volti, storie e incontri che muovono l\'avventura.',
    description_en: 'Faces, stories and encounters that move the adventure.',
    keywords_it: 'comunità, connessione, energia, impatto',
    keywords_en: 'community, connection, energy, impact',
    coverImage: eventLiveEvents,
    gallery: [
      { src: eventLiveEvents, title_it: 'Eventi dal Vivo', title_en: 'Live Events', description_en: 'We participate in live events to share our stories — spreading messages of resilience, inclusion, and positive impact.', description_it: 'Partecipiamo a eventi dal vivo per condividere le nostre storie.' },
      { src: eventSocialImpact, title_it: 'Impatto Sociale', title_en: 'Social Impact', description_en: 'We take part in events that actively involve people with disabilities from local communities.', description_it: 'Partecipiamo a eventi che coinvolgono attivamente persone con disabilità delle comunità locali.' },
      { src: eventOutdoorCommunity, title_it: 'Comunità Outdoor', title_en: 'Outdoor Community', description_en: 'Together we explore nature and create shared experiences that strengthen our community.', description_it: 'Insieme esploriamo la natura e creiamo esperienze condivise.' },
      { src: eventYoungAge, title_it: 'A Partire dalla Giovane Età', title_en: 'Starting Young', description_en: 'We visit schools to talk about disability and inclusion — inspiring the next generation.', description_it: 'Visitiamo le scuole per parlare di disabilità e inclusione.' },
    ]
  }
];

export const FilmsSection = () => {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<typeof galleryCategories[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (category: typeof galleryCategories[0], startIndex = 0) => {
    setSelectedGallery(category);
    setCurrentImageIndex(startIndex);
  };

  const closeGallery = () => { setSelectedGallery(null); setCurrentImageIndex(0); };
  const nextImage = () => {
    if (selectedGallery) setCurrentImageIndex(p => p === selectedGallery.gallery.length - 1 ? 0 : p + 1);
  };
  const prevImage = () => {
    if (selectedGallery) setCurrentImageIndex(p => p === 0 ? selectedGallery.gallery.length - 1 : p - 1);
  };

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const ctx = gsap.context(() => {
        const section = sectionRef.current!;

        gsap.fromTo(section.querySelector('.films-hero-content'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 70%', once: true } }
        );

        const photos = Array.from(section.querySelectorAll<HTMLElement>('.editorial-photo'));
        if (photos.length) {
          gsap.fromTo(photos,
            { opacity: 0, scale: 0.97 },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07,
              scrollTrigger: { trigger: section.querySelector('.editorial-grid'), start: 'top 80%', once: true } }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  // Label shown on photo overlay
  const overlayLabel = (categoryIndex: number, lang: string) =>
    lang === 'en' ? galleryCategories[categoryIndex].title_en : galleryCategories[categoryIndex].title_it;

  return (
    <section ref={sectionRef} id="films" className="scroll-section min-w-full bg-background">

      {/* ─── Cinematic video hero ─────────────────────────────────────── */}
      <div className="relative h-[45vh] md:h-[65vh] overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={videoCover}
        >
          <source src="/videos/adventurabile-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />
        <div className="films-hero-content absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4 opacity-70">
            {language === 'en' ? 'Films & Gallery' : 'Film & Galleria'}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-3xl">
            {language === 'en'
              ? 'Real stories, wild places.'
              : 'Storie reali, luoghi selvaggi.'}
          </h2>
          <button
            onClick={() => setShowVideo(true)}
            className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 micro-btn"
          >
            <Play className="w-4 h-4 fill-white flex-shrink-0" />
            <span className="font-medium text-sm">
              {language === 'en' ? 'Watch Scotland — Full Film' : 'Guarda Scozia — Film Completo'}
            </span>
          </button>
        </div>
      </div>

      {/* ─── Editorial photo grid ─────────────────────────────────────── */}
      <div className="p-1.5 editorial-grid">

        {/* Desktop: asymmetric editorial layout */}
        <div className="hidden md:grid md:grid-cols-[2fr_1fr] gap-1.5 mb-1.5" style={{ gridTemplateRows: '360px 360px' }}>
          {/* Brand hero — wheelchair on mountain, largest slot */}
          <div
            className="editorial-photo row-span-2 relative overflow-hidden cursor-pointer group"
            onClick={() => openGallery(galleryCategories[0])}
          >
            <img src={sportWheelchair} alt="Adaptive athlete on mountain" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{overlayLabel(0, language)}</p>
              <p className="text-white font-bold text-2xl">
                {language === 'en' ? 'View gallery →' : 'Apri galleria →'}
              </p>
            </div>
          </div>
          {/* Wolf in snow */}
          <div
            className="editorial-photo relative overflow-hidden cursor-pointer group"
            onClick={() => openGallery(galleryCategories[1], 0)}
          >
            <img src={wolfSnow} alt="Wolf in snow" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-sm font-semibold">{language === 'en' ? 'Wolf in Snow' : 'Lupo nella Neve'}</p>
            </div>
          </div>
          {/* Eagle */}
          <div
            className="editorial-photo relative overflow-hidden cursor-pointer group"
            onClick={() => openGallery(galleryCategories[1], 1)}
          >
            <img src={mountainEagle} alt="Eagle over mountains" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-sm font-semibold">{language === 'en' ? 'Eagle in Flight' : 'Aquila in Volo'}</p>
            </div>
          </div>
        </div>

        {/* Second row: 3 photos */}
        <div className="hidden md:grid md:grid-cols-3 gap-1.5 mb-1.5" style={{ height: '280px' }}>
          <div className="editorial-photo relative overflow-hidden cursor-pointer group" onClick={() => openGallery(galleryCategories[0], 5)}>
            <img src={sportMonoski} alt="Adaptive monoski" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 p-4"><p className="text-white text-sm font-semibold">Monoski</p></div>
          </div>
          <div className="editorial-photo relative overflow-hidden cursor-pointer group" onClick={() => openGallery(galleryCategories[1], 4)}>
            <img src={deerSunrise} alt="Deer at sunrise" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 p-4"><p className="text-white text-sm font-semibold">{language === 'en' ? 'Silent Awakening' : 'Risveglio Silenzioso'}</p></div>
          </div>
          <div className="editorial-photo relative overflow-hidden cursor-pointer group" onClick={() => openGallery(galleryCategories[1], 2)}>
            <img src={mountainGoatRocks} alt="Mountain goat on rocks" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 p-4"><p className="text-white text-sm font-semibold">{language === 'en' ? 'Ibex on Rocks' : 'Stambecco sulle Rocce'}</p></div>
          </div>
        </div>

        {/* Third row: full-width mountain mist */}
        <div className="hidden md:block editorial-photo relative overflow-hidden cursor-pointer group" style={{ height: '220px' }} onClick={() => openGallery(galleryCategories[1], 3)}>
          <img src={mountainMist} alt="Mountain in mist" className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 flex items-center p-8">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{overlayLabel(1, language)}</p>
              <p className="text-white font-bold text-xl">{language === 'en' ? 'Full nature gallery →' : 'Galleria natura completa →'}</p>
            </div>
          </div>
        </div>

        {/* Mobile: 2-col grid */}
        <div className="md:hidden grid grid-cols-2 gap-1">
          {[
            { src: sportWheelchair, label: 'Sport', cat: 0 },
            { src: wolfSnow, label: language === 'en' ? 'Wolf' : 'Lupo', cat: 1 },
            { src: mountainEagle, label: language === 'en' ? 'Eagle' : 'Aquila', cat: 1 },
            { src: sportMonoski, label: 'Monoski', cat: 0 },
            { src: deerSunrise, label: language === 'en' ? 'Deer' : 'Cervo', cat: 1 },
            { src: mountainGoatRocks, label: language === 'en' ? 'Ibex' : 'Stambecco', cat: 1 },
          ].map((p, i) => (
            <div key={i} className="editorial-photo relative overflow-hidden cursor-pointer group" style={{ height: '180px' }}
                 onClick={() => openGallery(galleryCategories[p.cat])}>
              <img src={p.src} alt={p.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-3"><p className="text-white text-xs font-semibold">{p.label}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Category explore bar */}
      <div className="flex items-center justify-center gap-4 md:gap-8 py-6 px-4 border-t border-border bg-background">
        {galleryCategories.map((cat, i) => (
          <button
            key={i}
            onClick={() => openGallery(cat)}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 micro-btn"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
            <span className="font-medium">{language === 'en' ? cat.title_en : cat.title_it}</span>
            <span className="opacity-50">({cat.gallery.length})</span>
          </button>
        ))}
      </div>

      {/* Full film dialog */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="max-w-4xl bg-black border-0 p-0">
          <button onClick={() => setShowVideo(false)} className="absolute top-3 right-3 z-50 text-white hover:text-white/70 transition-colors">
            <X className="w-7 h-7" />
          </button>
          <video className="w-full rounded-lg" controls poster={videoCover} autoPlay>
            <source src="/videos/trailer-sito.mov" type="video/quicktime" />
            <source src="/videos/adventurabile-video.mp4" type="video/mp4" />
          </video>
        </DialogContent>
      </Dialog>

      {/* Gallery lightbox */}
      <Dialog open={selectedGallery !== null} onOpenChange={closeGallery}>
        <DialogContent className="max-w-[95vw] h-[95vh] p-0 bg-black/95 border-0">
          <button onClick={closeGallery} className="absolute top-4 right-4 z-50 text-white hover:text-white/70 transition-colors">
            <X className="w-8 h-8" />
          </button>
          {selectedGallery && (
            <div className="relative w-full h-full flex flex-col lg:flex-row">
              <div className="relative flex-1 flex items-center justify-center p-4">
                <img
                  src={selectedGallery.gallery[currentImageIndex].src}
                  alt={language === 'en' ? selectedGallery.gallery[currentImageIndex].title_en : selectedGallery.gallery[currentImageIndex].title_it}
                  className="max-w-full max-h-[70vh] lg:max-h-full object-contain rounded-lg"
                />
                {selectedGallery.gallery.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 text-white hover:text-white/70 transition-colors bg-black/50 rounded-full p-3 hover:bg-black/70">
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 text-white hover:text-white/70 transition-colors bg-black/50 rounded-full p-3 hover:bg-black/70">
                      <ChevronRight className="w-8 h-8" />
                    </button>
                  </>
                )}
              </div>
              <div className="lg:w-80 bg-black/80 backdrop-blur-sm p-6 overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10">
                <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">
                  {language === 'en' ? selectedGallery.title_en : selectedGallery.title_it}
                </p>
                <h3 className="text-white text-2xl font-bold mb-3">
                  {language === 'en' ? selectedGallery.gallery[currentImageIndex].title_en : selectedGallery.gallery[currentImageIndex].title_it}
                </h3>
                {selectedGallery.gallery[currentImageIndex].description_it && (
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {language === 'en' ? selectedGallery.gallery[currentImageIndex].description_en : selectedGallery.gallery[currentImageIndex].description_it}
                  </p>
                )}
                {selectedGallery.gallery[currentImageIndex].location && (
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{selectedGallery.gallery[currentImageIndex].location}</span>
                  </div>
                )}
                {selectedGallery.gallery[currentImageIndex].coordinates && (
                  <a
                    href={`https://www.google.com/maps?q=${selectedGallery.gallery[currentImageIndex].coordinates?.lat},${selectedGallery.gallery[currentImageIndex].coordinates?.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 mb-4"
                  >
                    View on Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {selectedGallery.gallery.length > 1 && (
                  <p className="text-white/40 text-xs mt-auto pt-4 border-t border-white/10">
                    {currentImageIndex + 1} / {selectedGallery.gallery.length}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

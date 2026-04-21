import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/MagneticButton';
import { useLanguage } from '@/hooks/useLanguage';
import { Home, Target, FolderOpen, Film, Users, Mail, X } from 'lucide-react';
import logo from '@/assets/logo.png';


// Icon mapping for navigation items
const navIcons = {
  home: Home,
  mission: Target,
  project: FolderOpen,
  films: Film,
  community: Users,
  join: Mail,
};

export const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(t.nav);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [t.nav]);

  useEffect(() => {
    const handleScrollY = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScrollY, { passive: true });
    handleScrollY();
    return () => window.removeEventListener('scroll', handleScrollY);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    setActiveSection(id);
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
        borderColor: scrolled ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
        transition: 'all 400ms ease',
      }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <button 
          onClick={scrollToTop}
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src={logo} alt="Adventurabile APS" className="h-12 w-auto" />
        </button>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex gap-1 items-center">
          {Object.entries(t.nav).slice(0, -1).map(([key, label]) => {
            const Icon = navIcons[key as keyof typeof navIcons];
            const isActive = activeSection === key;
            
            return (
              <Button
                key={key}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(key)}
                className={`
                  text-sm font-medium relative group
                  ${isActive
                    ? 'text-primary bg-primary/10'
                    : 'hover:bg-white/10 hover:text-primary nav-link'
                  }
                `}
              >
                {Icon && <Icon className="w-4 h-4 mr-1.5" />}
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Button>
            );
          })}
          
          {/* Divider */}
          <div className="h-6 w-px bg-white/20 mx-2" />
          
          {/* Join CTA Button */}
          <MagneticButton>
            <Button
              size="sm"
              onClick={() => scrollToSection('join')}
              className="shadow-md hover:shadow-lg"
            >
              <Mail className="w-4 h-4 mr-1.5" />
              {t.nav.join}
            </Button>
          </MagneticButton>
        </nav>

        {/* Mobile Menu Button - Only visible when menu is closed */}
        {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-foreground transition-all duration-300" />
            <span className="block h-0.5 w-6 bg-foreground transition-all duration-300" />
            <span className="block h-0.5 w-6 bg-foreground transition-all duration-300" />
          </button>
        )}

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 md:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Menu Drawer */}
        <div 
          className={`fixed top-0 right-0 h-screen w-[85vw] max-w-[320px] z-50 md:hidden bg-gradient-to-br from-[#E9E4D4] via-[#E9E4D4] to-[#DDD8C8] transform transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full relative">
            {/* Header with close button and language toggle */}
            <div className="flex justify-between items-center p-6 border-b border-foreground/10">
              <button
                onClick={() => setLanguage(language === 'en' ? 'it' : 'en')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-foreground/5 hover:bg-foreground/10 transition-colors"
              >
                <span className="text-xs font-medium text-foreground">{language.toUpperCase()}</span>
              </button>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors group"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>

            {/* Navigation links - grouped and centered */}
            <nav className="flex flex-col flex-1 justify-center px-6 py-8">
              {/* Main navigation group */}
              <div className="space-y-1 mb-6">
                {Object.entries(t.nav).slice(0, -1).map(([key, label], index) => {
                  const Icon = navIcons[key as keyof typeof navIcons];
                  const isActive = activeSection === key;
                  
                  return (
                    <button
                      key={key}
                      onClick={() => scrollToSection(key)}
                      className={`
                        group w-full text-left py-3 px-4 rounded-lg flex items-center gap-3
                        transition-all duration-200 opacity-0 animate-fade-in
                        ${isActive 
                          ? 'bg-primary/10 text-primary font-semibold' 
                          : 'text-foreground hover:bg-foreground/5 hover:text-primary'
                        }
                      `}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {Icon && (
                        <Icon 
                          className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-primary' : 'text-foreground/60'
                          }`} 
                        />
                      )}
                      <span className="text-sm font-medium">{label}</span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px bg-foreground/10 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '350ms' }} />

              {/* Contact CTA */}
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
                <Button
                  onClick={() => scrollToSection('join')}
                  className="w-full shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t.nav.join}
                </Button>
              </div>
            </nav>

            {/* Footer text */}
            <div className="px-6 pb-6 opacity-0 animate-fade-in" style={{ animationDelay: '450ms' }}>
              <p className="text-xs text-center text-foreground/50">
                Adventurabile APS
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    const newLang = language === 'en' ? 'it' : 'en';
    console.log('Changing language from', language, 'to', newLang);
    setLanguage(newLang);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-8 left-8 z-50 group flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      title={language === 'en' ? 'Switch to Italiano' : 'Passa a English'}
      aria-label={language === 'en' ? 'Switch to Italian' : 'Switch to English'}
    >
      <Globe className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      <span className="text-sm font-semibold uppercase tracking-wider">
        {language.toUpperCase()}
      </span>
    </button>
  );
};

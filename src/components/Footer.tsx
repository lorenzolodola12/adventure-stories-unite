import { Mail, Linkedin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { key: 'home', label: t.nav.home },
    { key: 'mission', label: t.nav.mission },
    { key: 'programs', label: t.nav.programs },
    { key: 'films', label: t.nav.films },
    
    { key: 'community', label: t.nav.community },
    { key: 'join', label: t.nav.join },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="font-bold text-lg mb-3">{t.footer.about}</h3>
          <p className="text-sm opacity-90">{t.footer.aboutText}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-3">{t.footer.quickLinks}</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.key}>
                <button
                  onClick={() => scrollToSection(link.key)}
                  className="text-sm opacity-90 hover:opacity-100 hover:underline"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="font-bold text-lg mb-3">{t.footer.contacts}</h3>
          <div className="space-y-2 text-sm opacity-90">
            <a href="mailto:info@adventurabile.com" className="flex items-center gap-2 hover:opacity-100">
              <Mail className="w-4 h-4" />
              info@adventurabile.com
            </a>
            <a 
              href="https://www.linkedin.com/company/aps-adventurabile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-100"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-background/20">
        <p className="text-xs opacity-70 leading-relaxed">
          Adventurabile APS — Legal Headquarters: Via San Martino 88, 10060 Cantalupa (TO) – Italia.<br />
          Tax Code: 94581260018 | VAT: IT12898480012.<br />
          Registered in RUNTS – Associations for Social Promotion Section.
        </p>
      </div>
    </footer>
  );
};

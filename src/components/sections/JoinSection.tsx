import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, Send } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import donationQR from '@/assets/donation-qr-code.png';
import donationsHero from '@/assets/donations-hero.jpg';

export const JoinSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [donorForm, setDonorForm] = useState({ name: '', email: '', message: '' });
  const [partnerForm, setPartnerForm] = useState({ company: '', contact: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState({ donor: false, partner: false });
  const [showBankModal, setShowBankModal] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const ctx = gsap.context(() => {
        const headline = headlineRef.current!;
        gsap.fromTo(headline,
          { filter: 'blur(8px)', opacity: 0 },
          { filter: 'blur(0px)', opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: headline, start: 'top 80%', once: true } }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const handleDonorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting({ ...isSubmitting, donor: true });
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-form', {
        body: {
          type: 'donor',
          name: donorForm.name,
          email: donorForm.email,
          message: donorForm.message,
        }
      });

      if (error) throw error;

      toast({ title: t.join.success });
      setDonorForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting donor form:', error);
      toast({ 
        title: t.join.error, 
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting({ ...isSubmitting, donor: false });
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting({ ...isSubmitting, partner: true });
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-form', {
        body: {
          type: 'partner',
          company: partnerForm.company,
          contact: partnerForm.contact,
          email: partnerForm.email,
          message: partnerForm.message,
        }
      });

      if (error) throw error;

      toast({ title: t.join.success });
      setPartnerForm({ company: '', contact: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting partner form:', error);
      toast({ 
        title: t.join.error,
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting({ ...isSubmitting, partner: false });
    }
  };

  return (
    <section id="join" className="scroll-section overflow-y-auto flex flex-col" ref={sectionRef}>
      {/* Hero Full-Viewport Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="ken-burns-bg absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${donationsHero})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 min-h-screen flex flex-col justify-center items-center text-center text-white">
          {/* Main Title */}
          <h1
            ref={headlineRef}
            className="join-headline text-5xl md:text-7xl lg:text-[72px] font-bold tracking-[0.02em] mb-10 leading-[1.1]"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)' }}
          >
            {t.donate.title}
          </h1>

          {/* Subtitle/Paragraph */}
          <p 
            className="text-xl md:text-2xl lg:text-[24px] font-normal leading-[1.6] max-w-3xl mb-16 animate-fade-in whitespace-pre-line"
            style={{ 
              animationDelay: '100ms',
              textShadow: '0 3px 15px rgba(0,0,0,0.8), 0 1px 6px rgba(0,0,0,0.9)'
            }}
          >
            {t.donate.subtitle}
          </p>

          {/* QR Code */}
          <div 
            className="mb-8 animate-fade-in transition-transform duration-300 hover:scale-105 hover:drop-shadow-2xl"
            style={{ animationDelay: '200ms' }}
          >
            <div className="bg-white p-6 md:p-8 rounded-2xl">
              <img 
                src={donationQR} 
                alt="QR Code Donazione" 
                className="w-56 h-56 md:w-[280px] md:h-[280px]"
              />
            </div>
          </div>

          {/* QR Subtitle */}
          <p 
            className="text-lg md:text-[18px] font-medium mb-12 animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            {t.donate.qrSubtitle}
          </p>

          {/* Centered Section - Bullet List and Link */}
          <div className="flex flex-col items-center gap-8 mb-16">
            {/* Bullet List */}
            <div 
              className="text-center animate-fade-in bg-black/30 rounded-2xl px-10 py-6 border border-white/10"
              style={{ animationDelay: '400ms' }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white/70">Il tuo impatto</h3>
              <ul className="space-y-3">
                {t.donate.bulletPoints.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-3 text-base font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Methods Link */}
            <button
              onClick={() => setShowBankModal(true)}
              className="text-base md:text-[16px] text-primary hover:text-primary/80 transition-all duration-200 font-medium story-link animate-fade-in bg-black/30 rounded-2xl px-8 py-4 border border-white/10 hover:border-primary/50 hover:bg-black/40"
              style={{ animationDelay: '500ms' }}
            >
              {t.donate.otherMethods}
            </button>
          </div>
        </div>
      </div>

      {/* Bank Details Modal */}
      <Dialog open={showBankModal} onOpenChange={setShowBankModal}>
        <DialogContent className="sm:max-w-lg bg-background border-border shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center mb-6 text-foreground">
              {t.donate.bankModal.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8 py-6">
            <div className="space-y-3">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {t.donate.bankModal.iban}
              </label>
              <div className="p-5 bg-muted rounded-xl border-2 border-border">
                <p className="font-mono text-lg font-semibold text-foreground break-all">
                  {t.donate.bankModal.ibanValue}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {t.donate.bankModal.holder}
              </label>
              <div className="p-5 bg-muted rounded-xl border-2 border-border">
                <p className="text-lg font-semibold text-foreground">
                  {t.donate.bankModal.holderValue}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {t.donate.bankModal.reason}
              </label>
              <div className="p-5 bg-muted rounded-xl border-2 border-border">
                <p className="text-lg font-semibold text-foreground">
                  {t.donate.bankModal.reasonValue}
                </p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setShowBankModal(false)}
            className="w-full mt-2"
            size="lg"
          >
            {t.donate.bankModal.close}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Contact Forms Section (Temporary Notice + Forms) */}
      <div className="flex-1 px-4 py-20 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Temporary Notice */}
          <div className="max-w-2xl mx-auto mb-12 p-6 bg-primary/10 border border-primary/20 rounded-lg text-center">
            <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
            <p className="text-base md:text-lg font-medium text-foreground">
              {t.join.tempNotice}
            </p>
            <a 
              href="mailto:info@adventurabile.com" 
              className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              <Mail className="w-5 h-5" />
              info@adventurabile.com
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8 opacity-50 pointer-events-none">
            {/* Donors Form */}
            <Card>
              <CardHeader>
                <CardTitle>{t.join.donors.title}</CardTitle>
                <CardDescription>{t.join.donors.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonorSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="donor-name">{t.join.donors.name}</Label>
                    <Input
                      id="donor-name"
                      required
                      value={donorForm.name}
                      onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="donor-email">{t.join.donors.email}</Label>
                    <Input
                      id="donor-email"
                      type="email"
                      required
                      value={donorForm.email}
                      onChange={(e) => setDonorForm({ ...donorForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="donor-message">{t.join.donors.message}</Label>
                    <Textarea
                      id="donor-message"
                      required
                      value={donorForm.message}
                      onChange={(e) => setDonorForm({ ...donorForm, message: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting.donor}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting.donor ? 'Sending...' : t.join.donors.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Partners Form */}
            <Card>
              <CardHeader>
                <CardTitle>{t.join.partners.title}</CardTitle>
                <CardDescription>{t.join.partners.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="partner-company">{t.join.partners.company}</Label>
                    <Input
                      id="partner-company"
                      required
                      value={partnerForm.company}
                      onChange={(e) => setPartnerForm({ ...partnerForm, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="partner-contact">{t.join.partners.contact}</Label>
                    <Input
                      id="partner-contact"
                      required
                      value={partnerForm.contact}
                      onChange={(e) => setPartnerForm({ ...partnerForm, contact: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="partner-email">{t.join.partners.email}</Label>
                    <Input
                      id="partner-email"
                      type="email"
                      required
                      value={partnerForm.email}
                      onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="partner-message">{t.join.partners.message}</Label>
                    <Textarea
                      id="partner-message"
                      required
                      value={partnerForm.message}
                      onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting.partner}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting.partner ? 'Sending...' : t.join.partners.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">{t.join.contact}</p>
            <a href="mailto:info@adventurabile.com" className="flex items-center justify-center gap-2 text-primary hover:underline">
              <Mail className="w-4 h-4" />
              info@adventurabile.com
            </a>
            <a
              href="https://www.linkedin.com/company/adventurabile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </section>
  );
};

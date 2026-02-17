import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import { MapPin, Phone, Mail, MessageCircle, AlertTriangle } from 'lucide-react';

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView(0.15);
  return <div ref={ref} className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>{children}</div>;
}

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contactPage;
  const [sent, setSent] = useState(false);

  const isOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    if (day === 0) return false;
    if (day === 6) return hour >= 9 && hour < 15;
    return hour >= 8 && hour < 20;
  };

  return (
    <div className="pb-16 lg:pb-0">
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4 text-center">
          <span className="pill-blue text-sm">{t.badge}</span>
          <h1 className="font-serif text-3xl md:text-5xl mt-4">{t.title}</h1>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <FadeIn>
              {sent ? (
                <div className="card-dental text-center py-12">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="font-serif text-2xl">{language === 'ro' ? 'Mesaj trimis!' : 'Message sent!'}</h3>
                  <p className="text-muted-foreground mt-2">{t.responseTime}</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-sm font-medium mb-1 block">{t.firstName}</label><input required className="w-full border border-border rounded-md p-2.5 text-sm bg-background" /></div>
                    <div><label className="text-sm font-medium mb-1 block">{t.lastName}</label><input required className="w-full border border-border rounded-md p-2.5 text-sm bg-background" /></div>
                  </div>
                  <div><label className="text-sm font-medium mb-1 block">{t.email}</label><input type="email" required className="w-full border border-border rounded-md p-2.5 text-sm bg-background" /></div>
                  <div><label className="text-sm font-medium mb-1 block">{t.phone}</label><input type="tel" className="w-full border border-border rounded-md p-2.5 text-sm bg-background" /></div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.subject}</label>
                    <select className="w-full border border-border rounded-md p-2.5 text-sm bg-background">
                      {t.subjects.map((s, i) => <option key={i}>{s}</option>)}
                    </select>
                  </div>
                  <div><label className="text-sm font-medium mb-1 block">{t.message}</label><textarea rows={4} required className="w-full border border-border rounded-md p-2.5 text-sm bg-background resize-none" /></div>
                  <Button variant="hero" size="lg" type="submit" className="w-full">{t.send} →</Button>
                  <p className="text-xs text-muted-foreground text-center">{t.responseTime}</p>
                </form>
              )}
            </FadeIn>

            {/* Info cards */}
            <div className="space-y-4">
              <FadeIn>
                <div className="card-dental">
                  <h3 className="font-serif text-lg mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> {language === 'ro' ? 'Adresă' : 'Address'}</h3>
                  <p className="text-sm">{t.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.parking} · {t.metro}</p>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="card-dental">
                  <h3 className="font-serif text-lg mb-3 flex items-center gap-2"><Phone className="w-5 h-5 text-primary" /> {t.phoneLabel}</h3>
                  <a href="tel:+40720000000" className="text-lg font-semibold text-primary block">📞 +40 720 XXX XXX</a>
                  <a href="mailto:contact@dentproclinic.ro" className="text-sm text-muted-foreground block mt-1">📧 contact@dentproclinic.ro</a>
                  <a href="https://wa.me/40720000000" className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-success text-success-foreground rounded-full text-sm font-medium">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="card-dental">
                  <h3 className="font-serif text-lg mb-3">{t.schedule}</h3>
                  {t.scheduleItems.map((s, i) => <p key={i} className="text-sm text-muted-foreground">{s}</p>)}
                  <div className="mt-3 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isOpen() ? 'bg-success animate-pulse' : 'bg-destructive'}`} />
                    <span className={`text-sm font-medium ${isOpen() ? 'text-success' : 'text-destructive'}`}>
                      {isOpen() ? t.open : t.closed}
                    </span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="card-dental" style={{ background: 'hsl(var(--destructive) / 0.05)', borderLeftColor: 'hsl(var(--destructive))' }}>
                  <h3 className="font-serif text-lg mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-destructive" /> {t.emergency}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{t.emergencyDesc}</p>
                  <a href="tel:+40720000000">
                    <Button variant="destructive" size="default">📞 {t.emergencyCta}</Button>
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

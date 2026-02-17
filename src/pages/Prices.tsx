import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import { CreditCard } from 'lucide-react';

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView(0.15);
  return <div ref={ref} className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>{children}</div>;
}

const Prices = () => {
  const { language } = useLanguage();
  const t = translations[language].pricesPage;
  const [activeTab, setActiveTab] = useState(0);

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
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {t.tabs.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                {tab.name}
              </button>
            ))}
          </div>

          {/* Table */}
          <FadeIn>
            <div className="card-dental overflow-hidden p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-background-secondary">
                    <th className="text-left p-4 font-medium">{language === 'ro' ? 'Serviciu' : 'Service'}</th>
                    <th className="text-left p-4 font-medium hidden md:table-cell">{language === 'ro' ? 'Detalii' : 'Details'}</th>
                    <th className="text-right p-4 font-medium">{language === 'ro' ? 'Preț' : 'Price'}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.tabs[activeTab].items.map((item, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-4 font-medium">{item.service}</td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">{item.detail}</td>
                      <td className="p-4 text-right font-semibold text-primary">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* Highlight */}
          <FadeIn>
            <div className="mt-6 card-dental" style={{ background: 'hsl(var(--accent) / 0.08)' }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl">{t.highlight.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.highlight.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">{t.highlight.price}</span>
                  <span className="text-sm text-muted-foreground line-through ml-2">{t.highlight.oldPrice}</span>
                  <span className="pill-gold text-xs ml-2">{t.highlight.discount}</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Note */}
          <FadeIn>
            <div className="mt-6 card-dental bg-background-secondary">
              <p className="text-sm text-muted-foreground">ℹ️ {t.note}</p>
            </div>
          </FadeIn>

          {/* Financing */}
          <FadeIn>
            <div className="mt-6 card-dental">
              <div className="flex items-start gap-4">
                <CreditCard className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl mb-1">💳 {t.financing.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.financing.desc}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <div className="text-center mt-10">
            <Link to="/programare"><Button variant="hero" size="xl">🗓️ {t.ctaButton} →</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prices;

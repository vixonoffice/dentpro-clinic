import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView(0.15);
  return <div ref={ref} className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>{children}</div>;
}

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language].servicesPage;
  const [activeCategory, setActiveCategory] = useState(0);

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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-1">
                {t.categories.map((cat, i) => (
                  <button key={i} onClick={() => setActiveCategory(i)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === i ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              {t.categories.map((cat, ci) => (
                <FadeIn key={ci}>
                  <div id={`cat-${ci}`}>
                    <h2 className="font-serif text-2xl mb-4">{cat.name}</h2>
                    <Accordion type="single" collapsible className="space-y-3">
                      {cat.services.map((svc, si) => (
                        <AccordionItem key={si} value={`${ci}-${si}`} className="card-dental border-0">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-3 text-left">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-serif text-lg">{svc.name}</span>
                                  {svc.badge && <span className="pill-blue text-xs">{svc.badge}</span>}
                                </div>
                                <p className="text-sm text-muted-foreground">{svc.desc}</p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                              <span className="text-muted-foreground">⏱ {svc.duration}</span>
                              <span className="font-semibold text-primary">{svc.price}</span>
                              <Link to="/programare"><Button variant="hero" size="sm">{t.bookService} →</Button></Link>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </FadeIn>
              ))}

              {/* CTA Banner */}
              <div className="card-dental bg-background-secondary">
                <h3 className="font-serif text-xl mb-2">{t.ctaTitle}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t.ctaDesc}</p>
                <Link to="/programare"><Button variant="hero" size="lg">{t.ctaButton} →</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

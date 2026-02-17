import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { ShieldCheck, Clock, Cpu, Heart, Calendar, UserCheck, Bell, Star, ArrowRight } from 'lucide-react';
import heroImg from '@/assets/hero-dental.jpg';
import doc1 from '@/assets/doctor-1.jpg';
import doc2 from '@/assets/doctor-2.jpg';
import doc3 from '@/assets/doctor-3.jpg';
import blog1 from '@/assets/blog-1.jpg';
import blog3 from '@/assets/blog-3.jpg';

const docImages = [doc1, doc2, doc3];
const blogImages = [blog1, blog3, blog1];

const whyIcons = [ShieldCheck, Clock, Cpu, Heart];
const stepIcons = [Calendar, UserCheck, Bell];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, isInView } = useInView(0.3);
  const count = useCountUp(value, 2000, isInView);
  return (
    <div ref={ref} className="text-center">
      <div className="stat-number text-5xl md:text-6xl font-mono font-medium">{count}{suffix}</div>
      <div className="mt-2 text-primary-foreground/70 text-sm">{label}</div>
    </div>
  );
}

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView(0.15);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="pb-16 lg:pb-0">
      {/* HERO */}
      <section className="gradient-hero relative overflow-hidden" style={{ minHeight: '85vh' }}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center pt-16 lg:pt-24 pb-16 gap-10">
          <div className="flex-1 max-w-2xl">
            <span className="pill-blue text-sm">{t.hero.badge}</span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-7xl leading-tight">
              {t.hero.line1}<br />
              <span className="gradient-text">{t.hero.line2}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/programare"><Button variant="hero" size="xl">🗓️ {t.hero.cta1}</Button></Link>
              <Link to="/servicii"><Button variant="heroOutline" size="lg">▶ {t.hero.cta2}</Button></Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-10">
              {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map((item, i) => (
                <span key={i} className="text-sm text-muted-foreground font-medium">✦ {item}</span>
              ))}
            </div>
          </div>
          {/* Floating card */}
          <div className="hidden lg:block flex-shrink-0 w-80">
            <div className="glass-card">
              <h3 className="font-serif text-lg mb-4">{t.hero.quickBook}</h3>
              <div className="space-y-3">
                <select className="w-full border border-border rounded-md p-2.5 text-sm bg-background">
                  <option>{t.hero.selectService}</option>
                  {t.booking.bookingServices.map((s, i) => <option key={i}>{s.name}</option>)}
                </select>
                <input type="date" className="w-full border border-border rounded-md p-2.5 text-sm bg-background" />
                <Button variant="hero" className="w-full">{t.hero.book}</Button>
              </div>
              <span className="pill-green text-xs mt-3 inline-block">{t.hero.availableToday}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeSection>
            <p className="section-label">{t.services.label}</p>
            <h2 className="text-3xl md:text-4xl mb-10">{t.services.title}</h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((item, i) => (
              <FadeSection key={i}>
                <div className="card-dental">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-serif text-xl mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                  <Link to="/servicii" className="text-sm text-primary font-medium hover:underline">{t.services.learnMore} →</Link>
                </div>
              </FadeSection>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/servicii"><Button variant="heroOutline" size="lg">{t.services.viewAll} →</Button></Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <FadeSection>
            <p className="section-label">{t.whyUs.label}</p>
            <h2 className="text-3xl md:text-4xl mb-10">{t.whyUs.title}</h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.whyUs.items.map((item, i) => {
              const Icon = whyIcons[i];
              return (
                <FadeSection key={i}>
                  <div className="text-center p-6">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg mb-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 gradient-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {t.stats.items.map((item, i) => (
              <StatCounter key={i} value={item.value} suffix={item.suffix} label={item.label} />
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeSection>
            <p className="section-label">{t.doctors.label}</p>
            <h2 className="text-3xl md:text-4xl mb-10">{t.doctors.title}</h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.doctors.items.map((doc, i) => (
              <FadeSection key={i}>
                <div className="card-dental group overflow-hidden">
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img src={docImages[i]} alt={doc.name} className="w-full h-72 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-serif text-xl">{doc.name}</h3>
                  <p className="text-sm text-primary font-medium">{doc.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{doc.spec}</p>
                  <span className="pill-blue text-xs mt-2 inline-block">{doc.badge}</span>
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                    <span className="text-xs text-muted-foreground ml-1">{doc.rating} ({doc.reviews})</span>
                  </div>
                  <Link to="/programare" className="block mt-3">
                    <Button variant="heroOutline" size="sm" className="w-full">{t.doctors.bookWith} {doc.name.split(' ')[1]} →</Button>
                  </Link>
                </div>
              </FadeSection>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/medici"><Button variant="heroOutline" size="lg">{t.doctors.viewAll} →</Button></Link>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <FadeSection>
            <p className="section-label text-center">{t.steps.label}</p>
            <h2 className="text-3xl md:text-4xl text-center mb-12">{t.steps.title}</h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-primary/20" />
            {t.steps.items.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <FadeSection key={i}>
                  <div className="text-center relative z-10">
                    <div className="w-14 h-14 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                      {i + 1}
                    </div>
                    <Icon className="w-6 h-6 mx-auto text-primary mb-2" />
                    <h3 className="font-serif text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">{step.desc}</p>
                  </div>
                </FadeSection>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/programare"><Button variant="gold" size="xl">🗓️ {t.steps.cta} →</Button></Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeSection>
            <p className="section-label">{t.testimonials.label}</p>
            <h2 className="text-3xl md:text-4xl mb-10">{t.testimonials.title}</h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.testimonials.items.map((item, i) => (
              <FadeSection key={i}>
                <div className="card-dental">
                  <div className="flex mb-2">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-accent text-accent" />)}
                  </div>
                  <p className="text-foreground leading-relaxed italic mb-4">"{item.text}"</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">— {item.author}</span>
                    <span className="pill-blue text-xs">{item.treatment}</span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <FadeSection>
            <p className="section-label">{t.blogPreview.label}</p>
            <h2 className="text-3xl md:text-4xl mb-10">{t.blogPreview.title}</h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.blogPreview.items.map((item, i) => (
              <FadeSection key={i}>
                <div className="card-dental overflow-hidden">
                  <img src={blogImages[i]} alt={item.title} className="w-full h-44 object-cover rounded-xl mb-4" />
                  <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.excerpt}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{item.author}</span>
                    <span>{item.readTime}</span>
                  </div>
                  <Link to="/blog" className="text-sm text-primary font-medium mt-2 inline-block hover:underline">{t.blogPreview.readMore} →</Link>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(60deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px)' }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeSection>
            <h2 className="text-3xl md:text-5xl text-primary-foreground mb-4">{t.cta.title}</h2>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-md mx-auto">{t.cta.subtitle}</p>
            <Link to="/programare">
              <Button variant="white" size="xl">🗓️ {t.cta.button} →</Button>
            </Link>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-primary-foreground/60">
              {t.cta.checks.map((c, i) => <span key={i}>✓ {c}</span>)}
            </div>
          </FadeSection>
        </div>
      </section>
    </div>
  );
};

export default Index;

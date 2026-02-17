import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import heroImg from '@/assets/hero-dental.jpg';

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView(0.15);
  return <div ref={ref} className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>{children}</div>;
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, isInView } = useInView(0.3);
  const count = useCountUp(value, 2000, isInView);
  return <div ref={ref} className="text-center"><div className="stat-number text-4xl font-mono">{count}{suffix}</div><div className="text-sm text-muted-foreground mt-1">{label}</div></div>;
}

const About = () => {
  const { language } = useLanguage();
  const t = translations[language].aboutPage;
  const stats = translations[language].stats;

  return (
    <div className="pb-16 lg:pb-0">
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4 text-center">
          <span className="pill-blue text-sm">{t.badge}</span>
          <h1 className="font-serif text-3xl md:text-5xl mt-4">{t.title}</h1>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <p className="section-label">{t.storyLabel}</p>
              <h2 className="text-3xl mb-4">{t.storyTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.storyText}</p>
            </FadeIn>
            <FadeIn>
              <img src={heroImg} alt="DentPro Clinic" className="rounded-2xl shadow-dental w-full h-72 object-cover" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.items.map((s, i) => <Stat key={i} value={s.value} suffix={s.suffix} label={s.label} />)}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="font-serif text-3xl text-center mb-10">{language === 'ro' ? 'Valorile Noastre' : 'Our Values'}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.values.map((v, i) => (
              <FadeIn key={i}>
                <div className="card-dental text-center">
                  <h3 className="font-serif text-xl mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="font-serif text-3xl text-center mb-10">{language === 'ro' ? 'Tehnologie de Ultimă Generație' : 'Cutting-Edge Technology'}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.equipment.map((eq, i) => (
              <FadeIn key={i}>
                <div className="card-dental">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl mb-3">🔬</div>
                  <h3 className="font-serif text-lg mb-2">{eq.name}</h3>
                  <p className="text-sm text-muted-foreground">{eq.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-primary-foreground mb-4">{t.ctaText}</h2>
          <Link to="/programare"><Button variant="white" size="xl">🗓️ {t.ctaButton} →</Button></Link>
        </div>
      </section>
    </div>
  );
};

export default About;

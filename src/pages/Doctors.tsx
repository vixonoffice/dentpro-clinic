import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import doc1 from '@/assets/doctor-1.jpg';
import doc2 from '@/assets/doctor-2.jpg';
import doc3 from '@/assets/doctor-3.jpg';

const docImages = [doc1, doc2, doc3, doc2, doc1];

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView(0.15);
  return <div ref={ref} className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>{children}</div>;
}

const Doctors = () => {
  const { language } = useLanguage();
  const t = translations[language].doctorsPage;
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? t.doctors : t.doctors.filter(d => d.specs.some(s => s.toLowerCase().includes(filter.toLowerCase())));

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
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{t.all}</button>
            {t.filters.map((f, i) => (
              <button key={i} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{f}</button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((doc, i) => (
              <FadeIn key={doc.slug}>
                <div className="card-dental group overflow-hidden">
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img src={docImages[i % docImages.length]} alt={doc.name} className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-serif text-xl">{doc.name}</h3>
                  <p className="text-sm text-primary font-medium">{doc.title}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.specs.map((s, j) => <span key={j} className="pill-blue text-xs">{s}</span>)}
                  </div>
                  <span className="pill-gold text-xs mt-2 inline-block">{doc.badge}</span>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>{doc.experience} {t.experience}</span>
                    <span>·</span>
                    <span>{doc.languages}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                    <span className="text-xs text-muted-foreground ml-1">{doc.rating} ({doc.reviews} {t.reviews})</span>
                  </div>
                  <Link to="/programare" className="block mt-4">
                    <Button variant="hero" size="sm" className="w-full">{t.bookWith} {doc.name.split(' ').pop()} →</Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;

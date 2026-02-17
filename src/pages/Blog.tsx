import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { useInView } from '@/hooks/useInView';
import blog1 from '@/assets/blog-1.jpg';
import blog3 from '@/assets/blog-3.jpg';

const blogImages = [blog1, blog3, blog1, blog3, blog1, blog3];

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView(0.15);
  return <div ref={ref} className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>{children}</div>;
}

const Blog = () => {
  const { language } = useLanguage();
  const t = translations[language].blogPage;
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? t.articles : t.articles.filter(a => a.category.toLowerCase().includes(filter.toLowerCase()));

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
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{t.all}</button>
            {t.categories.map((c, i) => (
              <button key={i} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{c}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <FadeIn key={i}>
                <div className="card-dental overflow-hidden group cursor-pointer">
                  <img src={blogImages[i % blogImages.length]} alt={article.title} className="w-full h-44 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-500" />
                  <span className="pill-blue text-xs">{article.category}</span>
                  <h3 className="font-serif text-lg mt-2 mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{article.author}</span>
                    <span>{article.date} · {article.readTime} {t.readTime}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

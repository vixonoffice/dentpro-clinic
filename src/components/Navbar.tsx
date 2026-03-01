import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Bug fix 1: Blocheaza scroll-ul body-ului cand meniul mobil e deschis
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Inchide meniul la schimbarea rutei
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const links = [
    { path: '/', label: t.nav.home },
    { path: '/servicii', label: t.nav.services },
    { path: '/medici', label: t.nav.doctors },
    { path: '/preturi', label: t.nav.prices },
    { path: '/despre', label: t.nav.about },
    { path: '/blog', label: t.nav.blog },
    { path: '/contact', label: t.nav.contact },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60" style={{ background: 'linear-gradient(180deg, hsl(220 25% 99% / 0.97) 0%, hsl(215 35% 97% / 0.95) 100%)', backdropFilter: 'blur(16px)', boxShadow: '0 2px 20px hsl(220 72% 45% / 0.06)' }}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        {/* Bug fix 4: logo face scroll to top cand esti deja pe home */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setMobileOpen(false);
            if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path d="M12 2C9.5 2 7.5 3 6.5 5C5.5 7 5 9 5 11C5 14 6 17 8 19C9 20.5 10.5 22 12 22C13.5 22 15 20.5 16 19C18 17 19 14 19 11C19 9 18.5 7 17.5 5C16.5 3 14.5 2 12 2Z" fill="currentColor" opacity="0.2"/>
            <path d="M12 2C9.5 2 7.5 3 6.5 5C5.5 7 5 9 5 11C5 14 6 17 8 19C9 20.5 10.5 22 12 22C13.5 22 15 20.5 16 19C18 17 19 14 19 11C19 9 18.5 7 17.5 5C16.5 3 14.5 2 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 2V22" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          </svg>
          <span className="font-serif text-xl text-primary">DentPro Clinic</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 text-xs font-semibold border border-primary/20 rounded-full text-primary hover:bg-primary/5 transition-colors"
          >
            {language === 'ro' ? 'EN' : 'RO'}
          </button>
          <a href="tel:+40720000000" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5" />
            {t.nav.phone}
          </a>
          <Link to="/programare">
            <Button variant="gold" size="default">{t.nav.bookNow} →</Button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Bug fix 3: butonul Programeaza inchide meniul */}
          <Link to="/programare" onClick={() => setMobileOpen(false)}>
            <Button variant="gold" size="sm">{t.nav.bookNow}</Button>
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border/60 px-4 pb-4 animate-fade-in" style={{ background: 'hsl(220 25% 99% / 0.98)' }}>
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium border-b border-border/40 text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between mt-3">
            <button onClick={toggleLanguage} className="px-3 py-1.5 text-xs font-semibold border border-primary/20 rounded-full text-primary">
              {language === 'ro' ? 'EN' : 'RO'}
            </button>
            <a href="tel:+40720000000" className="flex items-center gap-1 text-sm text-primary">
              <Phone className="w-4 h-4" /> {t.nav.phone}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

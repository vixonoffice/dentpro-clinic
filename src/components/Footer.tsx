import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-footer-bg text-footer-text">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span className="font-serif text-2xl text-primary-foreground">DentPro Clinic</span>
            <p className="font-accent italic text-footer-heading mt-2">{t.footer.tagline}</p>
            <p className="text-sm mt-3 font-light leading-relaxed">{t.footer.desc}</p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-footer-text hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-footer-text hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-footer-text hover:text-accent transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs text-success">{t.footer.available}</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-footer-heading text-base mb-4">{t.footer.servicesTitle}</h4>
            <ul className="space-y-2.5">
              {t.footer.servicesLinks.map((link, i) => (
                <li key={i}><Link to="/servicii" className="text-sm hover:text-accent transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Clinic */}
          <div>
            <h4 className="font-serif text-footer-heading text-base mb-4">{t.footer.clinicTitle}</h4>
            <ul className="space-y-2.5">
              {t.footer.clinicLinks.map((link, i) => {
                const paths = ['/despre', '/medici', '/preturi', '/blog', '#'];
                return <li key={i}><Link to={paths[i]} className="text-sm hover:text-accent transition-colors">{link}</Link></li>;
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-footer-heading text-base mb-4">{t.footer.contactTitle}</h4>
            <p className="text-sm mb-2">📍 București, Sector 2</p>
            <p className="text-sm mb-2">📞 +40 720 XXX XXX</p>
            <p className="text-sm mb-4">📧 contact@dentproclinic.ro</p>
            <Link to="/programare">
              <Button variant="goldSolid" size="sm">{t.nav.bookNow} →</Button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-footer-text/20 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <span>{t.footer.copyright}</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-accent transition-colors">{t.footer.gdpr}</a>
            <a href="#" className="hover:text-accent transition-colors">{t.footer.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const CookieConsent = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) setTimeout(() => setShow(true), 2000);
  }, []);

  if (!show) return null;

  const accept = () => { localStorage.setItem('cookie-consent', 'true'); setShow(false); };
  const decline = () => { localStorage.setItem('cookie-consent', 'declined'); setShow(false); };

  return (
    <div className="fixed bottom-16 lg:bottom-4 left-4 right-4 z-50 max-w-xl mx-auto bg-background rounded-lg shadow-dental-hover border border-border p-4 animate-fade-up">
      <p className="text-sm text-muted-foreground mb-3">{t.cookie.text}</p>
      <div className="flex gap-2">
        <button onClick={accept} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">{t.cookie.accept}</button>
        <button onClick={decline} className="px-4 py-2 border border-border rounded-md text-sm text-muted-foreground">{t.cookie.decline}</button>
      </div>
    </div>
  );
};

export default CookieConsent;

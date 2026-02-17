import { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/40720000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 z-40 w-12 h-12 bg-success text-success-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-20 z-40 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background border-t border-border p-3">
        <Link to="/programare" className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-full py-3 font-semibold text-sm">
          <Calendar className="w-4 h-4" /> Programează-te Acum
        </Link>
      </div>
    </>
  );
};

export default FloatingButtons;

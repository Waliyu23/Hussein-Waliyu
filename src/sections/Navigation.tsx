import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'PROFILE', href: '#profile' },
  { label: 'COMPETENCIES', href: '#competencies' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'WORKS', href: '#works' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(26, 26, 26, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="section-padding py-6 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="font-display text-sm tracking-[0.25em] text-[#F5F5F5] hover:text-[#00B2FF] transition-colors duration-300"
          >
            HUSSEIN WALIYU
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-body text-xs tracking-[0.2em] text-[#888888] hover:text-[#00B2FF] transition-colors duration-300 hover-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#F5F5F5] hover:text-[#00B2FF] transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 bg-[#1A1A1A] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          visibility: menuOpen ? 'visible' : 'hidden',
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="font-display text-3xl tracking-[0.1em] text-[#F5F5F5] hover:text-[#00B2FF] transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}

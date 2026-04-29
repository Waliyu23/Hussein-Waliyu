import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cta = ctaRef.current;
    const details = detailsRef.current;
    if (!section || !cta || !details) return;

    const ctx = gsap.context(() => {
      const lines = cta.querySelectorAll('.cta-line');
      gsap.set(lines, { opacity: 0, y: 100, clipPath: 'inset(100% 0 0 0)' });
      gsap.set(details, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      lines.forEach((line, i) => {
        tl.to(
          line,
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            ease: 'power3.out',
          },
          i === 0 ? undefined : `-=${0.8}`
        );
      });

      tl.to(
        details,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-32"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      <div className="max-content section-padding w-full">
        {/* Main CTA */}
        <div ref={ctaRef} className="text-center mb-16 md:mb-24">
          <div className="cta-line overflow-hidden">
            <span className="font-display text-[14vw] md:text-[10vw] leading-[0.85] tracking-tight text-[#F5F5F5] uppercase block">
              LET'S BUILD
            </span>
          </div>
          <div className="cta-line overflow-hidden">
            <span className="font-display text-[14vw] md:text-[10vw] leading-[0.85] tracking-tight text-[#00B2FF] uppercase block">
              THE FUTURE
            </span>
          </div>
        </div>

        {/* Contact Details */}
        <div
          ref={detailsRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div className="space-y-4">
            <a
              href="mailto:husseinwaliyu23@gmail.com"
              className="flex items-center gap-3 text-[#888888] hover:text-[#00B2FF] transition-colors duration-300 group"
            >
              <Mail className="w-5 h-5" />
              <span className="font-body text-sm md:text-base tracking-wide">
                husseinwaliyu23@gmail.com
              </span>
            </a>
            <a
              href="tel:+233556600270"
              className="flex items-center gap-3 text-[#888888] hover:text-[#00B2FF] transition-colors duration-300 group"
            >
              <Phone className="w-5 h-5" />
              <span className="font-body text-sm md:text-base tracking-wide">
                +233 55 660 0270
              </span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Waliyu23"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#888888] hover:text-[#00B2FF] transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
              <span className="font-body text-sm tracking-wider uppercase">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/hussein-waliyu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#888888] hover:text-[#00B2FF] transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-body text-sm tracking-wider uppercase">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[#333333]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-[#666666] tracking-wider">
              &copy; {new Date().getFullYear()} HUSSEIN WALIYU. ALL RIGHTS RESERVED.
            </p>
            <p className="font-body text-xs text-[#666666] tracking-wider">
              DESIGNED & BUILT WITH PRECISION
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

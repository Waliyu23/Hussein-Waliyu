import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  'Full Stack Web Development',
  'Database Management',
  'UX/UI & Responsive Design',
  'IT Systems Support & Maintenance',
  'SEO & Performance Optimization',
  'CMS Administration & Content Management',
  'E-commerce Platforms',
  'Technical Troubleshooting & User Support',
  'Project Coordination & Documentation',
  'Digital Content & Media Systems',
];

export default function CompetenciesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const list = listRef.current;
    if (!section || !header || !list) return;

    const ctx = gsap.context(() => {
      gsap.set(header, { opacity: 0, y: 50 });

      const items = list.querySelectorAll('li');
      gsap.set(items, { opacity: 0, x: -60 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      tl.to(header, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });

      items.forEach((item) => {
        tl.to(
          item,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          `-=${0.7}`
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="competencies"
      ref={sectionRef}
      className="relative w-full py-32 md:py-48"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      <div className="max-content section-padding">
        <h2
          ref={headerRef}
          className="font-display text-[12vw] md:text-[8vw] leading-[0.9] tracking-tight text-[#F5F5F5] uppercase mb-16 md:mb-24"
        >
          CORE COMPETENCIES
        </h2>

        <ul ref={listRef} className="space-y-4 md:space-y-6">
          {skills.map((skill, index) => (
            <li
              key={skill}
              className="group border-b border-[#333333] pb-4 md:pb-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl md:text-3xl lg:text-4xl tracking-wide text-[#F5F5F5] uppercase group-hover:text-[#00B2FF] transition-colors duration-300">
                  {skill}
                </span>
                <span className="font-body text-xs text-[#666666] tracking-wider">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-2 h-[1px] bg-[#00B2FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

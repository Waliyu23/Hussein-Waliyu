import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend & Web',
    skills: ['React', 'Next.js', 'Angular', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'jQuery', 'Three.js', 'WebGL'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'Python', 'Django', 'RESTful APIs', 'JWT Authentication'],
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'CMS & Platforms',
    skills: ['WordPress', 'Elementor', 'Headless CMS', 'Shopify', 'Wix'],
  },
  {
    title: 'IT & DevOps',
    skills: ['Git & Version Control', 'Linux & Server Fundamentals', 'Domain & DNS Management', 'SSL Configuration', 'Website Migration & Hosting', 'Performance Monitoring & Optimization'],
  },
  {
    title: 'Design & Media',
    skills: ['Canva', 'Microsoft Office Suite', 'Google Workspace', 'Technical Documentation & Reporting'],
  },
];

export default function TechnicalSkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      gsap.set(header, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      tl.to(header, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });

      categoriesRef.current.forEach((cat) => {
        if (!cat) return;
        gsap.set(cat, { opacity: 0, y: 40 });
        tl.to(
          cat,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          `-=${0.6}`
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technical-skills"
      ref={sectionRef}
      className="relative w-full py-32 md:py-48"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      <div className="max-content section-padding">
        <h2
          ref={headerRef}
          className="font-display text-[10vw] md:text-[6vw] leading-[0.9] tracking-tight text-[#F5F5F5] uppercase mb-16 md:mb-24"
        >
          TECHNICAL SKILLS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              ref={(el) => { categoriesRef.current[catIndex] = el; }}
              className="border border-[#333333] p-6 md:p-8 hover:border-[#00B2FF]/50 transition-colors duration-500"
            >
              <h3 className="font-display text-lg md:text-xl tracking-wide text-[#00B2FF] uppercase mb-6">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-[#252525] text-[#F5F5F5] font-body text-xs tracking-wide border border-[#333333] hover:border-[#00B2FF] hover:text-[#00B2FF] transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

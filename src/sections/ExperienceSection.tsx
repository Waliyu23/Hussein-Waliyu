import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'CEO & Founder',
    company: 'DigiServe Solution',
    period: 'Current',
    current: true,
    description: 'Leading digital transformation initiatives and building scalable web solutions for clients across diverse industries.',
  },
  {
    title: 'IT Manager',
    company: 'Better Dream Foundation Ghana',
    period: 'Current',
    current: true,
    description: 'Overseeing IT infrastructure, systems support, and digital strategy for NGO operations and community programs.',
  },
  {
    title: 'Developer',
    company: 'Global Service Consult',
    period: 'Current',
    current: true,
    description: 'Developing and maintaining the Global Service Consult web presence, with a focus on clear service communication, conversion-ready UX, and dependable frontend implementation.',
  },
  {
    title: 'Web Developer & Digital Experience Specialist',
    company: 'OXYZ Health & Wellness Sdn. Bhd.',
    period: 'Oct 2025 – Feb 2026',
    current: false,
    description: 'Designed, developed, and maintained secure, responsive websites for wellness and healthcare services. Led development of corporate and international-facing platforms with strong brand alignment.',
  },
  {
    title: 'WordPress Developer & Full Stack Consultant',
    company: 'Freelance & Partnership Projects',
    period: '2020 – 2025',
    current: false,
    description: 'Delivered 10+ custom websites and full-stack solutions for businesses, NGOs, and e-commerce clients using React, Next.js, Node.js, and WordPress.',
  },
  {
    title: 'Full Stack Development Intern',
    company: 'Business Web Solutions (BWS)',
    period: 'Mar 2025 – Sep 2025',
    current: false,
    description: 'Completed a 6-month intensive internship in full-stack development using React, Django, REST APIs, HTML, CSS, and JavaScript.',
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      itemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.set(item, { opacity: 0, x: -50 });
        tl.to(
          item,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          `-=${0.65}`
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-32 md:py-48"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      <div className="max-content section-padding">
        <h2
          ref={headerRef}
          className="font-display text-[10vw] md:text-[7vw] leading-[0.9] tracking-tight text-[#F5F5F5] uppercase mb-16 md:mb-24"
        >
          PROFESSIONAL EXPERIENCE
        </h2>

        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={exp.title + exp.company}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="group relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start border-t border-[#333333] pt-6 md:pt-8">
                {/* Left: Role info */}
                <div className="md:col-span-7">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl tracking-wide text-[#F5F5F5] uppercase group-hover:text-[#00B2FF] transition-colors duration-300">
                      {exp.title}
                    </h3>
                    {exp.current && (
                      <span className="px-2 py-0.5 bg-[#00B2FF]/20 text-[#00B2FF] text-xs font-body tracking-wider uppercase">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[#888888]">
                    <Building2 className="w-4 h-4" />
                    <span className="font-body text-sm md:text-base">{exp.company}</span>
                  </div>
                </div>

                {/* Right: Period */}
                <div className="md:col-span-3 md:text-right">
                  <div className="flex items-center md:justify-end gap-2 text-[#666666]">
                    <Calendar className="w-4 h-4" />
                    <span className="font-body text-sm tracking-wide">{exp.period}</span>
                  </div>
                </div>

                {/* Number */}
                <div className="md:col-span-2 md:text-right hidden md:block">
                  <span className="font-display text-4xl text-[#333333] group-hover:text-[#00B2FF]/50 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-sm md:text-base text-[#888888] mt-4 max-w-3xl leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, GraduationCap, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProfileSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !header || !leftCol || !rightCol) return;

    const ctx = gsap.context(() => {
      gsap.set(header, { opacity: 0, y: 50 });
      gsap.set(leftCol, { opacity: 0, x: -40 });
      gsap.set(rightCol, { opacity: 0, x: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      tl.to(header, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
        .to(leftCol, { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }, '-=0.6')
        .to(rightCol, { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }, '-=0.8');
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="relative w-full py-32 md:py-48"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      <div className="max-content section-padding">
        <h2
          ref={headerRef}
          className="font-display text-[12vw] md:text-[8vw] leading-[0.9] tracking-tight text-[#F5F5F5] uppercase mb-16 md:mb-24"
        >
          PROFILE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
          <div ref={leftColRef} className="md:pr-16">
            <p className="font-body text-base md:text-lg text-[#F5F5F5] leading-relaxed mb-6">
              Hussein Waliyu is a highly versatile IT Professional and Full Stack Web Developer delivering reliable, secure, and scalable digital solutions. With a strong foundation in software development, modern frontend frameworks, content management systems, and IT operations.
            </p>
            <p className="font-body text-base md:text-lg text-[#888888] leading-relaxed">
              Experienced across healthcare, wellness, e-commerce, NGOs, education, and corporate environments — including work as CEO of DigiServe Solution, IT Manager at Better Dream Foundation Ghana, and Developer of Global Services Consult — collaborating with cross-functional teams to translate requirements into effective technical solutions. Adept at troubleshooting, system optimization, documentation, performance monitoring, and continuous improvement.
            </p>
          </div>

          <div
            ref={rightColRef}
            className="md:pl-16 md:border-l md:border-[#00B2FF]/30"
          >
            <h3 className="font-display text-2xl md:text-3xl tracking-wide text-[#F5F5F5] uppercase mb-8">
              EDUCATION & BASE
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <GraduationCap className="w-5 h-5 text-[#00B2FF] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-sm md:text-base text-[#F5F5F5]">
                    Bachelor of Computer Science
                  </p>
                  <p className="font-body text-sm text-[#888888]">
                    Albukhary International University, Malaysia
                  </p>
                  <p className="font-body text-xs text-[#666666] tracking-wide">
                    2022 – 2025
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#00B2FF] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-sm md:text-base text-[#F5F5F5]">
                    Based in Ghana
                  </p>
                  <p className="font-body text-sm text-[#888888]">
                    Open to Onsite / Hybrid / Remote
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Globe className="w-5 h-5 text-[#00B2FF] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-sm md:text-base text-[#F5F5F5]">
                    English — Fluent
                  </p>
                  <p className="font-body text-sm text-[#888888]">
                    Professional Working Proficiency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'DIGISERVE SOLUTION',
    category: 'IT Services / Software',
    image: '/images/work-digiserve.svg',
    link: 'https://digiservesolution.com',
  },
  {
    title: 'BETTER DREAM FOUNDATION',
    category: 'Nonprofit / Foundation',
    image: '/images/work-better-dream.svg',
    link: 'https://betterdreamfoundation.org',
  },
  {
    title: 'GLOBAL SERVICES CONSULT',
    category: 'Education / Travel',
    image: '/images/work-global-services.svg',
    link: 'https://globalservicesconsult.com/',
  },
  {
    title: 'AESTHETIC MONTIS CLINIC',
    category: 'Medical / Healthcare',
    image: '/images/work-1.jpg',
    link: 'https://aesthetic.montis-clinic.com/',
  },
  {
    title: 'OXYZ INTERNATIONAL',
    category: 'Wellness / Corporate',
    image: '/images/work-2.jpg',
    link: 'https://international.oxyzhealth.com/',
  },
  {
    title: "YUSHA'S COLLECTION",
    category: 'E-commerce / Fashion',
    image: '/images/work-3.jpg',
    link: 'https://yushas-collection-client.vercel.app/',
  },
  {
    title: 'IQRA BOOKSTORE',
    category: 'E-commerce / Books',
    image: '/images/work-4.jpg',
    link: 'https://iqra-bookstore-frontend-teu2.vercel.app/',
  },
  {
    title: '3D INTERACTIVE PORTFOLIO',
    category: 'Creative / WebGL',
    image: '/images/work-5.jpg',
    link: 'https://portfolio-4d-xptd.vercel.app/',
  },
];

export default function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      gsap.set(header, { opacity: 0, y: 50 });

      const items = grid.querySelectorAll('.work-item');
      gsap.set(items, { opacity: 0, y: 60, scale: 0.95 });

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
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          `-=${0.7}`
        );
      });

      // Parallax on scroll
      items.forEach((item) => {
        const depth = parseFloat((item as HTMLElement).dataset.depth || '1');
        gsap.to(item, {
          y: -60 * depth,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative w-full py-32 md:py-48"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      <div className="max-content section-padding">
        <h2
          ref={headerRef}
          className="font-display text-[12vw] md:text-[8vw] leading-[0.9] tracking-tight text-[#F5F5F5] uppercase mb-16 md:mb-24 text-center"
        >
          SELECTED WORKS
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="work-item group relative block overflow-hidden"
              data-depth={index % 2 === 0 ? '1' : '1.5'}
            >
              <div className="relative aspect-video overflow-hidden border border-[#333333] group-hover:border-[#00B2FF] transition-colors duration-500">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-transparent to-transparent" />

                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-body text-xs tracking-[0.2em] text-[#00B2FF] uppercase mb-1">
                        {project.category}
                      </p>
                      <h3 className="font-display text-lg md:text-xl lg:text-2xl tracking-wide text-[#F5F5F5] uppercase">
                        {project.title}
                      </h3>
                    </div>
                    <ExternalLink className="w-5 h-5 text-[#888888] group-hover:text-[#00B2FF] transition-colors duration-300 flex-shrink-0 ml-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

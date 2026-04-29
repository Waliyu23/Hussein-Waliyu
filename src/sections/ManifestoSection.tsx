import { lazy, Suspense, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DeferredMount from '../components/DeferredMount';

gsap.registerPlugin(ScrollTrigger);

const WireframeCube = lazy(() => import('../components/WireframeCube'));

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    if (!section || !line1 || !line2 || !line3) return;

    const ctx = gsap.context(() => {
      gsap.set([line1, line2, line3], { opacity: 0, y: 80, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
      });

      tl.to(line1, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' })
        .to(line2, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }, '-=0.7')
        .to(line3, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }, '-=0.7');
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#EAE6E1' }}
    >
      <DeferredMount
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
        rootMargin="400px"
      >
        <Suspense fallback={null}>
          <WireframeCube className="opacity-60" />
        </Suspense>
      </DeferredMount>

      <div className="relative z-10 text-center section-padding py-32">
        <div ref={line1Ref}>
          <span className="font-display text-[15vw] md:text-[12vw] leading-[0.85] tracking-tight text-[#1A1A1A] uppercase block">
            DIGITAL
          </span>
        </div>
        <div ref={line2Ref}>
          <span className="font-display text-[15vw] md:text-[12vw] leading-[0.85] tracking-tight text-[#1A1A1A] uppercase block">
            SYSTEMS
          </span>
        </div>
        <div ref={line3Ref}>
          <span className="font-display text-[15vw] md:text-[12vw] leading-[0.85] tracking-tight text-[#00B2FF] uppercase block">
            SPECIALIST
          </span>
        </div>
      </div>
    </section>
  );
}

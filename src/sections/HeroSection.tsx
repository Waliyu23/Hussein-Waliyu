import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleLeftRef = useRef<HTMLDivElement>(null);
  const subtitleRightRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitleLeft = subtitleLeftRef.current;
    const subtitleRight = subtitleRightRef.current;
    const portrait = portraitRef.current;
    if (!section || !title || !subtitleLeft || !subtitleRight || !portrait) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(title, { opacity: 0, y: 60 });
      gsap.set(subtitleLeft, { opacity: 0, y: 30 });
      gsap.set(subtitleRight, { opacity: 0, y: 30 });
      gsap.set(portrait, { opacity: 0, scale: 0.9 });

      // Entry animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
        .to(
          portrait,
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .to(
          subtitleLeft,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          subtitleRight,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        );

      // Scroll-driven pin and fade
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=1200',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (videoRef.current) {
            videoRef.current.style.opacity = String(1 - progress * 0.8);
          }
          gsap.set(title, { opacity: 1 - progress * 1.2 });
          gsap.set(portrait, { opacity: 1 - progress * 1.2 });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-[#1A1A1A]/50 to-[#1A1A1A]/90"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div
        className="relative w-full h-full flex flex-col justify-between section-padding py-24"
        style={{ zIndex: 10 }}
      >
        {/* Top: Portrait */}
        <div className="flex-1 flex items-center justify-center">
          <div ref={portraitRef} className="relative">
            <div className="w-48 h-64 md:w-56 md:h-80 lg:w-64 lg:h-96 overflow-hidden border border-[#00B2FF]/30">
              <img
                src="/images/hero-portrait.jpg"
                alt="Hussein Waliyu"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative corner accents */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-[#00B2FF]" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-[#00B2FF]" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-[#00B2FF]" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-[#00B2FF]" />
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h1
            ref={titleRef}
            className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-tight text-[#F5F5F5] uppercase"
          >
            <span className="block">HUSSEIN</span>
            <span className="block text-[#00B2FF]">WALIYU</span>
          </h1>
        </div>

        {/* Bottom Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div ref={subtitleLeftRef}>
            <p className="font-body text-xs md:text-sm tracking-[0.2em] text-[#888888] uppercase">
              IT Professional & Full Stack Web Developer
            </p>
            <p className="font-body text-xs md:text-sm tracking-[0.2em] text-[#888888] uppercase mt-2">
              Developer of Global Service Consult
            </p>
          </div>
          <div ref={subtitleRightRef} className="text-left md:text-right">
            <p className="font-body text-xs md:text-sm tracking-[0.2em] text-[#888888] uppercase">
              CEO of DigiServe Solution
            </p>
            <p className="font-body text-xs md:text-sm tracking-[0.2em] text-[#888888] uppercase">
              IT Manager of Better Dream Foundation Ghana
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

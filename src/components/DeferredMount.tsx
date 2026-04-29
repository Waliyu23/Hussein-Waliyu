import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface DeferredMountProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  rootMargin?: string;
  style?: CSSProperties;
}

export default function DeferredMount({
  children,
  className,
  fallback = null,
  rootMargin = '300px',
  style,
}: DeferredMountProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsMounted(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(host);

    return () => observer.disconnect();
  }, [isMounted, rootMargin]);

  return (
    <div ref={hostRef} className={className} style={style}>
      {isMounted ? children : fallback}
    </div>
  );
}

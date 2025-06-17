// ScrollAnimate.tsx
import React, { useRef, useEffect, ReactNode } from 'react';

interface ScrollAnimateProps {
  children: ReactNode;
  className?: string;
  animation?: 'scroll-fade-in' | 'scroll-slide-up';
  rootMargin?: string;
}

const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
  children,
  className = '',
  animation = 'scroll-fade-in',
  rootMargin = '-40px',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('visible');
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={`${animation} ${className}`.trim()}>
      {children}
    </div>
  );
};

export default ScrollAnimate;

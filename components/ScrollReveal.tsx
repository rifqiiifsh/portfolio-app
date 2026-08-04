"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: "1200ms",
        transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
        transitionDelay: `${delay}ms`,
        transformStyle: "preserve-3d",
      }}
      className={`transition-all ${
        isVisible
          ? "opacity-100 translate-y-0 rotate-x-0 rotate-y-0 scale-100"
          : "opacity-0 translate-y-24 rotate-x-12 rotate-y-12 scale-95"
      } ${className}`}
    >
      {children}
    </div>
  );
}
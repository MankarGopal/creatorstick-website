'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxText({ children, speed = 0.5, className = '', axis = 'y' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const translation = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);

  return (
    <motion.div ref={ref} style={{ [axis]: translation }} className={className}>
      {children}
    </motion.div>
  );
}

export function ParallaxMarquee({ text, speed = 30, className = '' }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="animate-marquee inline-flex">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-8 font-montserrat text-6xl md:text-8xl font-bold opacity-10 uppercase tracking-widest">
            {text} •
          </span>
        ))}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className,
  fullWidth = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'relative py-24 md:py-32',
        !fullWidth && 'mx-auto max-w-7xl px-6 lg:px-8',
        className
      )}
    >
      {(title || subtitle) && (
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle && (
            <span className="mb-3 inline-block font-mono text-sm tracking-widest uppercase text-primary">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {title}
              <span className="gradient-text">.</span>
            </h2>
          )}
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-accent" />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

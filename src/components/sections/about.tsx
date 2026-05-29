'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { portfolio } from '@/config/portfolio';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { SectionWrapper } from '@/components/layout/section-wrapper';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <SectionWrapper id="about" title="about me" subtitle="">
      <motion.div
        className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Left — Avatar */}
        <motion.div variants={fadeInLeft} className="relative mx-auto w-full max-w-sm lg:col-span-2">
          <div className="relative">
            {/* Floating decorations */}
            <motion.div
              className="absolute -left-4 -top-4 h-6 w-6 rounded-full bg-[hsl(var(--primary)/0.6)]"
              animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -right-3 top-1/3 h-4 w-4 rounded-sm bg-[hsl(var(--accent)/0.5)]"
              animate={{ y: [0, 10, 0], rotate: [0, 90, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-3 left-1/4 h-5 w-5 rounded-full bg-[hsl(var(--primary)/0.4)]"
              animate={{ y: [0, -8, 0], x: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Avatar container */}
            <div className="gradient-border rounded-2xl p-1">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[hsl(var(--muted))]">
                <img
                  src={portfolio.personal.avatarUrl}
                  alt={portfolio.personal.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Content */}
        <motion.div variants={fadeInRight} className="space-y-7 lg:col-span-3">
          <p className="font-mono text-sm font-medium text-[hsl(var(--primary))]"></p>
          <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
            Passionate about building intelligent solutions
          </h3>
          <p className="leading-relaxed text-muted-foreground">{portfolio.personal.bio}</p>

          {/* Code block */}
          <div className="overflow-hidden rounded-xl border border-border/40 bg-[hsl(var(--card))] p-5 font-mono text-sm">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>
            <pre className="text-muted-foreground">
              <code>
                <span className="text-[hsl(var(--primary))]">const</span> developer = {'{\n'}
                {'  '}name: <span className="text-green-400">&quot;{portfolio.personal.name}&quot;</span>,{'\n'}
                {'  '}location: <span className="text-green-400">&quot;{portfolio.personal.location}&quot;</span>,{'\n'}
                {'  '}education: <span className="text-green-400">&quot;{portfolio.personal.education}&quot;</span>,{'\n'}
                {'  '}focus: [<span className="text-green-400">&quot;Full Stack&quot;</span>, <span className="text-green-400">&quot;AI Integration&quot;</span>, <span className="text-green-400">&quot;Clean Code&quot;</span>],{'\n'}
                {'}'};
              </code>
            </pre>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {portfolio.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass rounded-xl p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="text-2xl font-bold text-[hsl(var(--primary))]">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix || ''} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}


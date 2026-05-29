'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Trophy, GitBranch, Rocket, BookOpen } from 'lucide-react';
import { portfolio } from '@/config/portfolio';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { SectionWrapper } from '@/components/layout/section-wrapper';

const achievementIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy,
  GitBranch,
  Rocket,
  BookOpen,
};

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  return (
    <SectionWrapper id="achievements" title="Achievements" subtitle=" milestones">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="space-y-12"
      >
        {/* Stats counter row */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {portfolio.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-2 text-3xl font-extrabold text-[hsl(var(--primary))] sm:text-4xl">
                <AnimatedNumber target={stat.value} suffix={stat.suffix || ''} />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievement cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          {portfolio.achievements.map((achievement, i) => {
            const Icon = achievementIcons[achievement.icon] || Trophy;
            return (
              <motion.div
                key={achievement.title}
                variants={fadeInUp}
                className={cn(
                  'glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300',
                  'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5'
                )}
              >
                {/* Gradient left border */}
                <div className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--accent))]" />

                <div className="flex items-start gap-4 pl-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] transition-colors duration-300 group-hover:bg-[hsl(var(--primary)/0.2)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">{achievement.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}


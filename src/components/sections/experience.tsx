'use client';

import { motion } from 'motion/react';
import { MapPin, Briefcase, Rocket } from 'lucide-react';
import { portfolio } from '@/config/portfolio';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { SectionWrapper } from '@/components/layout/section-wrapper';

interface TimelineEntry {
  type: 'experience' | 'project';
  title: string;
  organization?: string;
  location?: string;
  period: string;
  description: string;
  current?: boolean;
}

function buildTimeline(): TimelineEntry[] {
  const entries: TimelineEntry[] = [];

  portfolio.experience.forEach((exp) => {
    entries.push({
      type: 'experience',
      title: exp.title,
      organization: exp.organization,
      location: exp.location,
      period: exp.period,
      description: exp.description,
      current: exp.current,
    });
  });

  portfolio.projects.forEach((proj) => {
    entries.push({
      type: 'project',
      title: proj.title,
      period: proj.year,
      description: proj.description,
    });
  });

  return entries;
}

export default function Experience() {
  const timeline = buildTimeline();

  return (
    <SectionWrapper id="experience" title="Experience & Journey" subtitle=" my path">
      <motion.div
        className="relative mx-auto max-w-3xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {/* Gradient timeline line */}
        <div className="absolute bottom-0 left-[19px] top-0 w-[2px] bg-gradient-to-b from-[hsl(var(--primary))] via-[hsl(var(--accent)/0.5)] to-transparent sm:left-[23px]" />

        {timeline.map((entry, i) => {
          const isProject = entry.type === 'project';
          return (
            <motion.div key={`${entry.title}-${i}`} variants={fadeInUp} className="relative mb-10 pl-12 sm:pl-14">
              {/* Timeline dot */}
              <div
                className={cn(
                  'absolute left-[12px] top-1.5 z-10 h-[16px] w-[16px] rounded-full border-[3px] sm:left-[16px]',
                  isProject
                    ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.3)]'
                    : 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.3)]'
                )}
              >
                <motion.div
                  className={cn(
                    'absolute inset-0 rounded-full',
                    isProject ? 'bg-[hsl(var(--accent)/0.2)]' : 'bg-[hsl(var(--primary)/0.2)]'
                  )}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Card */}
              <div className="glass overflow-hidden rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  {/* Period badge */}
                  <span
                    className={cn(
                      'rounded-md px-2.5 py-0.5 text-xs font-semibold',
                      isProject
                        ? 'bg-[hsl(var(--accent)/0.15)] text-[hsl(var(--accent))]'
                        : 'bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))]'
                    )}
                  >
                    {entry.period}
                  </span>

                  {entry.current && (
                    <span className="rounded-md bg-green-500/15 px-2 py-0.5 text-xs font-semibold text-green-400">
                      Current
                    </span>
                  )}

                  {/* Type badge */}
                  <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    {isProject ? <Rocket className="h-3 w-3" /> : <Briefcase className="h-3 w-3" />}
                    {isProject ? 'Project' : 'Experience'}
                  </span>
                </div>

                <h3 className="mb-1 text-lg font-bold">{entry.title}</h3>

                {entry.organization && (
                  <p className="mb-1 text-sm font-medium text-[hsl(var(--primary))]">{entry.organization}</p>
                )}

                {entry.location && (
                  <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {entry.location}
                  </p>
                )}

                <p className="text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}


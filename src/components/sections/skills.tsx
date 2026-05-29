'use client';

import { motion } from 'motion/react';
import { Code2, Layout, Server, Database, Brain, Wrench } from 'lucide-react';
import { portfolio } from '@/config/portfolio';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { SectionWrapper } from '@/components/layout/section-wrapper';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> =
{
  Code2,
  Layout,
  Server,
  Database,
  Brain,
  Wrench,
};

export default function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills & Technologies" subtitle=" my toolkit">
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        >
        {portfolio.skills.map((category, i) => {
          const Icon = iconMap[category.icon] || Code2;
          return (
            <motion.div
              key={category.category}
              variants={fadeInUp}
              className={cn(
                'glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300',
                'hover:-translate-y-1 hover:border-[hsl(var(--primary)/0.3)] hover:shadow-lg hover:shadow-primary/5'
              )}
              >
              {/* Hover gradient glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary)/0.05)] to-transparent" />
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)] text-muted-foreground transition-colors duration-300 group-hover:text-[hsl(var(--primary))]">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-lg font-bold">{category.category}</h3>

                {/* Skills pills */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-[hsl(var(--muted))] px-3 py-1 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:bg-[hsl(var(--primary)/0.15)] hover:text-[hsl(var(--primary))]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}


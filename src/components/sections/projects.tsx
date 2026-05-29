'use client';

import { motion } from 'motion/react';
import { ExternalLink, CheckCircle, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { portfolio } from '@/config/portfolio';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { SectionWrapper } from '@/components/layout/section-wrapper';

export default function Projects() {
  const featured = portfolio.projects.find((p) => p.featured);
  const others = portfolio.projects.filter((p) => p.title !== featured?.title);

  return (
    <SectionWrapper id="projects" title="Featured Projects" subtitle=" what I've built">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="space-y-8"
      >
        {/* Featured project */}
        {featured && (
          <motion.div
            variants={fadeInUp}
            className="glass gradient-border group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/10 sm:p-8 lg:col-span-2"
          >
            {/* Year badge */}
            <span className="absolute right-5 top-5 rounded-lg bg-[hsl(var(--primary)/0.15)] px-3 py-1 text-xs font-bold text-[hsl(var(--primary))]">
              {featured.year}
            </span>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold sm:text-3xl">{featured.title}</h3>
                {featured.subtitle && (
                  <p className="text-sm font-medium text-[hsl(var(--primary))]">{featured.subtitle}</p>
                )}
                <p className="leading-relaxed text-muted-foreground">{featured.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {featured.techStack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-[hsl(var(--muted))] px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* Highlights */}
                {featured.highlights && (
                  <ul className="space-y-2">
                    {featured.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  {featured.github && (
                    <a
                      href={featured.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-[hsl(var(--muted))] px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[hsl(var(--primary)/0.15)] hover:text-[hsl(var(--primary))]"
                    >
                      <GithubIcon className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  {featured.live && (
                    <a
                      href={featured.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Standard cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((project, i) => (
            <motion.div
              key={project.title}
              variants={fadeInUp}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Hover overlay */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col">
                {/* Header */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{project.year}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--primary))] group-hover:opacity-100" />
                </div>

                {/* Content */}
                <h3 className="mb-1 text-lg font-bold">{project.title}</h3>
                {project.subtitle && (
                  <p className="mb-2 text-xs font-medium text-[hsl(var(--primary))]">{project.subtitle}</p>
                )}
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="mb-4 mt-auto flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-[hsl(var(--muted))] px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 border-t border-border/30 pt-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-[hsl(var(--primary))]"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-[hsl(var(--primary))]"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}


'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { portfolio } from '@/config/portfolio';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function Hero() {
  const roles = portfolio.personal.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const tick = useCallback(() => {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
      setDisplayText(currentRole.substring(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
      if (charIndex + 1 === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1800);
        return;
      }
    } else {
      setDisplayText(currentRole.substring(0, charIndex - 1));
      setCharIndex((prev) => prev - 1);
      if (charIndex - 1 === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        return;
      }
    }
  }, [charIndex, isDeleting, roleIndex, roles]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[hsl(var(--primary)/0.15)] blur-[120px]"
          animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-[hsl(var(--accent)/0.12)] blur-[100px]"
          animate={{ x: [0, -50, 40, 0], y: [0, 40, -60, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 h-[350px] w-[350px] rounded-full bg-[hsl(var(--primary)/0.08)] blur-[80px]"
          animate={{ x: [0, 70, -30, 0], y: [0, -30, 50, 0], scale: [1, 1.2, 0.85, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="grid-pattern absolute inset-0 -z-10 opacity-40" />
      <div className="absolute inset-0 -z-10 bg-background/60" />

      {/* Main content */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome pill */}
        <motion.div variants={fadeInUp} className="glass mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium">
          <span>👋</span>
          <span className="text-muted-foreground">Welcome to my portfolio</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeInUp}
          className="gradient-text mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
        >
          {portfolio.personal.name}
        </motion.h1>

        {/* Typing effect */}
        <motion.div variants={fadeInUp} className="mb-6 h-10 text-xl font-medium text-[hsl(var(--primary))] sm:text-2xl">
          <span>{displayText}</span>
          <motion.span
            className="ml-0.5 inline-block w-[2px] bg-[hsl(var(--primary))]"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          >
            &nbsp;
          </motion.span>
        </motion.div>

        {/* Subtitle */}
        <motion.p variants={fadeInUp} className="mb-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {portfolio.personal.subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div variants={fadeInUp} className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('projects')}
            className="group flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-7 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href={portfolio.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex items-center gap-2 rounded-xl border border-border/50 px-7 py-3 font-semibold transition-all hover:scale-105 hover:border-primary/40"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={fadeInUp} className="flex items-center gap-5">
          <a
            href={portfolio.personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2.5 text-muted-foreground transition-all hover:scale-110 hover:text-foreground"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={portfolio.personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2.5 text-muted-foreground transition-all hover:scale-110 hover:text-foreground"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="cursor-pointer text-muted-foreground/60"
          onClick={() => scrollTo('about')}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}


'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { portfolio } from '@/config/portfolio';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { SectionWrapper } from '@/components/layout/section-wrapper';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const copyEmail = async () => {
    await navigator.clipboard.writeText(portfolio.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:${portfolio.personal.email}?subject=${subject}&body=${body}`);
  };

  return (
    <SectionWrapper id="contact" title="Get In Touch" subtitle=" contact me">
      {/* Background orb */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-[hsl(var(--primary)/0.06)] blur-[100px]" />

      <motion.div
        className="relative grid gap-12 lg:grid-cols-2 lg:gap-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {/* Left — Info */}
        <motion.div variants={fadeInLeft} className="space-y-8">
          <div>
            <h3 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl">
              Let&apos;s Build Something{' '}
              <span className="gradient-text">Together</span>
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              I&apos;m always open to discussing new projects, opportunities, and collaborations.
            </p>
          </div>

          <div className="space-y-5">
            {/* Email */}
            <button
              onClick={copyEmail}
              className="group flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-[hsl(var(--muted)/0.5)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="truncate text-sm font-medium">{portfolio.personal.email}</p>
              </div>
              <div className="text-muted-foreground transition-colors group-hover:text-[hsl(var(--primary))]">
                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              </div>
            </button>

            {/* Phone */}
            <div className="flex items-center gap-4 rounded-xl p-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">{portfolio.personal.phone}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 rounded-xl p-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">{portfolio.personal.location}</p>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href={portfolio.personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-muted-foreground transition-all hover:scale-110 hover:text-foreground"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={portfolio.personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-muted-foreground transition-all hover:scale-110 hover:text-foreground"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div variants={fadeInRight}>
          <form
            onSubmit={handleSubmit}
            className="glass gradient-border space-y-5 rounded-2xl p-7 sm:p-8"
          >
            {/* Name */}
            <div className="group relative">
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="peer w-full rounded-xl border border-border/50 bg-transparent px-4 pb-2.5 pt-5 text-sm outline-none transition-colors focus:border-[hsl(var(--primary))]"
                placeholder=" "
              />
              <label className="pointer-events-none absolute left-4 top-2 origin-left text-[10px] font-medium text-muted-foreground transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[hsl(var(--primary))]">
                Name
              </label>
            </div>

            {/* Email */}
            <div className="group relative">
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="peer w-full rounded-xl border border-border/50 bg-transparent px-4 pb-2.5 pt-5 text-sm outline-none transition-colors focus:border-[hsl(var(--primary))]"
                placeholder=" "
              />
              <label className="pointer-events-none absolute left-4 top-2 origin-left text-[10px] font-medium text-muted-foreground transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[hsl(var(--primary))]">
                Email
              </label>
            </div>

            {/* Message */}
            <div className="group relative">
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="peer w-full resize-none rounded-xl border border-border/50 bg-transparent px-4 pb-2.5 pt-5 text-sm outline-none transition-colors focus:border-[hsl(var(--primary))]"
                placeholder=" "
              />
              <label className="pointer-events-none absolute left-4 top-2 origin-left text-[10px] font-medium text-muted-foreground transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[hsl(var(--primary))]">
                Message
              </label>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}


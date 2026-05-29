'use client';

import { motion } from 'motion/react';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { portfolio } from '@/config/portfolio';

const socialLinks = [
  {
    label: 'GitHub',
    href: portfolio.personal.github,
    icon: GithubIcon,
  },
  {
    label: 'LinkedIn',
    href: portfolio.personal.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: 'Email',
    href: `mailto:${portfolio.personal.email}`,
    icon: Mail,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50">
      {/* Gradient top border accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Left: Copyright */}
          <motion.div
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span>© {currentYear} </span>
            <span className="font-medium text-foreground">
              {portfolio.personal.name}
            </span>
            <span>. All rights reserved.</span>
          </motion.div>

          {/* Center: Built with */}
          <motion.div
            className="flex items-center gap-1.5 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span>Built with</span>
            <span className="font-medium text-foreground">Next.js</span>
            <span>,</span>
            <span className="font-medium text-foreground">Tailwind CSS</span>
            <span>&</span>
            <motion.span
              className="inline-flex"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </motion.span>
          </motion.div>

          {/* Right: Social Icons */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={
                  link.href.startsWith('mailto')
                    ? undefined
                    : 'noopener noreferrer'
                }
                className="group flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-secondary/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom subtle text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="font-mono text-xs text-muted-foreground/50">
            &lt;/&gt; with passion for clean code
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

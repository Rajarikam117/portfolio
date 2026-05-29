import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rajarikam Ashish — Full Stack Developer & AI Enthusiast',
  description:
    'Full Stack Web Developer specializing in React.js, Node.js, and AI/LLM integration. Building intelligent, production-ready web applications.',
  keywords: [
    'Full Stack Developer',
    'React.js',
    'Node.js',
    'AI',
    'LLM',
    'Web Developer',
    'Rajarikam Ashish',
  ],
  authors: [{ name: 'Rajarikam Ashish' }],
  openGraph: {
    title: 'Rajarikam Ashish — Full Stack Developer & AI Enthusiast',
    description:
      'Full Stack Web Developer specializing in React.js, Node.js, and AI/LLM integration.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajarikam Ashish — Full Stack Developer & AI Enthusiast',
    description:
      'Full Stack Web Developer specializing in React.js, Node.js, and AI/LLM integration.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Skills from '@/components/sections/skills';
import Experience from '@/components/sections/experience';
import Projects from '@/components/sections/projects';
import Achievements from '@/components/sections/achievements';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

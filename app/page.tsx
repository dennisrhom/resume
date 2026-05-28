"use client";
import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Gaming from "@/components/sections/Gaming";
import Footer from "@/components/sections/Footer";
import DotNav, { NavSection } from "@/components/ui/DotNav";
import SmoothScroll from "@/components/ui/SmoothScroll";
import KonamiEasterEgg from "@/components/ui/KonamiEasterEgg";

const GalaxyCanvas = dynamic(() => import("@/components/galaxy/GalaxyCanvas"), {
  ssr: false,
});

const NAV_SECTIONS: NavSection[] = [
  { id: "home",       label: "HOME"       },
  { id: "about",      label: "ABOUT"      },
  { id: "education",  label: "EDUCATION"  },
  { id: "experience", label: "WORK"       },
  { id: "projects",   label: "PROJECTS"   },
  { id: "gaming",     label: "GAMING"     },
  { id: "contact",    label: "CONTACT"    },
];

export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [easterEgg, setEasterEgg] = useState(false);

  useEffect(() => {
    const handler = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollY(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleKonamiActivate = useCallback(() => setEasterEgg(true), []);
  const handleKonamiDeactivate = useCallback(() => setEasterEgg(false), []);

  return (
    <>
      <SmoothScroll />
      <GalaxyCanvas scrollY={scrollY} easterEgg={easterEgg} />

      <main id="main-content">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Gaming />
        <Footer />
      </main>

      <DotNav sections={NAV_SECTIONS} />
      <KonamiEasterEgg
        onActivate={handleKonamiActivate}
        onDeactivate={handleKonamiDeactivate}
      />
    </>
  );
}

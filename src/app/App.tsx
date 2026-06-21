import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";

import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Marquee } from "./components/Marquee";
import { Discography } from "./components/Discography";
import { Timeline } from "./components/Timeline";
import { Gallery } from "./components/Gallery";
import { Tour } from "./components/Tour";
import { Footer } from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  // Momentum smooth scrolling — only after the preloader is gone.
  useSmoothScroll(!loading);

  // Top progress bar tracking page scroll.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Manage body scroll state during preloading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="noise-overlay" />

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-accent origin-left z-[80]"
        style={{ scaleX: progress }}
      />

      <main className="relative bg-brand-bg min-h-screen flex flex-col w-full selection:bg-brand-accent selection:text-brand-bg">
        <Navbar />

        {/* We wrap the content in a div to ensure scroll calculations are correct post-load */}
        <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}>
          <Hero />
          <About />
          <Marquee text="Believe" />
          <Discography />
          <Timeline />
          <Gallery />
          <Marquee text="Purpose" reverse duration={32} />
          <Tour />
          <Footer />
        </div>
      </main>
    </>
  );
}

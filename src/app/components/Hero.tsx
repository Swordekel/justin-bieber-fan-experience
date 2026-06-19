import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedChars } from "./AnimatedText";
import { MagneticButton } from "./MagneticButton";
import { scrollToSection } from "../lib/scroll";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);

  // Real, CC-licensed Justin Bieber live photo (credited in ATTRIBUTIONS.md).
  const bgImage = "/images/hero-bieber.jpg";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated aurora glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-brand-accent/25 blur-[120px]"
          animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[55vw] h-[55vw] rounded-full bg-indigo-500/20 blur-[120px]"
          animate={{ x: [0, -70, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0 w-full h-full" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-brand-bg/55 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/50 via-brand-bg/30 to-brand-bg z-20" />
        <img
          src={bgImage}
          alt="Justin Bieber performing live on stage"
          className="w-full h-full object-cover object-[50%_28%] opacity-80"
        />
      </motion.div>

      <motion.div
        className="relative z-30 flex flex-col items-center w-full px-4 text-center mt-20"
        style={{ y: textY }}
      >
        <h1 className="font-heading text-[15vw] md:text-[18vw] leading-[0.8] tracking-tight uppercase text-brand-text w-full drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          <AnimatedChars text="JUSTIN" delay={0.5} className="block text-left ml-[5%]" />
          <AnimatedChars text="BIEBER" delay={0.8} className="block text-right mr-[5%] text-brand-accent" />
        </h1>

        <motion.div
          className="mt-12 md:mt-24 flex flex-col md:flex-row items-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <p className="text-brand-muted text-sm md:text-base uppercase tracking-[0.3em]">
            Pop. Purpose. Forever.
          </p>

          <MagneticButton onClick={() => scrollToSection("discography")}>
            Listen Now
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => scrollToSection("about")}
        data-interactive="true"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-text/50">Scroll</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="text-brand-text/50 w-6 h-6" />
        </motion.span>
      </motion.button>

      {/* Editorial corner meta — fills the frame */}
      <motion.div
        className="absolute bottom-10 left-6 md:left-12 z-30 hidden sm:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-muted">Latest release</p>
        <p className="text-sm uppercase tracking-widest text-brand-text/90">Justice — 2021</p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-6 md:right-12 z-30 hidden sm:block text-right"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-muted">Fan tribute</p>
        <p className="text-sm uppercase tracking-widest text-brand-text/90">Est. Stratford '94</p>
      </motion.div>

      {/* Left vertical label */}
      <motion.div
        className="absolute left-6 top-1/2 z-30 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        <span className="block -rotate-90 origin-left translate-y-10 text-[10px] uppercase tracking-[0.4em] text-brand-muted whitespace-nowrap">
          Pop · R&amp;B · Dance
        </span>
      </motion.div>
    </section>
  );
}

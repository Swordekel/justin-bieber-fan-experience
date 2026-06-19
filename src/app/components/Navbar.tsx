import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { scrollToSection } from "../lib/scroll";

const links = [
  { id: "about", label: "About" },
  { id: "discography", label: "Music" },
  { id: "tour", label: "Tour" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 150 && latest > previous && !menuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = ["hero", ...links.map((l) => l.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    if (menuOpen) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [menuOpen]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    // Allow the overlay to start closing before scrolling.
    setTimeout(() => scrollToSection(id), menuOpen ? 250 : 0);
  };

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[90] px-6 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-auto"
      >
        <a
          href="#hero"
          onClick={go("hero")}
          className="font-heading text-3xl uppercase tracking-widest z-10"
          data-interactive="true"
        >
          JB
        </a>

        <nav className="hidden md:flex gap-10 text-xs uppercase tracking-[0.2em] font-medium z-10">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={go(link.id)}
              className="relative py-1 transition-opacity hover:opacity-70"
              data-interactive="true"
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden uppercase text-xs tracking-widest z-10"
          data-interactive="true"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </motion.header>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[85] bg-[#050505] flex flex-col justify-center px-8 md:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {[{ id: "hero", label: "Home" }, ...links].map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  className="font-heading text-6xl uppercase text-brand-text leading-tight hover:text-brand-accent transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

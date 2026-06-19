import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { AnimatedChars } from "./AnimatedText";
import { scrollToTop } from "../lib/scroll";

// ── Portfolio credit ─────────────────────────────────────────────
// Change CREATOR to your name exactly as you want it shown, and set
// CREATOR_URL to your GitHub / LinkedIn / portfolio (leave "" for no link).
const CREATOR = "Swordekel";
const CREATOR_URL = "https://sword-portfolio.vercel.app/";
// ─────────────────────────────────────────────────────────────────

// Official Justin Bieber profiles
const socials = [
  { label: "Instagram", href: "https://www.instagram.com/justinbieber/" },
  { label: "X", href: "https://x.com/justinbieber" },
  { label: "YouTube", href: "https://www.youtube.com/@justinbieber" },
  { label: "Spotify", href: "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] text-brand-text pt-32 pb-8 px-6 md:px-12 lg:px-24 overflow-hidden z-20">
      {/* Oversized watermark */}
      <div
        className="pointer-events-none absolute -bottom-[3vw] left-0 right-0 select-none text-center font-heading uppercase leading-none text-white/[0.03] text-[26vw]"
        aria-hidden="true"
      >
        Bieber
      </div>

      <div className="relative max-w-[1600px] mx-auto flex flex-col items-center text-center">

        <h2 className="font-heading text-6xl md:text-9xl lg:text-[12vw] leading-[0.8] uppercase text-brand-text mb-12 w-full">
          <AnimatedChars text="STAY IN" className="block text-left ml-[5%]" />
          <AnimatedChars text="THE LOOP" className="block text-right mr-[5%] text-brand-accent" delay={0.3} />
        </h2>

        <motion.div
          className="w-full max-w-xl mx-auto flex flex-col md:flex-row gap-4 mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="flex-1 bg-transparent border-b border-brand-text/30 px-4 py-4 focus:outline-none focus:border-brand-accent transition-colors placeholder:text-brand-text/20 uppercase tracking-widest text-sm"
          />
          <button className="bg-brand-text text-brand-bg px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-brand-accent transition-colors">
            Subscribe
          </button>
        </motion.div>

        <div className="w-full border-t border-brand-text/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="flex gap-6 uppercase tracking-widest text-xs font-medium text-brand-muted">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent transition-colors"
                data-interactive="true"
                aria-label={`Justin Bieber on ${s.label}`}
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="text-brand-text/30 text-xs tracking-wider uppercase text-center md:text-left">
            Fan-made portfolio project. Not affiliated with the artist.
          </div>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-brand-text/20 flex items-center justify-center hover:bg-brand-text hover:text-brand-bg transition-colors"
            data-interactive="true"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Creator credit */}
        <div className="w-full mt-10 pt-8 border-t border-brand-text/10 flex flex-col items-center gap-2">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">
            Designed &amp; built by{" "}
            {CREATOR_URL ? (
              <a
                href={CREATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text hover:text-brand-accent transition-colors font-medium"
                data-interactive="true"
              >
                {CREATOR}
              </a>
            ) : (
              <span className="text-brand-text font-medium">{CREATOR}</span>
            )}
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand-text/30">
            Front-end portfolio · {year}
          </p>
        </div>

      </div>
    </footer>
  );
}

import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AnimatedChars } from "./AnimatedText";
import { Play } from "lucide-react";

const search = (q: string) => `https://open.spotify.com/search/${encodeURIComponent("Justin Bieber " + q)}`;

const albums = [
  { title: "My World 2.0", year: "2010", tracks: 10, single: "Baby", img: "/images/gallery-performing.jpg", pos: "50% 18%", gradient: "from-[#3b1d5e] via-[#7c3aed] to-[#160a2e]", url: search("My World 2.0") },
  { title: "Believe", year: "2012", tracks: 13, single: "Boyfriend", img: "/images/gallery-arena.jpg", pos: "50% 50%", gradient: "from-[#0c4a6e] via-[#0891b2] to-[#071a2e]", url: search("Believe") },
  { title: "Journals", year: "2013", tracks: 15, single: "Heartbreaker", img: "/images/gallery-pyro.jpg", pos: "50% 50%", gradient: "from-[#4a0e2e] via-[#be185d] to-[#1a0710]", url: search("Journals") },
  { title: "Purpose", year: "2015", tracks: 13, single: "Sorry", img: "/images/portrait-bieber.jpg", pos: "50% 12%", gradient: "from-[#334155] via-[#94a3b8] to-[#0f172a]", url: search("Purpose") },
  { title: "Changes", year: "2020", tracks: 17, single: "Yummy", img: "/images/gallery-piano.jpg", pos: "50% 40%", gradient: "from-[#3f2d1e] via-[#d97706] to-[#160d06]", url: search("Changes") },
  { title: "Justice", year: "2021", tracks: 16, single: "Peaches", latest: true, img: "/images/hero-bieber.jpg", pos: "50% 22%", gradient: "from-[#1e3a8a] via-[#3b82f6] to-[#0a1226]", url: search("Justice") },
];

const grain =
  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')";

export function Discography() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  // Only mount the Spotify embed once it scrolls near view (perf + lighter renderer).
  const playerInView = useInView(playerRef, { once: true, margin: "250px 0px 250px 0px" });
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (rowRef.current) {
        setDistance(Math.max(0, rowRef.current.scrollWidth - window.innerWidth));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.4 });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <section
        id="discography"
        ref={sectionRef}
        className="relative bg-brand-bg z-20"
        style={{ height: "320vh" }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="px-6 md:px-12 lg:px-24 mb-10 md:mb-14 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div>
              <p className="text-brand-accent text-xs uppercase tracking-[0.3em] mb-4">
                6 albums · 2010 — 2021
              </p>
              <h2 className="font-heading text-6xl md:text-8xl lg:text-[9vw] leading-none uppercase text-brand-text">
                <AnimatedChars text="DISCOGRAPHY" />
              </h2>
            </div>
            <div className="hidden md:flex flex-col items-end gap-3 pb-4 w-48">
              <span className="text-xs uppercase tracking-widest text-brand-muted">Scroll to explore</span>
              <div className="w-full h-px bg-brand-text/15 relative overflow-hidden">
                <motion.div className="absolute inset-y-0 left-0 bg-brand-accent" style={{ width: progress }} />
              </div>
            </div>
          </div>

          <motion.div
            ref={rowRef}
            style={{ x: smoothX }}
            className="flex gap-8 md:gap-14 px-6 md:px-12 lg:px-24 w-max will-change-transform"
          >
            {albums.map((album, i) => (
              <div
                key={i}
                className="group flex-shrink-0 w-[78vw] sm:w-[55vw] md:w-[40vw] lg:w-[27vw]"
              >
                <a href={album.url} target="_blank" rel="noopener noreferrer" className="relative block" data-interactive="true">
                  {/* Vinyl record — slides out and spins on hover */}
                  <div
                    className="absolute top-[9%] right-0 z-0 aspect-square w-[82%] rounded-full bg-[#0b0b0b] shadow-2xl transition-transform duration-700 ease-out group-hover:translate-x-[20%]"
                    style={{ backgroundImage: "repeating-radial-gradient(circle at center, rgba(255,255,255,0.05) 0 1px, transparent 1px 5px)" }}
                  >
                    <div className="absolute inset-0 rounded-full group-hover:animate-[spin_4s_linear_infinite]">
                      <div className={`absolute inset-[36%] rounded-full bg-gradient-to-br ${album.gradient}`} />
                      <div className="absolute inset-[47%] rounded-full bg-brand-bg ring-1 ring-white/10" />
                    </div>
                  </div>

                  {/* Cover art — duotone photo */}
                  <div className="relative z-10 aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl transition-transform duration-700 ease-out group-hover:-translate-x-[3%] group-hover:scale-[1.01]">
                    <img
                      src={album.img}
                      alt={`Justin Bieber — ${album.title}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: album.pos }}
                    />
                    {/* duotone tint toward the album color */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${album.gradient} mix-blend-multiply opacity-[0.85]`} />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${album.gradient} mix-blend-screen opacity-25`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/35" />
                    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: grain }} />

                    {/* top row */}
                    <div className="absolute top-5 left-5 right-5 z-20 flex justify-between items-start">
                      <span className="font-heading text-2xl text-white/50">{String(i + 1).padStart(2, "0")}</span>
                      {album.latest && (
                        <span className="text-[10px] uppercase tracking-[0.2em] text-brand-bg bg-brand-accent px-2.5 py-1 rounded-full font-medium">
                          Latest
                        </span>
                      )}
                    </div>

                    {/* album title as cover art */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
                      <h3 className="font-heading uppercase text-white leading-[0.85] text-4xl md:text-5xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
                        {album.title}
                      </h3>
                    </div>

                    {/* play button on hover */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30">
                      <div className="w-16 h-16 rounded-full bg-brand-text text-brand-bg flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500">
                        <Play className="w-6 h-6 translate-x-[2px]" fill="currentColor" />
                      </div>
                    </div>

                    {/* equalizer + year */}
                    <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
                      <div className="flex items-end gap-[3px] h-6">
                        {[0, 1, 2, 3, 4].map((b) => (
                          <span key={b} className="eq-bar w-[3px] h-full bg-white/85 rounded-full" style={{ animationDelay: `${b * 0.12}s` }} />
                        ))}
                      </div>
                      <span className="text-[11px] uppercase tracking-widest text-white/80">{album.year}</span>
                    </div>
                  </div>
                </a>

                {/* meta below cover */}
                <div className="mt-5 flex items-center justify-between border-t border-brand-text/10 pt-4">
                  <span className="text-brand-muted text-xs uppercase tracking-widest">{album.tracks} tracks</span>
                  <span className="text-brand-text text-sm uppercase tracking-wide">
                    <span className="text-brand-accent mr-1.5">♪</span>
                    {album.single}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-[6vw]" aria-hidden="true" />
          </motion.div>
        </div>
      </section>

      {/* Featured player — real Justin Bieber tracks straight from Spotify */}
      <div className="bg-brand-bg relative z-20 px-6 md:px-12 lg:px-24 pb-24 md:pb-32">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-brand-accent text-xs uppercase tracking-[0.3em] mb-3">Press play</p>
              <h3 className="font-heading text-4xl md:text-6xl uppercase text-brand-text leading-none">
                Listen now
              </h3>
            </div>
            <p className="text-brand-muted text-sm max-w-xs md:text-right">
              Real tracks streamed straight from Spotify. Tap any album above to open it.
            </p>
          </div>

          <div ref={playerRef} className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-[#121212]">
            {playerInView ? (
              <iframe
                title="Justin Bieber on Spotify"
                src="https://open.spotify.com/embed/artist/1uNFoZAHBGtllmzznpCI3s?utm_source=generator&theme=0"
                width="100%"
                height="380"
                loading="lazy"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                style={{ display: "block" }}
              />
            ) : (
              <div className="h-[380px] flex items-center justify-center text-brand-muted text-xs uppercase tracking-[0.3em]">
                Spotify player
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

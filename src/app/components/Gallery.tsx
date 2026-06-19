import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { AnimatedChars } from "./AnimatedText";

// Real, CC-licensed Justin Bieber photos (credited in ATTRIBUTIONS.md).
// tone "mono" = b/w until hover; "color" = always in color (brand accent pop).
const images = [
  { src: "/images/gallery-piano.jpg", label: "Under the lights", tone: "mono" as const },
  { src: "/images/gallery-performing.jpg", label: "On stage", tone: "mono" as const },
  { src: "/images/gallery-pyro.jpg", label: "The show", tone: "color" as const },
  { src: "/images/gallery-arena.jpg", label: "The crowd", tone: "mono" as const },
];

const toneClass = (tone: "mono" | "color") =>
  tone === "color"
    ? "transition-transform duration-700 group-hover:scale-105"
    : "grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105";

function Tile({
  src,
  label,
  tone = "mono",
  className = "",
}: {
  src: string;
  label: string;
  tone?: "mono" | "color";
  className?: string;
}) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl ring-1 ring-white/5 ${className}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
    >
      <img
        src={src}
        alt={label}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${toneClass(tone)}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
      <span className="absolute bottom-4 left-4 z-10 text-xs uppercase tracking-[0.25em] text-brand-text/80 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        {label}
      </span>
    </motion.div>
  );
}

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  // Only run the marquee while the section is near the viewport — saves paint.
  const inView = useInView(sectionRef, { margin: "300px 0px 300px 0px" });
  const reduceMotion = useReducedMotion();

  const marqueeStyle = {
    animation: "marquee-left 40s linear infinite",
    animationPlayState: inView && !reduceMotion ? "running" : "paused",
  } as const;

  const strip = [...images, ...images, ...images]; // 12 = two seamless halves of 6

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-brand-bg relative z-20 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 mb-12 md:mb-16 flex items-end justify-between">
        <h2 className="font-heading text-4xl md:text-6xl uppercase text-brand-text">
          <AnimatedChars text="MOMENTS" />
        </h2>
        <span className="hidden md:block text-brand-muted text-xs uppercase tracking-[0.2em]">
          On &amp; off the stage
        </span>
      </div>

      {/* Single, GPU-composited marquee strip */}
      <div className="relative w-full overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-brand-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-brand-bg to-transparent" />
        <div className="flex w-max gap-4 md:gap-6 px-3 will-change-transform" style={marqueeStyle}>
          {strip.map((img, i) => (
            <div
              key={i}
              className="group relative h-[30vh] md:h-[40vh] w-[70vw] sm:w-[44vw] md:w-[30vw] lg:w-[24vw] flex-shrink-0 overflow-hidden rounded-2xl"
            >
              <img
                src={img.src}
                alt={img.label}
                loading="lazy"
                decoding="async"
                className={`h-full w-full object-cover ${toneClass(img.tone)}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bento grid — fills the viewport on large screens, intentional layout */}
      <div className="px-6 md:px-12 lg:px-20 mt-14 md:mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[26vh] gap-3 md:gap-5 md:grid-rows-2 md:auto-rows-auto md:h-[82vh] md:max-h-[860px]">
          <Tile {...images[0]} className="col-span-2 row-span-1 md:row-span-2" />
          <Tile {...images[3]} className="col-span-2 row-span-1" />
          <Tile {...images[1]} className="col-span-1 row-span-1" />
          <Tile {...images[2]} className="col-span-1 row-span-1" />
        </div>
      </div>
    </section>
  );
}

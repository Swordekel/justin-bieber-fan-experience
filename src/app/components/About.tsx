import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedText } from "./AnimatedText";
import { Counter } from "./Counter";

const stats = [
  { to: 70, suffix: "B+", sub: "streams" },
  { to: 8, suffix: "", sub: "studio albums" },
  { to: 150, suffix: "M+", sub: "records sold" },
  { to: 2, suffix: "", sub: "Grammy Awards" },
];

const facts = [
  { k: "Born", v: "March 1, 1994" },
  { k: "From", v: "Stratford, Canada" },
  { k: "Genres", v: "Pop · R&B · Dance" },
  { k: "Active", v: "2008 — present" },
  { k: "Labels", v: "RBMG · Def Jam" },
  { k: "Real name", v: "Justin Drew Bieber" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Real, CC-licensed Justin Bieber portrait (credited in ATTRIBUTIONS.md).
  const portraitImg = "/images/portrait-bieber.jpg";

  return (
    <section id="about" ref={ref} className="py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto relative z-20 bg-brand-bg">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-10 items-stretch">

        {/* Text Column */}
        <div className="md:col-span-7 lg:col-span-6 flex flex-col gap-10 order-2 md:order-1">
          {/* eyebrow */}
          <div className="flex items-center gap-4">
            <span className="text-brand-accent text-xs uppercase tracking-[0.3em] whitespace-nowrap">01 — The Artist</span>
            <span className="h-px flex-1 bg-brand-text/10" />
          </div>

          {/* lead bio */}
          <div className="text-2xl md:text-4xl lg:text-[2.7rem] font-medium leading-[1.25] tracking-tight">
            <AnimatedText text="Justin Drew Bieber is a Canadian singer who rose from YouTube covers to global superstardom — reshaping modern pop with record-breaking albums and billions of streams." />
          </div>

          {/* secondary paragraph */}
          <motion.p
            className="text-brand-muted text-base md:text-lg leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Discovered on YouTube as a teenager, he blended R&amp;B, dance, and heartfelt
            songwriting into a sound that defined a generation. From the viral rise of
            &ldquo;Baby&rdquo; to the chart-topping eras of <em className="text-brand-text/80 not-italic">Purpose</em>,
            <em className="text-brand-text/80 not-italic"> Changes</em> and <em className="text-brand-text/80 not-italic">Justice</em>,
            his catalogue spans more than a decade of evolution.
          </motion.p>

          {/* pull quote */}
          <motion.blockquote
            className="border-l-2 border-brand-accent pl-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="font-heading text-3xl md:text-4xl uppercase text-brand-text leading-none">
              &ldquo;Never say never.&rdquo;
            </p>
          </motion.blockquote>

          {/* fact sheet */}
          <motion.dl
            className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 pt-8 border-t border-brand-text/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="text-brand-muted text-[10px] uppercase tracking-[0.2em]">{f.k}</dt>
                <dd className="text-brand-text text-sm mt-1.5">{f.v}</dd>
              </div>
            ))}
          </motion.dl>

          {/* stats */}
          <motion.div
            className="mt-auto grid grid-cols-2 gap-8 pt-10 border-t border-brand-text/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="font-heading text-4xl md:text-5xl text-brand-text">
                  <Counter to={stat.to} suffix={stat.suffix} />
                </span>
                <span className="text-brand-muted text-xs uppercase tracking-widest">{stat.sub}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image Column */}
        <div className="md:col-span-5 lg:col-span-5 lg:col-start-8 h-[60vh] md:h-auto md:min-h-[80vh] w-full relative rounded-2xl overflow-hidden order-1 md:order-2">
          <motion.div
            className="absolute inset-0 w-full h-[130%]"
            style={{ y: imgY }}
          >
            <div className="absolute inset-0 bg-brand-bg/20 z-10 mix-blend-color" />
            <img
              src={portraitImg}
              alt="Portrait of Justin Bieber"
              className="w-full h-full object-cover object-[50%_25%] grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

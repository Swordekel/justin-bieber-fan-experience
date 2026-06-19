import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedChars } from "./AnimatedText";

const milestones = [
  { year: "2007", text: "Discovered on YouTube" },
  { year: "2009", text: "Debut single \"One Time\"" },
  { year: "2010", text: "\"Baby\" goes viral worldwide" },
  { year: "2012", text: "\"Believe\" album released" },
  { year: "2015", text: "\"Purpose\" + global hit \"Sorry\"" },
  { year: "2021", text: "\"Justice\" tops the charts" },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-32 md:py-48 bg-brand-bg relative z-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-heading text-5xl md:text-7xl uppercase text-brand-text mb-24 text-center md:text-left">
          <AnimatedChars text="THE JOURNEY" />
        </h2>

        <div className="relative pl-4 md:pl-0" ref={containerRef}>
          {/* Background line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-brand-text/10 -translate-x-1/2" />
          
          {/* Animated line */}
          <motion.div 
            className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-accent -translate-x-1/2 origin-top"
            style={{ scaleY }}
          />

          <div className="flex flex-col gap-24">
            {milestones.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-[30px] h-[30px] bg-brand-bg border border-brand-accent rounded-full -translate-x-1/2 flex items-center justify-center z-10">
                    <motion.div 
                      className="w-[10px] h-[10px] bg-brand-accent rounded-full"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ delay: 0.2 }}
                    />
                  </div>

                  {/* Content */}
                  <motion.div 
                    className={`pl-12 md:pl-0 w-full md:w-5/12 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="font-heading text-4xl md:text-6xl text-brand-text/20 mb-4">{item.year}</div>
                    <div className="text-xl md:text-3xl text-brand-text font-medium leading-tight">{item.text}</div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion, useReducedMotion } from "motion/react";

/**
 * An infinite, seamless scrolling text band — a signature editorial element.
 * Two identical halves translate by -50% so the loop is gapless.
 */
export function Marquee({
  text,
  reverse = false,
  duration = 26,
}: {
  text: string;
  reverse?: boolean;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();
  const items = Array.from({ length: 4 });

  const Half = () => (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((_, i) => (
        <span key={i} className="flex items-center">
          <span className="font-heading text-[11vw] md:text-[8vw] leading-none uppercase tracking-tight text-brand-text/90">
            {text}
          </span>
          <span className="mx-6 md:mx-10 text-[5vw] md:text-[3vw] text-brand-accent">
            &#10022;
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden border-y border-brand-text/10 py-5 md:py-8 bg-brand-bg select-none">
      <motion.div
        className="flex w-max whitespace-nowrap will-change-transform"
        animate={reduceMotion ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ ease: "linear", duration, repeat: Infinity }}
      >
        <Half />
        <Half />
      </motion.div>
    </div>
  );
}

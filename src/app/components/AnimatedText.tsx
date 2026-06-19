import { motion, type Variants } from "motion/react";
import { cn } from "../../lib/utils";

// Word-by-word reveal for body copy. The reveal is driven from the PARENT
// container (one in-view trigger + staggerChildren) so every word reveals
// reliably together, never leaving stray words stuck hidden.
export function AnimatedText({
  text,
  className,
  once = true,
  delay = 0,
}: {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { y: "110%", rotateZ: 2 },
    visible: { y: 0, rotateZ: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
    >
      {words.map((word, idx) => (
        <span key={idx} className="overflow-hidden inline-flex mr-[0.25em] mb-[0.1em]">
          <motion.span className="inline-block" variants={item}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// Character-by-character reveal for headings, same parent-driven pattern.
export function AnimatedChars({
  text,
  className,
  once = true,
  delay = 0,
}: {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}) {
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { y: "100%" },
    visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
    >
      {text.split("").map((char, idx) => (
        <span key={idx} className="overflow-hidden inline-flex">
          <motion.span className="inline-block" variants={item}>
            {char === " " ? <>&nbsp;</> : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

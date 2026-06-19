import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let currentCount = 0;
    const interval = setInterval(() => {
      // Non-linear counting
      currentCount += Math.floor(Math.random() * 15) + 2;
      if (currentCount >= 100) {
        currentCount = 100;
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 600); 
      }
      setCount(currentCount);
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-end p-6 md:p-12 bg-[#050505] text-brand-text"
      initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      exit={{ 
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Centered name reveal */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="overflow-hidden">
          <motion.span
            className="block font-heading text-5xl md:text-8xl uppercase tracking-tight text-brand-text"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Justin <span className="text-brand-accent">Bieber</span>
          </motion.span>
        </div>
      </div>

      <div className="relative flex justify-between items-end w-full">
        <div className="text-xs md:text-sm uppercase tracking-widest font-medium text-brand-muted animate-pulse">
          Loading Experience...
        </div>
        <div className="font-heading text-6xl md:text-9xl leading-none text-brand-accent">
          {count}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-[2px] bg-white/10 mt-6 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-brand-accent"
          initial={{ width: 0 }}
          animate={{ width: `${count}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

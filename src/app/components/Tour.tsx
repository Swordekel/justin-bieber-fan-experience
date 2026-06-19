import { motion } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import { AnimatedChars } from "./AnimatedText";
import { ArrowUpRight } from "lucide-react";

const dates = [
  { date: "Jul 12, 2026", city: "Los Angeles", country: "USA", status: "Available" },
  { date: "Jul 19, 2026", city: "London", country: "UK", status: "Sold Out" },
  { date: "Aug 02, 2026", city: "Tokyo", country: "Japan", status: "Available" },
  { date: "Aug 15, 2026", city: "Jakarta", country: "Indonesia", status: "Available" },
  { date: "Aug 28, 2026", city: "Toronto", country: "Canada", status: "Available" },
];

export function Tour() {
  return (
    <section id="tour" className="py-32 md:py-48 bg-brand-bg relative z-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <h2 className="font-heading text-6xl md:text-8xl lg:text-[9vw] leading-none uppercase text-brand-text">
            <AnimatedChars text="WORLD TOUR" />
          </h2>
          <p className="text-brand-muted text-sm uppercase tracking-[0.2em] max-w-xs">
            Join the experience. Witness the evolution live on stage.
          </p>
        </div>

        <div className="flex flex-col border-t border-brand-text/20">
          {dates.map((item, i) => (
            <motion.div 
              key={i}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-brand-text/10 hover:border-brand-accent transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Hover background highlight */}
              <div className="absolute inset-0 bg-brand-text/5 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] z-0" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full md:w-auto mb-6 md:mb-0">
                <div className="text-brand-accent text-sm md:text-lg font-medium tracking-widest uppercase w-40">
                  {item.date}
                </div>
                <div className="font-heading text-4xl md:text-5xl text-brand-text uppercase group-hover:pl-4 transition-all duration-300">
                  {item.city}
                  <span className="text-brand-muted ml-4 text-2xl md:text-3xl">{item.country}</span>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
                {item.status === "Sold Out" ? (
                  <span className="text-brand-text/30 uppercase tracking-widest text-sm font-medium">Sold Out</span>
                ) : (
                  <MagneticButton variant="outline" className="group-hover:bg-brand-text group-hover:text-brand-bg group-hover:border-transparent py-3 px-6">
                    Get Tickets
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </MagneticButton>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function GarmentMarquee() {
  const items = [
    "Designer Silk Sarees",
    "Tailored Tuxedos & Suits",
    "Heavy Bridal Lehengas",
    "Premium Organic Linen",
    "Suede & Leather Jackets",
    "Curtains & Sofa Covers",
    "Woolen Coats",
    "Plush Woolen Carpets",
    "Delicate Handwork Wear",
    "Sneakers & Shoe Therapy"
  ];

  // Double items for a continuous seamless loop
  const loopItems = [...items, ...items, ...items];

  return (
    <div className="bg-srm-navy py-6 md:py-8 overflow-hidden border-y border-white/5 relative">
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-srm-navy to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-srm-navy to-transparent z-10" />

      <motion.div 
        className="flex whitespace-nowrap gap-8 md:gap-16 items-center"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35
        }}
      >
        {loopItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-white">
            <span className="text-blue-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </span>
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.25em]">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

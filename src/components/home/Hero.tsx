import React from 'react';
import { motion } from 'motion/react';
import { MapPin, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { TiltCard } from '../ui/TiltCard';

interface HeroProps {
  setView: (view: any) => void;
}

export function Hero({ setView }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 -z-10 translate-x-1/2" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-rose-50/50 rounded-full blur-3xl -z-10 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-10 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-xs font-bold uppercase tracking-widest text-srm-blue"
          >
            <span className="w-2 h-2 rounded-full bg-srm-blue animate-pulse" />
            Voted #1 Cleaners in Noida
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-8xl lg:text-[110px] font-black leading-[0.9] tracking-tighter"
          >
            LAUNDRY <br /> 
            <span className="text-gradient">REIMAGINED</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed font-medium"
          >
            Experience the gold standard of garment care. Premium dry cleaning and laundry services with curated pickup experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              onClick={() => setView('book')} 
              size="lg"
              className="h-16 px-10 rounded-2xl text-lg font-bold bg-srm-navy hover:bg-black shadow-2xl shadow-navy-100 group"
            >
              Book a Pickup 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-16 px-10 rounded-2xl text-lg font-bold border-2"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Our Pricing
            </Button>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="flex items-center gap-8 pt-6"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-srm-blue text-white flex items-center justify-center text-[10px] font-bold">
                +2k
              </div>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Happy <span className="text-gray-900">Noidians</span>
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative perspective-1000">
          <TiltCard className="relative z-10 cursor-pointer">
            <div className="absolute -inset-4 bg-gradient-to-tr from-srm-blue/20 to-rose-500/20 blur-3xl opacity-50 -z-10" />
            <img 
              src="/images/srm_dry_cleaners_hero_1779214140847.png" 
              alt="Premium Laundry" 
              className="rounded-[40px] shadow-2xl w-full aspect-[4/5] object-cover ring-8 ring-white/50 backdrop-blur-sm"
            />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-8 top-1/4 bg-white p-5 rounded-3xl shadow-2xl border border-gray-100 hidden md:block"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle size={20} />
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Processing Status</p>
                   <p className="text-sm font-extrabold text-black">100% Eco-Friendly</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
               animate={{ x: [0, 10, 0] }}
               transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
               className="absolute -left-12 bottom-1/4 bg-srm-blue p-2 rounded-full shadow-2xl z-20 text-white"
               style={{ transform: "translateZ(30px)" }}
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Play fill="white" size={24} className="ml-1" />
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

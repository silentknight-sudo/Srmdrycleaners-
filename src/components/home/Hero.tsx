import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ArrowRight, Play, ChevronLeft, ChevronRight, Sparkles, Shield, Compass } from 'lucide-react';
import { Button } from '../ui/button';
import { TiltCard } from '../ui/TiltCard';
import srmHero from '../../assets/images/srm_dry_cleaners_hero_1779214140847.png';
import swiftDelivery from '../../assets/images/swift_laundry_delivery_1779214555154.png';
import ecoFabricCare from '../../assets/images/eco_fabric_care.png';

interface HeroProps {
  setView: (view: any) => void;
  onOpenVideoModal: () => void;
}

export function Hero({ setView, onOpenVideoModal }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: "Voted #1 Cleaners in Noida",
      badgeIcon: <Sparkles className="w-3.5 h-3.5" />,
      title: "LAUNDRY",
      titleAccent: "REIMAGINED",
      desc: "Experience the gold standard of garment care in Noida. Premium dry cleaning and laundry services with curated white-glove doorstep delivery.",
      image: srmHero,
      ctaText: "Book a Pickup",
      secondaryCta: "Our Pricing",
      accentColor: "from-srm-blue/20 to-rose-500/20",
      pillBg: "bg-blue-50/90 text-srm-blue border-blue-100/60",
      statusText: "100% Eco-Friendly"
    },
    {
      badge: "On-Time Doorstep Delivery",
      badgeIcon: <Shield className="w-3.5 h-3.5" />,
      title: "SWIFT",
      titleAccent: "CONVENIENCE",
      desc: "Curated white-glove pickup logistics engineered for your hectic schedule. Set your preferences and track from washing drums to closet.",
      image: swiftDelivery,
      ctaText: "Schedule Pickup",
      secondaryCta: "How It Works",
      accentColor: "from-rose-500/20 to-amber-500/20",
      pillBg: "bg-rose-50/90 text-rose-700 border-rose-100/60",
      statusText: "Safe Care Guaranteed"
    },
    {
      badge: "Advanced German Processing Tech",
      badgeIcon: <Compass className="w-3.5 h-3.5" />,
      title: "NATURAL",
      titleAccent: "ECO-SAVIOR",
      desc: "Protecting your fabrics and Noida's environment. Biodegradable non-toxic solvents, delicate steam processing, and expert packaging.",
      image: ecoFabricCare,
      ctaText: "Go Green Online",
      secondaryCta: "Eco Policy",
      accentColor: "from-emerald-500/20 to-teal-500/20",
      pillBg: "bg-emerald-50/90 text-emerald-700 border-emerald-100/60",
      statusText: "Organic Solutions Only"
    }
  ];

  // Auto-slide loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-slate-50/30">
      {/* Visual background enhancements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/40 to-transparent -skew-x-12 -z-10 translate-x-1/2" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-rose-50/40 rounded-full blur-3xl -z-10 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <AnimatePresence mode="wait">
          <div key={currentSlide} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Slide Content Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 relative">
              <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm text-[11px] md:text-xs font-black uppercase tracking-widest ${slides[currentSlide].pillBg}`}
              >
                {slides[currentSlide].badgeIcon}
                <span>{slides[currentSlide].badge}</span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-black leading-[0.95] tracking-tighter text-slate-900"
                >
                  {slides[currentSlide].title} <br />
                  <span className="text-gradient font-black">{slides[currentSlide].titleAccent}</span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg text-gray-500 max-w-xl leading-relaxed font-semibold"
                >
                  {slides[currentSlide].desc}
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-3 md:gap-4"
              >
                <Button 
                  onClick={() => setView('book')} 
                  size="lg"
                  className="h-14 md:h-16 px-6 md:px-10 rounded-2xl text-base md:text-lg font-bold bg-srm-navy hover:bg-black text-white shadow-xl shadow-navy-100 group transition-all"
                >
                  {slides[currentSlide].ctaText}
                  <ArrowRight className="ml-2 group-hover:translate-x-1.5 transition-transform w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="h-14 md:h-16 px-6 md:px-10 rounded-2xl text-base md:text-lg font-bold border-2 text-slate-800 border-slate-200"
                  onClick={() => {
                    if (slides[currentSlide].secondaryCta === "Our Pricing") {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {slides[currentSlide].secondaryCta}
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4 sm:gap-6 pt-2"
              >
                <div className="flex -space-x-2.5">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i + 12}`} alt="" className="object-cover w-full h-full" />
                    </div>
                  ))}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-srm-blue text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                    +3.5k
                  </div>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    Active <span className="text-slate-900 font-bold">Noida Residents</span>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Slider Image Column */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 perspective-1000 max-w-sm sm:max-w-md lg:max-w-none mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <TiltCard className="relative z-10 cursor-pointer overflow-hidden rounded-[30px] sm:rounded-[40px] shadow-2xl">
                  {/* Glowing background blur behind card */}
                  <div className={`absolute -inset-4 bg-gradient-to-tr ${slides[currentSlide].accentColor} blur-3xl opacity-50 -z-10`} />
                  
                  <img 
                    src={slides[currentSlide].image} 
                    alt="Premium Laundry" 
                    className="w-full aspect-[4/5] object-cover ring-4 sm:ring-8 ring-white/50 backdrop-blur-sm transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Floating Notification Panel */}
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute right-4 top-1/4 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 block z-20"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle size={16} />
                      </div>
                      <div className="text-left">
                         <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-tighter">Status Panel</p>
                         <p className="text-xs font-black text-slate-900">{slides[currentSlide].statusText}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Play Video Trigger Indicator */}
                  <motion.div 
                     animate={{ scale: [1, 1.05, 1] }}
                     transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                     onClick={(e) => {
                       e.stopPropagation();
                       onOpenVideoModal();
                     }}
                     className="absolute left-6 bottom-6 bg-srm-blue p-1 rounded-full shadow-2xl z-20 text-white cursor-pointer hover:bg-blue-600 transition-all hover:scale-110 active:scale-90"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <Play fill="white" size={18} className="ml-0.5 text-white" />
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            </div>

          </div>
        </AnimatePresence>

        {/* Carousel Slider Controls Overlay */}
        <div className="flex items-center justify-between mt-10 md:mt-14 max-w-md mx-auto sm:mx-0">
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 transition-all duration-300 rounded-full ${index === currentSlide ? "bg-srm-blue w-8" : "bg-slate-200 hover:bg-slate-300 w-2.5"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-srm-blue hover:text-white transition-all shadow-sm"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-srm-blue hover:text-white transition-all shadow-sm"
              aria-label="Next Slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}


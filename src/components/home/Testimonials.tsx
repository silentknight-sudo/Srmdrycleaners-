import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      name: "Priyanka Sharma",
      location: "Sector 78, Noida",
      rating: 5,
      date: "2 days ago",
      text: "The absolute best dry cleaners in Noida! They restored my heavy bridal lehenga to absolute perfection. The packing covers are reusable too, which is deeply thoughtful.",
      service: "Bridal Wear Dry Cleaning"
    },
    {
      name: "Rohan Khanna",
      location: "Guar City, Noida Extension",
      rating: 5,
      date: "1 week ago",
      text: "Extremely reliable for premium business suits. Their German steam ironing is unmatched — sharp creases without any shine or fabric stress. On-time delivery at the door.",
      service: "Premium Suit Care"
    },
    {
      name: "Ananya Goel",
      location: "Sector 137, Noida",
      rating: 5,
      date: "3 days ago",
      text: "The organic biodegradable wash works wonders for infants' apparel. No harsh fumes, just beautiful fresh cotton. Best eco-laundry app in the city.",
      service: "Eco-Friendly Wet Wash"
    },
    {
      name: "Vikram Malhotra",
      location: "Jaypee Wish Town, Sector 128",
      rating: 5,
      date: "2 weeks ago",
      text: "The express delivery is a lifesaver. Had 5 shirts picked up, dry cleaned, steam pressed, and delivered back with premium hangers within 24 hours. Phenomenal service!",
      service: "Express 24H Service"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50/50 to-white px-4 sm:px-6 relative">
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-50/30 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-srm-blue font-bold uppercase tracking-widest text-xs md:text-sm">Verified Social Proof</p>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
            Loved By Noida Residents
          </h2>
          <p className="text-slate-500 font-medium text-sm sm:text-base">
            Read real feedback from our premium subscription members and weekly household clients.
          </p>
        </div>

        {/* Dynamic Review Swiper for Mobile and Featured Section */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-white border border-slate-100 p-6 sm:p-12 rounded-[32px] sm:rounded-[40px] shadow-[0_8px_40px_rgba(0,0,0,0.02)]">
          
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="flex items-center gap-1.5 text-amber-500">
              {[1, 2, 3, 4, 5].map(star => (
                 <Star key={star} size={20} fill="currentColor" />
              ))}
            </div>
            <div className="space-y-2">
               <p className="text-3xl font-black text-slate-900 tracking-tight">4.9 / 5.0</p>
               <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Google Business Rating</p>
            </div>
            <p className="text-slate-500 font-semibold text-sm leading-relaxed">
              Based on over 2,400+ independent physical store reviews and online feedback.
            </p>
            <div className="flex gap-2">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-srm-blue hover:text-white flex items-center justify-center text-slate-700 transition-all border border-slate-100 shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-srm-blue hover:text-white flex items-center justify-center text-slate-700 transition-all border border-slate-100 shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Carousel Review Cards Block */}
          <div className="lg:col-span-8 relative min-h-[250px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full space-y-6 relative"
              >
                <div className="absolute top-0 right-0 text-slate-100">
                  <Quote size={80} className="opacity-40" />
                </div>

                <p className="text-base sm:text-xl font-bold text-slate-800 leading-relaxed italic pr-4">
                  "{reviews[activeIndex].text}"
                </p>

                <div className="h-px bg-slate-100 w-full" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-black text-slate-900">{reviews[activeIndex].name}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{reviews[activeIndex].location}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-srm-blue text-xs font-black uppercase tracking-wider border border-blue-100/30">
                    <ShieldCheck size={14} />
                    <span>{reviews[activeIndex].service}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

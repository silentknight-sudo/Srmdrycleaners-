import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, ShieldCheck, Sparkles, X } from 'lucide-react';

export function FloatingContact() {
  const phoneNumber = "+919990844437";
  const whatsappText = "Hi SRM Dry Cleaners, I want to book a laundry/dry cleaning services pickup in Noida!";
  const whatsappUrl = `https://wa.me/919990844437?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none md:bottom-8 md:right-8">
      
      {/* WhatsApp Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(16,185,129,0.3)] border border-emerald-400/20 transition-all cursor-pointer relative group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Connect on WhatsApp"
        id="floating-whatsapp"
      >
        {/* Glow indicator */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-25 -z-10 group-hover:opacity-40" />
        
        {/* Tooltip Label */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-black px-3 py-1.5 rounded-xl border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl uppercase tracking-widest hidden sm:block pointer-events-none">
          WhatsApp Support
        </span>
        
        <MessageSquare className="w-6 h-6 fill-white text-emerald-500" />
      </motion.a>

      {/* Direct Phone Call Floating Action Button */}
      <motion.a
        href={`tel:${phoneNumber}`}
        className="pointer-events-auto flex items-center justify-center bg-srm-blue hover:bg-blue-600 active:scale-95 text-white w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(29,78,216,0.3)] border border-blue-400/20 transition-all cursor-pointer relative group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Call Direct"
        id="floating-phone"
      >
        {/* Pulsing indicator */}
        <span className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-30 -z-10" />
        
        {/* Tooltip Label */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-black px-3 py-1.5 rounded-xl border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl uppercase tracking-widest hidden sm:block pointer-events-none">
          Click To Call
        </span>
        
        <Phone className="w-5 h-5 fill-current text-white" />
      </motion.a>

      {/* Floating Service Guarantee Badge (Mobile Only) */}
      <motion.div 
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 1.2 }}
         className="pointer-events-auto bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 shadow-xl sm:hidden"
         id="mobile-order-badge"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-black tracking-widest uppercase text-slate-300">Live Services Active</span>
      </motion.div>

    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, ShieldCheck, MapPin, X } from 'lucide-react';

export function FloatingContact() {
  const [activeMenu, setActiveMenu] = useState<'none' | 'call' | 'whatsapp'>('none');

  const store1Phone = "+919891318340";
  const store2Phone = "+919560208341";

  const store1WhatsApp = "https://wa.me/919891318340?text=Hi%20SRM%20Sec%2078%20cleaners%2C%20I'd%20like%20to%20inquire%20about%20dry%20cleaning%20services.";
  const store2WhatsApp = "https://wa.me/919560208341?text=Hi%20SRM%20Paramount%20cleaners%2C%20I'd%20like%20to%20inquire%20about%20dry%20cleaning%20services.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none md:bottom-8 md:right-8">
      
      {/* Dynamic Popover Menu */}
      <AnimatePresence>
        {activeMenu !== 'none' && (
          <>
            {/* Click off backdrop underlay */}
            <div 
              className="fixed inset-0 bg-transparent pointer-events-auto z-40"
              onClick={() => setActiveMenu('none')}
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 15 }}
              className="pointer-events-auto bg-slate-950 text-white rounded-[24px] border border-slate-800 p-5 shadow-2xl w-64 z-50 mb-2 space-y-3"
            >
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {activeMenu === 'call' ? 'Select Store to Call' : 'Chat on WhatsApp'}
                </span>
                <button 
                  onClick={() => setActiveMenu('none')} 
                  className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <X size={10} />
                </button>
              </div>

              <div className="space-y-2">
                {/* Store 1 Button */}
                <a
                  href={activeMenu === 'call' ? `tel:${store1Phone}` : store1WhatsApp}
                  target={activeMenu === 'whatsapp' ? "_blank" : undefined}
                  rel={activeMenu === 'whatsapp' ? "noopener noreferrer" : undefined}
                  onClick={() => setActiveMenu('none')}
                  className="block p-3 rounded-xl bg-white/5 hover:bg-srm-blue hover:text-white transition-all text-left border border-white/5 text-xs font-bold shrink-0"
                >
                  <p className="font-black text-[10px] uppercase tracking-wider text-blue-400">Noida Sec-78 (HQ)</p>
                  <p className="text-white font-bold text-xs mt-0.5">Mahagun Mart Lower Ground</p>
                </a>

                {/* Store 2 Button */}
                <a
                  href={activeMenu === 'call' ? `tel:${store2Phone}` : store2WhatsApp}
                  target={activeMenu === 'whatsapp' ? "_blank" : undefined}
                  rel={activeMenu === 'whatsapp' ? "noopener noreferrer" : undefined}
                  onClick={() => setActiveMenu('none')}
                  className="block p-3 rounded-xl bg-white/5 hover:bg-srm-red hover:text-white transition-all text-left border border-white/5 text-xs font-bold shrink-0"
                >
                  <p className="font-black text-[10px] uppercase tracking-wider text-rose-400">Greater Noida Sector-1</p>
                  <p className="text-white font-bold text-xs mt-0.5">Paramount City Square FF8A</p>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* WhatsApp Trigger Button */}
      <motion.button
        onClick={() => setActiveMenu(activeMenu === 'whatsapp' ? 'none' : 'whatsapp')}
        className="pointer-events-auto flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(16,185,129,0.3)] border border-emerald-400/20 transition-all cursor-pointer relative group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Connect on WhatsApp"
        id="floating-whatsapp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-25 -z-10 group-hover:opacity-40" />
        
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-black px-3 py-1.5 rounded-xl border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl uppercase tracking-widest hidden sm:block pointer-events-none">
          WhatsApp Support
        </span>
        
        <MessageSquare className="w-6 h-6 fill-white text-emerald-500" />
      </motion.button>

      {/* Direct Phone Call Trigger Button */}
      <motion.button
        onClick={() => setActiveMenu(activeMenu === 'call' ? 'none' : 'call')}
        className="pointer-events-auto flex items-center justify-center bg-srm-blue hover:bg-blue-600 active:scale-95 text-white w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(29,78,216,0.3)] border border-blue-400/20 transition-all cursor-pointer relative group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Call Direct"
        id="floating-phone"
      >
        <span className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-30 -z-10" />
        
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-black px-3 py-1.5 rounded-xl border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl uppercase tracking-widest hidden sm:block pointer-events-none">
          Click To Call
        </span>
        
        <Phone className="w-5 h-5 fill-current text-white" />
      </motion.button>

      {/* Floating Service Guarantee Badge (Mobile Only) */}
      <motion.div 
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 1.2 }}
         className="pointer-events-auto bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 shadow-xl sm:hidden"
         id="mobile-order-badge"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-black tracking-widest uppercase text-slate-300">Live Dual Outlets Active</span>
      </motion.div>

    </div>
  );
}

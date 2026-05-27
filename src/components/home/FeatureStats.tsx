import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FeatureStats() {
  return (
    <section id="outlets" className="px-6 max-w-7xl mx-auto py-24 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-block px-4 py-1 bg-blue-50 text-srm-blue text-xs font-black uppercase tracking-widest rounded-full border border-blue-100">
          Our Outlets
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
          Two Premium physical outlets
        </h2>
        <p className="text-sm font-semibold text-gray-500 leading-relaxed">
          Visit our modern garment care boutiques or call us for premier doorstep delivery. Select either outlet to connect directly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* OUTLET 1: NOIDA SECTOR 78 */}
        <motion.div 
          whileHover={{ y: -8 }}
          className="p-8 md:p-10 rounded-[40px] bg-white border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)] space-y-6 group transition-all hover:shadow-[0_20px_50px_rgba(29,78,216,0.06)] relative overflow-hidden"
        >
          {/* Top Brand Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-srm-blue" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-srm-blue border border-blue-100/50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin size={28} />
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Workshop & Processing HQ</p>
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-2xl font-black tracking-tight text-gray-900">Noida Sector 78 Outlet (HQ)</h3>
             
             <div className="space-y-3 pt-2 text-sm text-gray-600 font-medium leading-relaxed">
                <div className="flex items-start gap-2.5">
                   <Clock className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                   <span>Mon - Sun | 9:00 AM - 8:00 PM (Alternate Thursday Off)</span>
                </div>
                <div className="flex items-start gap-2.5">
                   <MapPin className="w-4 h-4 text-srm-blue mt-1 shrink-0" />
                   <span className="font-bold text-gray-800">Shop No. E, Lower Ground Floor, Mahagun Mart, Sec-78 Noida</span>
                </div>
             </div>

             <div className="h-px bg-gray-100 w-full" />
             
             <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Direct Contacts</p>
                <div className="grid sm:grid-cols-2 gap-3">
                   <a 
                     href="tel:+919891318340"
                     className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-blue-50 hover:text-srm-blue border border-gray-100 rounded-2xl text-xs font-bold transition-all text-gray-700 group/btn"
                   >
                     <span className="flex items-center gap-1.5"><Phone size={14} /> 9891318340</span>
                     <span className="text-[10px] text-gray-400 group-hover/btn:text-srm-blue">Call</span>
                   </a>
                   <a 
                     href="tel:+919717153137"
                     className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-blue-50 hover:text-srm-blue border border-gray-100 rounded-2xl text-xs font-bold transition-all text-gray-700 group/btn"
                   >
                     <span className="flex items-center gap-1.5"><Phone size={14} /> 9717153137</span>
                     <span className="text-[10px] text-gray-400 group-hover/btn:text-srm-blue">Call</span>
                   </a>
                </div>
                
                <a 
                  href="https://wa.me/919891318340?text=Hi%20SRM%20Cleaners%20Sector%2078,%20I'd%20like%20to%20book%20a%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-emerald-100 transition-all cursor-pointer"
                >
                  <MessageSquare size={16} className="fill-current text-white" />
                  WhatsApp Sec-78 Support
                </a>
             </div>
          </div>
        </motion.div>

        {/* OUTLET 2: NOIDA EXTENSION */}
        <motion.div 
          whileHover={{ y: -8 }}
          className="p-8 md:p-10 rounded-[40px] bg-white border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)] space-y-6 group transition-all hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)] relative overflow-hidden"
        >
          {/* Top Brand Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-srm-red" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-srm-red border border-rose-100/50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin size={28} />
            </div>
            <div className="flex items-center gap-2 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest text-rose-700">Premium Collection Boutique</p>
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-2xl font-black tracking-tight text-gray-900">Greater Noida Sector-1 (Paramount)</h3>
             
             <div className="space-y-3 pt-2 text-sm text-gray-600 font-medium leading-relaxed">
                <div className="flex items-start gap-2.5">
                   <Clock className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                   <span>Mon - Sun | 9:00 AM - 8:00 PM (Alternate Thursday Off)</span>
                </div>
                <div className="flex items-start gap-2.5">
                   <MapPin className="w-4 h-4 text-srm-red mt-1 shrink-0" />
                   <span className="font-bold text-gray-800">Shop No FF8A, Paramount City Square Paramount Emotions, Sector-1, Bisrakh Jalalpur, (U.P.) 201318</span>
                </div>
             </div>

             <div className="h-px bg-gray-100 w-full" />
             
             <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Direct Contacts</p>
                <div className="grid sm:grid-cols-2 gap-3">
                   <a 
                     href="tel:+919560208341"
                     className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-rose-50 hover:text-srm-red border border-gray-100 rounded-2xl text-xs font-bold transition-all text-gray-700 group/btn"
                   >
                     <span className="flex items-center gap-1.5"><Phone size={14} /> 9560208341</span>
                     <span className="text-[10px] text-gray-400 group-hover/btn:text-srm-red">Call</span>
                   </a>
                   <a 
                     href="tel:+919560408342"
                     className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-rose-50 hover:text-srm-red border border-gray-100 rounded-2xl text-xs font-bold transition-all text-gray-700 group/btn"
                   >
                     <span className="flex items-center gap-1.5"><Phone size={14} /> 9560408342</span>
                     <span className="text-[10px] text-gray-400 group-hover/btn:text-srm-red">Call</span>
                   </a>
                </div>
                
                <a 
                  href="https://wa.me/919560208341?text=Hi%20SRM%20Cleaners%20Paramount,%20I'd%20like%20to%20book%20a%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-emerald-100 transition-all cursor-pointer"
                >
                  <MessageSquare size={16} className="fill-current text-white" />
                  WhatsApp Paramount Support
                </a>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


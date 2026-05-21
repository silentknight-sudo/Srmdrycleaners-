import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FeatureStats() {
  return (
    <section className="px-6 max-w-7xl mx-auto py-24">
      <div className="grid md:grid-cols-3 gap-8">
        <LocationCard 
          title="GREATER NOIDA HQ" 
          desc="Mahagun Mart Sector 78, Mywoods Guar City" 
          status="Operating at 80% Capacity"
          color="blue"
        />
        <LocationCard 
          title="NOIDA EXTENSION" 
          desc="Paramount City Square Sector 1" 
          status="Express Service Active"
          color="rose"
        />
        <LocationCard 
          title="NOIDA CENTRAL" 
          desc="Delta 1, Greater Noida - 201315" 
          status="Open till 9:00 PM"
          color="navy"
        />
      </div>
    </section>
  );
}

function LocationCard({ title, desc, status, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-srm-blue border-blue-100',
    rose: 'bg-rose-50 text-srm-red border-rose-100',
    navy: 'bg-slate-100 text-slate-800 border-slate-200'
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-10 rounded-[40px] bg-white border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.03)] space-y-6 group transition-all hover:shadow-xl"
    >
      <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform", colors[color])}>
        <MapPin size={32} />
      </div>
      <div className="space-y-4">
         <h3 className="text-2xl font-black tracking-tight">{title}</h3>
         <p className="text-gray-500 font-medium leading-relaxed text-sm">{desc}</p>
         <div className="h-px bg-gray-50 w-full" />
         <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full animate-pulse", color === 'blue' ? 'bg-blue-500' : color === 'rose' ? 'bg-rose-500' : 'bg-slate-500')} />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{status}</p>
         </div>
      </div>
    </motion.div>
  );
}

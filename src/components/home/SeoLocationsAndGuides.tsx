import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Sparkles, 
  Shirt, 
  Award, 
  ArrowRight, 
  Shield, 
  Info, 
  Leaf, 
  Timer,
  CheckCircle2,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Button } from '../ui/button';

interface SectorInfo {
  name: string;
  short: string;
  tagline: string;
  description: string;
  societies: string[];
  schedule: string;
  deliveryTime: string;
}

const NOIDA_SECTORS: SectorInfo[] = [
  {
    name: "Noida Sector 50 & 51",
    short: "Sector 50",
    tagline: "Ultra-Premium Doorstep Drycleaning",
    description: "Serving the heartbeat of residential Noida with premium laundry services near me. Our riders visit Sector 50, 51, and neighbouring enclaves daily to pick up delicate silk sarees, heavy bridal wear, and corporate suits.",
    societies: ["Alok Vihar", "Windsor Court", "Sagar Apartments", "Omaxe Twin Towers"],
    schedule: "Daily (8:00 AM - 9:00 PM)",
    deliveryTime: "48-Hour Standard / 24-Hour Express"
  },
  {
    name: "Noida Sector 15 & 16",
    short: "Sector 15",
    tagline: "Corporate Suit & Shirt Steam Pressing Hub",
    description: "The primary business and residency gateway of Noida. We deliver extreme-precision professional dry cleaning and pristine laundry services to busy professionals in Sector 15, Sector 16, and the Metro corridor.",
    societies: ["Sector 15A Enclave", "Noida Authority Flats", "Gulmohar Apartments"],
    schedule: "Daily (8:00 AM - 9:00 PM)",
    deliveryTime: "48-Hour Standard"
  },
  {
    name: "Noida Sector 62 & 63",
    short: "Sector 62",
    tagline: "High-Volume Tech Campus Laundry Solutions",
    description: "Catering to tech parks and premium complexes. Looking for a smart dry cleaning service near me? SRM Drycleaners provides continuous pickup rosters for IT employees and premium high-rise residents.",
    societies: ["Design Arch Towers", "Shakti Apartments", "Millennium Apartments"],
    schedule: "Monday, Wednesday, Friday, Sunday",
    deliveryTime: "48-Hour Standard / 24-Hour Express"
  },
  {
    name: "Noida Sector 137, 143 & Expressway",
    short: "Sector 137",
    tagline: "Express Doorstep Pickup & Large Household Care",
    description: "Ensuring modern families living along the Noida-Greater Noida Expressway never have to worry about weekend laundry heaps. Superb dry cleaning for curtains, heavy winter wear, and carpets near you.",
    societies: ["Supertech Eco City", "Exotica Fresco", "Paramount Floraville", "Logix Blossom County"],
    schedule: "Daily (7:00 AM - 10:00 PM)",
    deliveryTime: "48-Hour Standard / Express Available"
  },
  {
    name: "Noida Extension (Greater Noida West)",
    short: "Noida Ext",
    tagline: "Affordable Luxury Laundry & Shoe Dry Cleaning",
    description: "The fastest growing residential hub. We bridge the gap by providing expert-tier SRM laundry services near me to high-density modern societies. Excellent rates for bedding, leather footwear cleaning, and dynamic drycleaning.",
    societies: ["Cherry County", "Gaur City 1 & 2", "Ace City", "Arihant Arden"],
    schedule: "Tuesday, Thursday, Saturday, Sunday",
    deliveryTime: "72-Hour Economy / 48-Hour Standard"
  }
];

export function SeoLocationsAndGuides({ setView }: { setView: (view: any) => void }) {
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const [activeGuideTab, setActiveGuideTab] = useState<'chemicals' | 'saree' | 'curtains' | 'footwear'>('chemicals');

  const selectedSector = NOIDA_SECTORS[activeSectorIndex];

  return (
    <section className="py-24 bg-[#FAFBFD] border-t border-b border-slate-100/80 px-4 sm:px-6 relative overflow-hidden" id="seo-resources">
      {/* Visual Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-50/70 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-rose-50/50 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Headline */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-srm-blue text-[10px] font-black uppercase tracking-widest rounded-full">
            <MapPin size={12} /> Local Noida Chapters
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
            PROUDLY SERVING ALL OF NOIDA & EXPRESSWAY
          </h2>
          <p className="text-slate-500 font-semibold text-sm sm:text-base leading-relaxed">
            As the top-rated <strong className="text-slate-900 font-bold">drycleaning service near me</strong>, SRM Drycleaners owns specialized logistical routes spanning major residential sectors. Find your area below.
          </p>
        </div>

        {/* 1. INTERACTIVE LOCAL REGIONAL TRACKS */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Sectors Navigation Rail */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
            {NOIDA_SECTORS.map((sector, index) => {
              const isActive = activeSectorIndex === index;
              return (
                <button
                  key={sector.short}
                  onClick={() => setActiveSectorIndex(index)}
                  className={`flex-shrink-0 text-left px-5 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between w-full min-w-[200px] ${
                    isActive 
                      ? "bg-white border-blue-100 shadow-[0_10px_30px_rgba(59,130,246,0.06)] ring-1 ring-blue-50/50 text-srm-blue" 
                      : "bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className={isActive ? "text-srm-blue animate-bounce" : "text-slate-400"} />
                    <span className="font-extrabold text-[13px] md:text-sm uppercase tracking-wide">{sector.short}</span>
                  </div>
                  <ChevronRight size={14} className={`hidden lg:block transition-transform duration-300 ${isActive ? "translate-x-1 text-srm-blue" : "text-slate-300"}`} />
                </button>
              );
            })}
          </div>

          {/* Sector Highlight Dynamic Detail Card */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSectorIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-100/80 rounded-[32px] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.015)] space-y-6 text-left relative overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 bg-slate-50/50 w-48 h-48 rounded-full pointer-events-none" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-500 text-[10px] font-black uppercase tracking-widest font-mono">
                    <Award size={12} /> {selectedSector.tagline}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Premium Fabric Care Coverage in {selectedSector.name}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-semibold">
                  {selectedSector.description}
                </p>

                {/* Logistics Specifications */}
                <div className="grid sm:grid-cols-2 gap-4 pb-2">
                  <div className="p-4 rounded-2xl bg-[#FAFBFD] border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Rider Pickup Roster</p>
                    <p className="text-xs sm:text-sm font-black text-slate-800 mt-1 flex items-center gap-1.5 uppercase font-mono">
                      <Timer size={14} className="text-blue-500" /> {selectedSector.schedule}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAFBFD] border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Standard Return Cycle</p>
                    <p className="text-xs sm:text-sm font-black text-slate-800 mt-1 flex items-center gap-1.5 uppercase font-mono">
                      <Shield size={14} className="text-emerald-500" /> {selectedSector.deliveryTime}
                    </p>
                  </div>
                </div>

                {/* Society Whitelist Tags for rich geographic terms */}
                <div className="space-y-3">
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Societies with Regular Doorstep Logistics</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSector.societies.map((society, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 bg-slate-100/80 rounded-xl text-[10px] sm:text-xs font-bold text-slate-600 border border-slate-200/50"
                      >
                        {society} 🏠
                      </span>
                    ))}
                    <span className="px-3 py-1.5 bg-blue-50/50 rounded-xl text-[10px] sm:text-xs font-bold text-srm-blue border border-blue-100/40">
                      + All sector sectors/villas
                    </span>
                  </div>
                </div>

                {/* Book Action call to action */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="text-xs font-semibold text-slate-400">
                    Need organic dry cleaning instantly? Get free home pickup on orders above ₹499.
                  </p>
                  <Button
                    onClick={() => {
                      setView('book');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-srm-navy hover:bg-black text-white hover:scale-102 transition-all font-black uppercase text-xs tracking-wider rounded-xl py-3 px-6 h-auto shrink-0"
                  >
                    Schedule Pickup now <ArrowRight className="ml-1.5 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 2. TEXT THREAD OF HIGHLY COMPREHENSIVE EXPERT CARE TOPICS */}
        <div className="bg-white border border-slate-100 rounded-[40px] p-8 sm:p-12 shadow-[0_16px_50px_rgba(0,0,0,0.01)] space-y-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-8">
            <div className="space-y-2 text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 uppercase tracking-widest">
                <BookOpen size={14} className="animate-spin-slow" /> SRM CARE ACADEMY
              </span>
              <h3 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight uppercase">
                EDUCATIONAL FABRIC CARE TOPICS & INSIGHTS
              </h3>
            </div>

            {/* Topic Switch Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'chemicals', label: 'Eco-Solvents vs Chemicals' },
                { id: 'saree', label: 'Heavy Bridal Sarees' },
                { id: 'curtains', label: 'Curtain Restoration' },
                { id: 'footwear', label: 'Footwear & Sneaker Rejuvenation' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveGuideTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeGuideTab === tab.id
                      ? "bg-srm-blue text-white border-blue-500 shadow-md shadow-blue-100"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content of Guide */}
          <div className="text-left font-sans max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGuideTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid md:grid-cols-12 gap-8 items-center"
              >
                
                {/* Left Text */}
                <div className="md:col-span-8 space-y-5">
                  {activeGuideTab === 'chemicals' && (
                    <>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                        <Leaf className="text-emerald-500" /> German Organic Silicone vs Perchloroethylene (PERC) Gas
                      </h4>
                      <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed">
                        Traditional laundry chains utilize a petroleum-grade harsh chemical solvent called <strong>Perchloroethylene (PERC)</strong>. It is cheap but toxic to delicate skins, causes color-bleed in expensive fabrics, and poses strong ecological risks for Noida's groundwater.
                      </p>
                      <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed">
                        At <strong className="text-slate-950 font-bold">SRM Drycleaners</strong>, our state-of-the-art multi-compartment German washers utilise <span className="text-emerald-600 font-bold underline">Organic Liquid Silicone</span>. It has a completely neutral pH balance, is hypoallergenic, biodegrades safely back into quartz/silica, and leaves garments uniquely soft with absolutely zero chemical static or standard drycleaning odor.
                      </p>
                      <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Skin-Safe Formula
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Safe for Pet & Baby Clothes
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Color Preservation Seal
                        </div>
                      </div>
                    </>
                  )}

                  {activeGuideTab === 'saree' && (
                    <>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                        <Shirt className="text-pink-500" /> Micro-Separation Therapy for Heavily-Adorned Designer Sarees
                      </h4>
                      <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed">
                        Heavy sarees (Kanjeevaram, Banarasi Silk, Georgette) embedded with pure Zari work, sequins, or intricate glass beads must never be tossed into normal agitation drums. Agitation fractures the threads and dulls the metallic sheen permanently.
                      </p>
                      <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed">
                        Our premium <strong className="text-slate-950 font-bold">drycleaning service near me</strong> leverages manual solvent bathing. Each saree is individually tagged with a barcode tracking ID, pre-spotted by hand with micro-nozzle enzymes, gently bathed in liquid-silicone solvent, followed by structural finishing using specialized form finishers and low-temperature high-vacuum Italian steam tables to reset the pleats in pristine alignment.
                      </p>
                      <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Zero Mechanical Agitation
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Pleat Alignment Guarantee
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Zari Luster Recovery
                        </div>
                      </div>
                    </>
                  )}

                  {activeGuideTab === 'curtains' && (
                    <>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                        <Sparkles className="text-blue-500" /> De-dusting and Sanitization Protocols for Heavy Windows & Curtains
                      </h4>
                      <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed">
                        Curtains are Noida's first line of defense against high dust levels and environmental pollutants. Heavy drapes accumulate layers of dust mites, pollens, and cooking residues which can worsen respiratory conditions.
                      </p>
                      <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed">
                        We offer specialized curtain and tapestry deep sanitization. We examine the fiber structure (Velvet, Linen, Polyester, Silk), perform high-power air extraction to pull out dry particles, apply antimicrobial stain pre-treatments, execute dry-solvent thermal laundry cycles, and return your drapes beautifully folded and packaged in crease-safe sleeves.
                      </p>
                      <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Dust & Allergen Elimination
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Dimensional Stability (No Shrinkage)
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Static Repellent Finish
                        </div>
                      </div>
                    </>
                  )}

                  {activeGuideTab === 'footwear' && (
                    <>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                        <Award className="text-purple-500" /> Premium Footwear & Sneaker Rejuvenation Mechanics
                      </h4>
                      <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed">
                        Footwear absorbs the maximum load of outdoor soil and atmospheric micro-particles. Normal washing machines ruin the rubber bonding, shrink the leather, and bleed dyes from suede panels.
                      </p>
                      <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed">
                        Our sneaker and shoe laundry division provides comprehensive detailing. Every shoe is hand-steamed, scrubbed inside-out using professional soft-bristle nylon and brass wire brushes, conditioned with natural leather lipids, deodorized, and dried in thermal aeration chambers to preserve structural silhouette.
                      </p>
                      <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Suede & Nubuck Re-nap Detailing
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Inner Lining Deep Sanitization
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Antimicrobial Ozone Treatment
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Right Quick Stats Box */}
                <div className="md:col-span-4 bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-srm-blue flex items-center justify-center">
                    <Info size={20} />
                  </div>
                  <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Why SRM is Noida's Top Choice
                  </h5>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-500">Local Availability</p>
                      <p className="text-sm font-black text-slate-900">100% Doorstep Pickup in Greater Noida & Expressway</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-500">Fabric Safety</p>
                      <p className="text-sm font-black text-slate-900">Customized temperature cycles per fiber density</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-500">Ecology Focus</p>
                      <p className="text-sm font-black text-emerald-600">Pure Silicone Non-hazardous chemistry</p>
                    </div>
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

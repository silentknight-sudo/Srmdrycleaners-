import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const faqs = [
    {
      q: "What services do you offer at SRM Dry Cleaners?",
      a: "We offer professional dry cleaning, premium steam pressing, fabric wet washing, chemical-free sanitization, shoe laundry, designer gown/saree therapy, carpet care, and soft toy dry cleaning. Every garment is processed in specialized computerized machinery using European eco-safe solvents."
    },
    {
      q: "How do I schedule a free doorstep pickup in Noida?",
      a: "Simply click 'Get Started' or 'Book a Pickup' on the website, select your service list, fill in your address coordinate in Noida, and choose your preferred date/time slot. Our delivery executive will arrive with curated reusable carry-bags to safe-keep your items."
    },
    {
      q: "What is your turnaround time for delivery?",
      a: "Our standard premium processing takes 48 to 72 hours to ensure pristine inspection, dry cleaning, and delicate steam pressing. For emergency situations, we provide an Express 24-Hour delivery service."
    },
    {
      q: "Are the detergents and solvents safe for children and skins?",
      a: "Yes! We use 100% biodegradable, hypoallergenic organic solvents imported from Germany. Our process leaves zero chemical residue, making it absolutely safe for toddlers, pets, and people with sensitive skins."
    },
    {
      q: "What happens if my valuable garments are lost or damaged?",
      a: "At SRM Dry Cleaners, your trust is paramount. Although damages are extremely rare due to our meticulous dual-inspection technology, we have an upfront compensated protection policy. We will compensate up to 10x the service charge or repair the item if a rare accident happens."
    },
    {
      q: "Is there a minimum order criteria for home pickup?",
      a: "We provide entirely free home pickups and home deliveries for all orders above ₹499 in Noida and Greater Noida. For orders below this threshold, a small logistics fee of ₹50 is added."
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-white px-4 sm:px-6 relative">
      <div className="absolute top-10 left-10 w-44 h-44 bg-green-50/40 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto space-y-12 relative">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-srm-blue flex items-center justify-center mx-auto mb-4">
             <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
             FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-slate-500 font-medium text-sm sm:text-base max-w-xl mx-auto">
             Have questions about pickup slots, special fabric care, or pricing rates? We have compiled instant answers for you.
          </p>
        </div>

        {/* Live Search Filter */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search questions (e.g. pickup, express)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:ring-4 focus:ring-srm-blue/10 focus:outline-none focus:border-srm-blue font-semibold text-sm transition-all"
          />
        </div>

        {/* Interactive Accordion List */}
        <div className="space-y-4 pt-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-slate-200 bg-white"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-snug">{faq.q}</span>
                    <span className={`text-slate-400 transition-all p-1.5 rounded-lg bg-slate-50 ${isOpen ? "rotate-180 text-srm-blue bg-blue-50" : ""}`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed text-slate-500 font-semibold border-t border-slate-50 bg-slate-50/30">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold">
               No matching questions found. Ask us directly on WhatsApp support!
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

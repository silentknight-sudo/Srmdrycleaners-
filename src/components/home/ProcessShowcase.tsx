import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from '../ui/TiltCard';
import { ShieldCheck, Truck, Sparkles } from 'lucide-react';

export function ProcessShowcase() {
  const steps = [
    {
      title: "Inspection",
      desc: "Every garment is inspected for stains, damage, and fabric type before processing.",
      icon: <ShieldCheck size={32} />,
      img: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=800",
      color: "bg-blue-500"
    },
    {
      title: "Expert Care",
      desc: "Using bio-degradable solvents and gentle steam technology for lasting freshness.",
      icon: <Sparkles size={32} />,
      img: "/src/assets/images/laundry_expert_care_1779214369056.png",
      color: "bg-rose-500"
    },
    {
      title: "Swift Delivery",
      desc: "Packaged in premium reusable covers and delivered to your doorstep at your convenience.",
      icon: <Truck size={32} />,
      img: "/src/assets/images/swift_laundry_delivery_1779214555154.png",
      color: "bg-slate-900"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <p className="text-srm-blue font-bold uppercase tracking-widest text-sm">Our Signature Workflow</p>
          <h2 className="text-5xl font-black tracking-tight">HOW WE REDEFINE CLEAN</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div key={idx}>
              <TiltCard className="cursor-pointer group">
                <div className="relative h-[500px] rounded-[40px] overflow-hidden shadow-xl border border-white/20">
                  <img 
                    src={step.img} 
                    alt={step.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 flex flex-col justify-end text-white">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="space-y-4"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-2`}>
                        {step.icon}
                      </div>
                      <h3 className="text-3xl font-black">{step.title}</h3>
                      <p className="text-gray-300 font-medium leading-relaxed text-sm">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

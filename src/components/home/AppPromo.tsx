import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, CheckCircle, Smartphone, ArrowRight, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export function AppPromo() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number in Noida");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success(`Download link successfully sent to +91 ${phoneNumber}! Use coupon FIRST25.`);
      setPhoneNumber('');
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-slate-900 text-white rounded-[40px] max-w-7xl mx-auto my-16 shadow-2xl">
      {/* Abstract neon bubbles for premium background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10 p-4 sm:p-12">
        
        {/* Left Side: Copy and Offer Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-black uppercase tracking-widest text-blue-400">
             <Smartphone size={14} className="animate-bounce" />
             <span>SRM SUPER APP LIVE</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase">
              DOWNLOAD APP & GET <br />
              <span className="text-gradient font-black">25% OFF FIRST ORDER</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-semibold max-w-xl">
              Experience extreme comfort. Track washers in real-time, order free pickups instantly, choose laundry subscriptions, and pay with zero hassle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <CheckCircle size={14} />
              </div>
              <span className="text-sm font-bold text-gray-300">Live Delivery Tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <CheckCircle size={14} />
              </div>
              <span className="text-sm font-bold text-gray-300">Instant Contactless Pay</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <CheckCircle size={14} />
              </div>
              <span className="text-sm font-bold text-gray-300">Exclusive Flash Offers</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <CheckCircle size={14} />
              </div>
              <span className="text-sm font-bold text-gray-300">Flexible Subscription Packs</span>
            </div>
          </div>

          {/* Interactive SMS Dispatch Box */}
          <form onSubmit={handleSendLink} className="space-y-3 max-w-md pt-4">
            <label className="block text-xs font-black uppercase text-gray-400 tracking-wider">
               Get Instant Download Link via SMS
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">+91</span>
                <input 
                  type="tel" 
                  maxLength={10}
                  placeholder="Enter Mobile Number" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-14 pr-4 text-sm font-bold placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-white"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-auto py-3.5 px-6 rounded-xl text-sm whitespace-nowrap transition-all"
              >
                {isSubmitting ? "Sending..." : "SMS Link"} <ArrowRight size={16} className="ml-1.5" />
              </Button>
            </div>
          </form>
        </div>

        {/* Right Side: Mock Phone Panel and QR code */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-8 justify-center">
          <div className="bg-gradient-to-tr from-white/10 to-white/5 p-6 rounded-[32px] border border-white/10 shadow-2xl flex flex-col items-center text-center space-y-4 max-w-[220px]">
            <div className="bg-white p-3 rounded-2xl shadow-lg border border-white/20">
              {/* Responsive SVG QR code representation */}
              <svg className="w-28 h-28" viewBox="0 0 100 100">
                <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
                <rect x="10" y="10" width="15" height="15" fill="#ffffff" />
                <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
                <rect x="75" y="10" width="15" height="15" fill="#ffffff" />
                <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
                <rect x="10" y="75" width="15" height="15" fill="#ffffff" />
                {/* Random QR code pixels block */}
                <rect x="35" y="5" width="5" height="5" fill="#0f172a" />
                <rect x="45" y="15" width="10" height="5" fill="#0f172a" />
                <rect x="55" y="25" width="5" height="5" fill="#0f172a" />
                <rect x="35" y="35" width="15" height="10" fill="#0f172a" />
                <rect x="55" y="45" width="5" height="5" fill="#0f172a" />
                <rect x="15" y="45" width="5" height="10" fill="#0f172a" />
                <rect x="75" y="35" width="10" height="15" fill="#0f172a" />
                <rect x="35" y="65" width="15" height="5" fill="#0f172a" />
                <rect x="65" y="75" width="5" height="20" fill="#0f172a" />
                <rect x="85" y="85" width="10" height="10" fill="#0f172a" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-widest text-slate-300">Scan QR Code</p>
              <p className="text-[10px] font-semibold text-gray-500">Android / iOS App Direct</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-center text-center sm:text-left">
            <div className="space-y-1">
              <p className="text-3xl font-black text-slate-100">4.9 ★</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">App Store Rating</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-slate-100">10k+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Downloads</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

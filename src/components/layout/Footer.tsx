import React from 'react';
import { Phone, Mail, Instagram, Facebook, Twitter, Globe, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import srmLogo from '../../assets/images/srm_logo_cleaned_1779214849760.png';

interface FooterProps {
  makeAdmin: () => void;
  setView?: (view: 'home' | 'book' | 'tracking' | 'admin') => void;
}

export function Footer({ makeAdmin, setView }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLogoClick = () => {
    if (setView) {
      setView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-srm-navy text-white pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Top Info Bar */}
        <div className="grid md:grid-cols-3 gap-12 border-b border-white/5 pb-24">
           <div className="space-y-6">
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={handleLogoClick}
              >
                 <div className="bg-white px-3 py-2 rounded-xl flex items-center justify-center shadow-lg border border-white/10">
                   <img 
                     src={srmLogo} 
                     alt="SRM Dry Cleaners Logo" 
                     className="h-10 w-auto object-contain transition-all group-hover:scale-105" 
                   />
                 </div>
              </div>
              <p className="text-gray-400 font-medium leading-relaxed max-w-xs">
                 Redefining garment care in Noida with advanced German processing technology and white-glove pickup logistics.
              </p>
              <div className="flex gap-4">
                 <SocialIcon icon={<Instagram size={18} />} />
                 <SocialIcon icon={<Facebook size={18} />} />
                 <SocialIcon icon={<Twitter size={18} />} />
              </div>
           </div>

           <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">CONTACT HUB</h4>
              <div className="space-y-6">
                 <ContactItem icon={<Phone size={18} />} title="Priority Line" desc="+91 99908 44437" />
                 <ContactItem icon={<Mail size={18} />} title="Official Support" desc="care@srmcleaners.in" />
                 <ContactItem icon={<Clock size={18} />} title="Operations" desc="Mon - Sun | 9AM - 8PM" />
              </div>
           </div>

           <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-red-500">QUICK ACCESS</h4>
              <nav className="grid grid-cols-2 gap-4">
                 <FooterLink label="Our History" />
                 <FooterLink label="Workshops" />
                 <FooterLink label="Franchise" />
                 <FooterLink label="Careers" />
                 <FooterLink label="Partner Log" onClick={makeAdmin} />
                 <FooterLink label="Terms" />
                 <FooterLink label="Privacy" />
              </nav>
           </div>
        </div>

        {/* Brand Showcase */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white/5 p-12 rounded-[40px] border border-white/5">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                 <Globe size={32} />
              </div>
              <div>
                 <p className="text-2xl font-black tracking-tight">Eco-Safe Processing</p>
                 <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">100% Biodegradable Solvents Used</p>
              </div>
           </div>
           
           <div className="h-px w-24 bg-white/10 hidden lg:block" />

           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                 <ShieldCheck size={32} />
              </div>
              <div>
                 <p className="text-2xl font-black tracking-tight">Guaranteed Care</p>
                 <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Compensated Accidental Protection</p>
              </div>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              © {currentYear} SRM CLEANERS PVT LTD. ALL RIGHTS RESERVED.
           </p>
           <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">Developers</a>
              <a href="#" className="hover:text-white transition-colors">Licensing</a>
           </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: any }) {
  return (
    <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-srm-blue transition-all">
       {icon}
    </a>
  );
}

function ContactItem({ icon, title, desc }: any) {
  return (
    <div className="flex items-center gap-4">
       <div className="text-gray-600">{icon}</div>
       <div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{title}</p>
          <p className="text-sm font-bold">{desc}</p>
       </div>
    </div>
  );
}

function FooterLink({ label, onClick }: { label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="text-xs font-bold text-gray-500 hover:text-white transition-colors text-left uppercase tracking-widest"
    >
       {label}
    </button>
  );
}

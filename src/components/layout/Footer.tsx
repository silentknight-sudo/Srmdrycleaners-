import React from 'react';
import { Phone, Mail, Instagram, Facebook, Twitter, Globe, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import srmLogo from '../../assets/images/srm_logo_cleaned_1779214849760.png';

interface FooterProps {
  makeAdmin: () => void;
  setView?: (view: 'home' | 'book' | 'tracking' | 'admin') => void;
  onOpenModal: (type: 'history' | 'workshops' | 'franchise' | 'careers' | 'terms' | 'privacy') => void;
}

export function Footer({ makeAdmin, setView, onOpenModal }: FooterProps) {
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
                <img 
                  src={srmLogo} 
                  alt="SRM Dry Cleaners Logo" 
                  className="h-12 w-auto object-contain transition-all group-hover:scale-105" 
                />
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

           <div className="space-y-8 md:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">OUR STORE HUBS</h4>
              <div className="space-y-6">
                 {/* STORE 1 */}
                 <div className="space-y-2 border-l-2 border-srm-blue pl-4">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Noida Sec-78 (HQ)</p>
                    <p className="text-xs text-gray-300 font-bold max-w-xs leading-relaxed">
                       Shop No. E, Lower Ground Floor, Mahagun Mart, Sec-78 Noida
                    </p>
                    <div className="flex flex-col gap-1 text-xs text-gray-400 font-bold mt-1.5">
                       <a href="tel:+919891318340" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                          <Phone size={12} /> +91 98913 18340
                       </a>
                       <a href="tel:+919717153137" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                          <Phone size={12} /> +91 97171 53137
                       </a>
                    </div>
                 </div>

                 {/* STORE 2 */}
                 <div className="space-y-2 border-l-2 border-rose-500 pl-4">
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Greater Noida Sec-1</p>
                    <p className="text-xs text-gray-300 font-bold max-w-xs leading-relaxed">
                       Shop No FF8A, Paramount City Square Paramount Emotions, Sector-1, Bisrakh Jalalpur (U.P.) 201318
                    </p>
                    <div className="flex flex-col gap-1 text-xs text-gray-400 font-bold mt-1.5">
                       <a href="tel:+919560208341" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                          <Phone size={12} /> +91 95602 08341
                       </a>
                       <a href="tel:+919560408342" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                          <Phone size={12} /> +91 95604 08342
                       </a>
                    </div>
                 </div>

                 <div className="h-px bg-white/5 w-full" />

                 {/* Operational information */}
                 <div className="space-y-1 text-xs font-bold text-gray-400 pl-4">
                    <p className="flex items-center gap-1.5">
                       <Clock size={12} /> Mon - Sun | 9:00 AM - 8:00 PM
                    </p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider">
                       * Alternate Thursdays Closed
                    </p>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-red-500">QUICK ACCESS</h4>
              <nav className="grid grid-cols-2 gap-4">
                 <FooterLink label="Our History" onClick={() => onOpenModal('history')} />
                 <FooterLink label="Workshops" onClick={() => onOpenModal('workshops')} />
                 <FooterLink label="Franchise" onClick={() => onOpenModal('franchise')} />
                 <FooterLink label="Careers" onClick={() => onOpenModal('careers')} />
                 <FooterLink label="Partner Log" onClick={makeAdmin} />
                 <FooterLink label="Terms" onClick={() => onOpenModal('terms')} />
                 <FooterLink label="Privacy" onClick={() => onOpenModal('privacy')} />
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

        {/* SEO Keyword & Location Anchor Copy */}
        <div className="pt-12 border-t border-white/5 space-y-4 text-left">
           <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">SRM Drycleaners — Noida Local Coverage</h5>
           <p className="text-[11px] font-semibold text-gray-500 leading-relaxed uppercase tracking-wider">
              SRM Dry Cleaners is the premier destination for organic <strong className="text-gray-300 font-bold">dry cleaning</strong> and professional <strong className="text-gray-300 font-bold">drycleaning service near me</strong> in Noida. Armed with automated German processing machinery and hypoallergenic silicone solvents, <strong className="text-gray-300 font-bold font-sans">srm drycleaners</strong> delivers five-star garment care right to your doorstep. Looking for premium <strong className="text-gray-300 font-bold font-sans">srm laundry services near me</strong>? We process designer silk sarees, corporate workwear, leather sneakers, delicate winter jackets, carpets, and household curtains with curated, scheduled pickup and express delivery inside Noida Sector 15, Sector 50, Sector 62, Sector 137, Noida Extension (Greater Noida West), and Expressway communities.
           </p>
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

function ContactItem({ icon, title, desc, href }: any) {
  const content = (
    <div className="flex items-center gap-4">
       <div className="text-blue-400 group-hover:scale-110 transition-transform">{icon}</div>
       <div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{title}</p>
          <p className="text-sm font-bold group-hover:text-blue-400 transition-colors">{desc}</p>
       </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="block group transition-all">
        {content}
      </a>
    );
  }

  return content;
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

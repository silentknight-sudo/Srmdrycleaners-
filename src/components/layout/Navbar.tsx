import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { signInWithGoogle } from '../../lib/firebase';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import srmLogo from '../../assets/images/srm_logo_cleaned_1779214849760.png';

interface NavbarProps {
  setView: (view: 'home' | 'book' | 'tracking' | 'admin') => void;
  activeView: string;
}

export function Navbar({ setView, activeView }: NavbarProps) {
  const { user, profile, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home' as const },
    { label: 'Services', view: 'home' as const, scroll: 'services' },
    { label: 'My Orders', view: 'tracking' as const, auth: true },
    { label: 'Admin', view: 'admin' as const, admin: true },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.scroll) {
      setView('home');
      setTimeout(() => {
        document.getElementById(link.scroll!)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setView(link.view);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-6 h-20 flex items-center",
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setView('home')}
        >
          <img 
            src={srmLogo} 
            alt="SRM Dry Cleaners" 
            className="h-12 w-auto group-hover:scale-105 transition-transform" 
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
          {navLinks.filter(l => (!l.auth || user) && (!l.admin || isAdmin)).map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className={cn(
                "px-5 py-2 text-sm font-semibold rounded-full transition-all relative",
                activeView === link.view && !link.scroll 
                  ? "text-srm-blue" 
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              {link.label}
              {activeView === link.view && !link.scroll && (
                <motion.div 
                  layoutId="nav-pill" 
                  className="absolute inset-0 bg-white rounded-full shadow-sm -z-10 border border-gray-200" 
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4 animate-fade-in relative">
          
          {/* Multi-Store Contact Popover */}
          <div className="relative">
            <button
              onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-200/60 bg-blue-50 text-srm-blue text-xs font-black uppercase tracking-wider hover:bg-blue-100 transition-all shadow-sm cursor-pointer select-none"
            >
              <Phone size={12} className="fill-current text-srm-blue animate-pulse" />
              <span>Our Stores & Contacts</span>
            </button>

            <AnimatePresence>
              {isContactDropdownOpen && (
                <>
                  {/* Backdrop underlay to close */}
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setIsContactDropdownOpen(false)}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 z-50 space-y-4"
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">SRM Store Outlets</p>
                      <h4 className="text-md font-black text-gray-900 leading-none">Select branch destination</h4>
                    </div>
                    
                    <div className="h-px bg-gray-50 -mx-6" />

                    <div className="space-y-4">
                      {/* Store 1 */}
                      <div className="space-y-2 text-left">
                        <p className="text-[10px] font-black text-srm-blue uppercase tracking-wider">Noida Sec-78 (Mahagun Mart)</p>
                        <div className="flex gap-2">
                          <a 
                            href="tel:+919891318340" 
                            className="flex-grow py-2 px-3 text-center bg-gray-50 hover:bg-blue-50 hover:text-srm-blue border border-gray-100 rounded-xl text-[11px] font-black tracking-tighter transition-colors block"
                          >
                            Call 9891318340
                          </a>
                          <a 
                            href="https://wa.me/919891318340?text=Hi%20SRM%20Sec%2078"
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 rounded-xl transition-colors shrink-0"
                          >
                            <MessageSquare size={14} className="fill-current text-emerald-500" />
                          </a>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold leading-tight">Shop No. E, LG Floor, Mahagun Mart, Sec-78 Noida</p>
                      </div>

                      <div className="h-px bg-gray-50 -mx-6" />

                      {/* Store 2 */}
                      <div className="space-y-2 text-left">
                        <p className="text-[10px] font-black text-srm-red uppercase tracking-wider">Greater Noida Sec-1 (Paramount)</p>
                        <div className="flex gap-2">
                          <a 
                            href="tel:+919560208341" 
                            className="flex-grow py-2 px-3 text-center bg-gray-50 hover:bg-rose-50 hover:text-srm-red border border-gray-100 rounded-xl text-[11px] font-black tracking-tighter transition-colors block"
                          >
                            Call 9560208341
                          </a>
                          <a 
                            href="https://wa.me/919560208341?text=Hi%20SRM%20Paramount"
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 rounded-xl transition-colors shrink-0"
                          >
                            <MessageSquare size={14} className="fill-current text-emerald-500" />
                          </a>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold leading-tight">FF8A, Paramount City Square, Sector-1, Bisrakh</p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {user ? (
            <div className="flex items-center gap-3 bg-white/50 p-1 pr-4 rounded-full border border-gray-100">
              <img 
                src={user.photoURL || ''} 
                alt="" 
                className="w-8 h-8 rounded-full border border-gray-200" 
                referrerPolicy="no-referrer" 
              />
              <div className="text-left leading-none">
                <p className="text-xs font-bold truncate max-w-[100px]">{profile?.displayName || user.email}</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">{profile?.role}</p>
              </div>
            </div>
          ) : (
            <Button 
              onClick={signInWithGoogle} 
              className="rounded-full px-6 bg-srm-blue hover:bg-blue-700 shadow-xl shadow-blue-200/50 h-10"
            >
              Get Started
            </Button>
          )}

          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden shadow-xl max-h-[85vh] overflow-y-auto"
          >
            {navLinks.filter(l => (!l.auth || user) && (!l.admin || isAdmin)).map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left text-lg font-bold py-2 border-b border-gray-50"
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Contact Shortcuts */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Our Outlets & Dialers</p>
               
               <div className="space-y-3">
                  <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-left">
                     <p className="text-xs font-black text-srm-blue uppercase">Noida Sector 78 Outlet</p>
                     <p className="text-[10px] text-gray-400 font-bold leading-snug mt-0.5">Mahagun Mart, Sec-78 Noida</p>
                     <div className="flex gap-2 mt-2.5">
                        <a href="tel:+919891318340" className="flex-1 py-1.5 text-center bg-white border border-blue-200 text-[10px] font-black uppercase tracking-wider text-srm-blue rounded-xl block">9891318340</a>
                        <a href="tel:+919717153137" className="flex-1 py-1.5 text-center bg-white border border-blue-200 text-[10px] font-black uppercase tracking-wider text-srm-blue rounded-xl block">9717153137</a>
                     </div>
                  </div>

                  <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 text-left">
                     <p className="text-xs font-black text-srm-red uppercase">Greater Noida Sector-1 Outlet</p>
                     <p className="text-[10px] text-gray-400 font-bold leading-snug mt-0.5">Paramount City Square, Sec-1</p>
                     <div className="flex gap-2 mt-2.5">
                        <a href="tel:+919560208341" className="flex-1 py-1.5 text-center bg-white border border-rose-200 text-[10px] font-black uppercase tracking-wider text-srm-red rounded-xl block">9560208341</a>
                        <a href="tel:+919560408342" className="flex-1 py-1.5 text-center bg-white border border-rose-200 text-[10px] font-black uppercase tracking-wider text-srm-red rounded-xl block">9560408342</a>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

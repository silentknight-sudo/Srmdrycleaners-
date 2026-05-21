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

        <div className="flex items-center gap-3 md:gap-4 animate-fade-in">
          <a
            href="https://wa.me/919990844437?text=Hi%20SRM%20Dry%20Cleaners,%20I'd%20like%20to%20get%20in%20touch!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider hover:bg-emerald-100 transition-all shadow-sm cursor-pointer"
          >
            <MessageSquare size={13} className="fill-current text-emerald-500" />
            <span>WhatsApp</span>
          </a>

          <a
            href="tel:+919990844437"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-200/60 bg-blue-50 text-srm-blue text-xs font-black uppercase tracking-wider hover:bg-blue-100 transition-all shadow-sm cursor-pointer"
          >
            <Phone size={12} className="fill-current" />
            <span>Call +91 99908 44437</span>
          </a>

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
            className="absolute top-20 left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

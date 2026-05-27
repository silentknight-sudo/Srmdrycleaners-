import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WashingMachine } from 'lucide-react';
import { useAuth } from './lib/AuthContext';
import { db } from './lib/firebase';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

// Imported Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Page Components
import { Hero } from './components/home/Hero';
import { GarmentMarquee } from './components/home/GarmentMarquee';
import { ServicesTabs } from './components/home/ServicesTabs';
import { ProcessShowcase } from './components/home/ProcessShowcase';
import { FeatureStats } from './components/home/FeatureStats';
import { Testimonials } from './components/home/Testimonials';
import { FaqSection } from './components/home/FaqSection';
import { AppPromo } from './components/home/AppPromo';
import { BookingFlow } from './components/booking/BookingFlow';
import { TrackingDashboard } from './components/tracking/TrackingDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FloatingContact } from './components/ui/FloatingContact';
import { InfoModal } from './components/ui/InfoModal';

export default function App() {
  const { user, loading, isAdmin } = useAuth();
  const [view, setView] = useState<'home' | 'book' | 'tracking' | 'admin'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Mens Wear');
  const [activeModal, setActiveModal] = useState<'video' | 'history' | 'workshops' | 'franchise' | 'careers' | 'terms' | 'privacy' | null>(null);

  const makeAdmin = async () => {
    if (!user) {
      toast.error('Please sign in first');
      return;
    }
    try {
      await setDoc(doc(db, 'users', user.uid), { role: 'admin' }, { merge: true });
      toast.success('Admin privileges granted! System refreshing...');
      setTimeout(() => window.location.reload(), 1500);
    } catch (e) {
      toast.error('Privilege escalation failed');
      console.error(e);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="text-srm-blue"
      >
        <WashingMachine size={48} />
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Toaster position="top-right" richColors />
      <Navbar setView={setView} activeView={view} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero setView={setView} onOpenVideoModal={() => setActiveModal('video')} />
              
              <GarmentMarquee />
              
              {/* Floating Quote Simulation on Home */}
              <section className="px-4 sm:px-6 max-w-4xl mx-auto -mt-10 md:-mt-20 relative z-30">
                <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl border border-gray-100 grid md:grid-cols-3 gap-6 md:gap-8 group hover:shadow-blue-200/50 transition-all duration-500">
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-xl md:text-2xl font-black flex items-center gap-2 text-black">
                       INSTANT QUOTE
                    </h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Select a garment to see pricing</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {['Shirt', 'Suit', 'Saree', 'Curtain', 'Jeans'].map(item => (
                        <button 
                          key={item}
                          onClick={() => toast(`Est for ${item}: ₹40 - ₹120 (Depending on service)`)}
                          className="px-4 py-2 rounded-xl bg-gray-50 hover:bg-srm-blue hover:text-white text-[10px] font-black uppercase tracking-widest transition-all border border-gray-100 text-gray-700"
                        >
                          {item} +
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-srm-blue rounded-3xl p-6 text-white text-center flex flex-col justify-center gap-2 border-4 border-blue-400/50">
                     <p className="text-[10px] uppercase tracking-widest font-black opacity-80">Premium Care</p>
                     <p className="text-4xl md:text-5xl font-black tracking-tighter">₹30<span className="text-sm">/pc</span></p>
                     <p className="text-[8px] font-bold opacity-60">MINIMUM ORDER 10PCS</p>
                  </div>
                </div>
              </section>

              <ServicesTabs 
                setView={setView} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
              />
              <ProcessShowcase />
              <FeatureStats />
              <Testimonials />
              <AppPromo />
              <FaqSection />
            </motion.div>
          )}

          {view === 'book' && <BookingFlow key="book" setView={setView} />}
          {view === 'tracking' && <TrackingDashboard key="tracking" />}
          {view === 'admin' && isAdmin && <AdminDashboard key="admin" />}
        </AnimatePresence>
      </main>

      <Footer makeAdmin={makeAdmin} setView={setView} onOpenModal={(type) => setActiveModal(type)} />
      <FloatingContact />

      <AnimatePresence>
        {activeModal && (
          <InfoModal type={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

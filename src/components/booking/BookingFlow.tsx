import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Truck, CheckCircle, ArrowLeft, ArrowRight, Trash2, MapPin, Calendar, Clock, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { PRICING_DATA, ServiceItem } from '../../constants';
import { useAuth } from '../../lib/AuthContext';
import { signInWithGoogle, db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { cn } from '../../lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface BookingFlowProps {
  setView: (view: any) => void;
  key?: string;
}

export function BookingFlow({ setView }: BookingFlowProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [basket, setBasket] = useState<any[]>([]);
  const [details, setDetails] = useState({
    location: 'Noida',
    pickupDate: format(new Date(), 'yyyy-MM-dd'),
    pickupSlot: '10:00 AM - 12:00 PM',
    address: '',
    phone: '',
  });

  const addToBasket = (item: ServiceItem, type: 'washIron' | 'dryClean' | 'steamIron') => {
    const price = item[type] || 0;
    setBasket([...basket, { ...item, type, price, basketId: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeFromBasket = (basketId: string) => {
    setBasket(basket.filter((item) => item.basketId !== basketId));
  };

  const totalPrice = basket.reduce((acc, curr) => acc + curr.price, 0);

  const handleSubmit = async () => {
    if (!user) return signInWithGoogle();
    try {
      const orderData = {
        userId: user.uid,
        customerName: user.displayName || 'Guest',
        customerPhone: details.phone,
        items: basket,
        totalAmount: totalPrice,
        status: 'pending',
        paymentStatus: 'unpaid',
        pickupDate: details.pickupDate,
        pickupSlot: details.pickupSlot,
        address: details.address,
        location: details.location,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await addDoc(collection(db, 'orders'), orderData);
      toast.success('Pickup Scheduled Successfully!');
      setView('tracking');
    } catch (e) {
      console.error(e);
      toast.error('Failed to schedule pickup. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-[90vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setView('home')} className="rounded-full w-10 h-10 p-0">
            <ArrowLeft size={18} />
          </Button>
          <h2 className="text-4xl font-extrabold tracking-tighter">SERVICE <span className="text-srm-blue underline decoration-rose-500 underline-offset-8">RESERVATION</span></h2>
        </div>
        
        <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-2xl w-fit">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2 px-3 py-1">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                step >= s ? "bg-srm-blue text-white" : "bg-gray-200 text-gray-500"
              )}>
                {step > s ? <CheckCircle size={14} /> : s}
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                step >= s ? "text-gray-900" : "text-gray-400"
              )}>
                {s === 1 ? 'Selection' : s === 2 ? 'Details' : 'Confirm'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-12 gap-12"
          >
            <div className="lg:col-span-8 space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Choose Garments</h3>
                  <div className="flex gap-2">
                     <Button variant="ghost" size="sm" className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest px-4 rounded-xl">Mens</Button>
                     <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest px-4 rounded-xl">Womens</Button>
                  </div>
               </div>

               <ScrollArea className="h-[600px] pr-4">
                  <div className="grid md:grid-cols-2 gap-4 pb-12">
                    {PRICING_DATA.map(item => (
                      <div key={item.id} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4">
                        <div>
                          <p className="font-bold text-lg">{item.name}</p>
                          <p className="text-xs text-gray-400 font-medium tracking-tight">{item.category}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {item.washIron && (
                            <button 
                              onClick={() => addToBasket(item, 'washIron')} 
                              className="flex justify-between items-center px-4 py-2 bg-blue-50/50 hover:bg-blue-100 text-srm-blue rounded-xl text-xs font-bold transition-colors group"
                            >
                              <span>Wash & Iron</span>
                              <span className="flex items-center gap-1">₹{item.washIron} <Plus size={14} className="group-hover:scale-125 transition-transform" /></span>
                            </button>
                          )}
                          {item.dryClean && (
                            <button 
                              onClick={() => addToBasket(item, 'dryClean')} 
                              className="flex justify-between items-center px-4 py-2 bg-rose-50/50 hover:bg-rose-100 text-srm-red rounded-xl text-xs font-bold transition-colors group"
                            >
                              <span>Dry Cleaning</span>
                              <span className="flex items-center gap-1">₹{item.dryClean} <Plus size={14} className="group-hover:scale-125 transition-transform" /></span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
               </ScrollArea>
            </div>

            <div className="lg:col-span-4 h-fit sticky top-28 space-y-6">
               <div className="bg-srm-navy text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
                  <div className="relative space-y-8">
                     <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-[0.2em] font-black opacity-40">Your Basket</p>
                        <ShoppingBag size={20} className="text-blue-400" />
                     </div>
                     
                     <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {basket.length === 0 && (
                          <div className="py-12 text-center space-y-2 opacity-50">
                             <ShoppingBag size={48} className="mx-auto border-2 border-dashed border-white/20 p-3 rounded-full" />
                             <p className="text-xs font-bold uppercase tracking-widest">Selected Items</p>
                          </div>
                        )}
                        {basket.map((item) => (
                          <div key={item.basketId} className="flex justify-between items-center border-b border-white/5 pb-4 group">
                             <div>
                                <p className="font-bold text-sm">{item.name}</p>
                                <p className="text-[10px] text-blue-300 font-bold uppercase">{item.type.replace(/([A-Z])/g, ' $1')}</p>
                             </div>
                             <div className="flex items-center gap-3">
                                <span className="font-mono font-bold">₹{item.price}</span>
                                <button onClick={() => removeFromBasket(item.basketId)} className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                             </div>
                          </div>
                        ))}
                     </div>

                     <div className="pt-8 space-y-4">
                        <div className="flex justify-between items-end">
                           <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Estimate</p>
                           <p className="text-5xl font-black">₹{totalPrice}</p>
                        </div>
                        <Button 
                          disabled={basket.length === 0} 
                          onClick={() => setStep(2)}
                          className="w-full h-16 rounded-[24px] bg-blue-600 hover:bg-blue-500 text-lg font-black group transition-all"
                        >
                          Checkout Securely <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                     </div>
                  </div>
               </div>
               
               <div className="p-6 rounded-[32px] bg-white border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-srm-blue shrink-0">
                    <Truck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Fast Service</p>
                    <p className="text-sm font-bold leading-tight">Pickups scheduled daily across Noida Area</p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-12 gap-12"
          >
            <div className="lg:col-span-12 space-y-12">
               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                     <h3 className="text-2xl font-black">PICKUP LOGISTICS</h3>
                     <div className="space-y-6">
                        <div className="space-y-4">
                          <Label className="text-xs font-black uppercase tracking-widest opacity-50">Operational Region</Label>
                          <div className="grid grid-cols-2 gap-3">
                             {['Noida', 'Greater Noida'].map(loc => (
                               <button 
                                 key={loc}
                                 onClick={() => setDetails({...details, location: loc})}
                                 className={cn(
                                   "py-4 rounded-2xl border-2 font-bold text-sm transition-all",
                                   details.location === loc ? "bg-srm-blue text-white border-srm-blue" : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                                 )}
                               >
                                 {loc}
                               </button>
                             ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                             <Label className="text-xs font-black uppercase tracking-widest opacity-50">Preferred Date</Label>
                             <Input 
                               type="date" 
                               value={details.pickupDate} 
                               onChange={e => setDetails({...details, pickupDate: e.target.value})}
                               className="h-14 rounded-xl border-2 font-bold"
                             />
                           </div>
                           <div className="space-y-2">
                             <Label className="text-xs font-black uppercase tracking-widest opacity-50">Time Window</Label>
                             <Select value={details.pickupSlot} onValueChange={(v) => setDetails({...details, pickupSlot: v})}>
                                <SelectTrigger className="h-14 rounded-xl border-2 font-bold">
                                   <SelectValue placeholder="Select Slot" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl font-bold">
                                   <SelectItem value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</SelectItem>
                                   <SelectItem value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</SelectItem>
                                   <SelectItem value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</SelectItem>
                                   <SelectItem value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</SelectItem>
                                </SelectContent>
                             </Select>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                     <h3 className="text-2xl font-black">CONTACT INTEL</h3>
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <Label className="text-xs font-black uppercase tracking-widest opacity-50">Full Digital Address</Label>
                           <textarea 
                              placeholder="Street name, Bldg No, Landmark..."
                              className="w-full min-h-[120px] rounded-2xl border-2 border-gray-100 p-4 font-bold focus:ring-2 focus:ring-srm-blue transition-all"
                              value={details.address}
                              onChange={e => setDetails({...details, address: e.target.value})}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-black uppercase tracking-widest opacity-50">Secure Mobile Link</Label>
                           <Input 
                              placeholder="+91 00000 00000"
                              value={details.phone}
                              onChange={e => setDetails({...details, phone: e.target.value})}
                              className="h-14 rounded-xl border-2 font-bold"
                           />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex justify-between items-center bg-gray-900 p-8 rounded-[40px] text-white">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-blue-400">
                        <CheckCircle size={32} />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ready to finalize</p>
                        <p className="text-xl font-black">₹{totalPrice} TOTAL ESTIMATE</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <Button variant="outline" size="lg" onClick={() => setStep(1)} className="rounded-2xl h-14 px-8 border-2 border-white/20 text-white hover:bg-white hover:text-black">Modify Order</Button>
                     <Button 
                        disabled={!details.address || !details.phone || !user}
                        onClick={handleSubmit}
                        size="lg"
                        className="rounded-2xl h-14 px-12 bg-blue-600 hover:bg-blue-500 font-extrabold shadow-2xl shadow-blue-500/20"
                     >
                        Confirm Booking
                     </Button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-20 border-t border-gray-100 pt-12 grid md:grid-cols-3 gap-8">
         <FeatureItem icon={<CreditCard />} title="No Pre-payment" desc="Pay after your laundry is processed and delivered." />
         <FeatureItem icon={<Clock />} title="Live Tracking" desc="Monitor every stage from pickup to final ironing." />
         <FeatureItem icon={<CheckCircle />} title="Invoiced" desc="Official tax invoices generated for every order." />
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold mb-1">{title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

const Plus = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Truck, CheckCircle, ChevronDown, Download, Star, MapPin, ReceiptText, Clock, CreditCard, Calendar } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import { Skeleton } from '../ui/skeleton';

export function TrackingDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'orders'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const generateInvoice = (order: any) => {
    const pdf = new jsPDF();
    pdf.setFontSize(22);
    pdf.text('SRM CLEANERS', 20, 20);
    pdf.setFontSize(10);
    pdf.text('Premium Dry Cleaning & Laundry Service', 20, 26);
    pdf.line(20, 30, 190, 30);
    
    pdf.text(`Order ID: ${order.id}`, 20, 40);
    pdf.text(`Date: ${format(new Date(order.createdAt), 'PPP')}`, 20, 45);
    pdf.text(`Customer: ${order.customerName}`, 20, 55);
    pdf.text(`Status: ${order.status.toUpperCase()}`, 140, 55);
    
    let y = 75;
    pdf.setFontSize(12);
    pdf.text('SERVICE ITEM', 20, y);
    pdf.text('PRICE', 170, y);
    pdf.line(20, y+2, 190, y+2);
    
    pdf.setFontSize(10);
    order.items.forEach((item: any) => {
      y += 10;
      pdf.text(`${item.name} (${item.type})`, 20, y);
      pdf.text(`Rs. ${item.price}`, 170, y);
    });
    
    y += 15;
    pdf.line(20, y, 190, y);
    pdf.setFontSize(14);
    pdf.text(`SUBTOTAL: Rs. ${order.totalAmount}`, 135, y + 10);
    
    pdf.save(`SRM_Invoice_${order.id.slice(-6)}.pdf`);
    toast.success('Invoice Downloaded');
  };

  const handlePaymentMock = async (orderId: string) => {
    const confirm = window.confirm('Proceed to mock payment checkout?');
    if (confirm) {
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: 'Processing Secure Payment...',
          success: async () => {
            await updateDoc(doc(db, 'orders', orderId), { paymentStatus: 'paid' });
            return 'Payment Confirmed!';
          },
          error: 'Payment Failed',
        }
      );
    }
  };

  if (loading) return <TrackingSkeleton />;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tighter">ORDER <span className="text-srm-blue underline decoration-red-500 underline-offset-8">ARCHIVE</span></h2>
          <p className="text-gray-500 font-medium">Track your garments through our specialized care stages</p>
        </div>
        <div className="inline-flex items-center gap-6 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Status: Active</span>
           </div>
           <div className="h-4 w-px bg-gray-200" />
           <p className="text-[10px] font-black uppercase tracking-widest text-srm-blue">{orders.length} TOTAL ORDERS</p>
        </div>
      </div>

      <div className="space-y-10">
        {orders.length === 0 ? (
          <div className="py-32 text-center space-y-6 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <ShoppingBag size={32} className="text-gray-300" />
             </div>
             <div className="space-y-2">
                <p className="text-xl font-bold">No Records Found</p>
                <p className="text-gray-400 max-w-xs mx-auto text-sm">You haven't scheduled any pickups yet. Start your journey with SRM Cleaners today.</p>
             </div>
             <Button onClick={() => window.location.href = '/'} className="rounded-2xl px-8 h-12">New Booking</Button>
          </div>
        ) : (
          orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-[40px] border-none shadow-[0_8px_40px_rgba(31,38,135,0.05)] overflow-hidden bg-white">
                <CardContent className="p-0">
                   <div className="p-8 md:p-10 space-y-10">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                         <div className="space-y-4">
                            <div className="flex items-center gap-3">
                               <Badge className={cn("rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.1em]", getStatusStyle(order.status))}>
                                  {order.status.replace(/_/g, ' ')}
                               </Badge>
                               <span className="text-xs font-mono font-bold text-gray-400">REF: #{order.id.slice(-8).toUpperCase()}</span>
                            </div>
                            <h3 className="text-3xl font-black">{order.items.length} Garments Under Care</h3>
                            <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                               <span className="flex items-center gap-1.5"><Calendar size={14} /> Scheduled {format(new Date(order.pickupDate), 'do MMM')}</span>
                               <span className="flex items-center gap-1.5"><Clock size={14} /> {order.pickupSlot}</span>
                               <span className="flex items-center gap-1.5"><MapPin size={14} /> {order.location}</span>
                            </div>
                         </div>

                         <div className="flex flex-wrap gap-3 w-full md:w-auto">
                            {order.paymentStatus === 'unpaid' && (
                               <Button onClick={() => handlePaymentMock(order.id)} className="flex-1 md:flex-none h-12 rounded-2xl bg-srm-blue px-8 font-black shadow-xl shadow-blue-200">
                                  PAY {order.totalAmount} <CreditCard size={18} className="ml-2" />
                               </Button>
                            )}
                            <Button variant="outline" onClick={() => generateInvoice(order)} className="flex-1 md:flex-none h-12 rounded-2xl border-2 font-black">
                               INVOICE <Download size={18} className="ml-2" />
                            </Button>
                         </div>
                      </div>

                      {/* Progress Visualizer */}
                      <div className="space-y-6">
                         <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${getStatusPercent(order.status)}%` }}
                               transition={{ duration: 1.5, ease: "easeOut" }}
                               className="absolute h-full srm-gradient rounded-full"
                            />
                         </div>
                         <div className="grid grid-cols-5 gap-2">
                            <ProgressPoint label="Ordered" active={true} />
                            <ProgressPoint label="Picked" active={['picked', 'processing', 'out_for_delivery', 'delivered'].includes(order.status)} />
                            <ProgressPoint label="Processing" active={['processing', 'out_for_delivery', 'delivered'].includes(order.status)} />
                            <ProgressPoint label="Transit" active={['out_for_delivery', 'delivered'].includes(order.status)} />
                            <ProgressPoint label="Delivered" active={order.status === 'delivered'} />
                         </div>
                      </div>
                   </div>
                   
                   {/* Simplified Item Preview */}
                   <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex -space-x-4 overflow-hidden">
                         {order.items.slice(0, 4).map((_: any, i: number) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-srm-blue text-[10px] font-black">
                               <ShoppingBag size={14} />
                            </div>
                         ))}
                         {order.items.length > 4 && (
                           <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-900 text-white flex items-center justify-center text-[10px] font-black">
                              +{order.items.length - 4}
                           </div>
                         )}
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Value</p>
                            <p className="text-lg font-black text-srm-blue">₹{order.totalAmount}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment</p>
                            <span className={cn(
                               "text-xs font-black uppercase",
                               order.paymentStatus === 'paid' ? "text-green-500" : "text-rose-500"
                            )}>
                               {order.paymentStatus}
                            </span>
                         </div>
                      </div>
                   </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

function ProgressPoint({ label, active }: { label: string, active: boolean }) {
  return (
    <div className="space-y-3 text-center">
       <div className={cn(
          "w-3 h-3 rounded-full mx-auto transition-all duration-1000",
          active ? "bg-srm-blue shadow-[0_0_10px_rgba(37,99,235,0.5)]" : "bg-gray-200"
       )} />
       <p className={cn(
          "text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em]",
          active ? "text-gray-900" : "text-gray-400"
       )}>{label}</p>
    </div>
  );
}

function TrackingSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
       <div className="space-y-4">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded-lg" />
       </div>
       <div className="space-y-8">
          {[1, 2].map(i => (
             <Skeleton key={i} className="h-80 w-full rounded-[40px]" />
          ))}
       </div>
    </div>
  );
}

function getStatusStyle(status: string) {
  const map: any = {
    pending: 'bg-yellow-500 text-white',
    picked: 'bg-blue-500 text-white',
    processing: 'bg-indigo-500 text-white',
    out_for_delivery: 'bg-orange-500 text-white',
    delivered: 'bg-green-500 text-white',
    cancelled: 'bg-gray-500 text-white',
  };
  return map[status] || 'bg-gray-200';
}

function getStatusPercent(status: string) {
  const map: any = { pending: 10, picked: 30, processing: 60, out_for_delivery: 85, delivered: 100 };
  return map[status] || 0;
}

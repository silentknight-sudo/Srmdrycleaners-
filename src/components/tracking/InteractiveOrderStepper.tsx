import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle, 
  Sparkles, 
  ChevronRight, 
  Activity, 
  User, 
  Box, 
  ThumbsUp, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { toast } from 'sonner';

// Define the steps of the laundry lifecycle
export interface StepDef {
  key: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  laundryStat: string;
  careDetails: string[];
  durationEstimate: string;
  badgeStyle: string;
}

const LIFECYCLE_STEPS: StepDef[] = [
  {
    key: 'pending',
    label: 'Order Placed',
    shortLabel: 'Ordered',
    icon: ShoppingBag,
    title: 'Order Standard Accepted',
    description: 'We have received your booking and logged your wardrobe specifications. Your pick-up slot is currently locked in and a specialized care executive is assigned.',
    laundryStat: 'Central Logistics Lab: Queue Position #4',
    durationEstimate: 'Within scheduled pickup window',
    badgeStyle: 'bg-amber-100 text-amber-800 border-amber-200',
    careDetails: [
      'Digital barcode generated for tagging',
      'Assigned to nearest transit executive',
      'Wash/Dryclean dynamic load calculations set'
    ]
  },
  {
    key: 'picked',
    label: 'Garments Collected',
    shortLabel: 'Picked Up',
    icon: MapPin,
    title: 'Secure Collection Complete',
    description: 'Our rider has securely itemized, bagged, and scanned your garments. Your garments undergo transit in premium sanitised garment bins to ensure optimal safe transport.',
    laundryStat: 'Transit Hub: Ingress Processing',
    durationEstimate: 'Completed and logged in database',
    badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
    careDetails: [
      'RFID digital garment tag applied',
      'Material separation audit complete',
      'High-resolution stain inspection report generated'
    ]
  },
  {
    key: 'processing',
    label: 'Washing & Care',
    shortLabel: 'Processing',
    icon: Clock,
    title: 'Expert Deep Treatment & Pressing',
    description: 'Your garments are currently handled by certified textile experts. They undergo precise temperature-controlled eco-laundering or pristine dry cleaning followed by custom steam-iron detailing.',
    laundryStat: 'Active Wash Wheel #3: Gentle Rotation Mode',
    durationEstimate: 'Approximately 4 - 6 hours remaining',
    badgeStyle: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    careDetails: [
      'Individual fabric pH-balance audit',
      'High-pressure steam-iron block alignment',
      'Sanitization & odor-barrier technology applied'
    ]
  },
  {
    key: 'out_for_delivery',
    label: 'Out for Delivery',
    shortLabel: 'In Transit',
    icon: Truck,
    title: 'Pristine Transit & Guard Dispatch',
    description: 'The care lifecycle is complete! Your fresh, individual hangered or vacuum-sealed garments have been loaded on our delivery fleet. The dispatch rider is route-optimised.',
    laundryStat: 'Active Route: Dispatched with Care Rider',
    durationEstimate: 'Est. Delivery Today',
    badgeStyle: 'bg-orange-100 text-orange-800 border-orange-200',
    careDetails: [
      'Pristine garment protectors applied',
      'Touchless collection protocol enabled',
      'Rider transit telemetry active'
    ]
  },
  {
    key: 'delivered',
    label: 'Delivered',
    shortLabel: 'Delivered',
    icon: CheckCircle,
    title: 'Returned to Wardrobe',
    description: 'A matchless laundry experience complete. Your garments have been successfully delivered to your doorstep. We look forward to renewing your wardrobe again soon!',
    laundryStat: 'Primacy State: Guard Handover Confirmed',
    durationEstimate: 'Delivered successfully',
    badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    careDetails: [
      'Direct doorstep hand-off authorized',
      'Electronic delivery verification log signed',
      'Textile satisfaction rating requested'
    ]
  }
];

interface InteractiveOrderStepperProps {
  orderId: string;
  currentStatus: string;
}

export function InteractiveOrderStepper({ orderId, currentStatus }: InteractiveOrderStepperProps) {
  // Map standard database statuses to the steps
  const orderOfKeys = ['pending', 'picked', 'processing', 'out_for_delivery', 'delivered'];
  
  // Find current step index
  const activeIndex = orderOfKeys.indexOf(currentStatus) !== -1 ? orderOfKeys.indexOf(currentStatus) : 0;
  
  // Local state to track which step the user is interactively looking at
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(activeIndex);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Automatically update selected tab when the database status changes
  useEffect(() => {
    setSelectedStepIndex(activeIndex);
  }, [activeIndex]);

  const getStepState = (idx: number) => {
    if (idx < activeIndex) return 'completed';
    if (idx === activeIndex) return 'current';
    return 'upcoming';
  };

  const handleSimulateStatus = async (newStatus: string) => {
    setIsSimulating(true);
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
      toast.success(`Success! Order status updated to "${newStatus.replace(/_/g, ' ')}"`);
    } catch (e) {
      console.error(e);
      toast.error('Simulation update failed. Please verify firebase details.');
    } finally {
      setIsSimulating(false);
    }
  };

  const selectedStep = LIFECYCLE_STEPS[selectedStepIndex];
  const progressPercent = (activeIndex / (LIFECYCLE_STEPS.length - 1)) * 100;

  return (
    <div className="space-y-8 bg-slate-50/50 rounded-[32px] p-6 border border-slate-100 shadow-inner">
      
      {/* 1. Dynamic Progress Header & Instructions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
        <div className="space-y-1">
          <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Laundry Lifecycle Tracking
          </span>
          <p className="text-xs text-gray-500 font-medium font-sans">
            Tap on any milestone below to inspect premium garment care details.
          </p>
        </div>
        
        {/* Dynamic Micro Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-100 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              activeIndex === 4 ? "bg-emerald-400" : "bg-srm-blue"
            )}></span>
            <span className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              activeIndex === 4 ? "bg-emerald-500" : "bg-srm-blue"
            )}></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            Current: {LIFECYCLE_STEPS[activeIndex].shortLabel}
          </span>
        </div>
      </div>

      {/* 2. Interactive Timeline Stepper Bar with Custom Motion */}
      <div className="relative pt-6 pb-2 px-2" id={`stepper-${orderId}`}>
        {/* Continuous Track Background */}
        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-200/70 -translate-y-1/2 rounded-full" />
        
        {/* Animated Active Progress Infill */}
        <motion.div 
          className="absolute top-1/2 left-0 h-1.5 srm-gradient -translate-y-1/2 rounded-full shadow-[0_1px_8px_rgba(59,130,246,0.3)]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Nodes Grid */}
        <div className="relative flex justify-between items-center z-10 w-full">
          {LIFECYCLE_STEPS.map((step, idx) => {
            const stepState = getStepState(idx);
            const isTabSelected = selectedStepIndex === idx;
            const StepIcon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center">
                {/* Interactive Node Button */}
                <motion.button
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedStepIndex(idx)}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md relative outline-none border-2",
                    
                    // Style states:
                    stepState === 'completed' && "bg-white border-blue-500 text-blue-600 shadow-[0_4px_12px_rgba(59,130,246,0.2)]",
                    stepState === 'current' && "bg-gradient-to-r from-srm-blue to-blue-600 border-white text-white shadow-[0_6px_20px_rgba(37,99,235,0.4)] animate-pulse-subtle",
                    stepState === 'upcoming' && "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                  )}
                  style={{
                    boxShadow: isTabSelected && stepState !== 'current' ? '0 0 0 3px rgba(37, 99, 235, 0.25)' : undefined
                  }}
                  id={`node-btn-${orderId}-${idx}`}
                >
                  {/* Status Indicator Badges */}
                  {stepState === 'completed' ? (
                    <div className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white rounded-full p-0.5 border border-white">
                      <CheckCircle size={10} strokeWidth={3} className="text-white" />
                    </div>
                  ) : stepState === 'current' ? (
                    <div className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white rounded-full p-0.5 border border-white animate-bounce">
                      <Sparkles size={10} className="text-white fill-white" />
                    </div>
                  ) : null}

                  {/* Icon */}
                  <StepIcon size={20} strokeWidth={isTabSelected ? 2.5 : 2} />
                  
                  {/* Glowing active ring */}
                  {stepState === 'current' && (
                    <span className="absolute inset-0 rounded-full border border-blue-400 animate-ping opacity-30" />
                  )}
                </motion.button>

                {/* Vertical visual highlight bar indicator */}
                <AnimatePresence>
                  {isTabSelected && (
                    <motion.div 
                      layoutId={`activeIndicator-${orderId}`}
                      className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 absolute -bottom-4"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </AnimatePresence>

                {/* Mini Labels for adaptive display */}
                <span className={cn(
                  "hidden sm:block text-[10px] font-extrabold uppercase mt-3 tracking-wider transition-colors",
                  isTabSelected ? "text-blue-600" : stepState === 'upcoming' ? "text-slate-400" : "text-slate-700"
                )}>
                  {step.shortLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spacer needed because of position absolute indicator */}
      <div className="h-2" />

      {/* 3. Sliding Tab Content with Motion Effects */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStepIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.015)] space-y-6 text-left relative overflow-hidden"
          id={`step-details-${orderId}`}
        >
          {/* Subtle watermark background icon */}
          <div className="absolute -right-6 -bottom-6 text-slate-100/40 pointer-events-none transform -rotate-12">
            {React.createElement(selectedStep.icon, { size: 140 })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className={cn("px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border", selectedStep.badgeStyle)}>
                  {getStepState(selectedStepIndex) === 'completed' && '✓ Milestone Achieved'}
                  {getStepState(selectedStepIndex) === 'current' && '⚡ Current Active Stage'}
                  {getStepState(selectedStepIndex) === 'upcoming' && '○ Upcoming Stage'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">
                  Care Sector {selectedStepIndex + 1}/5
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                {selectedStep.title}
              </h4>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estimated Timeline</p>
              <p className="text-xs font-black text-rose-500 font-mono mt-0.5 uppercase">{selectedStep.durationEstimate}</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed font-sans max-w-2xl">
            {selectedStep.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            {/* Left: Interactive Care Standards */}
            <div className="space-y-3">
              <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Sparkles size={12} className="text-blue-500" /> Premium Care Audit Protocols
              </h5>
              <ul className="space-y-2">
                {selectedStep.careDetails.map((detail, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2 text-xs font-medium text-slate-700 font-sans"
                  >
                    <span className="text-emerald-500 font-bold text-sm leading-none mt-0.5">•</span>
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right: Technical Telemetry Status */}
            <div className="space-y-3">
              <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Activity size={12} className="text-srm-blue" /> Live Facilities Monitor
              </h5>
              
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs text-sans">
                  <span className="text-slate-500 font-medium">Active Zone</span>
                  <span className="font-extrabold text-slate-800 uppercase tracking-tight">{selectedStep.laundryStat}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Textile Health Checked</span>
                  <span className="font-black text-emerald-600 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                    ● Nominal 100%
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Water Filtration Mode</span>
                  <span className="font-bold text-slate-700 uppercase font-mono">Bio-Softener</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. EXHILARATING DEMO CONTROL: Manual Stepper Testing Suite */}
          <div className="pt-4 border-t border-dashed border-slate-100 bg-[#f8fafc]/50 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-0.5">
              <h5 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                <RefreshCw size={12} className="text-indigo-500 animate-spin-slow" /> Interactive Demo Panel
              </h5>
              <p className="text-[10px] text-slate-500 font-bold">
                Update the live order status at click-level to see full progress animations instantly.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {LIFECYCLE_STEPS.map((step, idx) => {
                const stepKey = step.key;
                const isCurrentState = stepKey === currentStatus;
                
                return (
                  <Button
                    key={stepKey}
                    size="sm"
                    variant={isCurrentState ? "default" : "outline"}
                    onClick={() => handleSimulateStatus(stepKey)}
                    disabled={isSimulating}
                    className={cn(
                      "rounded-xl h-8 text-[9px] uppercase font-black transition-all font-sans",
                      isCurrentState 
                        ? "bg-slate-900 border-none text-white font-extrabold hover:bg-slate-850" 
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                    )}
                    id={`simulate-btn-${orderId}-${stepKey}`}
                  >
                    Set {step.shortLabel}
                  </Button>
                );
              })}
            </div>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Calendar, 
  MapPin, 
  Award, 
  TrendingUp, 
  Briefcase, 
  ClipboardCheck, 
  DollarSign, 
  Building, 
  CheckCircle2, 
  FileText, 
  ShieldAlert, 
  Sparkles,
  ChevronRight,
  UploadCloud,
  Send
} from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';

type ModalType = 'video' | 'history' | 'workshops' | 'franchise' | 'careers' | 'terms' | 'privacy';

interface InfoModalProps {
  type: ModalType | null;
  onClose: () => void;
}

export function InfoModal({ type, onClose }: InfoModalProps) {
  // Prevent body scroll when active
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [type]);

  if (!type) return null;

  // Render correct modal content
  const renderContent = () => {
    switch (type) {
      case 'video':
        return <VideoWalkthrough />;
      case 'history':
        return <CompanyHistory />;
      case 'workshops':
        return <WorkshopOverview />;
      case 'franchise':
        return <FranchiseForm onClose={onClose} />;
      case 'careers':
        return <CareersPage />;
      case 'terms':
        return <TermsAndConditions />;
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return null;
    }
  };

  // Human titles
  const getTitle = () => {
    switch (type) {
      case 'video': return "SRM Premium Walkthrough Tour";
      case 'history': return "Our Journey Since 2011";
      case 'workshops': return "German Processing Workshops";
      case 'franchise': return "SRM Franchise Direct Partnership";
      case 'careers': return "Noida Careers / Work With Us";
      case 'terms': return "Terms Of Premium Performance";
      case 'privacy': return "Your Privacy Safeguards";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
      />

      {/* Modal Dialog container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white rounded-[40px] shadow-3xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden relative border border-slate-100/50 z-10"
      >
        {/* Header toolbar */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-srm-blue animate-pulse" />
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{getTitle()}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors border border-gray-100/60 bg-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable container content */}
        <div className="p-8 overflow-y-auto flex-1">
          {renderContent()}
        </div>
      </motion.div>
    </div>
  );
}

/* ==========================================
   VIDEO TOUR WALKTHROUGH SIMULATION
   ========================================== */
function VideoWalkthrough() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const videoSteps = [
    { title: "Garment Check-In", desc: "Rigorous barcoding, dye stability tests, and personal pockets search.", icon: "🔍", time: 0 },
    { title: "Advanced Laundering", desc: "Eco-solvent deep extraction inside state-of-the-art Italian washers.", icon: "🧼", time: 33 },
    { title: "Italian Steam Finishing", desc: "Delicate vacuum-based steam tables removing fine micro-creases.", icon: "💨", time: 66 },
    { title: "Eco Protective Wrap", desc: "Delivered in premium, reusable covers directly inside your home wardrobe.", icon: "👔", time: 100 }
  ];

  // Simulated playback timers
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          const next = prev + 1;
          
          // Sync step selection to percentage
          if (next >= 75) setActiveStep(3);
          else if (next >= 50) setActiveStep(2);
          else if (next >= 25) setActiveStep(1);
          else setActiveStep(0);
          
          return next;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleTimelineClick = (percentage: number) => {
    setProgress(percentage);
    if (percentage >= 75) setActiveStep(3);
    else if (percentage >= 50) setActiveStep(2);
    else if (percentage >= 25) setActiveStep(1);
    else setActiveStep(0);
  };

  return (
    <div className="space-y-8">
      {/* Simulated Screen with washing animations */}
      <div className="relative aspect-video rounded-3xl bg-slate-950 flex flex-col items-center justify-center overflow-hidden border border-slate-900 shadow-2xl">
        
        {/* Animated washing drum particles */}
        <div className="absolute inset-x-0 bottom-0 bg-blue-500/20 h-1/3 blur-xl animate-pulse" />
        
        {/* Playback simulation screen layout visual */}
        <div className="text-center relative z-10 p-6 max-w-md space-y-4">
          <motion.div
            animate={isPlaying ? { rotate: [0, 360], scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="w-32 h-32 rounded-full border-4 border-dashed border-cyan-400/50 flex items-center justify-center mx-auto bg-slate-900 shadow-xl"
          >
            <span className="text-4xl text-cyan-300">
              {videoSteps[activeStep].icon}
            </span>
          </motion.div>
          
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#24b0f0]">Now Demonstrating</span>
            <h3 className="text-2xl font-black text-white">{videoSteps[activeStep].title}</h3>
            <p className="text-xs text-slate-400 font-medium">{videoSteps[activeStep].desc}</p>
          </div>
        </div>

        {/* Video Overlays Controls */}
        <div className="absolute bottom-4 inset-x-4 bg-black/70 backdrop-blur-md px-5 py-3 rounded-2xl flex items-center gap-4 border border-white/5">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
          </button>
          
          {/* Timeline bar slider */}
          <div 
            className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = Math.round((clickX / rect.width) * 100);
              handleTimelineClick(percentage);
            }}
          >
            <div 
              style={{ width: `${progress}%` }} 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
            />
          </div>

          <div className="text-[10px] text-slate-400 font-mono font-bold tracking-widest leading-none">
             {Math.floor(progress / 20) === 0 ? "00" : `0${Math.floor(progress / 20)}`}:{progress % 20 < 10 ? `0${progress % 20}` : progress % 20}
          </div>

          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>

      {/* Chapters list */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {videoSteps.map((step, idx) => (
          <button
            key={idx}
            onClick={() => handleTimelineClick(step.time)}
            className={`p-4 rounded-2xl border text-left rounded-[24px] transition-all ${activeStep === idx ? 'bg-[#ebf8ff] border-blue-200 shadow-sm' : 'bg-slate-50/50 border-gray-100 hover:bg-slate-50'}`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xl">{step.icon}</span>
              <span className="text-[8px] font-black uppercase text-slate-400">Step 0{idx + 1}</span>
            </div>
            <h4 className="font-bold text-xs mt-3 text-slate-900">{step.title}</h4>
            <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{step.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ==========================================
   COMPANY ROADMAP / HISTORY
   ========================================== */
function CompanyHistory() {
  const historyMilestones = [
    { year: "2011", title: "Noida Store #1 Opened", desc: "Launched manual laundry delivery operations in Sector-78 with a clear goal of dry cleaning excellence.", icon: <Building /> },
    { year: "2015", title: "First Centralized Workshop", desc: "Inaugurated a heavy dry cleaning machinery facility with dedicated steam presses in Noida Central.", icon: <TrendingUp /> },
    { year: "2019", title: "German Bio-Solvent Transition", desc: "Pioneered environment-safe biodegradable chemistry, removing hazardous perchlorethylene permanently.", icon: <Sparkles /> },
    { year: "2023", title: "White-Glove Doorstep Launch", desc: "Launched synchronized app platforms, GPS-enabled vans, and real-time cleaning updates in Noida Sector-1 Outlet.", icon: <Award /> },
    { year: "2026", title: "Noida's Premium Household Standard", desc: "Serving over 10,000 active Noida households with high fidelity and guaranteed care.", icon: <CheckCircle2 /> }
  ];

  return (
    <div className="space-y-8 relative">
      <div className="absolute top-1/2 left-4 md:left-1/2 w-0.5 bg-gray-100 h-[80%] -translate-y-1/2" />
      
      <div className="space-y-12">
        {historyMilestones.map((milestone, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 relative ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              
              {/* Year badge central marker */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-srm-blue text-white font-mono font-black text-xs flex items-center justify-center border-4 border-white shadow-md z-10">
                {milestone.year}
              </div>

              {/* Offset space-fining placeholder */}
              <div className="w-full md:w-1/2" />

              {/* Card item */}
              <div className="w-full md:w-1/2 pl-12 md:pl-0 bg-slate-50/50 p-6 border border-gray-100 rounded-[24px]">
                 <div className="flex gap-4 items-start">
                   <div className="w-10 h-10 rounded-xl bg-blue-50 text-srm-blue flex items-center justify-center shrink-0">
                     {milestone.icon}
                   </div>
                   <div className="space-y-1">
                      <h4 className="font-black text-slate-900 leading-tight">{milestone.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">{milestone.desc}</p>
                   </div>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================
   WORKSHOP OVERVIEW
   ========================================== */
function WorkshopOverview() {
  const machinery = [
    { name: "German Hydrocarbon Washers", spec: "Fibril safe eco-solubility extracting fine grease stains gently.", capacity: "40kg dry weight limits", manufacturer: "Böwe Textile, Germany" },
    { name: "Pony Vacuum Steam Tables", spec: "Direct moisture dry vacuums guaranteeing sharp, shiny-free press lines.", capacity: "240 garments/hour speed", manufacturer: "Pony Ironing, Italy" },
    { name: "Sealed Poly Packaging Columns", spec: "Airtight eco wrap protects fabrics against transport dust hazards.", capacity: "Instant barcoded dispatching", manufacturer: "Sankosha Co" }
  ];

  return (
    <div className="space-y-8">
      <div className="prose prose-slate max-w-none space-y-4">
        <p className="text-slate-500 font-semibold text-sm leading-relaxed">
           Our physical workshops operate the most precise technology in the dry cleaning industry. Clothes are scanned at check-in, matched to specific temperature profiles, processed in organic hydrocarbon solutions, and steam line-dried.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {machinery.map((m, idx) => (
          <div key={idx} className="bg-white border border-slate-100 p-6 rounded-[28px] shadow-sm hover:shadow-md transition-all space-y-4 text-left">
            <span className="text-2xl">⚙️</span>
            <div className="space-y-1">
               <h4 className="font-black text-slate-900">{m.name}</h4>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{m.manufacturer}</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">{m.spec}</p>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-100 text-xs">
               <span className="font-extrabold text-slate-700">Performance:</span> {m.capacity}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-[32px] flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="space-y-2">
          <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">Real-time Safety Checkouts</p>
          <h4 className="text-xl font-black">Want a Personalized Tour?</h4>
          <p className="text-xs text-slate-400 font-medium">Noida school kids, entrepreneurs & clients are welcome to inspect Sec-78 workshop on Sundays.</p>
        </div>
        <Button 
          onClick={() => toast.success("Tour request initialized. Support will reach out via WhatsApp.")}
          className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-xl"
        >
          Book Workshop Tour
        </Button>
      </div>
    </div>
  );
}

/* ==========================================
   FRANCHISE ENQUIRY APPLICATION FORM
   ========================================== */
function FranchiseForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    investment: '₹15L - ₹20L',
    carpetArea: '',
    experience: 'None'
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.location) {
      toast.error("Please fill in your name, contact mobile, and target location.");
      return;
    }
    setStep(2);
  };

  // Automated calculator
  const getCalculation = () => {
    const isHigh = formData.investment.includes('25L') || formData.investment.includes('35L');
    return {
      fee: "₹4.5 Lakhs (One-time Setup Fee Included)",
      setupCosts: isHigh ? "₹14 Lakhs" : "₹9.5 Lakhs",
      avgReturn: isHigh ? "₹1.8L - ₹2.5L/Month Net Profit" : "₹1.1L - ₹1.5L/Month Net Profit",
      breakeven: isHigh ? "Around 14 Months" : "Around 12 Months"
    };
  };

  const cal = getCalculation();

  return (
    <div className="space-y-6">
      {step === 1 ? (
        <form onSubmit={handleApply} className="grid md:grid-cols-2 gap-6 text-left">
          <div className="col-span-2 space-y-2">
             <h3 className="text-xl font-black tracking-tight text-slate-900">Partner with India's Elite Cleaners</h3>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Fill in parameters to get setup valuation estimates</p>
          </div>

          <div className="space-y-1.5 col-span-2 md:col-span-1">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Candidate Full Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Rahul Verma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-gray-100 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:border-srm-blue"
            />
          </div>

          <div className="space-y-1.5 col-span-2 md:col-span-1">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">WhatsApp Contact Number</label>
            <input 
              type="tel" 
              required
              maxLength={10}
              placeholder="e.g. 9876543210"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
              className="w-full bg-slate-50 border border-gray-100 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:border-srm-blue"
            />
          </div>

          <div className="space-y-1.5 col-span-2 md:col-span-1">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Target Location / Sector</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Sector 150, Noida"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-slate-50 border border-gray-100 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:border-srm-blue"
            />
          </div>

          <div className="space-y-1.5 col-span-2 md:col-span-1">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Investment Budget Capacity</label>
            <select 
              value={formData.investment}
              onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
              className="w-full bg-slate-50 border border-gray-100 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:border-srm-blue"
            >
              <option value="₹15L - ₹20L">₹15L - ₹20L (Mini-Hub)</option>
              <option value="₹20L - ₹25L">₹20L - ₹25L (Medium Core)</option>
              <option value="₹25L - ₹35L">₹25L - ₹35L (Mega Regional)</option>
            </select>
          </div>

          <div className="space-y-1.5 col-span-2 md:col-span-1">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Proposed Carpet Area (Sq. Ft)</label>
            <input 
              type="text" 
              placeholder="e.g. 350 sq. ft."
              value={formData.carpetArea}
              onChange={(e) => setFormData({ ...formData, carpetArea: e.target.value })}
              className="w-full bg-slate-50 border border-gray-100 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:border-srm-blue"
            />
          </div>

          <div className="space-y-1.5 col-span-2 md:col-span-1">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Prior Business Experience</label>
            <select 
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full bg-slate-50 border border-gray-100 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:border-srm-blue"
            >
              <option value="None">No prior business background</option>
              <option value="Retail">Retail store management</option>
              <option value="Laundry">Existing laundry industry</option>
            </select>
          </div>

          <div className="col-span-2 pt-4">
            <Button 
              type="submit" 
              className="w-full h-12 bg-srm-blue text-white rounded-xl font-bold uppercase tracking-wider text-xs"
            >
              Estimate Setup Break-even & Apply
            </Button>
          </div>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-left"
        >
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[28px] text-center space-y-2">
            <span className="text-4xl text-emerald-500">🏆</span>
            <h4 className="text-lg font-black text-emerald-800 uppercase">Valuation Proposal Ready!</h4>
            <p className="text-xs text-emerald-600 font-bold">A customized franchise proposal has been registered for Rahul Verma.</p>
          </div>

          <div className="bg-slate-50 border border-gray-100 p-6 rounded-[32px] space-y-4">
             <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">SRM Franchise Feasibility calculations</h4>
             
             <div className="grid sm:grid-cols-2 gap-4">
               <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-slate-200/50 pb-3 sm:pb-0">
                  <p className="text-[10px] text-gray-400 font-black uppercase">Franchise Fee</p>
                  <p className="font-bold text-slate-900 text-sm">{cal.fee}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-black uppercase">Equipment Setup Expenses</p>
                  <p className="font-bold text-slate-900 text-sm">{cal.setupCosts}</p>
               </div>
               <div className="space-y-1 border-t border-slate-200/50 pt-3">
                  <p className="text-[10px] text-gray-400 font-black uppercase">Calculated ROI Profit Margin</p>
                  <p className="font-bold text-emerald-600 text-sm">{cal.avgReturn}</p>
               </div>
               <div className="space-y-1 border-t border-slate-200/50 pt-3">
                  <p className="text-[10px] text-gray-400 font-black uppercase">Estimated Breakeven Point</p>
                  <p className="font-bold text-indigo-600 text-sm">{cal.breakeven}</p>
               </div>
             </div>
          </div>

          <div className="flex gap-3 pt-2">
             <Button 
               variant="outline" 
               className="flex-1 rounded-xl"
               onClick={() => setStep(1)}
             >
               Modify Parameters
             </Button>
             <Button 
               className="flex-1 bg-srm-blue text-white rounded-xl"
               onClick={() => {
                 toast.success("Detailed franchise documents sent to WhatsApp!");
                 onClose();
               }}
             >
               Confirm & Submit Application
             </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ==========================================
   CAREERS OPENINGS PAGE
   ========================================== */
function CareersPage() {
  const jobs = [
    { title: "Quality Control Officer", dept: "Sector-78 Workshop", salary: "₹25,000 - ₹32,000 / month", requirements: "Prior fabric inspection background." },
    { title: "Premium Delivery Logistics Pilot", dept: "Doorstep Division", salary: "₹18,000 + Fuel Incentives", requirements: "Valid light motor vehicle license." },
    { title: "Retail Store Executive", dept: "Sector-1 Paramount Outlet", salary: "₹20,000 - ₹24,000 / month", requirements: "Basic computer spreadsheet literacy." }
  ];

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [appState, setAppState] = useState({ name: '', phone: '', cvSent: false });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appState.name || !appState.phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    setAppState({ ...appState, cvSent: true });
  };

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-1">
         <h3 className="text-xl font-black text-slate-900 tracking-tight">Open Opportunities in Noida</h3>
         <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Help us deliver white-glove laundry experience</p>
      </div>

      {!selectedJob ? (
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-slate-50/50 border border-gray-100 p-6 rounded-[24px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                   <span className="px-2 py-0.5 rounded-md bg-gray-100 border text-[9px] text-gray-500 font-black uppercase tracking-widest">{job.dept}</span>
                   <span className="text-emerald-600 text-[10px] font-bold">{job.salary}</span>
                 </div>
                 <h4 className="text-lg font-black text-slate-800">{job.title}</h4>
                 <p className="text-xs text-gray-400 font-bold">Needs: {job.requirements}</p>
              </div>
              <Button 
                onClick={() => setSelectedJob(job.title)}
                className="bg-srm-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold shrink-0 self-start sm:self-center"
              >
                Apply Now <ChevronRight size={14} className="ml-1" />
              </Button>
            </div>
          ))}
        </div>
      ) : !appState.cvSent ? (
        <form onSubmit={handleApply} className="bg-slate-50 border border-gray-100 p-6 rounded-[28px] space-y-4">
           <h4 className="text-base font-black text-indigo-900">Applying for: {selectedJob}</h4>
           
           <div className="space-y-1">
             <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Candidate Name</label>
             <input 
               type="text" 
               required
               placeholder="Rahul Verma" 
               value={appState.name}
               onChange={(e) => setAppState({...appState, name: e.target.value})}
               className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:outline-none"
             />
           </div>

           <div className="space-y-1">
             <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Phone / WhatsApp</label>
             <input 
               type="tel" 
               required
               maxLength={10}
               placeholder="9876543210" 
               value={appState.phone}
               onChange={(e) => setAppState({...appState, phone: e.target.value.replace(/\D/g, '')})}
               className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:outline-none"
             />
           </div>

           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Resume File / Profile Summary</label>
             <div className="border border-dashed border-slate-200 py-6 text-center rounded-xl bg-white/50 cursor-pointer hover:border-srm-blue hover:bg-[#f6faff] transition-all">
                <UploadCloud className="mx-auto text-slate-400 mb-1" size={24} />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Click or Drag PDF CV File here</p>
             </div>
           </div>

           <div className="flex gap-3 pt-2">
             <Button 
               variant="outline" 
               className="flex-1 rounded-xl"
               onClick={() => setSelectedJob(null)}
             >
               Go Back
             </Button>
             <Button 
               type="submit"
               className="flex-1 bg-srm-blue text-white rounded-xl"
             >
               Send CV Submission
             </Button>
           </div>
        </form>
      ) : (
        <div className="text-center bg-emerald-50 border border-emerald-100 p-8 rounded-[32px] space-y-4">
           <span className="text-3xl">🎉</span>
           <h4 className="text-lg font-black text-emerald-800">Application Lodged!</h4>
           <p className="text-xs text-emerald-600 font-bold max-w-sm mx-auto leading-relaxed">
             Thank you {appState.name}. We have successfully indexed your application documents for {selectedJob}. Our hiring representative will call you within 2 business days.
           </p>
           <Button 
             variant="outline" 
             className="rounded-xl mt-4"
             onClick={() => {
               setSelectedJob(null);
               setAppState({ name: '', phone: '', cvSent: false });
             }}
           >
             View Other Openings
           </Button>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   TERMS OF PREMIUM SERVICE
   ========================================== */
function TermsAndConditions() {
  return (
    <div className="space-y-6 text-left text-xs text-slate-600 leading-relaxed font-semibold">
      <div className="space-y-4 border-l-2 border-srm-blue pl-4">
        <h4 className="font-extrabold text-[#111] uppercase tracking-wide">1. Accidental Damage Cover & Reimbursements</h4>
        <p>
          Each client order is guarded with Accidental Protection. In the extremely remote case of loss, shrinkage, or irreversible damage to a garment, SRM Dry Cleaners will compensate the client. The reimbursement value is calculated up to <strong>10 times the service rate charged for that item</strong>, or the verified material value, whichever is lower.
        </p>
      </div>

      <div className="space-y-4 border-l-2 border-rose-500 pl-4">
        <h4 className="font-extrabold text-[#111] uppercase tracking-wide">2. Delivery Time Commitments</h4>
        <p>
           Our Standard delivery cycle is 3 to 4 business days. On-site express services are dispatched back inside 24 hours. While we commit to punctual Noida doorstep pick and drops, some delay might occur during alternate Thursdays when central washing drums go through structural preventative testing.
        </p>
      </div>

      <div className="space-y-4 border-l-2 border-emerald-505 pl-4">
        <h4 className="font-extrabold text-[#111] uppercase tracking-wide">3. Minimum Booking Order</h4>
        <p>
           Our premium complimentary home logistics fleet operates with a threshold. In-app pick reservations require an order threshold of at least 10 individual garments, or a total invoicing value of ₹350/-.
        </p>
      </div>
    </div>
  );
}

/* ==========================================
   PRIVACY INFORMATION POLICY
   ========================================== */
function PrivacyPolicy() {
  return (
    <div className="space-y-6 text-left text-xs text-slate-600 leading-relaxed font-semibold">
      <div className="space-y-1">
         <h3 className="text-base font-black text-slate-800 uppercase tracking-tight">Your Data, Your Closet Assets</h3>
         <p className="text-gray-400">SRM respects client confidentiality details strictly.</p>
      </div>

      <div className="h-px bg-gray-50" />

      <ul className="space-y-3 list-disc pl-5">
        <li><strong>No External Data Merging:</strong> Your registration mobile log, GPS residential directions, and WhatsApp notification settings will never be exchanged or licensed to third-party advertising companies.</li>
        <li><strong>Protected Database Records:</strong> Orders log and invoice histories reside inside secure Firestore security channels where they can be queried exclusively by authorized SRM delivery pilots and the client themselves.</li>
        <li><strong>Contactless Secure Token Pay:</strong> Card and UPI transactions operate in highly secure redirect pathways and pass directly through merchant aggregators. No payment credentials ever reside in SRM files.</li>
      </ul>
    </div>
  );
}

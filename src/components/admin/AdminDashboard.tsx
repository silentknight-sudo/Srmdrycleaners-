import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Users, IndianRupee, Truck, Calendar, 
  Search, Filter, MoreHorizontal, Download, ArrowUpRight,
  TrendingUp, Clock, CheckCircle2, AlertCircle, MapPin,
  Check, Edit, RefreshCw, Sliders, Plus, FileText, Trash2
} from 'lucide-react';
import { db, seedServices } from '../../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { PRICING_DATA } from '../../constants';
import { ServiceSymbol, getServiceIcon } from '../ServiceSymbol';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

export function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  // Catalog Management States
  const [activeTab, setActiveTab] = useState<'orders' | 'catalog'>('orders');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState('all');
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // New manual creation states
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Mens Wear');
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [newWashIronPrice, setNewWashIronPrice] = useState('');
  const [newDryCleanPrice, setNewDryCleanPrice] = useState('');
  const [newSteamIronPrice, setNewSteamIronPrice] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'services'));
    const unsub = onSnapshot(q, (snap) => {
      setDbServices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Error fetching db services in admin dashboard:", error);
    });
    return () => unsub();
  }, []);

  const mergedCatalog = useMemo(() => {
    const pricingMap = new Map(PRICING_DATA.map(item => [item.id, item]));
    const dbMap = new Map(dbServices.map(item => [item.id, item]));

    const result: any[] = [];
    
    PRICING_DATA.forEach(original => {
      const dbItem = dbMap.get(original.id) as any;
      if (!dbItem || !dbItem.deleted) {
        result.push(dbItem ? { ...(original as any), ...(dbItem as any) } : original);
      }
    });

    dbServices.forEach(item => {
      if (!pricingMap.has(item.id) && !item.deleted) {
        result.push(item);
      }
    });

    return result;
  }, [dbServices]);

  const dynamicCategories = useMemo(() => {
    const cats = new Set<string>(['Mens Wear', 'Womens Wear', 'Household & Kidswear', 'Other']);
    mergedCatalog.forEach(item => {
      if (item.category) {
        cats.add(item.category);
      }
    });
    return Array.from(cats);
  }, [mergedCatalog]);

  const filteredCatalog = useMemo(() => {
    return mergedCatalog.filter(item => {
      const matchesCategory = catalogCategory === 'all' || item.category === catalogCategory;
      const matchesSearch = item.name.toLowerCase().includes(catalogSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [mergedCatalog, catalogCategory, catalogSearch]);

  const resetNewServiceForm = () => {
    setNewServiceName('');
    setNewServiceCategory('Mens Wear');
    setCustomCategoryName('');
    setNewWashIronPrice('');
    setNewDryCleanPrice('');
    setNewSteamIronPrice('');
  };

  const handleCreateService = async () => {
    if (!newServiceName.trim()) {
      toast.error('Please specify a garment name.');
      return;
    }
    
    const categoryToSave = newServiceCategory === 'custom' ? customCategoryName.trim() : newServiceCategory;
    if (!categoryToSave) {
      toast.error('Please specify a valid category.');
      return;
    }

    if (!newWashIronPrice && !newDryCleanPrice && !newSteamIronPrice) {
      toast.error('Please supply at least one rate.');
      return;
    }

    const slug = newServiceName.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').trim();
    const uniqueId = `custom_${slug}_${Date.now()}`;

    try {
      const itemData: any = {
        id: uniqueId,
        name: newServiceName.trim(),
        category: categoryToSave,
      };

      if (newWashIronPrice) itemData.washIron = parseInt(newWashIronPrice, 10);
      if (newDryCleanPrice) itemData.dryClean = parseInt(newDryCleanPrice, 10);
      if (newSteamIronPrice) itemData.steamIron = parseInt(newSteamIronPrice, 10);

      await setDoc(doc(db, 'services', uniqueId), itemData);
      toast.success(`Successfully added ${newServiceName} to ${categoryToSave}!`);
      setIsAddingService(false);
      resetNewServiceForm();
    } catch (e) {
      console.error("Error creating custom service:", e);
      toast.error('Failed to register the new garment service to database.');
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm('Are you sure you want to delete this service rate permanently from the catalog?')) {
      return;
    }
    try {
      if (serviceId.toLowerCase().startsWith('custom_')) {
        await deleteDoc(doc(db, 'services', serviceId));
      } else {
        await setDoc(doc(db, 'services', serviceId), { deleted: true }, { merge: true });
      }
      toast.success('Service rate deleted successfully.');
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete service rate.');
    }
  };

  const handleExportPDF = () => {
    try {
      const gDoc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Group mergedCatalog by Category
      const categoriesGrouped: { [key: string]: any[] } = {};
      mergedCatalog.forEach(item => {
        const cat = item.category || 'Other';
        if (!categoriesGrouped[cat]) {
          categoriesGrouped[cat] = [];
        }
        categoriesGrouped[cat].push(item);
      });

      // Sort service items alphabetically in each category
      Object.keys(categoriesGrouped).forEach(cat => {
        categoriesGrouped[cat].sort((a, b) => a.name.localeCompare(b.name));
      });

      // Prepare table data
      const tableRows: any[] = [];
      let index = 1;

      Object.entries(categoriesGrouped).forEach(([catName, items]) => {
        items.forEach(item => {
          tableRows.push([
            index++,
            catName.toUpperCase(),
            item.name,
            item.washIron ? `₹${item.washIron}/-` : '—',
            item.dryClean ? `₹${item.dryClean}/-` : '—',
            item.steamIron ? `₹${item.steamIron}/-` : '—'
          ]);
        });
      });

      // Title & Branding Header
      gDoc.setFillColor(37, 99, 235); // SRM Blue
      gDoc.rect(0, 0, 210, 35, 'F');

      gDoc.setTextColor(255, 255, 255);
      gDoc.setFont('helvetica', 'bold');
      gDoc.setFontSize(20);
      gDoc.text('SRM PREMIUM DRY CLEANERS', 15, 18);
      
      gDoc.setFont('helvetica', 'normal');
      gDoc.setFontSize(9);
      gDoc.text('NOIDA SECTORS OFFICIAL SERVICE RATE SHEET', 15, 26);

      // Metadata info on right side
      gDoc.setFontSize(8.5);
      gDoc.text(`Generated: ${format(new Date(), 'dd MMM yyyy, hh:mm a')}`, 140, 16);
      gDoc.text('Version: Real-Time Sync v1.4', 140, 22);
      gDoc.text('Support Desk: Live Database Sync', 140, 28);

      // Intro message
      gDoc.setTextColor(71, 85, 105);
      gDoc.setFontSize(9.5);
      gDoc.setFont('helvetica', 'italic');
      gDoc.text('This is Noida\'s official master rates table representing dynamic customer catalogs. Prices are inclusive of GST.', 15, 43);

      // Run autoTable
      autoTable(gDoc, {
        startY: 48,
        head: [['S.No', 'Category', 'Garment/Service Name', 'Wash & Steam Iron', 'Dry Cleaning', 'Steam Iron Only']],
        body: tableRows,
        theme: 'striped',
        headStyles: {
          fillColor: [37, 99, 235], // SRM Blue
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: 'bold',
          halign: 'left'
        },
        bodyStyles: {
          fontSize: 8,
          textColor: [51, 65, 85],
          font: 'helvetica'
        },
        columnStyles: {
          0: { cellWidth: 12 },
          1: { cellWidth: 38 },
          2: { cellWidth: 55 },
          3: { cellWidth: 35 },
          4: { cellWidth: 35 },
          5: { cellWidth: 35 }
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252] // light slate
        },
        margin: { left: 15, right: 15 },
        didDrawPage: (data: any) => {
          // Footer watermark
          const str = `Page ${data.pageNumber}`;
          gDoc.setFontSize(8);
          gDoc.setTextColor(148, 163, 184);
          gDoc.setFont('helvetica', 'normal');
          gDoc.text(str, gDoc.internal.pageSize.width - 25, gDoc.internal.pageSize.height - 10);
          gDoc.text('SRM Dry Cleaners Corporate Office, Sector 1 Noida.', 15, gDoc.internal.pageSize.height - 10);
        }
      });

      gDoc.save('srm_official_services_sheet.pdf');
      toast.success('Successfully compiled services sheet into a PDF and started download!');
    } catch (error) {
      console.error("PDF generation failure:", error);
      toast.error('Failed to generate PDF.');
    }
  };

  const handleUpdatePrice = async (serviceId: string, field: 'washIron' | 'dryClean' | 'steamIron', value: string | number) => {
    const actionKey = `${serviceId}-${field}`;
    setLoadingAction(actionKey);
    try {
      const serviceRef = doc(db, 'services', serviceId);
      const docSnap = await getDoc(serviceRef);
      
      let processedValue: any = value;
      if (typeof value === 'string' && /^\d+$/.test(value)) {
        processedValue = parseInt(value, 10);
      }
      
      const updateData = { [field]: processedValue };
      
      if (docSnap.exists()) {
        await updateDoc(serviceRef, updateData);
      } else {
        const item = mergedCatalog.find(x => x.id === serviceId);
        await setDoc(serviceRef, {
          ...item,
          ...updateData
        });
      }
      toast.success('Rate updated successfully in real-time');
    } catch (e) {
      console.error(e);
      toast.error('Failed to update rate');
    } finally {
      setLoadingAction(null);
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesFilter = filter === 'all' || o.status === filter;
      const matchesSearch = o.customerName.toLowerCase().includes(search.toLowerCase()) || 
                           o.id.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [orders, filter, search]);

  const stats = useMemo(() => {
    const revenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? o.totalAmount : 0), 0);
    const pending = orders.filter(o => o.status === 'pending').length;
    const processing = orders.filter(o => o.status === 'processing').length;
    return { revenue, total: orders.length, pending, processing };
  }, [orders]);

  const chartData = useMemo(() => {
    const days: any = {};
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return format(d, 'MM/dd');
    }).reverse();

    last7Days.forEach(d => days[d] = 0);
    orders.forEach(o => {
      const date = format(new Date(o.createdAt), 'MM/dd');
      if (days[date] !== undefined) days[date]++;
    });

    return Object.entries(days).map(([name, value]) => ({ name, value }));
  }, [orders]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { 
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Order status updated to ${newStatus}`);
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl font-black tracking-tighter">CONTROL <span className="text-srm-blue underline decoration-rose-500 underline-offset-8">CENTRAL</span></h2>
          <p className="text-gray-500 font-medium font-sans">Global fleet management and dynamic service rate adjustment dashboard</p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" onClick={() => {
             seedServices(PRICING_DATA);
             toast.success('Successfully synchronized default master catalog to Cloud Database!');
           }} className="rounded-2xl border-2 h-12 font-bold hover:bg-gray-50 transition-all">
              <RefreshCw size={16} className="mr-2" /> Sync Default Master
           </Button>
           <Button className="rounded-2xl bg-gray-900 h-12 px-8 font-bold text-white hover:bg-gray-800 transition-all">
              Export Global Report <Download size={18} className="ml-2" />
           </Button>
        </div>
      </div>

      {/* Control Switcher Tabs */}
      <div className="flex border-b border-gray-100 pb-px gap-4">
         <button 
            onClick={() => setActiveTab('orders')}
            className={cn(
               "pb-4 px-6 font-black uppercase text-xs tracking-widest border-b-2 transition-all duration-200",
               activeTab === 'orders' 
                  ? "border-srm-blue text-srm-blue scale-102" 
                  : "border-transparent text-gray-400 hover:text-gray-900"
            )}
         >
            Live Orders Ledger ({filteredOrders.length})
         </button>
         <button 
            onClick={() => setActiveTab('catalog')}
            className={cn(
               "pb-4 px-6 font-black uppercase text-xs tracking-widest border-b-2 transition-all duration-200",
               activeTab === 'catalog' 
                  ? "border-srm-blue text-srm-blue scale-102" 
                  : "border-transparent text-gray-400 hover:text-gray-900"
            )}
         >
            Dynamic Rates Manager ({mergedCatalog.length})
         </button>
      </div>

      {activeTab === 'orders' ? (
        <>
          {/* Bento Grid Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <StatsCard 
                title="Total Revenue" 
                value={`₹${stats.revenue}`} 
                sub="Lifetime processed" 
                icon={<IndianRupee className="text-emerald-500" />}
                trend="+12.5%"
             />
             <StatsCard 
                title="Active Fleet" 
                value={stats.total.toString()} 
                sub="Garments in system" 
                icon={<ShoppingBag className="text-srm-blue" />}
                trend="+4.2%"
             />
             <StatsCard 
                title="Awaiting Pickup" 
                value={stats.pending.toString()} 
                sub="Queue priority: High" 
                icon={<Clock className="text-amber-500" />}
                isAlert={stats.pending > 5}
             />
             <StatsCard 
                title="Processing" 
                value={stats.processing.toString()} 
                sub="Workflow capacity: 64%" 
                icon={<TrendingUp className="text-indigo-500" />}
             />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
             {/* Chart Area */}
             <Card className="lg:col-span-2 rounded-[40px] border-none shadow-[0_8px_40px_rgba(0,0,0,0.04)] overflow-hidden bg-white p-10">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-black uppercase tracking-widest">Order Velocity</h3>
                   <Badge className="bg-blue-50 text-srm-blue border-blue-100 uppercase tracking-widest text-[10px] font-black">Past 7 Days</Badge>
                </div>
                <div className="h-[300px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} fontWeight={700} stroke="#94a3b8" />
                        <YAxis axisLine={false} tickLine={false} fontSize={10} fontWeight={700} stroke="#94a3b8" />
                        <Tooltip 
                           contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                           itemStyle={{ fontWeight: 800, fontSize: '12px' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" dot={{ r: 6, fill: '#2563eb', strokeWidth: 3, stroke: '#fff' }} />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </Card>

             {/* Secondary Stats/Info */}
             <div className="space-y-6">
                <Card className="rounded-[40px] border-none shadow-[0_8px_40px_rgba(0,0,0,0.04)] bg-srm-blue text-white p-8">
                   <div className="space-y-6">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                         <AlertCircle size={24} />
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-2xl font-black">System Alert</h4>
                         <p className="text-blue-100 text-sm font-medium font-sans">Greater Noida branch is reporting high laundry volume. Suggested pickup delay: +2 hours.</p>
                      </div>
                      <Button className="w-full bg-white text-srm-blue font-black rounded-2xl h-12 hover:bg-gray-50 transition-all">Global Broadcast</Button>
                   </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">CSAT Score</p>
                      <p className="text-3xl font-black mt-1">4.92</p>
                   </div>
                   <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fleet Active</p>
                      <p className="text-3xl font-black mt-1">12/12</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Orders Table */}
          <Card className="rounded-[40px] border-none shadow-[0_8px_40px_rgba(31,38,135,0.05)] overflow-hidden bg-white">
             <CardHeader className="p-10 pb-4 border-b border-gray-50 bg-gray-50/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                   <CardTitle className="text-2xl font-black tracking-tighter">GLOBAL LEDGER</CardTitle>
                   <div className="flex flex-wrap gap-4 w-full md:w-auto">
                      <div className="relative flex-1 md:w-64">
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                         <Input 
                            placeholder="Search IDs, Names..." 
                            className="pl-12 h-12 rounded-2xl border-none bg-white shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                         />
                      </div>
                      <Select value={filter} onValueChange={setFilter}>
                         <SelectTrigger className="w-full md:w-48 h-12 rounded-2xl border-none bg-white shadow-sm font-bold uppercase text-[10px] tracking-widest px-6">
                            <Filter size={14} className="mr-2" />
                            <SelectValue placeholder="Status Filter" />
                         </SelectTrigger>
                         <SelectContent className="rounded-2xl font-bold uppercase text-[10px]">
                            <SelectItem value="all">ALL STAGES</SelectItem>
                            <SelectItem value="pending">PENDING</SelectItem>
                            <SelectItem value="picked">PICKED</SelectItem>
                            <SelectItem value="processing">PROCESSING</SelectItem>
                            <SelectItem value="out_for_delivery">DISPATCHED</SelectItem>
                            <SelectItem value="delivered">DELIVERED</SelectItem>
                         </SelectContent>
                      </Select>
                   </div>
                </div>
             </CardHeader>
             <CardContent className="p-0">
                <div className="overflow-x-auto">
                   <Table className="border-collapse">
                      <TableHeader>
                         <TableRow className="border-none bg-gray-50/30">
                            <TableHead className="py-6 pl-10 font-black text-gray-400 uppercase tracking-widest text-[10px] w-48">Reference</TableHead>
                            <TableHead className="py-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Client</TableHead>
                            <TableHead className="py-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Logistics</TableHead>
                            <TableHead className="py-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Valuation</TableHead>
                            <TableHead className="py-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Workflow Status</TableHead>
                            <TableHead className="py-6 pr-10 text-right font-black text-gray-400 uppercase tracking-widest text-[10px]">Operations</TableHead>
                         </TableRow>
                      </TableHeader>
                      <TableBody>
                         {filteredOrders.length === 0 ? (
                            <TableRow>
                               <TableCell colSpan={6} className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest">No matching datasets found</TableCell>
                            </TableRow>
                         ) : (
                            filteredOrders.map((order) => (
                               <TableRow key={order.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 group">
                                  <TableCell className="py-8 pl-10">
                                     <div className="flex flex-col">
                                        <span className="font-mono font-black text-xs">#{order.id.slice(-8).toUpperCase()}</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">{format(new Date(order.createdAt), 'MMM d, hh:mm a')}</span>
                                     </div>
                                  </TableCell>
                                  <TableCell className="py-8">
                                     <div className="flex flex-col">
                                        <span className="font-extrabold text-sm">{order.customerName}</span>
                                        <span className="text-xs font-bold text-gray-400">{order.customerPhone}</span>
                                     </div>
                                  </TableCell>
                                  <TableCell className="py-8">
                                     <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                           <MapPin size={10} className="text-srm-blue" />
                                           <span className="text-[10px] font-black uppercase tracking-tighter text-srm-blue">{order.location}</span>
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 truncate max-w-[150px] mt-1">{order.address}</span>
                                     </div>
                                  </TableCell>
                                  <TableCell className="py-8">
                                     <div className="flex items-center gap-3">
                                        <IndianRupee size={14} className="text-emerald-500" />
                                        <div className="flex flex-col">
                                           <span className="font-black text-sm">₹{order.totalAmount}</span>
                                           <span className={cn(
                                              "text-[10px] font-black uppercase",
                                              order.paymentStatus === 'paid' ? "text-emerald-500" : "text-rose-500"
                                           )}>{order.paymentStatus}</span>
                                        </div>
                                     </div>
                                  </TableCell>
                                  <TableCell className="py-8">
                                     <div className="w-56">
                                        <Select 
                                           value={order.status} 
                                           onValueChange={(v) => updateStatus(order.id, v)}
                                        >
                                           <SelectTrigger className="h-10 rounded-xl border-2 font-black uppercase text-[10px] tracking-widest">
                                              <SelectValue />
                                           </SelectTrigger>
                                           <SelectContent className="rounded-xl font-bold uppercase text-[10px]">
                                              <SelectItem value="pending">PENDING PICKUP</SelectItem>
                                              <SelectItem value="picked">PICKED UP</SelectItem>
                                              <SelectItem value="processing">PROCESSING</SelectItem>
                                              <SelectItem value="out_for_delivery">DISPATCHED</SelectItem>
                                              <SelectItem value="delivered">DELIVERED</SelectItem>
                                              <SelectItem value="cancelled">CANCELLED</SelectItem>
                                           </SelectContent>
                                        </Select>
                                     </div>
                                  </TableCell>
                                  <TableCell className="py-8 pr-10 text-right">
                                     <Button variant="ghost" className="rounded-xl font-black text-[10px] px-6 h-10 border border-gray-100 hover:bg-gray-900 hover:text-white transition-all">MANAGE</Button>
                                  </TableCell>
                               </TableRow>
                            ))
                         )}
                      </TableBody>
                   </Table>
                </div>
             </CardContent>
          </Card>
        </>
      ) : (
        /* Catalog pricing adjusting board */
        <div className="space-y-8 animate-fade-in">
           {/* Section Filter Controllers */}
           <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 bg-gray-50/50 border border-gray-100 rounded-[32px] shadow-sm">
              <div className="space-y-1 text-center md:text-left">
                 <h3 className="font-black tracking-tight text-xl uppercase">pricing catalogs</h3>
                 <p className="text-xs text-gray-400 font-medium font-sans">Modify values instantly. Overrides are immediately published to search indexing & client bookings.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                 <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input 
                       placeholder="Search garment or rate..." 
                       value={catalogSearch}
                       onChange={(e) => setCatalogSearch(e.target.value)}
                       className="pl-11 h-11 rounded-xl border-none bg-white shadow-sm font-medium"
                    />
                 </div>
                 <Select value={catalogCategory} onValueChange={setCatalogCategory}>
                    <SelectTrigger className="w-full md:w-48 h-11 px-5 rounded-xl border-none bg-white shadow-sm text-xs font-black uppercase tracking-wider">
                       <Sliders size={14} className="mr-2 text-srm-blue" />
                       <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl font-bold text-xs uppercase">
                       <SelectItem value="all">ALL CATEGORIES</SelectItem>
                       {dynamicCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat.toUpperCase()}</SelectItem>
                       ))}
                    </SelectContent>
                 </Select>
              </div>
           </div>

           {/* Catalog Action Toolbar */}
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm">
              <div className="flex flex-wrap gap-3.5 w-full sm:w-auto mt-1">
                 <Button 
                    onClick={() => setIsAddingService(!isAddingService)} 
                    className="bg-srm-blue hover:bg-blue-600 text-white rounded-2xl h-11 px-6 font-bold flex items-center gap-2 shadow-sm text-xs uppercase tracking-wider transition-all"
                 >
                    <Plus size={16} /> Add Garment / Category
                 </Button>
                 <Button 
                    onClick={handleExportPDF}
                    variant="outline"
                    className="border-2 rounded-2xl h-11 px-6 font-bold flex items-center gap-2 hover:bg-gray-50 text-xs uppercase tracking-wider transition-all"
                  >
                    <FileText size={16} className="text-rose-500" /> Export Services PDF
                 </Button>
              </div>
              <p className="text-xs text-gray-400 font-extrabold tracking-widest uppercase">CATALOG REFCOUNT: {mergedCatalog.length} ITEMS</p>
           </div>

           {/* Expandable Manual Creation Card */}
           <AnimatePresence>
              {isAddingService && (
                 <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                 >
                    <Card className="rounded-[32px] p-8 border-2 border-srm-blue/20 bg-[#f8fafc]/30 shadow-md">
                       <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                          <div className="text-left">
                             <h4 className="font-black text-xl text-slate-900 uppercase tracking-tight">Add New Garment / Service Rate</h4>
                             <p className="text-xs text-slate-500 font-medium">Create a new garment service record in central cloud database</p>
                          </div>
                          <Button 
                             variant="ghost" 
                             size="sm" 
                             onClick={() => setIsAddingService(false)} 
                             className="rounded-full w-8 h-8 p-0"
                          >
                             ✕
                          </Button>
                       </div>

                       <div className="grid md:grid-cols-12 gap-6 text-left">
                          <div className="col-span-12 md:col-span-4 space-y-1.5 text-left">
                             <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Garment / Service Name</Label>
                             <Input 
                                placeholder="e.g. Silk Dupatta, Designer Sherwani"
                                value={newServiceName}
                                onChange={(e) => setNewServiceName(e.target.value)}
                                className="h-11 rounded-xl bg-white border-gray-200"
                             />
                          </div>

                          <div className="col-span-12 md:col-span-4 space-y-1.5 text-left">
                             <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Select Category</Label>
                             <Select 
                                value={newServiceCategory} 
                                onValueChange={(val) => {
                                   setNewServiceCategory(val);
                                   if (val !== 'custom') {
                                      setCustomCategoryName('');
                                   }
                                }}
                             >
                                <SelectTrigger className="h-11 rounded-xl bg-white border-gray-200 font-bold text-xs uppercase font-sans">
                                   <SelectValue placeholder="Choose Category" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl font-bold text-xs uppercase font-sans">
                                   {dynamicCategories.map(cat => (
                                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                   ))}
                                   <SelectItem value="custom" className="text-srm-blue font-black font-sans">+ Create New Category...</SelectItem>
                                </SelectContent>
                             </Select>
                          </div>

                          {newServiceCategory === 'custom' && (
                             <div className="col-span-12 md:col-span-4 space-y-1.5 animate-fade-in text-left">
                                <Label className="text-xs font-black uppercase tracking-wider text-srm-blue">Custom Category Name</Label>
                                <Input 
                                   placeholder="e.g. Traditional Wear, Athleisure"
                                   value={customCategoryName}
                                   onChange={(e) => setCustomCategoryName(e.target.value)}
                                   className="h-11 rounded-xl bg-white border-srm-blue/40"
                                />
                             </div>
                          )}

                          <div className="col-span-12 h-px bg-slate-150 my-2" />

                          <div className="col-span-12 md:col-span-4 space-y-1.5 text-left">
                             <Label className="text-xs font-black uppercase tracking-wider text-slate-500 font-sans font-sans">Wash & Steam Iron Price (Optional)</Label>
                             <div className="relative flex items-center">
                                <span className="absolute left-3.5 text-xs font-bold text-gray-400 font-mono">₹</span>
                                <Input 
                                   type="number"
                                   placeholder="—"
                                   value={newWashIronPrice}
                                   onChange={(e) => setNewWashIronPrice(e.target.value)}
                                   className="h-11 pl-8 rounded-xl bg-white border-gray-200"
                                />
                             </div>
                          </div>

                          <div className="col-span-12 md:col-span-4 space-y-1.5 text-left">
                             <Label className="text-xs font-black uppercase tracking-wider text-slate-500 font-sans">Dry Cleaning Price (Optional)</Label>
                             <div className="relative flex items-center">
                                <span className="absolute left-3.5 text-xs font-bold text-gray-400 font-mono">₹</span>
                                <Input 
                                   type="number"
                                   placeholder="—"
                                   value={newDryCleanPrice}
                                   onChange={(e) => setNewDryCleanPrice(e.target.value)}
                                   className="h-11 pl-8 rounded-xl bg-white border-gray-200"
                                />
                             </div>
                          </div>

                          <div className="col-span-12 md:col-span-4 space-y-1.5 text-left">
                             <Label className="text-xs font-black uppercase tracking-wider text-slate-500 font-sans">Steam Iron Only Price (Optional)</Label>
                             <div className="relative flex items-center">
                                <span className="absolute left-3.5 text-xs font-bold text-gray-400 font-mono">₹</span>
                                <Input 
                                   type="number"
                                   placeholder="—"
                                   value={newSteamIronPrice}
                                   onChange={(e) => setNewSteamIronPrice(e.target.value)}
                                   className="h-11 pl-8 rounded-xl bg-white border-gray-200"
                                 />
                              </div>
                           </div>

                           <div className="col-span-12 flex justify-end gap-3 pt-4 border-t border-slate-150 mt-4">
                              <Button 
                                 variant="ghost" 
                                 onClick={() => {
                                    setIsAddingService(false);
                                    resetNewServiceForm();
                                 }}
                                 className="rounded-xl h-11 font-bold text-xs uppercase"
                              >
                                 Cancel
                              </Button>
                              <Button 
                                 onClick={handleCreateService}
                                 className="bg-gradient-to-r from-srm-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl h-11 font-bold uppercase text-xs tracking-wider"
                              >
                                 Publish Service
                              </Button>
                           </div>
                        </div>
                     </Card>
                  </motion.div>
               )}
            </AnimatePresence>

           {/* Rate editing grids */}
           {filteredCatalog.length === 0 ? (
              <div className="py-24 text-center text-gray-400 font-black uppercase tracking-widest border border-dashed border-gray-200 rounded-3xl bg-gray-50/30">
                 No catalog garment matches search parameters
              </div>
           ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 {filteredCatalog.map(item => (
                    <CatalogServiceCard 
                       key={item.id} 
                       item={item} 
                       onSave={handleUpdatePrice} 
                       onDelete={handleDeleteService}
                       loadingAction={loadingAction}
                    />
                 ))}
              </div>
           )}
        </div>
      )}
    </div>
  );
}

/* Custom interactive nested widget to encapsulate change states safely to keep high-frequency inputs responsive */
function CatalogServiceCard({ item, onSave, onDelete, loadingAction }: { key?: any, item: any, onSave: (id: string, field: 'washIron' | 'dryClean' | 'steamIron', value: string | number) => Promise<void>, onDelete?: (id: string) => Promise<void>, loadingAction: string | null }) {
  const [washIron, setWashIron] = useState(item.washIron ?? '');
  const [dryClean, setDryClean] = useState(item.dryClean ?? '');
  const [steamIron, setSteamIron] = useState(item.steamIron ?? '');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setWashIron(item.washIron ?? '');
    setDryClean(item.dryClean ?? '');
    setSteamIron(item.steamIron ?? '');
    setHasChanges(false);
  }, [item]);

  const handleFieldChange = (field: string, value: string) => {
    if (field === 'washIron') setWashIron(value);
    if (field === 'dryClean') setDryClean(value);
    if (field === 'steamIron') setSteamIron(value);
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      if (washIron !== (item.washIron ?? '')) {
         await onSave(item.id, 'washIron', washIron);
      }
      if (dryClean !== (item.dryClean ?? '')) {
         await onSave(item.id, 'dryClean', dryClean);
      }
      if (steamIron !== (item.steamIron ?? '')) {
         await onSave(item.id, 'steamIron', steamIron);
      }
      setHasChanges(false);
    } catch (e) {
      toast.error('Failed to publish changes to cloud state');
    }
  };

  return (
    <Card className="rounded-[32px] border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] transition-all bg-white overflow-hidden flex flex-col h-full border border-gray-100/50 group relative">
       <div className="p-4 border-b border-gray-100/40 relative">
          <ServiceSymbol 
             name={item.name} 
             category={item.category} 
             className="h-28 rounded-2xl w-full" 
             size={32} 
          />
          {onDelete && (
             <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(item.id)}
                className="absolute top-6 right-6 rounded-full w-8 h-8 p-0 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition-colors shadow-md z-10"
             >
                <Trash2 size={13} strokeWidth={2.5} />
              </Button>
          )}
       </div>
       
       <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
             <div>
                <p className="font-black text-lg text-gray-900 leading-tight tracking-tight">{item.name}</p>
                <span className="inline-block mt-2 text-[9px] font-black tracking-widest uppercase text-srm-blue bg-blue-50/60 px-3 py-1 rounded-full border border-blue-100/30">{item.category}</span>
             </div>
             
             <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between gap-4 py-1 border-b border-gray-50">
                   <span className="text-xs font-bold text-gray-400">Wash & Steam Iron</span>
                   <div className="relative flex items-center">
                      <span className="absolute left-2.5 text-xs font-bold text-gray-400">₹</span>
                      <Input 
                         type="text" 
                         value={washIron} 
                         placeholder="—" 
                         onChange={(e) => handleFieldChange('washIron', e.target.value)}
                         className="w-24 h-8 pl-5 pr-2.5 rounded-lg text-right text-xs font-mono font-bold hover:border-gray-300 focus:border-srm-blue transition-colors border-gray-200"
                      />
                   </div>
                </div>
                <div className="flex items-center justify-between gap-4 py-1 border-b border-gray-50">
                   <span className="text-xs font-bold text-gray-400">Dry Cleaning</span>
                   <div className="relative flex items-center">
                      <span className="absolute left-2.5 text-xs font-bold text-gray-400">₹</span>
                      <Input 
                         type="text" 
                         value={dryClean} 
                         placeholder="—" 
                         onChange={(e) => handleFieldChange('dryClean', e.target.value)}
                         className="w-24 h-8 pl-5 pr-2.5 rounded-lg text-right text-xs font-mono font-bold hover:border-gray-300 focus:border-srm-blue transition-colors border-gray-200"
                      />
                   </div>
                </div>
                <div className="flex items-center justify-between gap-4 py-1 border-gray-50">
                   <span className="text-xs font-bold text-gray-400">Steam Ironing Only</span>
                   <div className="relative flex items-center">
                      <span className="absolute left-2.5 text-xs font-bold text-gray-400">₹</span>
                      <Input 
                         type="text" 
                         value={steamIron} 
                         placeholder="—" 
                         onChange={(e) => handleFieldChange('steamIron', e.target.value)}
                         className="w-24 h-8 pl-5 pr-2.5 rounded-lg text-right text-xs font-mono font-bold hover:border-gray-300 focus:border-srm-blue transition-colors border-gray-200"
                      />
                   </div>
                </div>
             </div>
          </div>
          
          <Button 
             disabled={!hasChanges}
             onClick={handleSave}
             className={cn(
                "w-full h-11 rounded-15px text-xs font-black tracking-widest uppercase transition-all duration-300",
                hasChanges 
                   ? "bg-gradient-to-r from-srm-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg cursor-pointer transform -translate-y-px active:translate-y-0" 
                   : "bg-gray-100 text-gray-400 hover:bg-gray-100 cursor-not-allowed hover:text-gray-400"
             )}
          >
             {hasChanges ? 'Save Changes' : 'Saved'}
          </Button>
       </div>
    </Card>
  );
}

function StatsCard({ title, value, sub, icon, trend, isAlert }: any) {
  return (
    <Card className={cn(
       "rounded-[32px] border-none shadow-[0_8px_32px_rgba(0,0,0,0.03)] bg-white p-8 relative overflow-hidden group",
       isAlert && "ring-2 ring-amber-500/50"
    )}>
       <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
             <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 group-hover:scale-110 transition-transform duration-500">
                {icon}
             </div>
             {trend && (
                <Badge className="bg-emerald-50 text-emerald-600 border-none rounded-full px-2 py-0.5 text-[10px] font-bold">
                   <TrendingUp size={10} className="mr-1" /> {trend}
                </Badge>
             )}
          </div>
          <div className="space-y-1">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{title}</p>
             <p className="text-4xl font-black tracking-tighter">{value}</p>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             <p className="text-[10px] font-bold text-gray-500">{sub}</p>
          </div>
       </div>
    </Card>
  );
}

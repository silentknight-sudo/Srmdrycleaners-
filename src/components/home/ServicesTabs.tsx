import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { PRICING_DATA } from '../../constants';
import { ServiceSymbol, getServiceIcon } from '../ServiceSymbol';
import { Button } from '../ui/button';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

const formatPrice = (price: any) => {
  if (price === undefined || price === null || price === '') return '';
  const priceStr = price.toString();
  if (priceStr.toLowerCase().includes('contact') || priceStr.toLowerCase().includes('custom')) {
    return priceStr;
  }
  if (priceStr.includes('₹')) {
    return priceStr;
  }
  if (typeof price === 'string') {
    return `₹${priceStr}`;
  }
  return `₹${priceStr}/-`;
};

interface ServicesTabsProps {
  setView: (view: any) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export function ServicesTabs({ setView, selectedCategory, setSelectedCategory }: ServicesTabsProps) {
  const categories = ['Mens Wear', 'Womens Wear', 'Household & Kidswear', 'Other'];
  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'services'));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setDbServices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    }, (error) => {
      console.error("Error fetching dynamic services:", error);
    });
    return () => unsub();
  }, []);

  const mergedPricingData = useMemo(() => {
    if (dbServices.length === 0) return PRICING_DATA;
    return PRICING_DATA.map(original => {
      const dbItem = dbServices.find(item => item.id === original.id);
      if (dbItem) {
        return {
          ...original,
          ...dbItem
        };
      }
      return original;
    });
  }, [dbServices, dbServices.length]);

  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <p className="text-srm-blue font-bold uppercase tracking-widest text-sm">Transparent Pricing</p>
            <h2 className="text-5xl font-black tracking-tight">OUR SERVICE RATES</h2>
          </div>
          <div className="max-w-md text-gray-500 font-medium">
             Select a category below to explore our comprehensive service list and competitive rates.
          </div>
        </div>

        <Tabs 
          value={selectedCategory} 
          onValueChange={setSelectedCategory} 
          className="space-y-12"
        >
          <TabsList className="bg-gray-100/50 p-2 h-auto rounded-3xl border border-gray-200/50 flex-wrap justify-center md:inline-flex">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="px-8 py-3 rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-srm-blue font-bold transition-all"
              >
                {cat === 'Other' ? 'Special Services' : cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mergedPricingData.filter(s => s.category === cat).map((service, idx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card className="rounded-[32px] border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all group overflow-hidden bg-white h-full flex flex-col pt-4">
                      <div className="px-4">
                        <ServiceSymbol 
                          name={service.name} 
                          category={service.category} 
                          className="h-32 rounded-[24px] w-full" 
                          size={36} 
                        />
                      </div>

                      <div className="p-8 pb-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                          <h3 className="text-2xl font-bold tracking-tight text-gray-900">{service.name}</h3>
                          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-srm-blue">
                            {React.createElement(getServiceIcon(service.name, service.category), { size: 20 })}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {service.washIron && (
                            <div className="flex justify-between items-center py-3 border-b border-gray-50 group-hover:border-blue-100 transition-colors">
                              <span className="text-gray-500 font-medium text-sm">Wash & Steam Iron</span>
                              <span className="font-mono font-extrabold text-lg text-srm-blue">{formatPrice(service.washIron)}</span>
                            </div>
                          )}
                          {service.dryClean && (
                            <div className="flex justify-between items-center py-3 border-b border-gray-50 group-hover:border-rose-100 transition-colors">
                              <span className="text-gray-500 font-medium text-sm">Dry Cleaning</span>
                              <span className="font-mono font-extrabold text-lg text-srm-red">{formatPrice(service.dryClean)}</span>
                            </div>
                          )}
                          {service.steamIron && (
                            <div className="flex justify-between items-center py-3">
                              <span className="text-gray-500 font-medium text-sm">Steam Ironing only</span>
                              <span className="font-mono font-extrabold text-lg text-gray-700">{formatPrice(service.steamIron)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-auto p-4 pt-0">
                         <Button 
                            onClick={() => setView('book')}
                            className="w-full h-12 rounded-2xl bg-gray-50 hover:bg-srm-blue hover:text-white text-gray-600 font-bold border border-gray-100 hover:border-transparent transition-all opacity-0 group-hover:opacity-100"
                          >
                            Quick Reserve <ChevronRight size={18} className="ml-1" />
                          </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

import React from 'react';
import { 
  Shirt, 
  Sparkles, 
  Layers, 
  Bed, 
  Home, 
  Car, 
  Smile, 
  Scissors, 
  Waves, 
  Crown, 
  Briefcase, 
  ShoppingBag 
} from 'lucide-react';

interface ServiceSymbolProps {
  name: string;
  category: string;
  className?: string;
  iconClassName?: string;
  size?: number;
}

export function getServiceIcon(name: string, category: string) {
  const normalized = name.toLowerCase();
  
  if (normalized.includes('car dry')) return Car;
  if (normalized.includes('home') || normalized.includes('deep cleaning')) return Home;
  if (normalized.includes('toy') || normalized.includes('plastic toys')) return Smile;
  
  if (normalized.includes('bedsheet') || normalized.includes('blanket') || normalized.includes('quilt') || normalized.includes('pillow') || normalized.includes('cushion') || normalized.includes('curtain') || normalized.includes('table cloth')) {
    return Bed;
  }
  
  if (normalized.includes('bath') || normalized.includes('towel') || normalized.includes('apron') || normalized.includes('laundry')) {
    return Waves;
  }
  
  if (normalized.includes('wedding') || normalized.includes('gown') || normalized.includes('lehenga') || normalized.includes('sherwani') || normalized.includes('silk')) {
    return Crown;
  }
  
  if (normalized.includes('suit') || normalized.includes('blazer') || normalized.includes('coat') || normalized.includes('overcoat')) {
    return Briefcase;
  }
  
  if (normalized.includes('jeans') || normalized.includes('trouser') || normalized.includes('pyjama') || normalized.includes('lower') || normalized.includes('salwar') || normalized.includes('shorts')) {
    return Scissors;
  }
  
  if (normalized.includes('saree') || normalized.includes('dupatta') || normalized.includes('shawl') || normalized.includes('scarf') || normalized.includes('stole')) {
    return Layers;
  }
  
  if (normalized.includes('shirt') || normalized.includes('t-shirt') || normalized.includes('kurta') || normalized.includes('kurti') || normalized.includes('blouse') || normalized.includes('petticoat')) {
    return Shirt;
  }
  
  if (category === 'Mens Wear') return Shirt;
  if (category === 'Womens Wear') return Sparkles;
  if (category === 'Household & Kidswear') return Bed;
  
  return ShoppingBag;
}

export function ServiceSymbol({ name, category, className = '', iconClassName = '', size = 24 }: ServiceSymbolProps) {
  const IconComponent = getServiceIcon(name, category);
  
  let bgStyles = "from-indigo-50 to-blue-50 text-indigo-600 border-indigo-100/60";
  if (category === 'Womens Wear') {
    bgStyles = "from-rose-50 to-pink-50 text-rose-600 border-rose-100/60";
  } else if (category === 'Household & Kidswear') {
    bgStyles = "from-emerald-50 to-teal-50 text-emerald-600 border-emerald-100/60";
  } else if (category === 'Other') {
    bgStyles = "from-amber-50 to-orange-50 text-amber-600 border-amber-100/60";
  }

  return (
    <div className={`flex items-center justify-center rounded-2xl bg-gradient-to-br ${bgStyles} border shadow-sm ${className}`}>
      <IconComponent size={size} className={iconClassName} />
    </div>
  );
}

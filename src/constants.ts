export interface ServiceItem {
  id: string;
  name: string;
  category: 'Mens Wear' | 'Womens Wear' | 'Household & Kidswear' | 'Other';
  washIron?: number;
  dryClean?: number;
  steamIron?: number;
}

export const PRICING_DATA: ServiceItem[] = [
  // Mens Wear
  { id: 'm1', name: 'Shirt / T-Shirt', category: 'Mens Wear', washIron: 30, dryClean: 90, steamIron: 30 },
  { id: 'm2', name: 'Jeans Trouser', category: 'Mens Wear', washIron: 30, dryClean: 110, steamIron: 30 },
  { id: 'm3', name: 'Kurta (Plain)', category: 'Mens Wear', washIron: 45, dryClean: 150, steamIron: 30 },
  { id: 'm4', name: 'Sweater / Hood (Half)', category: 'Mens Wear', dryClean: 150, steamIron: 50 },
  { id: 'm5', name: 'Sweater (Full)', category: 'Mens Wear', dryClean: 180, steamIron: 75 },
  { id: 'm6', name: 'Blazer / Coat', category: 'Mens Wear', dryClean: 180, steamIron: 100 },
  { id: 'm7', name: 'Suit 2 Pcs', category: 'Mens Wear', dryClean: 280, steamIron: 120 },
  { id: 'm8', name: 'Suit 3 Pcs', category: 'Mens Wear', dryClean: 380, steamIron: 150 },
  { id: 'm9', name: 'Sherwani', category: 'Mens Wear', dryClean: 400, steamIron: 200 },
  
  // Womens Wear
  { id: 'w1', name: 'Kurti / Suit (Upper)', category: 'Womens Wear', washIron: 35, dryClean: 150, steamIron: 30 },
  { id: 'w2', name: 'Women Dress', category: 'Womens Wear', dryClean: 250, steamIron: 50 },
  { id: 'w3', name: 'Saree Silk', category: 'Womens Wear', dryClean: 220, steamIron: 50 },
  { id: 'w4', name: 'Shawl (Heavy)', category: 'Womens Wear', dryClean: 200, steamIron: 50 },
  { id: 'w5', name: 'Wedding Gown (Light)', category: 'Womens Wear', dryClean: 600, steamIron: 200 },
  { id: 'w6', name: 'Lehenga (Heavy)', category: 'Womens Wear', dryClean: 700, steamIron: 350 },
  
  // Household
  { id: 'h1', name: 'Pillow/Cushion Cover', category: 'Household & Kidswear', washIron: 30, dryClean: 70 },
  { id: 'h2', name: 'Bedsheet (Single)', category: 'Household & Kidswear', washIron: 70, dryClean: 150 },
  { id: 'h3', name: 'Bedsheet (Double)', category: 'Household & Kidswear', washIron: 90, dryClean: 200 },
  { id: 'h4', name: 'Curtain', category: 'Household & Kidswear', dryClean: 180 },
  { id: 'h5', name: 'Table Cloth', category: 'Household & Kidswear', washIron: 50, dryClean: 80 },
  { id: 'h6', name: 'Carpet', category: 'Household & Kidswear', dryClean: 40 },
];

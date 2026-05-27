export interface ServiceItem {
  id: string;
  name: string;
  category: 'Mens Wear' | 'Womens Wear' | 'Household & Kidswear' | 'Other';
  washIron?: number | string;
  dryClean?: number | string;
  steamIron?: number | string;
}

export const PRICING_DATA: ServiceItem[] = [
  // --- MENS WEAR (A-Z) ---
  { id: 'm1', name: 'Blazer / Coat', category: 'Mens Wear', dryClean: 200, steamIron: 100 },
  { id: 'm2', name: 'Jacket Full Heavy', category: 'Mens Wear', dryClean: 220, steamIron: 100 },
  { id: 'm3', name: 'Jacket Full Light', category: 'Mens Wear', dryClean: 180, steamIron: 80 },
  { id: 'm4', name: 'Jacket Half', category: 'Mens Wear', dryClean: 350, steamIron: 100 },
  { id: 'm5', name: 'Jacket Leather', category: 'Mens Wear', dryClean: '280-350', steamIron: 100 },
  { id: 'm6', name: 'Jeans Trouser', category: 'Mens Wear', washIron: 40, dryClean: 120, steamIron: 40 },
  { id: 'm7', name: 'Kurta (Plain)', category: 'Mens Wear', washIron: 50, dryClean: 150, steamIron: 50 },
  { id: 'm8', name: 'Lower / Pyjama', category: 'Mens Wear', washIron: 50, dryClean: 120, steamIron: 50 },
  { id: 'm9', name: 'Overcoat (Cotton / Polyester)', category: 'Mens Wear', dryClean: '450-800', steamIron: 250 },
  { id: 'm10', name: 'Overcoat (Woolen)', category: 'Mens Wear', dryClean: 350, steamIron: 100 },
  { id: 'm11', name: 'Sherwani', category: 'Mens Wear', dryClean: '450-480', steamIron: 250 },
  { id: 'm12', name: 'Shirt / T-Shirt', category: 'Mens Wear', washIron: 40, dryClean: 100, steamIron: 40 },
  { id: 'm13', name: 'Shorts', category: 'Mens Wear', washIron: 40, dryClean: 120, steamIron: 50 },
  { id: 'm14', name: 'Suit 2 Pcs', category: 'Mens Wear', dryClean: 300, steamIron: 130 },
  { id: 'm15', name: 'Suit 3 Pcs', category: 'Mens Wear', dryClean: 400, steamIron: 150 },
  { id: 'm16', name: 'Sweater / Hood (Half)', category: 'Mens Wear', dryClean: 150, steamIron: 60 },
  { id: 'm17', name: 'Sweater (Full)', category: 'Mens Wear', dryClean: 200, steamIron: 60 },
  { id: 'm18', name: 'Tie / Scarf / Stole', category: 'Mens Wear', dryClean: 100, steamIron: 40 },

  // --- WOMENS WEAR ---
  { id: 'w1', name: '1 Piece Suit', category: 'Womens Wear', dryClean: 200, steamIron: 100 },
  { id: 'w2', name: '2 Piece Suit', category: 'Womens Wear', dryClean: 300, steamIron: 130 },
  { id: 'w3', name: '3 Piece Suit', category: 'Womens Wear', dryClean: 400, steamIron: 150 },
  { id: 'w4', name: 'Blazer / Coat', category: 'Womens Wear', dryClean: 200, steamIron: 100 },
  { id: 'w5', name: 'Blouse', category: 'Womens Wear', dryClean: 80, steamIron: 30 },
  { id: 'w6', name: 'Blouse (Heavy)', category: 'Womens Wear', dryClean: 90, steamIron: 40 },
  { id: 'w7', name: 'Dupatta', category: 'Womens Wear', dryClean: 100, steamIron: 50 },
  { id: 'w8', name: 'Dupatta (Embroidery)', category: 'Womens Wear', dryClean: 150, steamIron: 70 },
  { id: 'w9', name: 'Jacket (Full)', category: 'Womens Wear', dryClean: '160-300', steamIron: 70 },
  { id: 'w10', name: 'Jacket (Half)', category: 'Womens Wear', dryClean: 130, steamIron: 50 },
  { id: 'w11', name: 'Jacket Leather', category: 'Womens Wear', dryClean: '350-500', steamIron: 120 },
  { id: 'w12', name: 'Jeans Trouser', category: 'Womens Wear', washIron: 40, dryClean: 120, steamIron: 30 },
  { id: 'w13', name: 'Kurti / Suit (Upper)', category: 'Womens Wear', washIron: 45, dryClean: 160, steamIron: 40 },
  { id: 'w14', name: 'Lower / Pyjama / Salwar', category: 'Womens Wear', washIron: 45, dryClean: 120, steamIron: 40 },
  { id: 'w15', name: 'Night Suit / Gown', category: 'Womens Wear', dryClean: 200 },
  { id: 'w16', name: 'Petticoat', category: 'Womens Wear', dryClean: 100, steamIron: 30 },
  { id: 'w17', name: 'Saree (Heavy)', category: 'Womens Wear', dryClean: '300-450', steamIron: 100 },
  { id: 'w18', name: 'Saree Charkh', category: 'Womens Wear', dryClean: 100, steamIron: 100 },
  { id: 'w19', name: 'Saree Cotton (Starch)', category: 'Womens Wear', dryClean: '200-250', steamIron: 100 },
  { id: 'w20', name: 'Saree Silk', category: 'Womens Wear', dryClean: 220, steamIron: 100 },
  { id: 'w21', name: 'Scarf / Stole', category: 'Womens Wear', dryClean: 120, steamIron: 50 },
  { id: 'w22', name: 'Shawl (Heavy)', category: 'Womens Wear', dryClean: 200, steamIron: 50 },
  { id: 'w23', name: 'Shawl (Light)', category: 'Womens Wear', dryClean: 150, steamIron: 50 },
  { id: 'w24', name: 'Shawl (Pashmina)', category: 'Womens Wear', dryClean: 270, steamIron: 60 },
  { id: 'w25', name: 'Shirt / T-Shirt', category: 'Womens Wear', washIron: 40, dryClean: 100, steamIron: 30 },
  { id: 'w26', name: 'Shorts', category: 'Womens Wear', washIron: 40, dryClean: 100, steamIron: 40 },
  { id: 'w27', name: 'Sweater / Hood (Full)', category: 'Womens Wear', dryClean: 190, steamIron: 60 },
  { id: 'w28', name: 'Sweater / Hood (Half)', category: 'Womens Wear', dryClean: 150, steamIron: 50 },
  { id: 'w29', name: 'Wedding Gown / Lehenga (Light)', category: 'Womens Wear', dryClean: '700-850', steamIron: 250 },
  { id: 'w30', name: 'Wedding Gown (Heavy)', category: 'Womens Wear', dryClean: '800-2000', steamIron: 350 },
  { id: 'w31', name: 'Women Bra / Undergarment', category: 'Womens Wear', dryClean: 60, steamIron: 30 },
  { id: 'w32', name: 'Women Dress', category: 'Womens Wear', dryClean: '300-650', steamIron: '100-250' },

  // --- HOUSEHOLD & KIDSWEAR ---
  { id: 'h1', name: 'Apron', category: 'Household & Kidswear', washIron: 50, dryClean: 100 },
  { id: 'h2', name: 'Bath Robe', category: 'Household & Kidswear', washIron: 50, dryClean: 100 },
  { id: 'h3', name: 'Bathing Towel', category: 'Household & Kidswear', washIron: 50, dryClean: 100 },
  { id: 'h4', name: 'Bedsheet (Double)', category: 'Household & Kidswear', washIron: 120, dryClean: 200 },
  { id: 'h5', name: 'Bedsheet (Single)', category: 'Household & Kidswear', washIron: 100, dryClean: 150 },
  { id: 'h6', name: 'Blanket / Quilt Heavy (Double)', category: 'Household & Kidswear', dryClean: 450 },
  { id: 'h7', name: 'Blanket / Quilt Heavy (Single)', category: 'Household & Kidswear', dryClean: 350 },
  { id: 'h8', name: 'Blanket / Quilt Light (Double)', category: 'Household & Kidswear', dryClean: 400 },
  { id: 'h9', name: 'Blanket / Quilt Light (Single)', category: 'Household & Kidswear', dryClean: 300 },
  { id: 'h10', name: 'Carpet (per sq. ft.)', category: 'Household & Kidswear', dryClean: '30-40 SQ. FT.' },
  { id: 'h11', name: 'Curtain', category: 'Household & Kidswear', dryClean: '250 per panel' },
  { id: 'h12', name: 'Hand Towel', category: 'Household & Kidswear', washIron: 40, dryClean: 50 },
  { id: 'h13', name: 'Pillow / Cushion Cover', category: 'Household & Kidswear', washIron: 30, dryClean: 80 },
  { id: 'h14', name: 'Quilt Cover (Double)', category: 'Household & Kidswear', washIron: 90, dryClean: 200, steamIron: 80 },
  { id: 'h15', name: 'Quilt Cover (Single)', category: 'Household & Kidswear', washIron: 70, dryClean: 150, steamIron: 80 },
  { id: 'h16', name: 'Table Cloth', category: 'Household & Kidswear', washIron: 60, dryClean: 100 },

  // --- SPECIAL & OTHER SERVICES ---
  { id: 'o1', name: 'Car Dry Cleaning', category: 'Other', dryClean: 'Contact support for elite packages' },
  { id: 'o2', name: 'Carpet Dry Cleaning Special', category: 'Other', dryClean: '30-40 per sq. ft.' },
  { id: 'o3', name: 'Home Deep Cleaning', category: 'Other', dryClean: 'Custom on-site valuation' },
  { id: 'o4', name: 'Laundry with Iron (by KG)', category: 'Other', washIron: '70 per KG' },
  { id: 'o5', name: 'Soft Toys (Small)', category: 'Other', dryClean: 50 },
  { id: 'o6', name: 'Soft Toys (Medium)', category: 'Other', dryClean: 100 },
  { id: 'o7', name: 'Soft Toys (Large)', category: 'Other', dryClean: 150 },
  { id: 'o8', name: 'Plastic Toys', category: 'Other', dryClean: '30-40 per toy set' }
];

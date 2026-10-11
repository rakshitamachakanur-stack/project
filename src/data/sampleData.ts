import { Product, SpecialOffer, PriceHistoryItem, AppNotification, CompetitorPrice } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Coca-Cola (750ml Pet Bottle)',
    category: 'Beverages',
    currentPrice: 40,
    costPrice: 25,
    stock: 100,
    minPrice: 32,
    maxPrice: 48,
    unit: 'bottle',
    description: 'Chilled refreshing carbonated cola beverage',
    lastUpdated: 'Today, 10:15 AM'
  },
  {
    id: 'prod-2',
    name: 'Amul Butterscotch Ice Cream (700ml)',
    category: 'Beverages',
    currentPrice: 130,
    costPrice: 90,
    stock: 24,
    minPrice: 110,
    maxPrice: 155,
    unit: 'tub',
    description: 'Rich creamy dessert with butterscotch praline crunches',
    lastUpdated: 'Yesterday, 04:30 PM'
  },
  {
    id: 'prod-3',
    name: 'Monsoon Heavy Duty Umbrella',
    category: 'Essentials',
    currentPrice: 299,
    costPrice: 175,
    stock: 18,
    minPrice: 249,
    maxPrice: 399,
    unit: 'piece',
    description: 'Windproof reinforced 3-fold automatic opening umbrella',
    lastUpdated: '2 days ago'
  },
  {
    id: 'prod-4',
    name: 'Kinley Packaged Drinking Water (1L)',
    category: 'Beverages',
    currentPrice: 20,
    costPrice: 12,
    stock: 190,
    minPrice: 16,
    maxPrice: 25,
    unit: 'bottle',
    description: 'Purified mineral water with reverse osmosis minerals',
    lastUpdated: 'Today, 08:00 AM'
  },
  {
    id: 'prod-5',
    name: 'Freshly Baked Margherita Pizza',
    category: 'Fresh Foods',
    currentPrice: 199,
    costPrice: 110,
    stock: 35,
    minPrice: 169,
    maxPrice: 249,
    unit: 'box',
    description: 'Classic cheese and herb pizza on hand-tossed sourdough base',
    lastUpdated: 'Today, 11:45 AM'
  },
  {
    id: 'prod-6',
    name: 'Pure Fresh Orange Juice (300ml)',
    category: 'Beverages',
    currentPrice: 65,
    costPrice: 38,
    stock: 42,
    minPrice: 50,
    maxPrice: 80,
    unit: 'cup',
    description: 'Cold-pressed 100% natural Nagpur orange juice with no added sugar',
    lastUpdated: 'Today, 09:15 AM'
  },
  {
    id: 'prod-7',
    name: 'Kurkure Masala Munch (90g)',
    category: 'Snacks',
    currentPrice: 20,
    costPrice: 15,
    stock: 220,
    minPrice: 18,
    maxPrice: 22,
    unit: 'packet',
    description: 'Spicy crunchy corn puff snack with chatpata masala flavour',
    lastUpdated: '3 days ago'
  },
  {
    id: 'prod-8',
    name: 'Britannia Daily Multigrain Bread (400g)',
    category: 'Packaged Food',
    currentPrice: 48,
    costPrice: 35,
    stock: 15,
    minPrice: 42,
    maxPrice: 55,
    unit: 'loaf',
    description: 'High-fibre wholesome sliced bread fortified with oats and linseed',
    lastUpdated: 'Today, 07:30 AM'
  }
];

export const MOCK_COMPETITORS_MAP: Record<string, CompetitorPrice[]> = {
  'prod-1': [
    { id: 'c1', sellerName: 'Shop A (QuickMart)', price: 42, difference: -2, distance: '120m away', rating: 4.5, lastChecked: '15 mins ago' },
    { id: 'c2', sellerName: 'Shop B (SuperBazaar)', price: 39, difference: 1, distance: '350m away', rating: 4.2, lastChecked: '32 mins ago' },
    { id: 'c3', sellerName: 'Shop C (Corner Kirana)', price: 41, difference: -1, distance: '500m away', rating: 4.6, lastChecked: '1 hour ago' },
  ],
  'prod-2': [
    { id: 'c1', sellerName: 'Shop A (QuickMart)', price: 135, difference: -5, distance: '120m away', rating: 4.5, lastChecked: '20 mins ago' },
    { id: 'c2', sellerName: 'Shop B (SuperBazaar)', price: 125, difference: 5, distance: '350m away', rating: 4.2, lastChecked: '45 mins ago' },
    { id: 'c3', sellerName: 'Shop C (Corner Kirana)', price: 132, difference: -2, distance: '500m away', rating: 4.6, lastChecked: '2 hours ago' },
  ],
  'prod-3': [
    { id: 'c1', sellerName: 'Shop A (QuickMart)', price: 320, difference: -21, distance: '120m away', rating: 4.5, lastChecked: '1 hour ago' },
    { id: 'c2', sellerName: 'Shop B (SuperBazaar)', price: 285, difference: 14, distance: '350m away', rating: 4.2, lastChecked: '3 hours ago' },
    { id: 'c3', sellerName: 'Shop C (Corner Kirana)', price: 310, difference: -11, distance: '500m away', rating: 4.6, lastChecked: '2 hours ago' },
  ],
  'prod-4': [
    { id: 'c1', sellerName: 'Shop A (QuickMart)', price: 20, difference: 0, distance: '120m away', rating: 4.5, lastChecked: '10 mins ago' },
    { id: 'c2', sellerName: 'Shop B (SuperBazaar)', price: 19, difference: 1, distance: '350m away', rating: 4.2, lastChecked: '30 mins ago' },
    { id: 'c3', sellerName: 'Shop C (Corner Kirana)', price: 20, difference: 0, distance: '500m away', rating: 4.6, lastChecked: '15 mins ago' },
  ],
  'prod-5': [
    { id: 'c1', sellerName: 'Shop A (QuickMart)', price: 219, difference: -20, distance: '120m away', rating: 4.5, lastChecked: '25 mins ago' },
    { id: 'c2', sellerName: 'Shop B (SuperBazaar)', price: 189, difference: 10, distance: '350m away', rating: 4.2, lastChecked: '1 hour ago' },
    { id: 'c3', sellerName: 'Shop C (Corner Kirana)', price: 205, difference: -6, distance: '500m away', rating: 4.6, lastChecked: '45 mins ago' },
  ],
  'prod-6': [
    { id: 'c1', sellerName: 'Shop A (QuickMart)', price: 70, difference: -5, distance: '120m away', rating: 4.5, lastChecked: '18 mins ago' },
    { id: 'c2', sellerName: 'Shop B (SuperBazaar)', price: 62, difference: 3, distance: '350m away', rating: 4.2, lastChecked: '50 mins ago' },
    { id: 'c3', sellerName: 'Shop C (Corner Kirana)', price: 65, difference: 0, distance: '500m away', rating: 4.6, lastChecked: '1 hour ago' },
  ],
  'prod-7': [
    { id: 'c1', sellerName: 'Shop A (QuickMart)', price: 20, difference: 0, distance: '120m away', rating: 4.5, lastChecked: '12 mins ago' },
    { id: 'c2', sellerName: 'Shop B (SuperBazaar)', price: 19, difference: 1, distance: '350m away', rating: 4.2, lastChecked: '40 mins ago' },
    { id: 'c3', sellerName: 'Shop C (Corner Kirana)', price: 20, difference: 0, distance: '500m away', rating: 4.6, lastChecked: '20 mins ago' },
  ],
  'prod-8': [
    { id: 'c1', sellerName: 'Shop A (QuickMart)', price: 50, difference: -2, distance: '120m away', rating: 4.5, lastChecked: '22 mins ago' },
    { id: 'c2', sellerName: 'Shop B (SuperBazaar)', price: 46, difference: 2, distance: '350m away', rating: 4.2, lastChecked: '1 hour ago' },
    { id: 'c3', sellerName: 'Shop C (Corner Kirana)', price: 48, difference: 0, distance: '500m away', rating: 4.6, lastChecked: '30 mins ago' },
  ],
};

export const INITIAL_SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'off-1',
    name: 'Festival Special Discount',
    tagline: 'Ganesh Chaturthi Festive Rush — Boost impulse refreshment volume',
    type: 'festival',
    discount: '10% OFF',
    discountValue: 10,
    productId: 'prod-1',
    productName: 'Coca-Cola (750ml Pet Bottle)',
    expectedSalesIncrease: '+42% higher volume',
    expectedProfitImpact: 1450,
    startDate: '10 Oct 2026',
    endDate: '15 Oct 2026',
    isActive: true,
    colorScheme: 'purple'
  },
  {
    id: 'off-2',
    name: 'Excess Stock Clearance',
    tagline: 'High Kurkure inventory (220 packets) — Liquidate before expiry',
    type: 'excess_stock',
    discount: 'Buy 2, Get 5% OFF',
    discountValue: 5,
    productId: 'prod-7',
    productName: 'Kurkure Masala Munch (90g)',
    expectedSalesIncrease: '+68% inventory clearance',
    expectedProfitImpact: 880,
    startDate: '08 Oct 2026',
    endDate: '14 Oct 2026',
    isActive: true,
    colorScheme: 'amber'
  },
  {
    id: 'off-3',
    name: 'Slow Moving Product Flash Deal',
    tagline: 'Limited Time Evening Booster — Clear fresh bread before end of day',
    type: 'slow_moving',
    discount: 'Flat ₹5 OFF',
    discountValue: 5,
    productId: 'prod-8',
    productName: 'Britannia Daily Multigrain Bread (400g)',
    expectedSalesIncrease: '+30% daily sales',
    expectedProfitImpact: 420,
    startDate: '10 Oct 2026',
    endDate: '11 Oct 2026',
    isActive: false,
    colorScheme: 'emerald'
  },
  {
    id: 'off-4',
    name: 'Rainy Day Essentials Bundle',
    tagline: 'Dynamic Rain Surge — Bundle umbrella with hot snack voucher',
    type: 'bundle',
    discount: 'Save ₹30 on Bundle',
    discountValue: 30,
    productId: 'prod-3',
    productName: 'Monsoon Heavy Duty Umbrella',
    expectedSalesIncrease: '+85% bundle adoption',
    expectedProfitImpact: 2100,
    startDate: '10 Oct 2026',
    endDate: '12 Oct 2026',
    isActive: false,
    colorScheme: 'blue'
  }
];

export const INITIAL_PRICE_HISTORY: PriceHistoryItem[] = [
  {
    id: 'hist-1',
    productId: 'prod-1',
    productName: 'Coca-Cola (750ml)',
    previousPrice: 38,
    recommendedPrice: 40,
    approvedPrice: 40,
    date: '08 Oct 2026, 02:15 PM',
    salesVolume: 64,
    profitEarned: 960,
    changeType: 'Approved AI'
  },
  {
    id: 'hist-2',
    productId: 'prod-2',
    productName: 'Amul Butterscotch Ice Cream',
    previousPrice: 120,
    recommendedPrice: 130,
    approvedPrice: 130,
    date: '07 Oct 2026, 11:30 AM',
    salesVolume: 22,
    profitEarned: 880,
    changeType: 'Approved AI'
  },
  {
    id: 'hist-3',
    productId: 'prod-4',
    productName: 'Kinley Water (1L)',
    previousPrice: 20,
    recommendedPrice: 20,
    approvedPrice: 20,
    date: '05 Oct 2026, 09:00 AM',
    salesVolume: 140,
    profitEarned: 1120,
    changeType: 'Kept'
  },
  {
    id: 'hist-4',
    productId: 'prod-3',
    productName: 'Monsoon Umbrella',
    previousPrice: 270,
    recommendedPrice: 299,
    approvedPrice: 299,
    date: '03 Oct 2026, 04:45 PM',
    salesVolume: 16,
    profitEarned: 1984,
    changeType: 'Approved AI'
  },
  {
    id: 'hist-5',
    productId: 'prod-5',
    productName: 'Fresh Margherita Pizza',
    previousPrice: 189,
    recommendedPrice: 199,
    approvedPrice: 199,
    date: '01 Oct 2026, 06:10 PM',
    salesVolume: 32,
    profitEarned: 2848,
    changeType: 'Approved AI'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'recommendation',
    title: 'AI Price Opportunity Ready',
    message: 'Hot weather (34°C) & Festival detected. Recommended ₹43 for Coca-Cola to gain +₹390 profit.',
    time: '5 mins ago',
    read: false,
    priority: 'high',
    productId: 'prod-1'
  },
  {
    id: 'notif-2',
    type: 'stock',
    title: 'Low Stock Alert: Monsoon Umbrella',
    message: 'Only 18 units remaining. At current forecast, stock will deplete in 1.4 days.',
    time: '25 mins ago',
    read: false,
    priority: 'high',
    productId: 'prod-3'
  },
  {
    id: 'notif-3',
    type: 'competitor',
    title: 'Competitor Price Shift',
    message: 'Shop B (SuperBazaar) discounted Coca-Cola to ₹39. Your margin remains competitive.',
    time: '1 hour ago',
    read: false,
    priority: 'medium',
    productId: 'prod-1'
  },
  {
    id: 'notif-4',
    type: 'demand',
    title: 'High Heatwave Demand Surge',
    message: 'Beverages & Ice Creams are seeing +45% higher customer inquiry index.',
    time: '3 hours ago',
    read: true,
    priority: 'medium'
  },
  {
    id: 'notif-5',
    type: 'offer',
    title: 'Special Offer Performance',
    message: 'Festival Special Discount generated 28 extra sales today (+₹920 gross profit).',
    time: 'Yesterday',
    read: true,
    priority: 'low'
  }
];

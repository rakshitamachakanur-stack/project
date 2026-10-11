export interface Product {
  id: string;
  name: string;
  category: 'Beverages' | 'Packaged Food' | 'Fresh Foods' | 'Essentials' | 'Snacks';
  currentPrice: number;
  costPrice: number;
  stock: number;
  minPrice: number;
  maxPrice: number;
  unit: string;
  imageUrl?: string;
  description: string;
  lastUpdated: string;
}

export interface CompetitorPrice {
  id: string;
  sellerName: string;
  price: number;
  difference: number;
  distance: string;
  rating: number;
  lastChecked: string;
}

export interface WeatherCondition {
  temperature: number; // in Celsius
  rain: 'No' | 'Drizzle' | 'Heavy';
  festival: boolean;
  festivalName?: string;
}

export interface DemandPrediction {
  predictedDailySales: number;
  lowEstimate: number;
  expectedEstimate: number;
  highEstimate: number;
  confidence: number; // percentage
  hourlyDistribution: { hour: string; expectedUnits: number }[];
}

export interface StockAlert {
  status: 'healthy' | 'warning' | 'critical' | 'excess';
  label: string;
  daysRemaining: number;
  message: string;
  actionNote: string;
}

export interface PriceRecommendation {
  productId: string;
  productName: string;
  currentPrice: number;
  recommendedPrice: number;
  costPrice: number;
  currentProfitPerUnit: number;
  recommendedProfitPerUnit: number;
  expectedDemand: number;
  currentEstimatedDemand: number;
  expectedDailyRevenue: number;
  expectedDailyProfit: number;
  currentDailyProfit: number;
  potentialProfitGain: number;
  explanation: string;
  factors: {
    weather: number;
    festival: number;
    competitorPrice: number;
    stockLevel: number;
    demand: number;
  };
  competitors: CompetitorPrice[];
  stockAlert: StockAlert;
  demandPrediction: DemandPrediction;
  approved?: boolean;
  approvedAt?: string;
}

export interface SpecialOffer {
  id: string;
  name: string;
  tagline: string;
  type: 'festival' | 'excess_stock' | 'slow_moving' | 'bundle';
  discount: string;
  discountValue: number;
  productId: string;
  productName: string;
  expectedSalesIncrease: string;
  expectedProfitImpact: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  colorScheme: 'purple' | 'amber' | 'emerald' | 'blue';
}

export interface PriceHistoryItem {
  id: string;
  productId: string;
  productName: string;
  previousPrice: number;
  recommendedPrice: number;
  approvedPrice: number;
  date: string;
  salesVolume: number;
  profitEarned: number;
  changeType: 'Approved AI' | 'Manual' | 'Kept';
}

export interface AppNotification {
  id: string;
  type: 'stock' | 'demand' | 'competitor' | 'recommendation' | 'offer' | 'profit';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  productId?: string;
}

export interface MLDemandResult {
  predictedUnitsSold: number;
  note: string;
}
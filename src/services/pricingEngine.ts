import { Product, WeatherCondition, CompetitorPrice, PriceRecommendation, DemandPrediction, StockAlert } from '../types';

export interface PricingEngineInput {
  product: Product;
  weather: WeatherCondition;
  competitors: CompetitorPrice[];
}

/**
 * PricePilot AI Core Pricing Engine
 * Modular simulation calculating demand elasticity, weather impact, 
 * competitor price corridor, inventory depletion rate, and optimal profit margin.
 */
export function calculatePricingRecommendation({
  product,
  weather,
  competitors
}: PricingEngineInput): PriceRecommendation {
  const { currentPrice, costPrice, stock, category } = product;
  const currentMargin = Math.max(1, currentPrice - costPrice);

  // 1. Base category baseline demand (units/day)
  let baseDemand = 40;
  if (category === 'Beverages') baseDemand = 55;
  if (category === 'Essentials') baseDemand = 15;
  if (category === 'Fresh Foods') baseDemand = 30;
  if (category === 'Snacks') baseDemand = 60;
  if (category === 'Packaged Food') baseDemand = 25;

  // 2. Weather Impact Coefficient
  let weatherMultiplier = 1.0;
  let weatherFactorWeight = 50;

  if (category === 'Beverages') {
    // High temp increases cold drink demand
    if (weather.temperature >= 35) {
      weatherMultiplier += 0.45;
      weatherFactorWeight = 90;
    } else if (weather.temperature >= 30) {
      weatherMultiplier += 0.25;
      weatherFactorWeight = 80;
    } else if (weather.temperature < 20) {
      weatherMultiplier -= 0.15;
      weatherFactorWeight = 65;
    }
    // Rain slightly dampens cold drinks unless indoor
    if (weather.rain === 'Heavy') weatherMultiplier -= 0.10;
  } else if (category === 'Essentials' && product.name.toLowerCase().includes('umbrella')) {
    // Rain massively boosts umbrella demand
    if (weather.rain === 'Heavy') {
      weatherMultiplier += 1.80; // +180% surge
      weatherFactorWeight = 95;
    } else if (weather.rain === 'Drizzle') {
      weatherMultiplier += 0.90;
      weatherFactorWeight = 85;
    } else {
      weatherMultiplier -= 0.20; // Dry day drops umbrella demand
      weatherFactorWeight = 60;
    }
  } else if (category === 'Fresh Foods') {
    if (weather.rain === 'Heavy') {
      weatherMultiplier += 0.25; // High delivery/dine-in comfort craving
      weatherFactorWeight = 75;
    }
  }

  // 3. Festival / Special Event Surge
  let festivalMultiplier = 1.0;
  let festivalFactorWeight = 40;

  if (weather.festival) {
    festivalFactorWeight = 90;
    if (category === 'Beverages' || category === 'Snacks') {
      festivalMultiplier = 1.35; // +35% festive refreshment boost
    } else if (category === 'Fresh Foods') {
      festivalMultiplier = 1.45; // Festive celebration food
    } else {
      festivalMultiplier = 1.20;
    }
  }

  // 4. Competitor Landscape Analysis
  const compPrices = competitors.map(c => c.price);
  const avgCompPrice = compPrices.length 
    ? compPrices.reduce((a, b) => a + b, 0) / compPrices.length 
    : currentPrice;
  const minCompPrice = compPrices.length ? Math.min(...compPrices) : currentPrice;
  const maxCompPrice = compPrices.length ? Math.max(...compPrices) : currentPrice;

  // Relative price index vs competitors
  const priceIndex = currentPrice / (avgCompPrice || currentPrice);
  let competitorFactorWeight = 70;
  if (Math.abs(priceIndex - 1.0) > 0.08) {
    competitorFactorWeight = 85;
  }

  // 5. Total Demand Calculation
  const totalDemandMultiplier = weatherMultiplier * festivalMultiplier;
  const expectedDemandRaw = baseDemand * totalDemandMultiplier;
  const predictedDailySales = Math.max(5, Math.round(expectedDemandRaw));

  // High, Expected, Low bounds
  const lowEstimate = Math.max(3, Math.round(predictedDailySales * 0.82));
  const expectedEstimate = predictedDailySales;
  const highEstimate = Math.round(predictedDailySales * 1.22);

  // Confidence calculation based on market variance
  const compVariance = Math.max(1, maxCompPrice - minCompPrice);
  const confidence = Math.min(94, Math.max(76, Math.round(92 - (compVariance / currentPrice) * 15)));

  // 6. Stock Depletion Rate & Alerts
  const daysRemaining = Number((stock / (predictedDailySales || 1)).toFixed(1));
  let stockAlert: StockAlert;
  let stockFactorWeight = 60;

  if (daysRemaining <= 1.5) {
    stockAlert = {
      status: 'critical',
      label: '🔴 Stock may run out soon',
      daysRemaining,
      message: `Based on high predicted demand (${predictedDailySales} units/day), your stock of ${stock} units will last only ${daysRemaining} days.`,
      actionNote: 'Restock immediately or increase price slightly to control runout velocity.'
    };
    stockFactorWeight = 88;
  } else if (daysRemaining <= 3.0) {
    stockAlert = {
      status: 'warning',
      label: '🟡 Stock may run low',
      daysRemaining,
      message: `Stock level (${stock} units) may deplete within ${daysRemaining} days under current demand pressure.`,
      actionNote: 'Plan replenishment within 48 hours.'
    };
    stockFactorWeight = 72;
  } else if (daysRemaining > 14.0) {
    stockAlert = {
      status: 'excess',
      label: '🔵 Excess stock detected',
      daysRemaining,
      message: `You have high inventory (${stock} units) which represents ~${daysRemaining} days of sales.`,
      actionNote: 'Consider a promotional bundle or slight discount to increase turnover.'
    };
    stockFactorWeight = 75;
  } else {
    stockAlert = {
      status: 'healthy',
      label: '🟢 Healthy Stock',
      daysRemaining,
      message: `Stock level of ${stock} units is optimal (~${daysRemaining} days coverage at expected run-rate).`,
      actionNote: 'Inventory is well balanced with demand.'
    };
    stockFactorWeight = 55;
  }

  // 7. Optimal Price Recommendation Algorithm
  // Goal: Maximize Expected Profit = (Price - Cost) * Expected Demand(Price)
  // while staying within reasonable competitive corridor
  let recommendedPrice = currentPrice;

  // Pricing elasticity pressure:
  // If demand is high and stock is low -> upward price headroom
  // If competitors are higher -> room to capture margin
  // If excess stock -> downward incentive to clear
  if (totalDemandMultiplier > 1.25 && daysRemaining <= 3.0) {
    // Strong demand surge + tight supply
    const premiumHeadroom = Math.round((avgCompPrice - costPrice) * 0.25);
    recommendedPrice = Math.max(currentPrice + 1, Math.min(product.maxPrice, Math.round(avgCompPrice + 1)));
  } else if (totalDemandMultiplier > 1.15 && currentPrice < avgCompPrice) {
    // Current price is cheaper than competitors during healthy demand
    recommendedPrice = Math.min(product.maxPrice, Math.round((currentPrice + avgCompPrice) / 2 + 1));
  } else if (stockAlert.status === 'excess' && currentPrice > minCompPrice) {
    // Overstock clearance discount
    recommendedPrice = Math.max(product.minPrice, Math.max(costPrice + 2, Math.round(currentPrice - 2)));
  } else if (currentPrice < avgCompPrice - 1) {
    // Sub-optimal underpricing
    recommendedPrice = Math.min(product.maxPrice, Math.round(avgCompPrice));
  } else {
    // Subtle fine-tuning
    if (weather.festival && totalDemandMultiplier > 1.1) {
      recommendedPrice = Math.min(product.maxPrice, currentPrice + Math.max(1, Math.round(currentMargin * 0.15)));
    } else {
      recommendedPrice = currentPrice;
    }
  }

  // Ensure recommended price respects cost safety
  if (recommendedPrice <= costPrice) {
    recommendedPrice = costPrice + Math.max(2, Math.round(costPrice * 0.15));
  }

  // Calculate Profit Impact
  const currentProfitPerUnit = Math.max(0, currentPrice - costPrice);
  const recommendedProfitPerUnit = Math.max(0, recommendedPrice - costPrice);

  // Demand with price change: demand elasticity ~ -1.3
  const priceDeltaRatio = (recommendedPrice - currentPrice) / currentPrice;
  const elasticityFactor = 1 - (priceDeltaRatio * 1.1);
  const expectedDemandAtRecommended = Math.max(3, Math.round(predictedDailySales * Math.max(0.6, elasticityFactor)));

  const expectedDailyRevenue = expectedDemandAtRecommended * recommendedPrice;
  const expectedDailyProfit = expectedDemandAtRecommended * recommendedProfitPerUnit;
  const currentDailyProfit = predictedDailySales * currentProfitPerUnit;
  const potentialProfitGain = expectedDailyProfit - currentDailyProfit;

  // 8. Natural Language AI Explanation Generation
  let explanation = '';
  const priceChange = recommendedPrice - currentPrice;

  if (priceChange > 0) {
    const reasons: string[] = [];
    if (weather.festival) reasons.push('the festival rush');
    if (weather.temperature >= 32 && category === 'Beverages') reasons.push(`hot weather (${weather.temperature}°C)`);
    if (weather.rain !== 'No' && product.name.toLowerCase().includes('umbrella')) reasons.push('rainy weather demand surge');
    if (avgCompPrice >= currentPrice) reasons.push(`competitors averaging ₹${Math.round(avgCompPrice)}`);

    const reasonText = reasons.length ? reasons.join(' and ') : 'favorable market demand signals';
    explanation = `Demand is predicted to surge due to ${reasonText}. Nearby shops are charging ₹${Math.round(minCompPrice)}–₹${Math.round(maxCompPrice)}. Adjusting your price from ₹${currentPrice} to ₹${recommendedPrice} increases your margin to ₹${recommendedProfitPerUnit}/unit while remaining well within competitive reach.`;
  } else if (priceChange < 0) {
    explanation = `You currently have high stock (${stock} units, ~${daysRemaining} days coverage). Setting a competitive price of ₹${recommendedPrice} (from ₹${currentPrice}) will accelerate sales turnover and prevent slow-moving capital lockup.`;
  } else {
    explanation = `Your current price of ₹${currentPrice} is optimally balanced against competitors (avg ₹${Math.round(avgCompPrice)}) and expected daily demand. No immediate price shift is needed today.`;
  }

  // Hourly curve distribution for visual chart
  const hours = ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'];
  const hourlyDistribution = hours.map((hour, idx) => {
    // Peak hours around 12PM-2PM and 6PM-8PM
    const weights = [0.06, 0.10, 0.18, 0.16, 0.12, 0.20, 0.14, 0.04];
    return {
      hour,
      expectedUnits: Math.round(predictedDailySales * weights[idx])
    };
  });

  const demandPrediction: DemandPrediction = {
    predictedDailySales,
    lowEstimate,
    expectedEstimate,
    highEstimate,
    confidence,
    hourlyDistribution
  };

  return {
    productId: product.id,
    productName: product.name,
    currentPrice,
    recommendedPrice,
    costPrice,
    currentProfitPerUnit,
    recommendedProfitPerUnit,
    expectedDemand: expectedDemandAtRecommended,
    currentEstimatedDemand: predictedDailySales,
    expectedDailyRevenue,
    expectedDailyProfit,
    currentDailyProfit,
    potentialProfitGain,
    explanation,
    factors: {
      weather: weatherFactorWeight,
      festival: festivalFactorWeight,
      competitorPrice: competitorFactorWeight,
      stockLevel: stockFactorWeight,
      demand: Math.min(95, Math.round((predictedDailySales / baseDemand) * 70))
    },
    competitors,
    stockAlert,
    demandPrediction,
    approved: false
  };
}

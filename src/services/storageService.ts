import { Product, SpecialOffer, PriceHistoryItem, AppNotification } from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_SPECIAL_OFFERS, 
  INITIAL_PRICE_HISTORY, 
  INITIAL_NOTIFICATIONS 
} from '../data/sampleData';

const KEYS = {
  PRODUCTS: 'pricepilot_products',
  OFFERS: 'pricepilot_offers',
  HISTORY: 'pricepilot_history',
  NOTIFICATIONS: 'pricepilot_notifications',
  USER: 'pricepilot_user',
  WEATHER: 'pricepilot_weather',
};

export const storageService = {
  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(KEYS.PRODUCTS);
      return data ? JSON.parse(data) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  },

  saveProducts(products: Product[]): void {
    try {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  },

  getOffers(): SpecialOffer[] {
    try {
      const data = localStorage.getItem(KEYS.OFFERS);
      return data ? JSON.parse(data) : INITIAL_SPECIAL_OFFERS;
    } catch {
      return INITIAL_SPECIAL_OFFERS;
    }
  },

  saveOffers(offers: SpecialOffer[]): void {
    try {
      localStorage.setItem(KEYS.OFFERS, JSON.stringify(offers));
    } catch (e) {
      console.error('Failed to save offers', e);
    }
  },

  getHistory(): PriceHistoryItem[] {
    try {
      const data = localStorage.getItem(KEYS.HISTORY);
      return data ? JSON.parse(data) : INITIAL_PRICE_HISTORY;
    } catch {
      return INITIAL_PRICE_HISTORY;
    }
  },

  saveHistory(history: PriceHistoryItem[]): void {
    try {
      localStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  },

  getNotifications(): AppNotification[] {
    try {
      const data = localStorage.getItem(KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  },

  saveNotifications(notifs: AppNotification[]): void {
    try {
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    } catch (e) {
      console.error('Failed to save notifications', e);
    }
  },

  resetDemoData(): void {
    localStorage.removeItem(KEYS.PRODUCTS);
    localStorage.removeItem(KEYS.OFFERS);
    localStorage.removeItem(KEYS.HISTORY);
    localStorage.removeItem(KEYS.NOTIFICATIONS);
    localStorage.removeItem(KEYS.WEATHER);
  }
};

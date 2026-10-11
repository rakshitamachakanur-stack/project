import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import confetti from 'canvas-confetti';

import {
  Product,
  WeatherCondition,
  PriceRecommendation,
  SpecialOffer,
  PriceHistoryItem,
  AppNotification,
  CompetitorPrice,
} from '../types';

import { storageService } from '../services/storageService';
import { calculatePricingRecommendation } from '../services/pricingEngine';
import { MOCK_COMPETITORS_MAP } from '../data/sampleData';
import api from '../services/api';

export type AppView =
  | 'landing'
  | 'auth'
  | 'dashboard'
  | 'pricing'
  | 'competitors'
  | 'offers'
  | 'profit-loss'
  | 'products'
  | 'history';

export interface UserProfile {
  name: string;
  storeName: string;
  email: string;
  city: string;
}

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    storeName: string,
    email: string,
    password: string
  ) => Promise<void>;
  loginAsDemo: () => Promise<void>;
  logout: () => void;

  currentView: AppView;
  setCurrentView: (view: AppView) => void;

  products: Product[];
  selectedProduct: Product | undefined;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  loadProducts: () => Promise<void>;

  weather: WeatherCondition;
  setWeather: React.Dispatch<React.SetStateAction<WeatherCondition>>;
  updateWeather: (updates: Partial<WeatherCondition>) => void;

  activeRecommendation: PriceRecommendation | null;
  runAnalysis: (productId?: string) => PriceRecommendation;
  approveRecommendation: (rec: PriceRecommendation) => Promise<void>;
  keepCurrentPrice: (rec: PriceRecommendation) => void;

  addProduct: (
    product: Omit<Product, 'id' | 'lastUpdated'>
  ) => Promise<void>;
  updateProduct: (
    id: string,
    updates: Partial<Product>
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  specialOffers: SpecialOffer[];
  toggleOffer: (id: string) => void;

  priceHistory: PriceHistoryItem[];
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;

  toasts: ToastInfo[];
  showToast: (
    message: string,
    type?: 'success' | 'info' | 'warning'
  ) => void;

  getCompetitorsForProduct: (productId: string) => CompetitorPrice[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getErrorMessage = (error: unknown): string => {
  const axiosError = error as {
    response?: {
      data?: {
        error?: string;
        message?: string;
      };
    };
    message?: string;
  };

  return (
    axiosError?.response?.data?.error ||
    axiosError?.response?.data?.message ||
    axiosError?.message ||
    'Something went wrong. Please try again.'
  );
};

const mapApiProduct = (item: any): Product => ({
  id: String(item.id ?? item._id ?? ''),
  name: String(item.name ?? item.product_name ?? ''),
  category: item.category ?? 'Essentials',
  currentPrice: Number(
    item.selling_price_inr ?? item.currentPrice ?? item.current_price ?? 0
  ),
  costPrice: Number(
    item.unit_cost_inr ?? item.costPrice ?? item.cost_price ?? 0
  ),
  stock: Number(
    item.stock_available ?? item.stock ?? item.stockAvailable ?? 0
  ),
  minPrice: Number(
    item.min_price_inr ?? item.minPrice ?? item.min_price ?? 0
  ),
  maxPrice: Number(
    item.max_price_inr ?? item.maxPrice ?? item.max_price ?? 0
  ),
  unit: String(item.unit ?? 'unit'),
  description: String(item.description ?? ''),
  lastUpdated: item.updated_at
    ? new Date(item.updated_at).toLocaleString()
    : 'Saved in MongoDB',
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const token = localStorage.getItem('pricepilot_token');
      const saved = localStorage.getItem('pricepilot_user');

      // A saved profile without a token is not an authenticated session.
      return token && saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');

  const [weather, setWeather] = useState<WeatherCondition>({
    temperature: 34,
    rain: 'No',
    festival: true,
    festivalName: 'Ganesh Chaturthi Festive Rush',
  });

  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>(() =>
    storageService.getOffers()
  );

  const [priceHistory, setPriceHistory] = useState<PriceHistoryItem[]>(() =>
    storageService.getHistory()
  );

  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    storageService.getNotifications()
  );

  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] =
    useState(false);

  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const selectedProduct =
    products.find((product) => product.id === selectedProductId) ??
    products[0];

  const getCompetitorsForProduct = (
    productId: string
  ): CompetitorPrice[] => {
    if (MOCK_COMPETITORS_MAP[productId]) {
      return MOCK_COMPETITORS_MAP[productId];
    }

    const currentPrice =
      products.find((product) => product.id === productId)?.currentPrice ??
      50;

    return [
      {
        id: 'c1',
        sellerName: 'Shop A (QuickMart)',
        price: Math.round(currentPrice * 1.05),
        difference: -Math.round(currentPrice * 0.05),
        distance: '150m away',
        rating: 4.5,
        lastChecked: '10 mins ago',
      },
      {
        id: 'c2',
        sellerName: 'Shop B (SuperBazaar)',
        price: Math.round(currentPrice * 0.98),
        difference: Math.round(currentPrice * 0.02),
        distance: '400m away',
        rating: 4.3,
        lastChecked: '45 mins ago',
      },
      {
        id: 'c3',
        sellerName: 'Shop C (Corner Kirana)',
        price: currentPrice,
        difference: 0,
        distance: '600m away',
        rating: 4.6,
        lastChecked: '1 hour ago',
      },
    ];
  };

  const [activeRecommendation, setActiveRecommendation] =
    useState<PriceRecommendation | null>(null);

  const showToast = (
    message: string,
    type: 'success' | 'info' | 'warning' = 'success'
  ) => {
    const id = `${Date.now()}-${Math.random()}`;

    setToasts((previous) => [...previous, { id, message, type }]);

    window.setTimeout(() => {
      setToasts((previous) => previous.filter((toast) => toast.id !== id));
    }, 4000);
  };

  // Products are always loaded from the authenticated merchant's API.
  // They are deliberately not saved in shared localStorage.
  const loadProducts = async (): Promise<void> => {
    const token = localStorage.getItem('pricepilot_token');

    if (!token) {
      setProducts([]);
      setSelectedProductId('');
      setActiveRecommendation(null);
      return;
    }

    try {
      const response = await api.get('/products');

      const rows = Array.isArray(response.data)
        ? response.data
        : response.data?.products ?? response.data?.data ?? [];

      const loadedProducts = rows.map(mapApiProduct);

      setProducts(loadedProducts);

      setSelectedProductId((previousId) => {
        const stillExists = loadedProducts.some(
          (product: Product) => product.id === previousId
        );

        return stillExists ? previousId : loadedProducts[0]?.id ?? '';
      });

      if (loadedProducts.length === 0) {
        setActiveRecommendation(null);
      }
    } catch (error) {
      showToast(
        `Could not load products: ${getErrorMessage(error)}`,
        'warning'
      );
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password,
      });

      const data = response.data;
      const account = data.user ?? data;

      if (!data.token) {
        throw new Error('The backend did not return an authentication token.');
      }

      localStorage.setItem('pricepilot_token', data.token);

      const normalizedEmail = String(account.email ?? email)
        .trim()
        .toLowerCase();

      const savedStoreName = localStorage.getItem(
        `pricepilot_store_${normalizedEmail}`
      );

      const profile: UserProfile = {
        name: account.name ?? account.full_name ?? normalizedEmail,
        storeName:
          account.storeName ??
          account.store_name ??
          savedStoreName ??
          account.name ??
          'My Store',
        email: normalizedEmail,
        city: account.city ?? '',
      };

      localStorage.setItem('pricepilot_user', JSON.stringify(profile));
      setUser(profile);

      try {
        await loadProducts();
      } catch {
        // loadProducts already displays an error toast.
        // Do not leave the token/profile half-saved after a failed login setup.
        localStorage.removeItem('pricepilot_token');
        localStorage.removeItem('pricepilot_user');
        setUser(null);
        setProducts([]);
        throw new Error('Login succeeded, but products could not be loaded. Check the backend and try again.');
      }

      setCurrentView('dashboard');
      showToast(`Welcome back, ${profile.name}!`, 'success');
    } catch (error) {
      showToast(getErrorMessage(error), 'warning');
      throw error;
    }
  };

  const register = async (
    name: string,
    storeName: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const normalizedEmail = email.trim().toLowerCase();

      // The current Flask register endpoint accepts name, email and password.
      // Store name is retained locally until the backend is extended to store it.
      const response = await api.post('/auth/register', {
        name: name.trim(),
        email: normalizedEmail,
        password,
      });

      const data = response.data;
      const account = data.user ?? data;

      if (!data.token) {
        throw new Error('The backend did not return an authentication token.');
      }

      localStorage.setItem('pricepilot_token', data.token);
      localStorage.setItem(
        `pricepilot_store_${normalizedEmail}`,
        storeName.trim()
      );

      const profile: UserProfile = {
        name: account.name ?? name.trim(),
        storeName: storeName.trim(),
        email: String(account.email ?? normalizedEmail),
        city: account.city ?? '',
      };

      localStorage.setItem('pricepilot_user', JSON.stringify(profile));
      setUser(profile);

      try {
        await loadProducts();
      } catch {
        localStorage.removeItem('pricepilot_token');
        localStorage.removeItem('pricepilot_user');
        setUser(null);
        setProducts([]);
        throw new Error('Your account was created, but products could not be loaded. Please sign in again after checking the backend.');
      }

      setCurrentView('dashboard');
      showToast(`Welcome to PricePilot AI, ${profile.name}!`, 'success');
    } catch (error) {
      showToast(getErrorMessage(error), 'warning');
      throw error;
    }
  };

  const loginAsDemo = async (): Promise<void> => {
    // Demo access uses real backend authentication, not a frontend-only bypass.
    await login('demo@pricepilot.ai', 'pricepilot2026');
  };

  const logout = () => {
    localStorage.removeItem('pricepilot_token');
    localStorage.removeItem('pricepilot_user');

    setUser(null);
    setProducts([]);
    setSelectedProductId('');
    setActiveRecommendation(null);
    setCurrentView('landing');

    showToast('Logged out successfully', 'info');
  };

  // Restore the authenticated merchant's products after a browser refresh.
  useEffect(() => {
    if (user && localStorage.getItem('pricepilot_token')) {
      loadProducts().catch(() => {
        // The error is already shown by loadProducts.
      });
    }
    // Only run on initial mount; login/register call loadProducts themselves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recalculate the recommendation when the selected product or weather changes.
  useEffect(() => {
    if (!selectedProduct) {
      setActiveRecommendation(null);
      return;
    }

    const competitors = getCompetitorsForProduct(selectedProduct.id);

    setActiveRecommendation(
      calculatePricingRecommendation({
        product: selectedProduct,
        weather,
        competitors,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProductId, products, weather]);

  const updateWeather = (updates: Partial<WeatherCondition>) => {
    setWeather((previous) => ({ ...previous, ...updates }));
  };

  const runAnalysis = (productId?: string): PriceRecommendation => {
    const targetProduct =
      (productId
        ? products.find((product) => product.id === productId)
        : selectedProduct) ?? products[0];

    if (!targetProduct) {
      throw new Error('Add a product before running a pricing analysis.');
    }

    const recommendation = calculatePricingRecommendation({
      product: targetProduct,
      weather,
      competitors: getCompetitorsForProduct(targetProduct.id),
    });

    setSelectedProductId(targetProduct.id);
    setActiveRecommendation(recommendation);

    return recommendation;
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3853f2', '#10b981', '#8b5cf6', '#f59e0b'],
      });
    } catch {
      // Confetti is decorative; pricing actions should still work without it.
    }
  };

  const approveRecommendation = async (
    recommendation: PriceRecommendation
  ): Promise<void> => {
    const product = products.find(
      (item) => item.id === recommendation.productId
    );

    if (!product) {
      showToast('Product not found. Refresh the product list and try again.', 'warning');
      return;
    }

    // Persist the approved price to MongoDB before reporting success.
    await updateProduct(product.id, {
      currentPrice: recommendation.recommendedPrice,
    });

    const historyItem: PriceHistoryItem = {
      id: `hist-${Date.now()}`,
      productId: recommendation.productId,
      productName: recommendation.productName,
      previousPrice: recommendation.currentPrice,
      recommendedPrice: recommendation.recommendedPrice,
      approvedPrice: recommendation.recommendedPrice,
      date: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      salesVolume: recommendation.expectedDemand,
      profitEarned: recommendation.expectedDailyProfit,
      changeType: 'Approved AI',
    };

    const nextHistory = [historyItem, ...priceHistory];
    setPriceHistory(nextHistory);
    storageService.saveHistory(nextHistory);

    const notification: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'recommendation',
      title: 'Price Approved & Live',
      message: `${recommendation.productName} updated from ₹${recommendation.currentPrice} to ₹${recommendation.recommendedPrice}. Expected +₹${Math.max(
        0,
        recommendation.potentialProfitGain
      )} daily profit gain!`,
      time: 'Just now',
      read: false,
      priority: 'high',
      productId: recommendation.productId,
    };

    const nextNotifications = [notification, ...notifications];
    setNotifications(nextNotifications);
    storageService.saveNotifications(nextNotifications);

    setActiveRecommendation({
      ...recommendation,
      currentPrice: recommendation.recommendedPrice,
      approved: true,
      approvedAt: 'Approved Just Now',
    });

    triggerCelebration();
    showToast(
      `Success! ${recommendation.productName} updated to ₹${recommendation.recommendedPrice}`,
      'success'
    );
  };

  const keepCurrentPrice = (recommendation: PriceRecommendation) => {
    const historyItem: PriceHistoryItem = {
      id: `hist-${Date.now()}`,
      productId: recommendation.productId,
      productName: recommendation.productName,
      previousPrice: recommendation.currentPrice,
      recommendedPrice: recommendation.recommendedPrice,
      approvedPrice: recommendation.currentPrice,
      date: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      salesVolume: recommendation.demandPrediction.predictedDailySales,
      profitEarned: recommendation.currentDailyProfit,
      changeType: 'Kept',
    };

    const nextHistory = [historyItem, ...priceHistory];
    setPriceHistory(nextHistory);
    storageService.saveHistory(nextHistory);

    showToast(
      `Current price of ₹${recommendation.currentPrice} maintained for ${recommendation.productName}`,
      'info'
    );
  };

  const addProduct = async (
    productData: Omit<Product, 'id' | 'lastUpdated'>
  ): Promise<void> => {
    try {
      const response = await api.post('/products', {
        name: productData.name,
        category: productData.category,
        selling_price_inr: productData.currentPrice,
        unit_cost_inr: productData.costPrice,
        stock_available: productData.stock,
        min_price_inr: productData.minPrice,
        max_price_inr: productData.maxPrice,
        unit: productData.unit,
        description: productData.description,
      });

      const rawProduct = response.data?.product ?? response.data?.data ?? response.data;
      const newProduct = mapApiProduct(rawProduct);

      if (!newProduct.id) {
        throw new Error('The backend saved the product but did not return its ID.');
      }

      setProducts((previous) => [
        newProduct,
        ...previous.filter((item) => item.id !== newProduct.id),
      ]);
      setSelectedProductId(newProduct.id);

      showToast(`Added product "${newProduct.name}" successfully!`, 'success');
    } catch (error) {
      showToast(`Could not add product: ${getErrorMessage(error)}`, 'warning');
      throw error;
    }
  };

  const updateProduct = async (
    id: string,
    updates: Partial<Product>
  ): Promise<void> => {
    try {
      const payload: Record<string, unknown> = {};

      if (updates.name !== undefined) payload.name = updates.name;
      if (updates.category !== undefined) payload.category = updates.category;
      if (updates.currentPrice !== undefined) {
        payload.selling_price_inr = updates.currentPrice;
      }
      if (updates.costPrice !== undefined) {
        payload.unit_cost_inr = updates.costPrice;
      }
      if (updates.stock !== undefined) {
        payload.stock_available = updates.stock;
      }
      if (updates.minPrice !== undefined) {
        payload.min_price_inr = updates.minPrice;
      }
      if (updates.maxPrice !== undefined) {
        payload.max_price_inr = updates.maxPrice;
      }
      if (updates.unit !== undefined) payload.unit = updates.unit;
      if (updates.description !== undefined) {
        payload.description = updates.description;
      }

      const response = await api.patch(`/products/${id}`, payload);
      const rawProduct = response.data?.product ?? response.data?.data ?? response.data;

      // If the backend returns the updated product, use it; otherwise merge
      // the submitted fields into the existing item.
      setProducts((previous) =>
        previous.map((product) => {
          if (product.id !== id) return product;

          if (rawProduct && (rawProduct.id || rawProduct._id)) {
            return mapApiProduct(rawProduct);
          }

          return {
            ...product,
            ...updates,
            lastUpdated: 'Just now',
          };
        })
      );

      showToast('Product details updated', 'info');
    } catch (error) {
      showToast(`Could not update product: ${getErrorMessage(error)}`, 'warning');
      throw error;
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    try {
      await api.delete(`/products/${id}`);

      const nextProducts = products.filter((product) => product.id !== id);
      setProducts(nextProducts);

      if (selectedProductId === id) {
        setSelectedProductId(nextProducts[0]?.id ?? '');
      }

      showToast('Product removed from catalog', 'warning');
    } catch (error) {
      showToast(`Could not delete product: ${getErrorMessage(error)}`, 'warning');
      throw error;
    }
  };

  const toggleOffer = (id: string) => {
    const updated = specialOffers.map((offer) => {
      if (offer.id === id) {
        const nextState = !offer.isActive;

        showToast(
          nextState
            ? `Offer "${offer.name}" activated!`
            : `Offer "${offer.name}" paused`,
          nextState ? 'success' : 'info'
        );

        return { ...offer, isActive: nextState };
      }

      return offer;
    });

    setSpecialOffers(updated);
    storageService.saveOffers(updated);
  };

  const markNotificationRead = (id: string) => {
    const next = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, read: true }
        : notification
    );

    setNotifications(next);
    storageService.saveNotifications(next);
  };

  const markAllNotificationsRead = () => {
    const next = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));

    setNotifications(next);
    storageService.saveNotifications(next);
    showToast('All notifications marked as read', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        loginAsDemo,
        logout,
        currentView,
        setCurrentView,
        products,
        selectedProduct,
        selectedProductId,
        setSelectedProductId,
        loadProducts,
        weather,
        setWeather,
        updateWeather,
        activeRecommendation,
        runAnalysis,
        approveRecommendation,
        keepCurrentPrice,
        addProduct,
        updateProduct,
        deleteProduct,
        specialOffers,
        toggleOffer,
        priceHistory,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        toasts,
        showToast,
        getCompetitorsForProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }

  return context;
};
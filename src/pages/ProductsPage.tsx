import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Sparkles, 
  Layers, 
  IndianRupee, 
  ArrowRight,
  X,
  Check
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    setSelectedProductId, 
    setCurrentView 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Product['category']>('Beverages');
  const [formCurrentPrice, setFormCurrentPrice] = useState(40);
  const [formCostPrice, setFormCostPrice] = useState(25);
  const [formStock, setFormStock] = useState(100);
  const [formUnit, setFormUnit] = useState('bottle');
  const [formDescription, setFormDescription] = useState('');

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('Beverages');
    setFormCurrentPrice(50);
    setFormCostPrice(30);
    setFormStock(80);
    setFormUnit('unit');
    setFormDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormCurrentPrice(p.currentPrice);
    setFormCostPrice(p.costPrice);
    setFormStock(p.stock);
    setFormUnit(p.unit);
    setFormDescription(p.description);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        category: formCategory,
        currentPrice: formCurrentPrice,
        costPrice: formCostPrice,
        stock: formStock,
        unit: formUnit,
        description: formDescription
      });
    } else {
      addProduct({
        name: formName,
        category: formCategory,
        currentPrice: formCurrentPrice,
        costPrice: formCostPrice,
        stock: formStock,
        minPrice: Math.round(formCostPrice * 1.1),
        maxPrice: Math.round(formCurrentPrice * 1.4),
        unit: formUnit,
        description: formDescription
      });
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Beverages', 'Fresh Foods', 'Essentials', 'Snacks', 'Packaged Food'];

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Product Catalog Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {products.length} Active SKUs
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Maintain selling prices, stock baselines, and costs for automated AI repricing.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white shadow-lg shadow-brand-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-panel rounded-3xl border border-slate-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-4 pl-6">Product & Category</th>
                <th className="py-4">Current Price</th>
                <th className="py-4">Cost Price</th>
                <th className="py-4">Unit Margin</th>
                <th className="py-4">Available Stock</th>
                <th className="py-4">Stock Status</th>
                <th className="py-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map(prod => {
                const margin = prod.currentPrice - prod.costPrice;
                const marginPct = ((margin / prod.currentPrice) * 100).toFixed(0);

                return (
                  <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 pl-6">
                      <div className="font-bold text-white text-sm">{prod.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                          {prod.category}
                        </span>
                        <span>• Updated: {prod.lastUpdated}</span>
                      </div>
                    </td>

                    <td className="py-4 font-black text-white text-base">
                      ₹{prod.currentPrice}
                    </td>

                    <td className="py-4 text-slate-400 font-medium">
                      ₹{prod.costPrice}
                    </td>

                    <td className="py-4">
                      <span className="font-bold text-emerald-400">
                        +₹{margin}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-1">
                        ({marginPct}%)
                      </span>
                    </td>

                    <td className="py-4 font-semibold text-slate-200">
                      {prod.stock} {prod.unit}s
                    </td>

                    <td className="py-4">
                      {prod.stock < 20 ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/30">
                          Critical ({prod.stock})
                        </span>
                      ) : prod.stock > 180 ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                          Excess Stock
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                          Healthy
                        </span>
                      )}
                    </td>

                    <td className="py-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedProductId(prod.id);
                            setCurrentView('pricing');
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600/20 hover:bg-brand-600 text-brand-300 hover:text-white border border-brand-500/30 font-bold transition-all text-xs"
                          title="Run AI Price Engine"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Pricing</span>
                        </button>

                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-brand-400" />
                <span>{editingProduct ? 'Edit Product Details' : 'Add New Catalog Product'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Masala Chai Flask (500ml)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Beverages">Beverages</option>
                    <option value="Fresh Foods">Fresh Foods</option>
                    <option value="Essentials">Essentials</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Packaged Food">Packaged Food</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Unit Type</label>
                  <input
                    type="text"
                    required
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    placeholder="bottle, packet, tub"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Current Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formCurrentPrice}
                    onChange={(e) => setFormCurrentPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Cost Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formCostPrice}
                    onChange={(e) => setFormCostPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Stock (Units)</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Notes / Description</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Optional details..."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white shadow-md shadow-brand-500/20"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

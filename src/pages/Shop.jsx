import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, Search, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Shop = () => {
  const [view, setView] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Traditional Wear', 'Home Decor', 'Fragrances', 'Jewelry', 'Accessories'];

  const products = [
    { id: 1, name: 'Royal Oud Fragrance', price: '$120.00', category: 'Fragrances', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600', rating: 5 },
    { id: 2, name: 'Handcrafted Silk Abaya', price: '$245.00', category: 'Traditional Wear', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=600', rating: 4.8 },
    { id: 3, name: 'Golden Calligraphy Plate', price: '$85.00', category: 'Home Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=600', rating: 4.9 },
    { id: 4, name: 'Emerald Pendant', price: '$450.00', category: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600', rating: 5 },
    { id: 5, name: 'Moroccan Leather Slippers', price: '$65.00', category: 'Accessories', image: 'https://images.unsplash.com/photo-1590673885247-aa7f709d90a1?auto=format&fit=crop&q=80&w=600', rating: 4.7 },
    { id: 6, name: 'Damascus Steel Knife', price: '$320.00', category: 'Home Decor', image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&q=80&w=600', rating: 4.9 },
    { id: 7, name: 'Amber Prayer Beads', price: '$110.00', category: 'Accessories', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600', rating: 4.8 },
    { id: 8, name: 'Copper Tea Set', price: '$180.00', category: 'Home Decor', image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?auto=format&fit=crop&q=80&w=600', rating: 5 },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-primary py-20 text-center relative overflow-hidden" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container relative z-10">
          <h1 className="text-white text-5xl md:text-6xl mb-4">Our Catalog</h1>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <a href="/" className="hover:text-secondary transition-colors">Home</a>
            <span>/</span>
            <span className="text-white">Shop</span>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-white/20 h-full"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 flex flex-col gap-10">
            {/* Search */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Search</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm outline-none focus:border-secondary text-sm"
                />
                <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left text-sm py-2 transition-all flex justify-between items-center ${
                      activeCategory === cat ? 'text-secondary font-bold pl-2 border-l-2 border-secondary' : 'text-gray-500 hover:text-primary'
                    }`}
                  >
                    {cat}
                    <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full text-gray-400">
                      {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Price */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Price Range</h3>
              <div className="flex flex-col gap-4">
                <input type="range" className="accent-secondary w-full" />
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>$0</span>
                  <span>$1,000+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-sm border border-gray-100 flex flex-wrap items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setView('grid')}
                    className={`p-2 rounded-sm ${view === 'grid' ? 'bg-primary text-white' : 'text-gray-400 hover:text-primary'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    onClick={() => setView('list')}
                    className={`p-2 rounded-sm ${view === 'list' ? 'bg-primary text-white' : 'text-gray-400 hover:text-primary'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
                <span className="text-gray-400 text-sm">Showing {filteredProducts.length} of {products.length} products</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Sort by:</span>
                <button className="flex items-center gap-2 text-sm font-bold text-primary">
                  Newest First <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-8'}>
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  key={product.id} 
                  className={`group bg-white rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-100 ${
                    view === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'
                  }`}
                >
                  <Link to={`/product/${product.id}`} className={`relative overflow-hidden bg-gray-50 block ${view === 'list' ? 'w-full md:w-1/3' : 'aspect-[4/5]'}`}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm" style={{ backgroundColor: 'var(--color-secondary)' }}>
                      New
                    </div>
                  </Link>
                  
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 uppercase tracking-widest">{product.category}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill={i < Math.floor(product.rating) ? "var(--color-secondary)" : "none"} className={i < Math.floor(product.rating) ? "text-secondary" : "text-gray-200"} />
                        ))}
                      </div>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-heading group-hover:text-secondary transition-colors cursor-pointer">{product.name}</h3>
                    </Link>
                    <p className="text-xl font-bold text-primary">{product.price}</p>
                    {view === 'list' && (
                      <p className="text-sm text-gray-500 mb-4">
                        Experience the elegance of this fine heritage piece. Hand-selected for its quality and cultural significance.
                      </p>
                    )}
                    <button 
                      onClick={() => navigate('/cart')}
                      className="mt-auto btn btn-primary w-full py-3"
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-16">
              <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-primary text-white font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 hover:border-primary transition-all font-bold">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-gray-200 hover:border-primary transition-all font-bold">3</button>
              <button className="flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors ml-4 uppercase tracking-widest">
                Next <ArrowRight size={16} />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../lib/useCurrency';

const UserWishlist = () => {
  const { formatPrice } = useCurrency();
  const wishlist = [
    { 
      id: 1, 
      name: 'Royal Oud Fragrance', 
      price: 120.00, 
      category: 'Fragrances', 
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=200',
      rating: 5
    },
    { 
      id: 3, 
      name: 'Golden Calligraphy Plate', 
      price: 85.00, 
      category: 'Home Decor', 
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=200',
      rating: 4.9
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-heading font-bold text-primary">My Wishlist</h2>
        <p className="text-gray-500 text-sm">Save your favorite heritage pieces for later.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishlist.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex gap-6 group hover:border-secondary transition-all"
          >
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col gap-1 flex-grow">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.category}</span>
              <Link to={`/product/${item.id}`}>
                <h3 className="text-lg font-heading font-bold text-primary hover:text-secondary transition-colors">{item.name}</h3>
              </Link>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill={i < Math.floor(item.rating) ? "var(--color-secondary)" : "none"} className={i < Math.floor(item.rating) ? "text-secondary" : "text-gray-200"} />
                ))}
              </div>
              <p className="text-lg font-bold text-secondary" style={{ color: 'var(--color-secondary)' }}>{formatPrice(item.price)}</p>
            </div>
            <div className="flex flex-col justify-between items-end">
              <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
              <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-all">
                <ShoppingCart size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserWishlist;

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingCart, ShieldCheck, Truck, RotateCcw, ChevronRight, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      navigate('/cart');
    }, 800);
  };

  const product = {
    id: 1,
    name: 'Royal Oud Fragrance',
    price: '$120.00',
    category: 'Fragrances',
    rating: 4.9,
    reviews: 128,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&q=80&w=1000',
    ],
    description: 'Experience the essence of royal luxury with our signature Oud fragrance. Sourced from the finest resinous heartwood, this scent captures the mystery and heritage of the East.',
    details: [
      '100% Natural Oud Extract',
      'Long-lasting formula (12+ hours)',
      'Handcrafted crystal bottle',
      'Sustainably sourced ingredients',
    ]
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="bg-white pb-20">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 mb-12">
        <div className="container flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-primary transition-colors">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-secondary" style={{ color: 'var(--color-secondary)' }}>{product.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-gray-50 rounded-sm overflow-hidden"
            >
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-24 h-24 rounded-sm overflow-hidden border-2 transition-all ${mainImage === img ? 'border-secondary' : 'border-transparent opacity-60'}`}
                  style={{ borderColor: mainImage === img ? 'var(--color-secondary)' : 'transparent' }}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-secondary font-bold uppercase tracking-[0.2em] text-xs" style={{ color: 'var(--color-secondary)' }}>
                {product.category}
              </span>
              <h1 className="text-5xl font-heading leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < 4.9 ? "var(--color-secondary)" : "none"} className="text-secondary" style={{ color: 'var(--color-secondary)' }} />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-bold">({product.reviews} Customer Reviews)</span>
              </div>
              <p className="text-3xl font-bold text-primary mt-2">{product.price}</p>
            </div>

            <p className="text-gray-500 leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="flex flex-col gap-6 border-y border-gray-100 py-8">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold uppercase tracking-widest w-24">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="btn btn-primary flex-grow py-5 gap-3"
                >
                  {isAdding ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to Cart
                    </>
                  )}
                </button>
                <button className="btn border border-gray-200 text-primary hover:bg-gray-50 px-6">
                  <Heart size={20} />
                </button>
                <button className="btn border border-gray-200 text-primary hover:bg-gray-50 px-6">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
              <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-sm">
                <ShieldCheck size={24} className="text-secondary" style={{ color: 'var(--color-secondary)' }} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Guaranteed Authentic</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-sm">
                <Truck size={24} className="text-secondary" style={{ color: 'var(--color-secondary)' }} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-sm">
                <RotateCcw size={24} className="text-secondary" style={{ color: 'var(--color-secondary)' }} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-24">
          <div className="flex border-b border-gray-200 gap-12">
            <button 
              onClick={() => setActiveTab('description')}
              className={`pb-6 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'description' ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
            >
              Description
              {activeTab === 'description' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-secondary" style={{ backgroundColor: 'var(--color-secondary)' }} />}
            </button>
            <button 
              onClick={() => setActiveTab('details')}
              className={`pb-6 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'details' ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
            >
              Additional Info
              {activeTab === 'details' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-secondary" style={{ backgroundColor: 'var(--color-secondary)' }} />}
            </button>
          </div>

          <div className="py-12 max-w-4xl">
            {activeTab === 'description' ? (
              <div className="flex flex-col gap-6 text-gray-500 leading-relaxed">
                <p>
                  Crafted with precision and reverence for tradition, the Royal Oud Fragrance is more than just a scent—it's an experience. Each bottle contains high-concentration oud extracts sourced responsibly from aged agarwood trees.
                </p>
                <p>
                  The top notes open with a hint of rare spices and saffron, leading into a heart of pure, rich oud. The base notes settle into a warm, woody embrace of sandalwood and amber, ensuring a presence that lingers gracefully throughout the day.
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" style={{ backgroundColor: 'var(--color-secondary)' }}></div>
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

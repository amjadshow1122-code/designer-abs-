import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ArrowLeft,
  Lock,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../lib/useCurrency';

const Checkout = () => {
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Success step
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-xl shadow-xl border border-gray-100 text-center flex flex-col items-center gap-6"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-heading font-bold text-primary">Order Confirmed!</h1>
          <p className="text-gray-500 leading-relaxed">
            Thank you for your purchase. Your heritage find is being prepared for its journey to your doorstep.
          </p>
          <div className="w-full p-4 bg-gray-50 rounded-lg text-left">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
              <span>Order Number</span>
              <span className="text-primary">#AF-98245</span>
            </div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
              <span>Estimated Delivery</span>
              <span className="text-primary">Oct 18 - Oct 20</span>
            </div>
          </div>
          <Link to="/" className="btn btn-primary w-full py-4 mt-4">
            Back to Home
          </Link>
          <p className="text-xs text-gray-400">A confirmation email has been sent to your address.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container">
        {/* Progress Header */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-16">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
            <span className={`text-sm font-bold uppercase tracking-widest hidden sm:block ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>Shipping</span>
          </div>
          <div className="w-12 h-[1px] bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
            <span className={`text-sm font-bold uppercase tracking-widest hidden sm:block ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Form Area */}
          <div className="w-full lg:w-2/3 flex flex-col gap-10">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col gap-8"
                >
                  <h2 className="text-3xl font-heading font-bold text-primary">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">First Name</label>
                      <input type="text" className="w-full bg-white border border-gray-100 px-4 py-3.5 rounded-sm outline-none focus:border-secondary transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                      <input type="text" className="w-full bg-white border border-gray-100 px-4 py-3.5 rounded-sm outline-none focus:border-secondary transition-all" />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Street Address</label>
                      <input type="text" className="w-full bg-white border border-gray-100 px-4 py-3.5 rounded-sm outline-none focus:border-secondary transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">City</label>
                      <input type="text" className="w-full bg-white border border-gray-100 px-4 py-3.5 rounded-sm outline-none focus:border-secondary transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Country</label>
                      <select className="w-full bg-white border border-gray-100 px-4 py-3.5 rounded-sm outline-none focus:border-secondary transition-all">
                        <option>United Arab Emirates</option>
                        <option>Saudi Arabia</option>
                        <option>Qatar</option>
                        <option>Kuwait</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="btn btn-primary py-4 gap-3 w-full md:w-fit px-12 self-end">
                    Continue to Payment
                    <ChevronRight size={18} />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col gap-8"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <button onClick={() => setStep(1)} className="text-gray-400 hover:text-primary">
                      <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-3xl font-heading font-bold text-primary">Payment Details</h2>
                  </div>

                  <div className="p-6 border border-secondary bg-secondary/5 rounded-sm flex flex-col gap-6" style={{ borderColor: 'var(--color-secondary)' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="text-secondary" />
                        <span className="font-bold text-primary">Credit or Debit Card</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                        <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Card Number</label>
                        <div className="relative">
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-gray-100 px-4 py-3.5 rounded-sm outline-none focus:border-secondary transition-all" />
                          <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Expiry Date</label>
                        <input type="text" placeholder="MM / YY" className="w-full bg-white border border-gray-100 px-4 py-3.5 rounded-sm outline-none focus:border-secondary transition-all" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">CVV</label>
                        <input type="text" placeholder="000" className="w-full bg-white border border-gray-100 px-4 py-3.5 rounded-sm outline-none focus:border-secondary transition-all" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary" />
                      <span className="text-sm text-gray-500 group-hover:text-primary transition-colors">Billing address is the same as shipping</span>
                    </label>
                  </div>

                  <button 
                    onClick={handlePlaceOrder} 
                    disabled={loading}
                    className="btn btn-primary py-5 gap-3 w-full shadow-xl shadow-primary/10 mt-4"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <ShieldCheck size={22} />
                        Complete Secure Purchase
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Order Review */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-8 sticky top-32">
              <h3 className="text-xl font-heading font-bold border-b border-gray-50 pb-4">Review Order</h3>
              
              <div className="flex flex-col gap-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-50 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=100" alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-primary">Royal Oud Fragrance</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Qty: 1</span>
                    <span className="text-sm font-bold text-secondary" style={{ color: 'var(--color-secondary)' }}>{formatPrice(120)}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-50 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=100" alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-primary">Handcrafted Silk Abaya</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Qty: 1</span>
                    <span className="text-sm font-bold text-secondary" style={{ color: 'var(--color-secondary)' }}>{formatPrice(245)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-primary">{formatPrice(365)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className="font-bold text-primary">{formatPrice(25)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-50 pt-4">
                  <span className="text-primary uppercase tracking-widest">Total</span>
                  <span className="text-secondary" style={{ color: 'var(--color-secondary)' }}>{formatPrice(390)}</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg flex gap-3 items-start">
                <Info size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest font-bold">
                  All heritage items are carefully inspected and securely packaged to ensure safe delivery of your treasures.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

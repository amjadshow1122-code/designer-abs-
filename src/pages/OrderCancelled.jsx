import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, ShoppingBag, HelpCircle } from 'lucide-react';

const OrderCancelled = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 sm:p-16 max-w-lg w-full text-center relative overflow-hidden"
      >
        {/* Background accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-400 via-orange-400 to-amber-400" />

        {/* Cancel Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle size={40} className="text-red-400" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-3">
          Payment Cancelled
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Your payment was cancelled and <strong>no charge has been made</strong>. Your cart items are still saved — you can return to checkout any time.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-8 text-left">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">What happened?</p>
          <ul className="text-sm text-gray-600 space-y-1.5 list-disc pl-4">
            <li>You closed the Stripe payment window</li>
            <li>Your card was declined — try a different card</li>
            <li>The session timed out — please retry</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/cart"
            className="btn btn-primary py-3.5 text-xs font-bold gap-2"
          >
            <ArrowLeft size={16} /> Return to Cart
          </Link>
          <Link
            to="/sales"
            className="btn border border-gray-200 text-primary hover:bg-gray-50 py-3.5 text-xs font-bold gap-2"
          >
            <ShoppingBag size={16} /> Browse Sales
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <HelpCircle size={13} />
          <span>
            Need help?{' '}
            <a href="/contact" className="text-secondary hover:underline font-semibold">
              Contact support
            </a>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderCancelled;

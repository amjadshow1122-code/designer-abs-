import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Search, 
  Filter, 
  ExternalLink,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { useCurrency } from '../lib/useCurrency';

const UserOrders = () => {
  const { formatPrice } = useCurrency();
  const orders = [
    { 
      id: '#AF-98245', 
      date: 'Oct 10, 2023', 
      total: 145.00, 
      status: 'In Transit', 
      items: 2,
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=100'
    },
    { 
      id: '#AF-98120', 
      date: 'Sep 25, 2023', 
      total: 320.00, 
      status: 'Delivered', 
      items: 1,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=100'
    },
    { 
      id: '#AF-97850', 
      date: 'Aug 12, 2023', 
      total: 1200.00, 
      status: 'Delivered', 
      items: 4,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=100'
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Transit': return <Truck size={14} />;
      case 'Delivered': return <CheckCircle2 size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-50 text-blue-600';
      case 'Delivered': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold text-primary">My Orders</h2>
          <p className="text-gray-500 text-sm">Track your heritage acquisitions and order history.</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Order ID..." 
            className="bg-white border border-gray-100 pl-12 pr-4 py-2.5 rounded-lg text-sm outline-none focus:border-secondary w-full md:w-64"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order, idx) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group hover:border-secondary transition-all"
          >
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                  <img src={order.image} alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary">{order.id}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">Ordered on {order.date} • {order.items} {order.items === 1 ? 'Item' : 'Items'}</span>
                  <span className="text-lg font-bold text-secondary" style={{ color: 'var(--color-secondary)' }}>{formatPrice(order.total)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn border border-gray-100 text-primary hover:bg-gray-50 px-6 py-2 text-xs font-bold">
                  Track Order
                </button>
                <button className="btn btn-primary px-6 py-2 text-xs font-bold gap-2">
                  View Details
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-50 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Next update expected by Oct 12, 2023
              </p>
              <button className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:underline">
                Invoice (PDF)
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;

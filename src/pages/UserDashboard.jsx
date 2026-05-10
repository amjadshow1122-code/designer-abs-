import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  CreditCard, 
  MapPin, 
  User, 
  Heart, 
  ChevronRight,
  ShoppingBag,
  Bell
} from 'lucide-react';

const UserDashboard = () => {
  const stats = [
    { label: 'Total Orders', value: '12', icon: Package },
    { label: 'Active Orders', value: '1', icon: ShoppingBag },
    { label: 'Saved Items', value: '24', icon: Heart },
    { label: 'Points', value: '2,450', icon: CreditCard },
  ];

  const recentOrders = [
    { id: '#AF-98245', date: 'Oct 10, 2023', total: '$145.00', status: 'In Transit' },
    { id: '#AF-98120', date: 'Sep 25, 2023', total: '$320.00', status: 'Delivered' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Section */}
      <div className="bg-primary rounded-xl p-8 text-white relative overflow-hidden" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="relative z-10">
          <h2 className="text-3xl font-heading font-bold mb-2">Marhaba, Ahmed!</h2>
          <p className="text-gray-300">Welcome to your heritage collection dashboard.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-primary">
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
              <p className="text-xl font-bold text-primary">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-primary">Recent Orders</h3>
            <button className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="flex flex-col">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-6 border-b border-gray-50 last:border-0 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-primary">{order.id}</span>
                  <span className="text-xs text-gray-400">{order.date}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-bold text-primary">{order.total}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Quick Links */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <h3 className="font-heading font-bold text-lg text-primary mb-2">Account Quick Links</h3>
          <button className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group hover:bg-primary hover:text-white transition-all">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-secondary group-hover:text-white" />
              <span className="text-sm font-bold">Manage Addresses</span>
            </div>
            <ChevronRight size={16} />
          </button>
          <button className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group hover:bg-primary hover:text-white transition-all">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-secondary group-hover:text-white" />
              <span className="text-sm font-bold">Notification Settings</span>
            </div>
            <ChevronRight size={16} />
          </button>
          <button className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group hover:bg-primary hover:text-white transition-all">
            <div className="flex items-center gap-3">
              <User size={18} className="text-secondary group-hover:text-white" />
              <span className="text-sm font-bold">Edit Profile</span>
            </div>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

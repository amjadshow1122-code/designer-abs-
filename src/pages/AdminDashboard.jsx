import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '$124,560', change: '+12.5%', isUp: true, icon: BarChart3 },
    { title: 'Total Orders', value: '1,245', change: '+8.2%', isUp: true, icon: ShoppingCart },
    { title: 'New Customers', value: '456', change: '-3.1%', isUp: false, icon: Users },
    { title: 'Pending Items', value: '18', change: '0%', isUp: true, icon: Package },
  ];

  const recentOrders = [
    { id: '#12450', customer: 'Ahmed Hassan', date: 'Oct 12, 2023', total: '$120.00', status: 'Delivered' },
    { id: '#12451', customer: 'Fatima Zohra', date: 'Oct 12, 2023', total: '$245.00', status: 'Processing' },
    { id: '#12452', customer: 'Omar Khalid', date: 'Oct 11, 2023', total: '$85.00', status: 'Shipped' },
    { id: '#12453', customer: 'Laila Amin', date: 'Oct 11, 2023', total: '$450.00', status: 'Pending' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/5 rounded-lg text-primary">
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.title}</h3>
            <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold">Recent Orders</h3>
            <button className="text-sm font-bold text-secondary hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-primary">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold">Inventory</h3>
            <button className="p-2 bg-primary text-white rounded-md hover:bg-primary-light transition-all">
              <Plus size={16} />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Traditional Wear</span>
                <span className="font-bold">45%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Fragrances</span>
                <span className="font-bold">28%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Home Decor</span>
                <span className="font-bold">15%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400" style={{ width: '15%' }}></div>
              </div>
            </div>
            <button className="btn btn-secondary w-full py-3 mt-4">
              Generate Inventory Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download,
  Globe,
  Wallet
} from 'lucide-react';

const AdminAnalytics = () => {
  const kpis = [
    { title: 'Gross Revenue', value: '$0.00', change: '0%', isUp: true, icon: Wallet },
    { title: 'Average Order Value', value: '$0.00', change: '0%', isUp: true, icon: ShoppingBag },
    { title: 'Customer Retention', value: '0%', change: '0%', isUp: true, icon: Users },
    { title: 'Conversion Rate', value: '0%', change: '0%', isUp: true, icon: TrendingUp },
  ];

  const topProducts = [];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Market Analytics</h1>
          <p className="text-gray-500 text-sm">Deep insights into your luxury heritage sales performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-100 rounded-lg px-4 py-2 flex items-center gap-3 shadow-sm">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Lifetime</span>
          </div>
          <button className="btn btn-primary gap-2 py-2.5 px-6">
            <Download size={16} />
            Download Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div 
            key={kpi.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-primary">
                <kpi.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${kpi.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {kpi.change}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{kpi.title}</p>
              <p className="text-2xl font-bold text-primary mt-1">{kpi.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Performance (Simulated Chart) */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-xl text-primary">Sales Performance</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-50 rounded-lg">
            <p className="text-gray-400 text-sm italic">Insufficient data to generate performance charts.</p>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-xl text-primary">Top Performing Items</h3>
            <button className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">Full Catalog</button>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow py-10">
            <ShoppingBag size={40} className="text-gray-100 mb-4" />
            <p className="text-gray-400 text-sm italic">No sales data available yet.</p>
          </div>
        </div>
      </div>

      {/* Global Sales Breakdown */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <Globe className="text-secondary" />
          <h3 className="font-heading font-bold text-xl text-primary">Regional Market Presence</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-10">
          <Globe size={40} className="text-gray-100 mb-4" />
          <p className="text-gray-400 text-sm italic">Regional data will appear as orders are placed.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

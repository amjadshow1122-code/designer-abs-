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
    { title: 'Gross Revenue', value: '$124,560.00', change: '+14.2%', isUp: true, icon: Wallet },
    { title: 'Average Order Value', value: '$185.00', change: '+5.1%', isUp: true, icon: ShoppingBag },
    { title: 'Customer Retention', value: '64%', change: '+2.4%', isUp: true, icon: Users },
    { title: 'Conversion Rate', value: '3.2%', change: '-0.8%', isUp: false, icon: TrendingUp },
  ];

  const topProducts = [
    { name: 'Royal Oud Fragrance', sales: 450, revenue: '$54,000', growth: '+12%' },
    { name: 'Handcrafted Silk Abaya', sales: 320, revenue: '$78,400', growth: '+8%' },
    { name: 'Golden Calligraphy Plate', sales: 180, revenue: '$15,300', growth: '+15%' },
    { name: 'Emerald Pendant', sales: 85, revenue: '$38,250', growth: '-2%' },
  ];

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
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Last 30 Days</span>
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
          
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[40, 65, 45, 90, 65, 80, 55, 70, 85, 60, 75, 95].map((height, i) => (
              <div key={i} className="flex-grow flex flex-col items-center gap-2 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05, duration: 0.8 }}
                  className="w-full bg-primary/5 group-hover:bg-secondary transition-all rounded-t-sm relative"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${(height * 120).toLocaleString()}
                  </div>
                </motion.div>
                <span className="text-[8px] font-bold text-gray-300 uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-xl text-primary">Top Performing Items</h3>
            <button className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">Full Catalog</button>
          </div>
          <div className="flex flex-col gap-6">
            {topProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-primary">{product.name}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">{product.sales} Units Sold</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{product.revenue}</p>
                  <p className="text-[10px] font-bold text-green-500">{product.growth} Growth</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Sales Breakdown */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <Globe className="text-secondary" />
          <h3 className="font-heading font-bold text-xl text-primary">Regional Market Presence</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { region: 'United Arab Emirates', share: '45%', value: '$56,052' },
            { region: 'Saudi Arabia', share: '30%', value: '$37,368' },
            { region: 'Rest of World', share: '25%', value: '$31,140' },
          ].map((item) => (
            <div key={item.region} className="flex flex-col gap-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-primary">{item.region}</span>
                <span className="text-secondary">{item.share}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: item.share }}
                  className="h-full bg-secondary"
                ></motion.div>
              </div>
              <p className="text-sm font-bold text-primary mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

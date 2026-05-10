import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Globe, 
  Lock, 
  Bell, 
  Palette, 
  ShieldCheck, 
  Mail, 
  CreditCard,
  User,
  ChevronRight,
  Monitor,
  Smartphone,
  Check
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('General Information');

  const tabs = [
    { name: 'General Information', icon: Globe },
    { name: 'Security & Access', icon: Lock },
    { name: 'Notifications', icon: Bell },
    { name: 'Store Branding', icon: Palette },
    { name: 'Payment Gateways', icon: CreditCard },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">System Settings</h1>
          <p className="text-gray-500 text-sm">Configure your administrative environment and platform preferences.</p>
        </div>
        <button className="btn btn-primary px-8 py-2.5">Save All Changes</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Sidebar (Internal) */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {tabs.map((tab) => (
            <button 
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all text-sm font-bold ${
                activeTab === tab.name 
                  ? 'bg-white border-secondary text-secondary shadow-sm' 
                  : 'bg-transparent border-transparent text-gray-500 hover:bg-white hover:border-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon size={18} />
                {tab.name}
              </div>
              <ChevronRight size={14} className={activeTab === tab.name ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </div>

        {/* Settings Form Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeTab === 'General Information' && (
              <motion.div 
                key="general"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                    <Globe size={20} className="text-secondary" />
                    <h3 className="font-heading font-bold text-lg text-primary">General Configuration</h3>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Store Name</label>
                      <input type="text" defaultValue="Arab Finds Heritage" className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Support Email</label>
                      <input type="email" defaultValue="support@arabfinds.com" className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Store Currency</label>
                      <select className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all">
                        <option>USD ($)</option>
                        <option>AED (د.إ)</option>
                        <option>SAR (﷼)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Time Zone</label>
                      <select className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all">
                        <option>(GMT+04:00) Dubai</option>
                        <option>(GMT+03:00) Riyadh</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-red-600">Maintenance Mode</span>
                    <span className="text-xs text-red-400">Disable front-end access while making critical updates.</span>
                  </div>
                  <button className="px-6 py-2 bg-red-600 text-white text-xs font-bold rounded-lg">Activate</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'Security & Access' && (
              <motion.div 
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                    <ShieldCheck size={20} className="text-secondary" />
                    <h3 className="font-heading font-bold text-lg text-primary">Security & Authentication</h3>
                  </div>
                  <div className="p-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-primary">Two-Factor Authentication</span>
                        <span className="text-xs text-gray-400">Add an extra layer of security to your admin account.</span>
                      </div>
                      <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-primary">Login Activity Alerts</span>
                        <span className="text-xs text-gray-400">Get notified of new logins from unknown devices.</span>
                      </div>
                      <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                  <h4 className="font-bold text-primary mb-4">Password Policy</h4>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 text-sm text-gray-500">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-secondary" />
                      Require special characters
                    </label>
                    <label className="flex items-center gap-3 text-sm text-gray-500">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-secondary" />
                      Minimum length of 12 characters
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Notifications' && (
              <motion.div 
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                    <Bell size={20} className="text-secondary" />
                    <h3 className="font-heading font-bold text-lg text-primary">Notification Preferences</h3>
                  </div>
                  <div className="p-8 flex flex-col gap-8">
                    <div className="flex flex-col gap-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Notifications</h4>
                      {[
                        { title: 'New Orders', desc: 'Get an email for every successful order.' },
                        { title: 'Inventory Alerts', desc: 'Notify when products are low on stock.' },
                        { title: 'Customer Messages', desc: 'Get notified of new messages from collectors.' },
                      ].map((item) => (
                        <div key={item.title} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-primary">{item.title}</p>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                          </div>
                          <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Store Branding' && (
              <motion.div 
                key="branding"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                    <Palette size={20} className="text-secondary" />
                    <h3 className="font-heading font-bold text-lg text-primary">Store Identity</h3>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Main Logo</label>
                      <div className="w-full h-40 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center gap-3 bg-gray-50">
                        <Monitor className="text-gray-300" />
                        <span className="text-xs text-gray-400">Upload SVG or PNG (Max 5MB)</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Primary Color</label>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#001236]"></div>
                          <input type="text" defaultValue="#001236" className="flex-grow bg-gray-50 border border-transparent px-4 py-2 rounded-lg text-sm" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Secondary Color</label>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#775a19]"></div>
                          <input type="text" defaultValue="#775a19" className="flex-grow bg-gray-50 border border-transparent px-4 py-2 rounded-lg text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Payment Gateways' && (
              <motion.div 
                key="payments"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                    <CreditCard size={20} className="text-secondary" />
                    <h3 className="font-heading font-bold text-lg text-primary">Payment Providers</h3>
                  </div>
                  <div className="p-8 flex flex-col gap-6">
                    {[
                      { name: 'Stripe Payments', status: 'Connected', desc: 'Direct credit card processing.' },
                      { name: 'PayPal Business', status: 'Not Connected', desc: 'Global digital wallet payments.' },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-transparent hover:border-secondary/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-100 shadow-sm">
                            <CreditCard size={20} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-bold text-primary">{item.name}</p>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${item.status === 'Connected' ? 'text-green-500' : 'text-gray-400'}`}>
                            {item.status}
                          </span>
                          <button className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">
                            {item.status === 'Connected' ? 'Configure' : 'Setup'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

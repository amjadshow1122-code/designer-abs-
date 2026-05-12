import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const GeneralTab = ({ settings, setSettings }) => {
  return (
    <motion.div key="general" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <Globe size={20} className="text-secondary" />
          <h3 className="font-heading font-bold text-lg text-primary">General Configuration</h3>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Store Name</label>
            <input type="text" value={settings.store_name} onChange={(e) => setSettings({...settings, store_name: e.target.value})} className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Support Email</label>
            <input type="email" value={settings.support_email} onChange={(e) => setSettings({...settings, support_email: e.target.value})} className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Store Currency</label>
            <select value={settings.currency} onChange={(e) => setSettings({...settings, currency: e.target.value})} className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all appearance-none">
              <option value="USD">USD ($)</option>
              <option value="AED">AED (د.إ)</option>
              <option value="SAR">SAR (ر.س)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="QAR">QAR (ر.ق)</option>
              <option value="OMR">OMR (ر.ع.)</option>
              <option value="KWD">KWD (د.ك)</option>
              <option value="BHD">BHD (ب.د)</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GeneralTab;

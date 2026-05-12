import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

const BrandingTab = ({ settings, setSettings }) => {
  return (
    <motion.div key="branding" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <Palette size={20} className="text-secondary" />
          <h3 className="font-heading font-bold text-lg text-primary">Store Branding (Colors)</h3>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Primary Color (Backgrounds, Headers)</label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border shadow-inner flex-shrink-0" style={{ backgroundColor: settings.primary_color }}></div>
              <input type="text" value={settings.primary_color} onChange={(e) => setSettings({...settings, primary_color: e.target.value})} className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-2 rounded-lg text-sm outline-none transition-all w-full" />
              <input type="color" value={settings.primary_color} onChange={(e) => setSettings({...settings, primary_color: e.target.value})} className="h-10 w-10 p-0 border-0 rounded cursor-pointer" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Secondary Color (Accents, Buttons)</label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border shadow-inner flex-shrink-0" style={{ backgroundColor: settings.secondary_color }}></div>
              <input type="text" value={settings.secondary_color} onChange={(e) => setSettings({...settings, secondary_color: e.target.value})} className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-2 rounded-lg text-sm outline-none transition-all w-full" />
              <input type="color" value={settings.secondary_color} onChange={(e) => setSettings({...settings, secondary_color: e.target.value})} className="h-10 w-10 p-0 border-0 rounded cursor-pointer" />
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default BrandingTab;

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Monitor } from 'lucide-react';

const SecurityTab = ({ settings, setSettings }) => {
  return (
    <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <Lock size={20} className="text-secondary" />
          <h3 className="font-heading font-bold text-lg text-primary">Security & Access</h3>
        </div>
        <div className="p-8 flex flex-col gap-6">
          
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <Monitor size={18} className="text-secondary mt-0.5" />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-primary">Maintenance Mode</span>
                <span className="text-xs text-gray-500">Temporarily disable the storefront for updates</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.maintenance_mode} onChange={(e) => setSettings({...settings, maintenance_mode: e.target.checked})} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="text-secondary mt-0.5" />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-primary">Two-Factor Authentication</span>
                <span className="text-xs text-gray-500">Require 2FA for all administrator accounts</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.two_factor_auth} onChange={(e) => setSettings({...settings, two_factor_auth: e.target.checked})} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <Lock size={18} className="text-secondary mt-0.5" />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-primary">Login Activity Alerts</span>
                <span className="text-xs text-gray-500">Receive an email when a new device logs in to the admin panel</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.login_activity_alerts} onChange={(e) => setSettings({...settings, login_activity_alerts: e.target.checked})} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default SecurityTab;

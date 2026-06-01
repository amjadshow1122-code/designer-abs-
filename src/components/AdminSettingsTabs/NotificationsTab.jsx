import React from 'react';
import { motion } from 'framer-motion';
import { Bell, MailWarning, Package, MessageSquare } from 'lucide-react';

const NotificationsTab = ({ settings, setSettings }) => {
  return (
    <motion.div key="notifications" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <Bell size={20} className="text-secondary" />
          <h3 className="font-heading font-bold text-lg text-primary">Notification Preferences</h3>
        </div>
        <div className="p-8 flex flex-col gap-6">

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <MailWarning size={18} className="text-secondary mt-0.5" />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-primary">Low Stock Alerts</span>
                <span className="text-xs text-gray-500">Receive an email when a product's stock falls below 5 items</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.email_low_stock} onChange={(e) => setSettings({...settings, email_low_stock: e.target.checked})} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <MessageSquare size={18} className="text-secondary mt-0.5" />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-primary">Customer Messages</span>
                <span className="text-xs text-gray-500">Receive an email when a customer submits a contact form</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.email_customer_messages} onChange={(e) => setSettings({...settings, email_customer_messages: e.target.checked})} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsTab;

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Eye, EyeOff } from 'lucide-react';

const PaymentTab = ({ settings, setSettings, showKeys, setShowKeys }) => {
  return (
    <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard size={20} className="text-secondary" />
            <h3 className="font-heading font-bold text-lg text-primary">Payment Gateways</h3>
          </div>
          <button onClick={() => setShowKeys(!showKeys)} className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:underline flex items-center gap-1">
            {showKeys ? <><EyeOff size={12}/> Hide Keys</> : <><Eye size={12}/> Show Keys</>}
          </button>
        </div>
        <div className="p-8 flex flex-col gap-8">
          
          {/* Stripe Configuration */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
               <h4 className="font-bold text-primary flex items-center gap-2">Stripe</h4>
               <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" className="sr-only peer" checked={settings.stripe_connected} onChange={(e) => setSettings({...settings, stripe_connected: e.target.checked})} />
                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
               </label>
            </div>
            {settings.stripe_connected && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Publishable Key</label>
                  <input type={showKeys ? "text" : "password"} value={settings.stripe_publishable_key} onChange={(e) => setSettings({...settings, stripe_publishable_key: e.target.value})} className="bg-white border border-gray-200 focus:border-secondary px-3 py-2 rounded-lg text-sm outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Secret Key</label>
                  <input type={showKeys ? "text" : "password"} value={settings.stripe_secret_key} onChange={(e) => setSettings({...settings, stripe_secret_key: e.target.value})} className="bg-white border border-gray-200 focus:border-secondary px-3 py-2 rounded-lg text-sm outline-none transition-all" />
                </div>
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* PayPal Configuration */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
               <h4 className="font-bold text-primary flex items-center gap-2">PayPal</h4>
               <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" className="sr-only peer" checked={settings.paypal_connected} onChange={(e) => setSettings({...settings, paypal_connected: e.target.checked})} />
                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
               </label>
            </div>
            {settings.paypal_connected && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Client ID</label>
                  <input type={showKeys ? "text" : "password"} value={settings.paypal_client_id} onChange={(e) => setSettings({...settings, paypal_client_id: e.target.value})} className="bg-white border border-gray-200 focus:border-secondary px-3 py-2 rounded-lg text-sm outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Secret / API Key</label>
                  <input type={showKeys ? "text" : "password"} value={settings.paypal_secret} onChange={(e) => setSettings({...settings, paypal_secret: e.target.value})} className="bg-white border border-gray-200 focus:border-secondary px-3 py-2 rounded-lg text-sm outline-none transition-all" />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default PaymentTab;

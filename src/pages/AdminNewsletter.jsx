import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Users, Send, Download, BarChart2 } from 'lucide-react';

const AdminNewsletter = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">Newsletter</h1>
        <p className="text-gray-500 text-sm mt-1">Manage subscriber lists and campaign integrations via Klaviyo / Mailchimp.</p>
      </div>

      {/* Integration Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-4">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
          <Mail size={20} className="text-amber-600" />
        </div>
        <div>
          <p className="font-bold text-amber-800 mb-1">ESP Integration Required</p>
          <p className="text-sm text-amber-700 leading-relaxed">
            Newsletter management is handled via your Email Service Provider (Klaviyo or Mailchimp). Connect your API key in{' '}
            <a href="/admin/settings" className="font-bold underline hover:opacity-80">Admin → Site Settings</a> to enable subscriber sync, campaign history, and list management here.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { icon: Users, label: 'Total Subscribers', value: '—', sub: 'Connect ESP to sync', color: 'text-blue-500', bg: 'bg-blue-50' },
          { icon: Send, label: 'Campaigns Sent', value: '—', sub: 'Connect ESP to sync', color: 'text-green-500', bg: 'bg-green-50' },
          { icon: BarChart2, label: 'Avg. Open Rate', value: '—', sub: 'Connect ESP to sync', color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map(({ icon: Icon, label, value, sub, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
              <Icon size={22} className={color} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
              <p className="text-2xl font-heading font-bold text-primary">{value}</p>
              <p className="text-[10px] text-gray-400">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder subscriber table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-heading font-bold text-primary">Subscribers</h2>
          <button disabled className="btn border border-gray-200 text-gray-400 px-5 py-2.5 text-xs font-bold gap-2 cursor-not-allowed opacity-60">
            <Download size={14} /> Export CSV
          </button>
        </div>
        <div className="p-16 text-center text-gray-400">
          <Mail size={40} className="mx-auto mb-4 opacity-20" />
          <p className="text-sm font-bold mb-1">No subscriber data</p>
          <p className="text-xs">Connect your Klaviyo or Mailchimp API key in Site Settings to view and manage subscribers here.</p>
        </div>
      </div>

      {/* Setup checklist */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-heading font-bold text-primary mb-5">Setup Checklist</h2>
        <div className="flex flex-col gap-3">
          {[
            { step: '1. Choose an ESP', desc: 'Klaviyo (recommended for ecommerce) or Mailchimp', done: false },
            { step: '2. Add API key', desc: 'Go to Admin → Site Settings → Email Configuration', done: false },
            { step: '3. Create lists & flows', desc: 'Set up welcome series, sale alerts, and weekly digest in your ESP', done: false },
            { step: '4. Add unsubscribe link', desc: 'All marketing emails must include /unsubscribe?email= link (AU Spam Act 2003)', done: false },
            { step: '5. Enable double opt-in', desc: 'Required for GDPR and recommended for AU Privacy Act compliance', done: false },
          ].map(item => (
            <div key={item.step} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 ${item.done ? 'bg-green-500 border-green-500' : 'border-gray-200'}`} />
              <div>
                <p className="text-sm font-bold text-primary">{item.step}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNewsletter;

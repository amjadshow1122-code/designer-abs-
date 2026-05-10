import React from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Bell, Shield, Smartphone } from 'lucide-react';

const UserSettings = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-heading font-bold text-primary">Account Settings</h2>
        <p className="text-gray-500 text-sm">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-3">
            <User size={20} className="text-secondary" />
            <h3 className="font-heading font-bold text-lg text-primary">Profile Information</h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
              <input type="text" defaultValue="Ahmed Hassan" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <input type="email" defaultValue="ahmed@example.com" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
              <input type="text" placeholder="+971 50 123 4567" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Date of Birth</label>
              <input type="date" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" />
            </div>
          </div>
          <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button className="btn btn-primary px-8 py-3">Save Changes</button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-3">
            <Shield size={20} className="text-secondary" />
            <h3 className="font-heading font-bold text-lg text-primary">Security</h3>
          </div>
          <div className="p-8 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-primary">Change Password</p>
                <p className="text-sm text-gray-500">Update your account password regularly for better security.</p>
              </div>
              <button className="btn border border-primary text-primary px-6 py-2 text-xs font-bold">Update</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-primary">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
              </div>
              <button className="btn border border-secondary text-secondary px-6 py-2 text-xs font-bold">Enable</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;

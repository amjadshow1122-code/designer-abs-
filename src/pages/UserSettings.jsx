import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, Bell, Shield, Smartphone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const UserSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    dob: ''
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile({
        full_name: profileData?.full_name || '',
        email: user.email || '',
        phone: profileData?.phone || '',
        dob: profileData?.dob || ''
      });
    }
    setLoading(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          phone: profile.phone,
          dob: profile.dob,
          updated_at: new Date()
        });

      if (error) {
        setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
      } else {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
    setSaving(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      password: passwordData.newPassword
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setShowPasswordForm(false);
      setPasswordData({ newPassword: '', confirmPassword: '' });
      setTimeout(() => setMessage(null), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-secondary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-primary">Account Settings</h2>
          <p className="text-gray-500 text-sm">Manage your personal information and preferences.</p>
        </div>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-medium">{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Settings */}
        <form onSubmit={handleProfileUpdate} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-3">
            <User size={20} className="text-secondary" />
            <h3 className="font-heading font-bold text-lg text-primary">Profile Information</h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
              <input 
                type="text" 
                value={profile.full_name}
                onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <input 
                type="email" 
                disabled
                value={profile.email}
                className="w-full bg-gray-100 border border-transparent px-4 py-3 rounded-lg text-sm outline-none cursor-not-allowed opacity-60" 
              />
              <p className="text-[10px] text-gray-400 mt-1 italic">* Email is managed via account security.</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
              <input 
                type="text" 
                placeholder="+971 50 123 4567" 
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Date of Birth</label>
              <input 
                type="date" 
                value={profile.dob}
                onChange={(e) => setProfile({...profile, dob: e.target.value})}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" 
              />
            </div>
          </div>
          <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="btn btn-primary px-8 py-3 flex items-center gap-2"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Security Settings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-3">
            <Shield size={20} className="text-secondary" />
            <h3 className="font-heading font-bold text-lg text-primary">Security</h3>
          </div>
          <div className="p-8 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-primary">Change Password</p>
                  <p className="text-sm text-gray-500">Update your account password regularly for better security.</p>
                </div>
                <button 
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="btn border border-primary text-primary px-6 py-2 text-xs font-bold hover:bg-primary hover:text-white transition-all"
                >
                  {showPasswordForm ? 'Cancel' : 'Update'}
                </button>
              </div>
              
              <AnimatePresence>
                {showPasswordForm && (
                  <motion.form 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={handlePasswordUpdate}
                    className="overflow-hidden bg-gray-50 rounded-lg p-6 flex flex-col gap-4 border border-gray-100"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">New Password</label>
                        <input 
                          required
                          type="password" 
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="w-full bg-white border border-gray-200 px-4 py-2.5 rounded-lg text-sm outline-none focus:border-secondary transition-all" 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Confirm Password</label>
                        <input 
                          required
                          type="password" 
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="w-full bg-white border border-gray-200 px-4 py-2.5 rounded-lg text-sm outline-none focus:border-secondary transition-all" 
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      disabled={saving}
                      className="btn btn-secondary py-2.5 text-xs font-bold self-start px-8"
                    >
                      {saving ? <Loader2 size={16} className="animate-spin" /> : 'Confirm Password Change'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between border-t border-gray-50 pt-8">
              <div>
                <p className="font-bold text-primary">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
              </div>
              <button className="btn border border-secondary text-secondary px-6 py-2 text-xs font-bold opacity-50 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, ShoppingBag, Heart, Bell, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold mb-4">
                {user?.user_metadata?.full_name?.[0] || user?.email?.[0].toUpperCase()}
              </div>
              <h2 className="text-xl font-heading font-bold">{user?.user_metadata?.full_name || 'Valued Collector'}</h2>
              <p className="text-sm text-gray-500 mb-6">{user?.email}</p>
              <button 
                onClick={handleLogout}
                className="btn border border-red-100 text-red-500 hover:bg-red-50 w-full py-3 gap-2 text-xs font-bold"
              >
                <LogOut size={16} />
                Logout Account
              </button>
            </div>

            <nav className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-secondary bg-secondary/5 border-l-4 border-secondary">
                <User size={18} />
                My Profile
              </button>
              <button className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all border-l-4 border-transparent">
                <ShoppingBag size={18} />
                Order History
              </button>
              <button className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all border-l-4 border-transparent">
                <Heart size={18} />
                Wishlist
              </button>
              <button className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all border-l-4 border-transparent">
                <Bell size={18} />
                Notifications
              </button>
              <button className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all border-l-4 border-transparent">
                <Settings size={18} />
                Settings
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Total Orders</h4>
                <p className="text-3xl font-bold text-primary">12</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Member Since</h4>
                <p className="text-3xl font-bold text-primary">Oct 2023</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Rewards Points</h4>
                <p className="text-3xl font-bold text-secondary" style={{ color: 'var(--color-secondary)' }}>2,450</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50">
                <h3 className="text-xl font-heading font-bold">Profile Details</h3>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                  <div className="p-4 bg-gray-50 rounded-sm font-bold text-primary">{user?.user_metadata?.full_name || 'N/A'}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <div className="p-4 bg-gray-50 rounded-sm font-bold text-primary">{user?.email}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                  <div className="p-4 bg-gray-50 rounded-sm font-bold text-gray-400 italic">Not provided</div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Default Address</label>
                  <div className="p-4 bg-gray-50 rounded-sm font-bold text-gray-400 italic">No address on file</div>
                </div>
              </div>
              <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button className="btn btn-primary px-8">Edit Profile</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;

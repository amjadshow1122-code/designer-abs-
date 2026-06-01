import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  User, 
  Mail, 
  MessageSquare, 
  Edit, 
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Download,
  Star,
  X,
  ShieldCheck,
  Trash2,
  Save
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    
    // Fetch registered profiles
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_admin', false)
      .order('updated_at', { ascending: false });
      
    // Fetch newsletter subscribers
    const { data: newsletters, error: newsletterError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    const combined = [];
    
    if (profiles) {
      combined.push(...profiles.map(p => ({
        ...p,
        display_name: p.full_name || 'Anonymous Collector',
        role: 'Customer',
        date: p.updated_at,
        source: 'profile'
      })));
    }
    
    if (newsletters) {
      combined.push(...newsletters.map(n => ({
        id: n.id,
        display_name: n.email,
        email: n.email,
        role: 'Newsletter Only',
        date: n.created_at,
        source: 'newsletter',
        is_admin: false
      })));
    }
    
    // Sort by latest date
    combined.sort((a, b) => new Date(b.date) - new Date(a.date));

    setCustomers(combined);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEdit = (customer) => {
    setSelectedCustomer({ ...customer });
    setIsModalOpen(true);
  };

  const handleDelete = async (customer) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      const table = customer.source === 'newsletter' ? 'newsletter_subscribers' : 'profiles';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', customer.id);
      
      if (error) {
        alert('Error deleting subscriber: ' + error.message);
      } else {
        fetchCustomers();
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: selectedCustomer.full_name || selectedCustomer.display_name
      })
      .eq('id', selectedCustomer.id);

    if (error) {
      alert('Error updating profile: ' + error.message);
    } else {
      setIsModalOpen(false);
      fetchCustomers();
    }
    setIsSaving(false);
  };

  const handleExport = () => {
    if (customers.length === 0) return;

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Subscriber ID,Full Name,Account Type,Last Activity\n"
      + customers.map(c => {
          const name = (c.display_name || 'Anonymous').replace(/,/g, '');
          const role = c.role;
          const date = new Date(c.date).toLocaleString().replace(/,/g, '');
          return `${c.id},${name},${role},${date}`;
        }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `collector_directory_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCustomers = customers.filter(c => 
    (c.display_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Subscriber Directory</h1>
          <p className="text-gray-500 text-sm">Manage your registered members, roles, and account status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="btn border border-gray-200 text-primary hover:bg-gray-50 px-6 py-2.5 text-xs font-bold gap-2"
          >
            <Download size={16} />
            Export List
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary pl-12 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Total: {filteredCustomers.length} Collectors</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <th className="px-6 py-4">Subscriber</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && customers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs uppercase">
                          {(customer.display_name || 'U')[0]}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-bold text-primary">{customer.display_name}</span>
                          <span className="text-[10px] text-gray-400">
                            {customer.source === 'newsletter' ? 'Newsletter' : `ID: ${customer.id.substring(0, 8)}...`}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit ${
                        customer.source === 'newsletter' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {customer.source === 'newsletter' ? <Mail size={12} /> : <User size={12} />}
                        {customer.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {customer.source !== 'newsletter' && (
                          <button 
                            onClick={() => handleEdit(customer)}
                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(customer)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center text-gray-500 italic text-sm">
                    No collectors found in the directory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCustomer && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-heading font-bold text-primary">Edit Profile</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all"><X size={20} /></button>
              </div>
              <form onSubmit={handleUpdateProfile} className="p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input type="text" required value={selectedCustomer.full_name || ''} onChange={(e) => setSelectedCustomer({...selectedCustomer, full_name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl outline-none focus:border-secondary transition-all" />
                </div>
                {/* Administrator privileges removed from here for security */}
                <button type="submit" disabled={isSaving} className="btn btn-primary w-full py-4 gap-2 mt-2">
                  {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> Save Changes</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCustomers;

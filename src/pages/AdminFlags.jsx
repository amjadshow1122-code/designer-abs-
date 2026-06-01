import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, RefreshCw, Trash2, ShieldAlert, Eye, Loader2, Award, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdminFlags = () => {
  const [flags, setFlags] = useState([]);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlagsData = async () => {
    setLoading(true);
    
    // Fetch unreviewed flags (where reviewed_at is null)
    const { data: flagLogs } = await supabase
      .from('automation_flags')
      .select('*')
      .is('reviewed_at', null)
      .order('flagged_at', { ascending: false });

    if (flagLogs) setFlags(flagLogs);

    // Fetch titles for details
    const { data: s } = await supabase.from('sales_secure').select('id, title, slug');
    const { data: p } = await supabase.from('products_secure').select('id, name, slug');

    if (s) setSales(s);
    if (p) setProducts(p);

    setLoading(false);
  };

  useEffect(() => {
    fetchFlagsData();
  }, []);

  const getEntityName = (flag) => {
    if (flag.entity_type === 'sale') {
      const match = sales.find(s => s.id === flag.entity_id);
      return match ? `Sale: ${match.title}` : `Sale ID: ${flag.entity_id}`;
    } else {
      const match = products.find(p => p.id === flag.entity_id);
      return match ? `Product: ${match.name}` : `Product ID: ${flag.entity_id}`;
    }
  };

  const handleAction = async (flag, action) => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Mark the flag as reviewed
    await supabase
      .from('automation_flags')
      .update({
        reviewed_at: new Date().toISOString(),
        reviewed_by: user?.id || null,
        action_taken: action
      })
      .eq('id', flag.id);

    // 2. Perform target table changes based on action
    if (action === 'unpublished') {
      const targetTable = flag.entity_type === 'sale' ? 'sales_secure' : 'products_secure';
      await supabase
        .from(targetTable)
        .update({ status: 'archived' })
        .eq('id', flag.entity_id);
    }

    // Refresh queue
    fetchFlagsData();
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Automation Validation Flags</h1>
          <p className="text-gray-500 text-sm">Review staleness and broken link signals flagged by the nightly validation scripts.</p>
        </div>
        <button 
          onClick={fetchFlagsData}
          className="btn bg-gray-100 hover:bg-gray-200 text-primary text-xs py-2.5 px-5 gap-2 flex items-center"
        >
          <RefreshCw size={14} /> Refresh Queue
        </button>
      </div>

      {/* Flag Grid List */}
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b">
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Flag Type</th>
              <th className="px-6 py-4">Signal Details</th>
              <th className="px-6 py-4">Flagged At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-secondary" />
                </td>
              </tr>
            ) : flags.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16 flex flex-col items-center justify-center gap-2">
                  <Award size={48} className="text-green-500 mb-2 animate-bounce" />
                  <p className="font-heading text-lg font-bold text-primary">Queue is Completely Clear!</p>
                  <p className="text-xs text-gray-400">All links and sales have validated correctly against crawls.</p>
                </td>
              </tr>
            ) : (
              flags.map((flag) => (
                <tr key={flag.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-primary block text-sm">{getEntityName(flag)}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{flag.entity_type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 w-fit ${
                      flag.flag_type === 'expired_date' ? 'bg-red-50 text-red-600' :
                      flag.flag_type === 'suspected_stale' ? 'bg-amber-50 text-amber-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      <AlertTriangle size={10} />
                      {flag.flag_type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate font-mono">
                    {flag.raw_signal || 'No details logged.'}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {new Date(flag.flagged_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleAction(flag, 'unpublished')}
                        className="btn bg-red-50 hover:bg-red-100 text-red-600 font-bold py-1.5 px-3 text-[10px] rounded-lg uppercase tracking-wider"
                      >
                        Unpublish
                      </button>
                      <button 
                        onClick={() => handleAction(flag, 'marked_ok')}
                        className="btn bg-green-50 hover:bg-green-100 text-green-600 font-bold py-1.5 px-3 text-[10px] rounded-lg uppercase tracking-wider"
                      >
                        Mark OK
                      </button>
                      <button 
                        onClick={() => handleAction(flag, 'dismissed')}
                        className="btn bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold py-1.5 px-3 text-[10px] rounded-lg uppercase tracking-wider"
                      >
                        Dismiss
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFlags;

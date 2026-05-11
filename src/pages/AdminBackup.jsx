import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Download, 
  RotateCcw, 
  Trash2, 
  ShieldCheck, 
  Cloud, 
  HardDrive,
  Clock,
  Plus,
  Settings,
  CheckCircle2,
  X,
  Save,
  Server
} from 'lucide-react';

const AdminBackup = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [backups, setBackups] = useState([]);

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      const newBackup = {
        id: `BK-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toLocaleString(),
        size: '1.2 MB',
        type: 'Manual',
        status: 'Healthy'
      };
      setBackups([newBackup, ...backups]);
      setIsBackingUp(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-8 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">System Backups</h1>
          <p className="text-gray-500 text-sm">Secure your heritage database and configuration files.</p>
        </div>
        <button 
          onClick={handleCreateBackup}
          disabled={isBackingUp}
          className="btn btn-primary gap-2 py-3 px-8 shadow-lg shadow-primary/10"
        >
          {isBackingUp ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Plus size={18} />
          )}
          {isBackingUp ? 'Generating Backup...' : 'Create New Backup'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Cards */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-bold text-primary">System Integrity</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Database Live</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-t border-gray-50 pt-6">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Last Backup</span>
                <span className="text-primary font-bold">{backups.length > 0 ? backups[0].date : 'Never'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Total Backups</span>
                <span className="text-primary font-bold">{backups.length} Files</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Storage Used</span>
                <span className="text-primary font-bold">0 GB / 50 GB</span>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-4">
              <Cloud className="text-secondary" />
              <h3 className="font-bold text-lg">Cloud Sync Active</h3>
              <p className="text-xs text-gray-300 leading-relaxed uppercase tracking-widest font-bold">
                Your backups are automatically synchronized with the secondary heritage vault.
              </p>
            </div>
            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/5 rounded-full"></div>
          </div>
        </div>

        {/* Backup History Table */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-primary">Backup History</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowSettings(true)}
                  className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 rounded-lg"
                >
                  <Settings size={18} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <th className="px-6 py-4 font-bold uppercase tracking-widest">File Identity</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-right font-bold uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {backups.length > 0 ? backups.map((backup, idx) => (
                    <motion.tr 
                      key={backup.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-primary">{backup.id}</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{backup.date} • {backup.size}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{backup.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-green-500" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-green-600">{backup.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Download">
                            <Download size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-secondary transition-colors" title="Restore">
                            <RotateCcw size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-20 text-center text-gray-400 italic">
                        No backups found. Create your first backup to secure your data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-gray-50 flex items-center justify-center border-t border-gray-100">
              <button 
                onClick={() => setShowSettings(true)}
                className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:underline"
              >
                Configure Automated Backup Schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal Overlay */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-2xl shadow-2xl z-[70] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Settings size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-primary">Backup Configuration</h3>
                </div>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-primary">Automated Backups</p>
                      <p className="text-xs text-gray-400">Enable daily system snapshots.</p>
                    </div>
                    <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Backup Frequency</label>
                      <select className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all">
                        <option>Every 24 Hours</option>
                        <option>Every 12 Hours</option>
                        <option>Weekly</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Retention Period</label>
                      <select className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all">
                        <option>30 Days</option>
                        <option>60 Days</option>
                        <option>Indefinite</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                    <div className="flex items-center gap-3">
                      <Cloud className="text-secondary" size={20} />
                      <div>
                        <p className="text-sm font-bold text-primary">Cloud Vault Sync</p>
                        <p className="text-xs text-gray-400">Mirror backups to remote heritage server.</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/10 flex items-center gap-4">
                  <Server className="text-secondary" size={20} />
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-relaxed">
                    Backup storage is currently healthy. Next automated run scheduled for Tomorrow at 03:00 AM.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                <button onClick={() => setShowSettings(false)} className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="btn btn-primary px-8 py-2 gap-2"
                >
                  <Save size={16} />
                  Save Settings
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBackup;

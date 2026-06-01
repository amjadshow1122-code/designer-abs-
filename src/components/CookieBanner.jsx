import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings } from 'lucide-react';

const CONSENT_KEY = 'ds_cookie_consent';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Small delay so it doesn't flash immediately on page load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const saveConsent = (type) => {
    const consent = {
      necessary: true,
      functional: true,
      analytics: type === 'all' ? true : analytics,
      affiliate: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', damping: 24, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 z-[200] max-w-2xl mx-auto"
        >
          <div className="bg-primary text-white rounded-2xl shadow-2xl overflow-hidden">
            {!showDetails ? (
              /* Simple banner */
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Cookie size={20} className="text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold mb-0.5">We use cookies</p>
                  <p className="text-white/60 text-xs leading-snug">
                    We use strictly necessary and functional cookies to run the platform, plus optional analytics. We also track affiliate click-outs for commission purposes.{' '}
                    <Link to="/cookies" className="text-secondary hover:underline">Cookie Policy</Link>
                    {' · '}
                    <Link to="/privacy" className="text-secondary hover:underline">Privacy Policy</Link>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-white/20 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    <Settings size={12} /> Manage
                  </button>
                  <button
                    onClick={() => saveConsent('necessary')}
                    className="px-4 py-2.5 border border-white/20 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Necessary Only
                  </button>
                  <button
                    onClick={() => saveConsent('all')}
                    className="px-4 py-2.5 bg-secondary text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              /* Detail panel */
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-base">Cookie Preferences</h3>
                  <button onClick={() => setShowDetails(false)} className="p-1 hover:bg-white/10 rounded-lg transition-all">
                    <X size={18} />
                  </button>
                </div>
                <div className="flex flex-col gap-3 mb-5">
                  {[
                    { label: 'Strictly Necessary', desc: 'Authentication, session, CSRF protection. Cannot be disabled.', locked: true, checked: true },
                    { label: 'Functional', desc: 'Cart, currency, and display preferences.', locked: true, checked: true },
                    { label: 'Affiliate Tracking', desc: 'Click-out tracking to partner boutiques (session ID only). Core to our service.', locked: true, checked: true },
                    { label: 'Performance & Analytics', desc: 'Anonymised usage analytics to improve the platform.', locked: false, checked: analytics, onChange: () => setAnalytics(!analytics) },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between gap-4 py-3 border-b border-white/10 last:border-0">
                      <div>
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-white/50 text-xs mt-0.5">{item.desc}</p>
                      </div>
                      {item.locked ? (
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest shrink-0">Always On</span>
                      ) : (
                        <button
                          onClick={item.onChange}
                          className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${item.checked ? 'bg-secondary' : 'bg-white/20'}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${item.checked ? 'translate-x-4' : ''}`} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => saveConsent('custom')} className="flex-1 py-2.5 border border-white/20 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                    Save Preferences
                  </button>
                  <button onClick={() => saveConsent('all')} className="flex-1 py-2.5 bg-secondary rounded-lg text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">
                    Accept All
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;

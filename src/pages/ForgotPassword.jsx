import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/profile/settings`,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Password reset link sent! Please check your email.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20 px-4">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden relative z-10"
      >
        <div className="p-8 md:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Link to="/login" className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-primary transition-colors">
              <ArrowLeft size={14} />
              Back to Login
            </Link>
            <div className="text-center flex flex-col gap-2">
              <h1 className="text-3xl font-heading font-bold text-primary">Reset Password</h1>
              <p className="text-gray-500 text-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {message ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-lg text-center flex flex-col items-center gap-4 ${
                  message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}
              >
                {message.type === 'success' ? (
                  <>
                    <CheckCircle2 size={40} className="text-green-500" />
                    <p className="text-sm font-bold uppercase tracking-widest">{message.text}</p>
                    <Link to="/login" className="btn btn-primary w-full py-3 mt-2">Return to Login</Link>
                  </>
                ) : (
                  <p className="text-sm font-bold uppercase tracking-widest">{message.text}</p>
                )}
              </motion.div>
            ) : (
              <form onSubmit={handleReset} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-gray-50 border border-gray-100 px-12 py-4 rounded-sm outline-none focus:border-secondary transition-all text-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary w-full py-4 mt-2 gap-3"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

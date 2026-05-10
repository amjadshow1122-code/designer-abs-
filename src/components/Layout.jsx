import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPath && <Header />}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex-grow ${!isAdminPath ? 'pt-24' : ''}`}
      >
        {children}
      </motion.main>
      {!isAdminPath && <Footer />}
    </div>
  );
};

export default Layout;

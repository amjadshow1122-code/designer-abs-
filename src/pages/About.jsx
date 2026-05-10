import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Globe, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading text-white mb-6"
          >
            Our Heritage Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto font-body"
          >
            Preserving the artistic soul of the Arab world through a curated collection of prestige and tradition.
          </motion.p>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-white/20 h-full"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm mb-4 block" style={{ color: 'var(--color-secondary)' }}>Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl mb-8 leading-tight">Bridging Traditions with Modern Luxury</h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Arab Finds was born from a passion for the intricate craftsmanship and rich cultural history of the Middle East. We believe that true luxury lies in the stories told by the hands of master artisans.
              </p>
              <p className="text-gray-500 mb-10 leading-relaxed">
                Our team travels across the region to source unique pieces that reflect the spirit of heritage while fitting seamlessly into the contemporary home and lifestyle.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <h4 className="text-3xl font-heading font-bold text-primary">150+</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Artisan Partners</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-3xl font-heading font-bold text-primary">12</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Countries Sourced</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1542125387-c7128488903c?auto=format&fit=crop&q=80&w=1000" 
                alt="Craftsmanship" 
                className="w-full h-[600px] object-cover rounded-sm"
              />
              <div className="absolute -bottom-10 -left-10 bg-secondary p-10 hidden lg:block" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <p className="text-white text-2xl font-heading italic max-w-[200px]">"Prestige is found in the preservation of heritage."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background">
        <div className="container text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Our Core Values</h2>
          <div className="w-20 h-1 bg-secondary mx-auto" style={{ backgroundColor: 'var(--color-secondary)' }}></div>
        </div>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold">Authenticity</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Every piece in our collection is verified for its cultural origin and material quality.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold">Excellence</h3>
              <p className="text-sm text-gray-500 leading-relaxed">We settle for nothing less than the finest craftsmanship and materials.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold">Community</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Supporting local artisans and preserving their traditional livelihood.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold">Heritage</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Sharing the beauty of Arab culture with the entire world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-heading italic text-primary mb-8">
              "Our mission is to bring the timeless elegance of the Arab world into the modern home, fostering a deep appreciation for heritage through high-end, authentic design."
            </h2>
            <div className="w-12 h-[1px] bg-gray-200 mx-auto mb-8"></div>
            <span className="font-bold uppercase tracking-widest text-xs text-gray-400">Founding Vision, 2023</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import BouncyText from '../common/BouncyText';

const Features = () => {
  // Features data
  const features = [
    {
      icon: '🚀',
      title: 'Lightning Fast Transactions',
      description: 'MoonPup transactions are processed in seconds, making it perfect for everyday use.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: '🔒',
      title: 'Secure & Audited',
      description: 'Our contract has been thoroughly audited to ensure your funds are safe and secure.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '👥',
      title: 'Community Driven',
      description: 'MoonPup is 100% community driven with active governance and regular events.',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: '💰',
      title: 'Rewarding Tokenomics',
      description: 'Hold $MPUP and watch your balance grow through our innovative reward system.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: '🌐',
      title: 'Global Ecosystem',
      description: 'Join our worldwide community of puppers spanning across multiple platforms.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🎮',
      title: 'Play-to-Earn Games',
      description: 'Earn $MPUP by playing our upcoming collection of addictive mini-games.',
      color: 'from-red-500 to-pink-500'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden vaporwave-grid" style={{ position: 'relative' }}>
      <div className="absolute inset-0 bg-black/90 z-0"></div>
      
      {/* Animated gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20 blur-3xl animate-pulse-slow z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ position: 'relative' }}
        >
          <BouncyText
            text="COSMIC FEATURES"
            as="h2"
            className="section-title text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-500 to-purple-600 neon-text font-revamped"
            staggerDuration={0.04}
            initialDelay={0.2}
            animateOnHover={false}
          />
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            $MPUP is packed with amazing features that set it apart from other memecoins. 
            MoonPup is the ultimate cosmic companion for your crypto journey.
          </p>
        </motion.div>
        
        {/* Feature grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          style={{ position: 'relative' }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="glass p-8 rounded-xl border border-white/10 premium-hover"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} mb-6 flex items-center justify-center text-2xl`}>
                {feature.icon}
              </div>
              
              <BouncyText
                text={feature.title}
                as="h3"
                className="text-xl font-bold mb-3 font-glow"
                staggerDuration={0.03}
                animateOnHover={true}
              />
              
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-white/10">
            <BouncyText
              text="Ready to Join the Pack?"
              as="h3"
              className="text-2xl md:text-3xl font-bold mb-4 font-glow"
              staggerDuration={0.04}
              initialDelay={0}
              animateOnHover={false}
            />
            <p className="text-gray-300 mb-6">
              Don't miss your chance to be part of the most exciting memecoin of 2025.
              Join our community today and prepare for liftoff!
            </p>
            <motion.button
              className="button-3d px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-lg transform transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Buy $MPUP Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 
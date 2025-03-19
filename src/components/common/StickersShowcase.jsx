import { useState } from 'react';
import { motion } from 'framer-motion';
import moonpup_sticker_nobg from '../../assets/moonpup_sticker_nobg.png';
import moonpup_sticker_nobg01 from '../../assets/moonpup_sticker_nobg01.png';
import moonpup_sticker_nobg02 from '../../assets/moonpup_sticker_nobg02.png';
import { useCoinStickers } from './CoinStickerManager';

const StickersShowcase = () => {
  const [selectedTab, setSelectedTab] = useState('characters');
  const { coinStickers, isLoading } = useCoinStickers();
  
  // Character stickers
  const characterStickers = [
    { id: 1, name: 'MoonPup Trio', image: moonpup_sticker_nobg },
    { id: 2, name: 'Crypto Cat', image: moonpup_sticker_nobg01 },
    { id: 3, name: 'Astronaut Pup', image: moonpup_sticker_nobg02 },
  ];
  
  const tabVariants = {
    inactive: { 
      opacity: 0.7,
      y: 0,
      transition: { duration: 0.3 }
    },
    active: { 
      opacity: 1, 
      y: -3,
      transition: { duration: 0.3 }
    }
  };
  
  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.3,
        type: "spring", 
        stiffness: 400, 
        damping: 15
      }
    }
  };
  
  // Helper function to get a default color for a coin
  const getDefaultColorForCoin = (id) => {
    const colorMap = {
      btc: 'from-yellow-400 to-orange-500',
      eth: 'from-purple-400 to-blue-500',
      mpup: 'from-pink-400 to-purple-500',
      default: 'from-blue-400 to-green-500'
    };
    
    return colorMap[id] || colorMap.default;
  };
  
  return (
    <section id="stickers" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-purple-900/20 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-revamped gradient-text">
            Stellar Stickers
          </h2>
          
          {/* Tab navigation */}
          <div className="flex justify-center mb-12">
            <div className="glass rounded-full p-1 flex">
              <motion.button
                className={`py-2 px-6 rounded-full ${selectedTab === 'characters' ? 'bg-purple-600 text-white' : 'text-white/80'}`}
                onClick={() => setSelectedTab('characters')}
                variants={tabVariants}
                animate={selectedTab === 'characters' ? 'active' : 'inactive'}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Characters
              </motion.button>
              
              <motion.button
                className={`py-2 px-6 rounded-full ${selectedTab === 'coins' ? 'bg-purple-600 text-white' : 'text-white/80'}`}
                onClick={() => setSelectedTab('coins')}
                variants={tabVariants}
                animate={selectedTab === 'coins' ? 'active' : 'inactive'}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Coins
              </motion.button>
            </div>
          </div>
          
          {/* Character stickers */}
          {selectedTab === 'characters' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {characterStickers.map((sticker) => (
                <motion.div
                  key={sticker.id}
                  className="relative group"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="glass rounded-xl p-6 flex flex-col items-center">
                    <div className="w-40 h-40 relative">
                      <img
                        src={sticker.image}
                        alt={sticker.name}
                        className="w-full h-full object-contain drop-shadow-lg transform transition-transform group-hover:scale-110 duration-300"
                      />
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 rounded-full filter blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    </div>
                    
                    <h3 className="mt-4 font-bold text-lg font-glow">{sticker.name}</h3>
                    
                    <button className="mt-4 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* Coin stickers */}
          {selectedTab === 'coins' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {isLoading ? (
                <div className="col-span-3 text-center py-10">
                  <motion.div 
                    className="inline-block w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="mt-4 text-gray-300">Loading stickers...</p>
                </div>
              ) : (
                coinStickers.map((coin) => (
                  <motion.div
                    key={coin.id}
                    className="relative group"
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="glass rounded-xl p-6 flex flex-col items-center">
                      <div className="w-32 h-32 relative">
                        {coin.image ? (
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-full h-full object-contain drop-shadow-lg transform transition-transform group-hover:scale-110 duration-300"
                          />
                        ) : (
                          <div className={`w-full h-full rounded-full bg-gradient-to-br ${getDefaultColorForCoin(coin.id)} flex items-center justify-center shadow-lg border-2 border-white/30 transform transition-transform group-hover:scale-110 duration-300`}>
                            <span className="text-white font-bold text-2xl">
                              {coin.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 rounded-full filter blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                      </div>
                      
                      <h3 className="mt-4 font-bold text-lg font-glow">{coin.name}</h3>
                      
                      <div className="mt-2 text-sm text-gray-400">Coming soon</div>
                      
                      <button disabled className="mt-4 text-sm text-purple-600/50 cursor-not-allowed">
                        Download
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
          
          <div className="mt-16 text-center">
            <p className="text-gray-300 mb-6">
              More stickers will be added regularly. Check back often!
            </p>
            
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-bold interactive"
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Request Custom Sticker
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StickersShowcase; 
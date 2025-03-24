import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCoinStickers } from './CoinStickerManager';

// This will be updated when actual coin sticker images are provided
const defaultCoins = [
  { id: 'btc', color: 'from-yellow-400 to-orange-500' },
  { id: 'eth', color: 'from-purple-400 to-blue-500' },
  { id: 'mpup', color: 'from-pink-400 to-purple-500' },
];

const CoinStickers = () => {
  const [coins, setCoins] = useState([]);
  const { coinStickers, isLoading } = useCoinStickers();

  useEffect(() => {
    if (isLoading) return;
    
    // Create visual coin elements from sticker data
    const newCoins = coinStickers.map((coin, index) => ({
      ...coin,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 40 + 40, // 40-80px
      rotation: Math.random() * 20 - 10,
      duration: Math.random() * 5 + 10,
      delay: Math.random() * 3,
      color: getDefaultColorForCoin(coin.id),
    }));
    
    setCoins(newCoins);
  }, [coinStickers, isLoading]);

  // Helper function to get a default color based on coin id
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
      {coins.map((coin) => (
        <motion.div
          key={coin.id}
          className="absolute"
          style={{
            width: `${coin.size}px`,
            height: `${coin.size}px`,
            left: `${coin.x}%`,
            top: `${coin.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [coin.rotation, coin.rotation + 5, coin.rotation],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: coin.duration,
            delay: coin.delay,
            ease: "easeInOut"
          }}
        >
          {coin.image ? (
            <img 
              src={coin.image} 
              alt={`${coin.name} Coin`} 
              className="w-full h-full object-contain drop-shadow-lg"
            />
          ) : (
            // Placeholder coin with gradient
            <div className={`w-full h-full rounded-full bg-gradient-to-br ${coin.color} flex items-center justify-center shadow-lg border-2 border-white/30`}>
              <span className="text-white font-bold text-sm">
                {typeof coin.id === 'string' ? coin.id.toUpperCase() : '$'}
              </span>
            </div>
          )}
          
          {/* Shimmering effect */}
          <motion.div 
            className="absolute inset-0 bg-white rounded-full opacity-0"
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: Math.random() * 2,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default CoinStickers; 
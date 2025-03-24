import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import React from 'react';

// Import new coin images
import mpupMainCoin from '../../assets/coin_mpup_main.png';
import mpupStackCoin from '../../assets/coin_mpup_stack.png';

// Define coin assets with metadata
const coinAssets = {
  mpup_main: {
    src: mpupMainCoin,
    alt: "MoonPup Main Coin",
    overlay: "bg-gradient-to-br from-purple-500/20 to-indigo-500/20",
    glow: "purple",
    shadowColor: "rgba(165, 127, 255, 0.7)",
  },
  mpup_stack: {
    src: mpupStackCoin,
    alt: "MoonPup Stacked Coins",
    overlay: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
    glow: "orange",
    shadowColor: "rgba(255, 159, 28, 0.7)",
  },
  mpup_community: {
    src: mpupMainCoin, // Using main for now, replace with actual asset
    alt: "MoonPup Community Coin",
    overlay: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    glow: "blue",
    shadowColor: "rgba(59, 130, 246, 0.7)",
  },
  mpup_meme: {
    src: mpupStackCoin, // Using stack for now, replace with actual asset
    alt: "MoonPup Meme Coin",
    overlay: "bg-gradient-to-br from-pink-500/20 to-purple-500/20",
    glow: "pink",
    shadowColor: "rgba(236, 72, 153, 0.7)",
  },
  mpup_dao: {
    src: mpupMainCoin, // Using main for now, replace with actual asset
    alt: "MoonPup DAO Coin",
    overlay: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    glow: "green",
    shadowColor: "rgba(52, 211, 153, 0.7)",
  },
  mpup_gold: {
    src: mpupStackCoin, // Using stack for now, replace with actual asset
    alt: "MoonPup Gold Coin",
    overlay: "bg-gradient-to-br from-yellow-400/20 to-amber-600/20",
    glow: "gold",
    shadowColor: "rgba(252, 211, 77, 0.7)",
  },
  mpup_silver: {
    src: mpupMainCoin, // Using main for now, replace with actual asset
    alt: "MoonPup Silver Coin",
    overlay: "bg-gradient-to-br from-gray-300/20 to-gray-500/20",
    glow: "silver",
    shadowColor: "rgba(209, 213, 219, 0.7)",
  },
};

// Coin sizes
const sizes = {
  xs: "w-8 h-8",
  sm: "w-12 h-12",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

// Get glow styles for different coin types
const getGlowStyle = (type) => {
  const coin = coinAssets[type];
  if (!coin) return {};
  
  const glowColors = {
    purple: "0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)",
    orange: "0 0 20px rgba(249, 115, 22, 0.8), 0 0 40px rgba(249, 115, 22, 0.4)",
    blue: "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)",
    pink: "0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(236, 72, 153, 0.4)",
    green: "0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.4)",
    gold: "0 0 20px rgba(252, 211, 77, 0.8), 0 0 40px rgba(252, 211, 77, 0.4)",
    silver: "0 0 20px rgba(209, 213, 219, 0.8), 0 0 40px rgba(209, 213, 219, 0.4)",
  };

  return {
    boxShadow: glowColors[coin.glow] || glowColors.purple,
  };
};

// Single coin component with animation options
const CoinImage = ({ 
  type = "mpup_main",
  size = "md",
  animate = false,
  interactive = false,
  className = "",
  onClick = null,
  style = {},
  rotation = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const controls = useAnimation();
  const coinRef = useRef(null);
  
  // Get coin data
  const coin = coinAssets[type] || coinAssets.mpup_main;
  const sizeClass = sizes[size] || sizes.md;

  useEffect(() => {
    if (animate === "float") {
      controls.start({
        y: [0, -10, 0],
        rotate: [0, 3, 0, -3, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }
      });
    } else if (animate && typeof animate === 'boolean') {
      controls.start({
        rotate: [0, 360],
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }
      });
    }
  }, [animate, controls]);

  // Interactive shine effect
  const handleMouseMove = (e) => {
    if (!interactive || !coinRef.current) return;
    
    const rect = coinRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate position percentage
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    // Update shine position
    if (coinRef.current) {
      coinRef.current.style.setProperty('--shine-x', `${percentX}%`);
      coinRef.current.style.setProperty('--shine-y', `${percentY}%`);
    }
  };

  // Simplified handler that only responds to explicit onClick prop to prevent crashes
  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      onClick();
    }
    // Removed the rotation animation that was causing freezes
  };

  return (
    <motion.div
      ref={coinRef}
      className={`relative select-none ${className} ${interactive ? 'shine-effect gold-shimmer' : ''}`}
      animate={controls}
      style={{
        ...style,
        rotate: rotation,
        cursor: onClick ? 'pointer' : 'default'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      whileHover={interactive ? { scale: 1.05 } : {}} // Reduced scale effect
      whileTap={interactive ? { scale: 0.98 } : {}}   // Reduced tap effect
    >
      {/* Base coin image */}
      <div className={`${sizeClass} relative overflow-hidden rounded-full`}>
        <img 
          src={coin.src} 
          alt={coin.alt} 
          className="w-full h-full object-contain"
        />
        
        {/* Interactive hover overlay */}
        {interactive && (
          <motion.div 
            className={`absolute inset-0 ${coin.overlay} opacity-0 rounded-full`}
            animate={isHovered ? { opacity: 0.5 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
      
      {/* Glow effect */}
      {interactive && (
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute inset-0 rounded-full z-[-1]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={getGlowStyle(type)}
            />
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

// A showcase of multiple coins in a grid
const CoinShowcase = ({ 
  coins = ["mpup_main", "mpup_stack"],
  interactive = true,
  className = "",
}) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start("visible");
  }, [controls]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    },
  };

  return (
    <motion.div
      className={`flex gap-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {coins.map((coinType, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="flex-1 flex justify-center"
        >
          <CoinImage 
            type={coinType} 
            size="md"
            interactive={interactive}
            animate="float"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

// A floating background field of coins
const FloatingCoinField = ({
  count = 12,
  className = "",
}) => {
  const coinTypes = Object.keys(coinAssets);
  const fieldRef = useRef(null);
  
  // Use useMemo to generate coins only once
  const generatedCoins = React.useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      // Generate random properties for each coin
      const type = coinTypes[Math.floor(Math.random() * coinTypes.length)];
      const size = ["xs", "sm", "md"][Math.floor(Math.random() * 3)];
      const xPos = Math.random() * 100; // % position
      const yPos = Math.random() * 100; // % position
      const duration = 15 + Math.random() * 30; // Float duration
      const delay = Math.random() * 10; // Animation delay
      
      return {
        id: index,
        type,
        size,
        position: { left: `${xPos}%`, top: `${yPos}%` },
        duration,
        delay,
        rotation: Math.random() * 360,
      };
    });
  }, [count, coinTypes]); // Only regenerate when count or coinTypes change
  
  return (
    <div 
      ref={fieldRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ position: 'relative' }} // Add explicit position to fix scroll warning
    >
      {generatedCoins.map((coin) => (
        <motion.div
          key={coin.id}
          className="absolute"
          style={{ ...coin.position, zIndex: -1 }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            rotate: [coin.rotation, coin.rotation + 360],
          }}
          transition={{
            duration: coin.duration,
            delay: coin.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <CoinImage
            type={coin.type}
            size={coin.size}
            animate={false}
            style={{ opacity: 0.5 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export { CoinImage, CoinShowcase, FloatingCoinField }; 
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll } from 'framer-motion';
import useShader from '../../hooks/useShader';
import fragmentShader from '../../shaders/background.glsl';
import moonpupHero from '../../assets/moonpup_hero.png';
import moonpupSticker01 from '../../assets/moonpup_sticker_nobg01.png';
import moonpupSticker02 from '../../assets/moonpup_sticker_nobg02.png';
import moonpupSticker03 from '../../assets/moonpup_sticker_nobg03.png';
import { CoinImage, CoinShowcase } from '../common/CoinImages';

const Hero = () => {
  const { mountRef } = useShader(fragmentShader);
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const controls = useAnimation();

  // Character stickers with improved positioning
  const characterStickers = [
    {
      id: 1,
      src: moonpupSticker01,
      alt: 'MoonPup Astronaut',
      style: {
        position: 'absolute',
        top: '0.1%',
        right: '22%',
        width: '400px',
        height: '400px',
        zIndex: 5,
        transform: 'rotate(45deg)',
        opacity: 0.9
      },
      animation: {
        y: [0, -15, 0],
        rotate: [15, 10, 15],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }
      }
    },
    {
      id: 2,
      src: moonpupSticker02,
      alt: 'MoonPup Astronaut',
      style: {
        position: 'absolute',
        bottom: '40%',
        left: '24%',
        width: '480px',
        height: '480px',
        zIndex: 5,
        transform: 'rotate(-10deg)',
        opacity: 0.9
      },
      animation: {
        y: [0, 15, 0],
        rotate: [-10, -15, -10],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }
      }
    },
    {
      id: 3,
      src: moonpupSticker03,
      alt: 'MoonPup Astronaut',
      style: {
        position: 'absolute',
        top: '05%',
        left: '04%',
        width: '90px',
        height: '90px',
        zIndex: 4,
        transform: 'rotate(5deg)',
        opacity: 0.85
      },
      animation: {
        y: [0, 0, 0],
        rotate: [5, 360, 5],
        transition: {
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }
      }
    }
  ];

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Set position to relative for the first mount
    if (heroRef.current) {
      heroRef.current.style.position = 'relative';
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate cosmic particles in the background
  useEffect(() => {
    if (!heroRef.current) return;
    
    // Create cosmic particles
    const particleCount = 40; // Reduced for better performance with shader
    const container = heroRef.current;
    
    // Remove existing particles if any
    const existingParticles = container.querySelectorAll('.cosmic-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Add new particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'cosmic-particle';
      
      // Random properties
      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = Math.random() * 0.3 + 0.1; // Reduced opacity with shader
      const animationDuration = Math.random() * 15 + 10;
      const animationDelay = Math.random() * 10;
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = opacity;
      particle.style.animationDuration = `${animationDuration}s`;
      particle.style.animationDelay = `${animationDelay}s`;
      
      container.appendChild(particle);
    }
  }, []);

  // Animation for the floating dog
  const floatAnimation = () => {
    controls.start({
      y: [0, -20, 0],
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  };

  useEffect(() => {
    floatAnimation();
  }, []);

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05,
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(146, 81, 255, 0.5)",
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 5px 15px -5px rgba(146, 81, 255, 0.3)",
      transition: { 
        duration: 0.1,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const stickerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (delay) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: delay * 0.2 + 0.3,
        ease: "easeOut"
      }
    })
  };

  // Parallax effect based on scroll position
  const getParallaxStyle = (factor) => {
    return {
      transform: `translateY(${scrollY * factor}px)`,
    };
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen pb-32 flex items-center overflow-hidden vaporwave-grid"
      style={{ position: 'relative' }}
    >
      {/* Enhanced shader background with proper mounting */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-2"
        style={{ 
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      ></div>
      
      {/* Subtle gradient overlay - now lighter to allow shader to shine */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-3"></div>
      
      {/* Character stickers placed around the hero section */}
      {characterStickers.map((sticker) => (
        <motion.img
          key={sticker.id}
          src={sticker.src}
          alt={sticker.alt}
          style={{
            ...sticker.style,
            ...getParallaxStyle(sticker.id * 0.03),
          }}
          initial="hidden"
          animate={[sticker.animation, "visible"]}
          variants={stickerVariants}
          custom={sticker.id}
          className="absolute filter drop-shadow-lg shine-effect"
        />
      ))}
      
      {/* Floating coins with improved positioning and brightness */}
      <motion.div
        className="absolute top-[10%] right-[5%]"
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
          rotate: [5, 360, 5],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={getParallaxStyle(-0.03)}
      >
        <CoinImage type="mpup_main" size="md" interactive={false} className="gold-shimmer" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-[20%] left-[5%]"
        animate={{
          y: [0, -18, 0],
          x: [0, -5, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={getParallaxStyle(0.05)}
      >
        <CoinImage type="mpup_stack" size="sm" interactive={false} className="gold-shimmer" />
      </motion.div>
      
      <motion.div
        className="absolute top-[34%] left-[10%]"
        animate={{
          y: [0, -12, 0],
          x: [0, 6, 0],
          rotate: [0, 12, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={getParallaxStyle(-0.02)}
      >
        <CoinImage type="mpup_gold" size="sm" interactive={false} className="gold-shimmer" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text content */}
          <div>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 text-white font-revamped font-glow leading-tight"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 shine-effect">
                To The Moon 
              </span>
              <br />
              with MoonPup
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 text-gray-300 max-w-lg"
              initial="hidden"
              animate="visible"
              variants={textVariants}
              custom={1}
            >
              The most adorable cosmic companion in the memecoin universe, 
              ready to help you reach lunar heights with fun, community, and adorable charm.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-12"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <motion.button 
                className="button-3d px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-lg transform transition-all duration-300"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                Buy $MPUP
              </motion.button>
              
              <motion.button 
                className="button-3d px-8 py-3 rounded-full bg-white/10 backdrop-blur-md text-white font-medium border border-white/20 shadow-lg transform transition-all duration-300"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                Join Community
              </motion.button>
            </motion.div>
          </div>
          
          {/* Hero image */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-full blur-3xl"></div>
            
            <motion.div
              animate={controls}
              className="relative z-10"
            >
              <img 
                src={moonpupHero} 
                alt="MoonPup Hero" 
                className="w-full max-w-md mx-auto pulse-glow hero-image-border"
                style={{ marginTop: '150px', marginLeft: '60px' }}
              />
            </motion.div>
            
            {/* Decorative sticker coin */}
            <motion.div
              className="absolute -bottom-80 -left-3  w-44 h-44"
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 0.9, rotate: -20 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={getParallaxStyle(-0.1)}
            >
              <CoinImage type="mpup_gold" size="md" interactive={false} className="gold-shimmer" />
            </motion.div>
          </motion.div>
        </div>

        
        {/* Stats section - improved styling */}
        <motion.div 
          className="absolute bottom-6 left-0 right-0 z-30"
          initial="hidden"
          animate="visible"
          variants={statsVariants}
          style={{ position: 'relative' }}
        >
          <div className="glass rounded-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center py-4">
                <h2 className="text-4xl font-bold font-revamped text-purple-400">28K+</h2>
                <p className="text-gray-300 text-sm font-revamped">HOLDERS</p>
              </div>
              
              <div className="text-center py-4">
                <h2 className="text-4xl font-bold font-revamped text-pink-400">$2.8M</h2>
                <p className="text-gray-300 text-sm font-revamped">MARKET CAP</p>
              </div>
              
              <div className="text-center py-4">
                <h2 className="text-4xl font-bold font-revamped text-cyan-400">10K+</h2>
                <p className="text-gray-300 text-sm font-revamped">COMMUNITY</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 
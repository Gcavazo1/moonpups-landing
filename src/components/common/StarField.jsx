import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StarField = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Create random stars
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const starCount = Math.floor((windowWidth * windowHeight) / 10000); // Adjust density
    
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // % of screen width
      y: Math.random() * 100, // % of screen height
      size: Math.random() * 2.5 + 0.5, // 0.5px - 3px
      opacity: Math.random() * 0.7 + 0.3, // 0.3 - 1.0
      blink: Math.random() > 0.7, // 30% of stars will blink
      blinkDuration: Math.random() * 3 + 2, // 2-5s
      twinkle: Math.random() > 0.5, // 50% of stars will twinkle
      twinkleDuration: Math.random() * 10 + 5, // 5-15s
    }));
    
    setStars(newStars);
    
    // Clean up if component unmounts
    return () => setStars([]);
  }, []);
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="fixed rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
          }}
          animate={
            star.blink
              ? { opacity: [star.opacity, 0, star.opacity] }
              : star.twinkle
              ? { opacity: [star.opacity, star.opacity + 0.3, star.opacity] }
              : {}
          }
          transition={
            star.blink
              ? {
                  repeat: Infinity,
                  duration: star.blinkDuration,
                  repeatType: "loop",
                }
              : star.twinkle
              ? {
                  repeat: Infinity,
                  duration: star.twinkleDuration,
                  repeatType: "reverse",
                }
              : {}
          }
        />
      ))}
      
      {/* Add occasional shooting stars */}
      <ShootingStars />
    </div>
  );
};

const ShootingStars = () => {
  const [shootingStars, setShootingStars] = useState([]);
  
  useEffect(() => {
    // Set up interval to create occasional shooting stars
    const createShootingStar = () => {
      const newStar = {
        id: Date.now(),
        startX: Math.random() * 30 + 10, // 10-40% from left
        startY: Math.random() * 30, // 0-30% from top
        angle: Math.random() * 30 + 15, // 15-45 degrees
        size: Math.random() * 2 + 2, // 2-4px
        tailLength: Math.random() * 60 + 40, // 40-100px
        duration: Math.random() * 0.8 + 0.7, // 0.7-1.5s
      };
      
      setShootingStars(prev => [...prev, newStar]);
      
      // Remove star after animation completes
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
      }, newStar.duration * 1000 + 100);
    };
    
    // Create a shooting star every 5-15 seconds
    const interval = setInterval(() => {
      createShootingStar();
    }, Math.random() * 10000 + 5000);
    
    // Initial star
    createShootingStar();
    
    // Clean up interval
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      {shootingStars.map(star => {
        // Calculate end position based on angle
        const distance = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2));
        const radians = (star.angle * Math.PI) / 180;
        const endX = star.startX + (distance / window.innerWidth) * 100 * Math.cos(radians);
        const endY = star.startY + (distance / window.innerHeight) * 100 * Math.sin(radians);
        
        return (
          <motion.div
            key={star.id}
            className="fixed bg-white rounded-full z-0"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              boxShadow: `0 0 ${star.tailLength}px ${star.tailLength / 2}px rgba(255, 255, 255, 0.7)`,
              transform: `rotate(${star.angle}deg)`,
            }}
            animate={{
              left: `${endX}%`,
              top: `${endY}%`,
              opacity: [0.2, 1, 0],
            }}
            transition={{
              duration: star.duration,
              ease: "easeOut",
            }}
          />
        );
      })}
    </>
  );
};

export default StarField; 
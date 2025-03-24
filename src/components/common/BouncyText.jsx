import React from 'react';
import { motion } from 'framer-motion';

const BouncyText = ({ 
  text,
  as = "h2",
  className = "",
  charClassName = "",
  animateOnHover = false,
  staggerDuration = 0.05,
  initialDelay = 0,
  fontSize = "inherit",
  color = "inherit",
  fontWeight = "inherit",
}) => {
  // Split text into individual characters
  const characters = text.split('');
  
  // Motion variants for each character
  const characterVariants = {
    bounce: {
      y: [0, -10, 0],
      scale: [1, 1.1, 1],
      rotateZ: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };
  
  // Create the element based on specified tag
  const Component = motion[as] || motion.h2;
  
  return (
    <Component
      className={className}
      style={{ 
        display: 'inline-block',
        fontSize,
        color,
        fontWeight,
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          whileHover={animateOnHover ? "bounce" : undefined}
          variants={characterVariants}
          style={{ 
            display: 'inline-block',
            position: 'relative',
            whiteSpace: 'pre',
          }}
          className={charClassName}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Component>
  );
};

export default BouncyText; 
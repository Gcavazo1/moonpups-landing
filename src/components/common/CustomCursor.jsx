import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Force the cursor to be visible from the start
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check for interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.tagName === 'INPUT' ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      // Check for glow effect
      if (target.classList.contains('glow-effect')) {
        setIsGlowing(true);
      } else {
        setIsGlowing(false);
      }

      // Check for token elements
      if (target.classList.contains('token-element')) {
        setIsToken(true);
      } else {
        setIsToken(false);
      }

      // Check for text elements
      if (target.classList.contains('text')) {
        setIsText(true);
      } else {
        setIsText(false);
      }
    };

    // Always add custom-cursor-enabled class to body
    document.body.classList.add('custom-cursor-enabled');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  // Cursor variants for different states
  const cursorVariants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      width: '20px',
      height: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      mixBlendMode: 'difference',
      opacity: 1, // Always visible
    },
    hovering: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      width: '30px',
      height: '30px',
      backgroundColor: 'rgba(146, 81, 255, 0.8)',
      mixBlendMode: 'difference',
      opacity: 1, // Always visible
    },
    glowing: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      width: '30px',
      height: '30px',
      backgroundColor: 'rgba(146, 81, 255, 0.8)',
      boxShadow: '0 0 15px 5px rgba(146, 81, 255, 0.5)',
      mixBlendMode: 'difference',
      opacity: 1, // Always visible
    },
    token: {
      x: mousePosition.x - 18,
      y: mousePosition.y - 18,
      width: '36px',
      height: '36px',
      backgroundImage: 'radial-gradient(circle, rgba(146, 81, 255, 0.8) 0%, rgba(84, 214, 255, 0.8) 100%)',
      mixBlendMode: 'difference',
      opacity: 1, // Always visible
    },
    text: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 12,
      width: '4px',
      height: '24px',
      borderRadius: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      mixBlendMode: 'difference',
      opacity: 1, // Always visible
    },
  };

  const getCursorVariant = () => {
    if (isText) return 'text';
    if (isToken) return 'token';
    if (isGlowing) return 'glowing';
    if (isHovering) return 'hovering';
    return 'default';
  };

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor"
      variants={cursorVariants}
      animate={getCursorVariant()}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.3,
      }}
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
      }}
    />
  );
};

export default CustomCursor; 
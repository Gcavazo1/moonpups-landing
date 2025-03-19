import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import moonpup_sticker_nobg from '../../assets/moonpup_sticker_nobg.png';
import moonpup_sticker_nobg01 from '../../assets/moonpup_sticker_nobg01.png';
import moonpup_sticker_nobg02 from '../../assets/moonpup_sticker_nobg02.png';

const FloatingCharacters = () => {
  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    // Create randomly positioned characters
    const images = [
      moonpup_sticker_nobg,
      moonpup_sticker_nobg01,
      moonpup_sticker_nobg02
    ];
    
    const newCharacters = Array.from({ length: 5 }, (_, index) => ({
      id: index,
      image: images[index % images.length],
      x: Math.random() * 80 + 10, // 10-90% of screen width
      y: Math.random() * 80 + 10, // 10-90% of screen height
      size: Math.random() * 120 + 80, // 80-200px
      rotation: Math.random() * 30 - 15, // -15 to 15 degrees
      animationDuration: Math.random() * 8 + 12, // 12-20s
      delay: Math.random() * 5, // 0-5s delay
      direction: Math.random() > 0.5 ? 1 : -1, // Random direction
    }));
    
    setCharacters(newCharacters);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {characters.map((character) => (
        <motion.img
          key={character.id}
          src={character.image}
          alt="MoonPup Character"
          className="absolute filter drop-shadow-lg"
          style={{
            width: `${character.size}px`,
            left: `${character.x}%`,
            top: `${character.y}%`,
          }}
          initial={{
            rotate: character.rotation,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: [0, character.direction * 30, 0],
            rotate: [character.rotation, character.rotation + (character.direction * 5), character.rotation],
            opacity: [0, 1, 1, 1, 0],
            scale: [0.5, 1, 1, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: character.animationDuration,
            delay: character.delay,
            repeatDelay: 2,
            times: [0, 0.1, 0.5, 0.9, 1], // Control the timing of each animation step
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCharacters; 
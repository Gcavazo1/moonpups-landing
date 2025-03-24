import { useState } from 'react';
import { motion } from 'framer-motion';
import moonpupSticker03 from '../../assets/moonpup_sticker_nobg03.png';
import moonpupSticker04 from '../../assets/moonpup_sticker_nobg04.png';
import BouncyText from '../common/BouncyText';

const Roadmap = () => {
  // State to track active phase
  const [activePhase, setActivePhase] = useState(0);
  
  // Roadmap data for each phase
  const roadmapData = [
    {
      id: 1,
      title: "Launch",
      date: "Q2 2025",
      items: [
        "Token launch on major DEXs",
        "Community building & social media presence",
        "Initial marketing campaigns",
        "Website and brand development",
        "First 10,000 holders milestone"
      ],
      icon: "🚀",
      color: "purple",
      completed: true
    },
    {
      id: 2,
      title: "Growth",
      date: "Q3 2025",
      items: [
        "CEX listings (Tier 2 exchanges)",
        "NFT collection launch",
        "Community governance implementation",
        "Partnership with other meme projects",
        "25,000 holders milestone"
      ],
      icon: "📈",
      color: "blue",
      completed: false
    },
    {
      id: 3,
      title: "Expansion",
      date: "Q4 2025",
      items: [
        "Major CEX listings (Tier 1)",
        "Cross-chain expansion",
        "MoonPup DAO activation",
        "Staking rewards program",
        "50,000 holders milestone"
      ],
      icon: "🌐",
      color: "pink",
      completed: false
    },
    {
      id: 4,
      title: "Orbit",
      date: "Q1 2026",
      items: [
        "MoonPup mobile app launch",
        "Integration with major Web3 platforms",
        "Real-world partnerships and merch",
        "MoonPup Launchpad for new meme tokens",
        "100,000 holders milestone"
      ],
      icon: "🛰️",
      color: "cyan",
      completed: false
    },
    {
      id: 5,
      title: "Moon",
      date: "Q2 2026",
      items: [
        "Metaverse integration",
        "MoonPup ecosystem expansion",
        "Major brand partnerships",
        "Global marketing campaigns",
        "1 million holders milestone"
      ],
      icon: "🌙",
      color: "yellow",
      completed: false
    }
  ];
  
  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };
  
  // Return different colors for each phase
  const getPhaseColors = (color, completed) => {
    const colors = {
      purple: {
        bg: completed ? "bg-purple-600" : "bg-purple-900/50",
        border: completed ? "border-purple-500" : "border-purple-700/50",
        text: completed ? "text-purple-300" : "text-purple-400/70",
        shadow: completed ? "shadow-purple-500/30" : "shadow-purple-700/20",
        hover: "hover:bg-purple-800"
      },
      blue: {
        bg: completed ? "bg-blue-600" : "bg-blue-900/50",
        border: completed ? "border-blue-500" : "border-blue-700/50",
        text: completed ? "text-blue-300" : "text-blue-400/70",
        shadow: completed ? "shadow-blue-500/30" : "shadow-blue-700/20",
        hover: "hover:bg-blue-800"
      },
      pink: {
        bg: completed ? "bg-pink-600" : "bg-pink-900/50",
        border: completed ? "border-pink-500" : "border-pink-700/50",
        text: completed ? "text-pink-300" : "text-pink-400/70",
        shadow: completed ? "shadow-pink-500/30" : "shadow-pink-700/20",
        hover: "hover:bg-pink-800"
      },
      cyan: {
        bg: completed ? "bg-cyan-600" : "bg-cyan-900/50",
        border: completed ? "border-cyan-500" : "border-cyan-700/50",
        text: completed ? "text-cyan-300" : "text-cyan-400/70",
        shadow: completed ? "shadow-cyan-500/30" : "shadow-cyan-700/20",
        hover: "hover:bg-cyan-800"
      },
      yellow: {
        bg: completed ? "bg-yellow-600" : "bg-yellow-900/50",
        border: completed ? "border-yellow-500" : "border-yellow-700/50",
        text: completed ? "text-yellow-300" : "text-yellow-400/70",
        shadow: completed ? "shadow-yellow-500/30" : "shadow-yellow-700/20",
        hover: "hover:bg-yellow-800"
      }
    };
    
    return colors[color] || colors.purple;
  };

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden vaporwave-grid" style={{ position: 'relative' }}>
      <div className="absolute inset-0 bg-black/90 z-0"></div>
      <div className="star-field absolute inset-0 z-1"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          {/* Using BouncyText for the roadmap title */}
          <BouncyText
            text="Roadmap to the Moon"
            as="h2"
            className="section-title text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 neon-text font-revamped"
            staggerDuration={0.04}
            initialDelay={0.2}
            animateOnHover={false}
          />
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our cosmic journey to make MoonPup the ultimate memecoin is planned across these milestones.
            Each phase brings us closer to total meme domination!
          </p>
        </div>
        
        <div className="relative mt-20" style={{ position: 'relative' }}>
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-blue-500 to-pink-500"></div>
          
          {/* Phases */}
          <motion.div
            className="relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{ position: 'relative' }}
          >
            {roadmapData.map((phase, index) => {
              const colors = getPhaseColors(phase.color, phase.completed);
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={phase.id}
                  className={`mb-20 flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} flex-wrap md:flex-nowrap`}
                  variants={itemVariants}
                  style={{ position: 'relative' }}
                >
                  {/* Date & Icon */}
                  <div className={`w-full md:w-1/3 mb-6 md:mb-0 ${isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <BouncyText
                      text={phase.date}
                      as="h3"
                      className={`text-2xl font-bold ${colors.text}`}
                      staggerDuration={0.05}
                      animateOnHover={true}
                    />
                    
                    <div className={`mt-2 inline-block ${isEven ? 'md:ml-auto' : ''}`}>
                      <span className={`text-lg ${phase.completed ? 'text-green-400' : 'text-gray-400'}`}>
                        {phase.completed ? 'Completed' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Center Point */}
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2 w-8 h-8 rounded-full flex items-center justify-center border-4 border-gray-800 z-20">
                      <div className={`w-4 h-4 rounded-full ${colors.bg}`}></div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/3 md:mt-0 ${isEven ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'}`}>
                    <div 
                      className={`p-6 rounded-xl glass border ${colors.border} ${colors.hover} cursor-pointer transition-all duration-300 premium-hover`}
                      onClick={() => setActivePhase(index)}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${colors.bg} mr-4`}>
                          {phase.icon}
                        </div>
                        <BouncyText
                          text={`Phase ${phase.id}: ${phase.title}`}
                          as="h4"
                          className="text-xl font-bold"
                          staggerDuration={0.03}
                          animateOnHover={true}
                        />
                      </div>
                      
                      {(activePhase === index) && (
                        <motion.ul 
                          className="ml-4 space-y-2 text-gray-300"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          {phase.items.map((item, idx) => (
                            <motion.li 
                              key={idx}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <span className={`mr-2 ${colors.text}`}>•</span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        {/* Floating stickers */}
        <motion.img
          src={moonpupSticker03}
          alt="MoonPup Astronaut"
          className="absolute -left-10 top-1/4 w-32 h-32 object-contain hidden lg:block"
          initial={{ opacity: 0, x: -50, rotate: -10 }}
          animate={{ opacity: 0.9, x: 0, rotate: -10 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ filter: "drop-shadow(0 0 15px rgba(146, 81, 255, 0.4))" }}
        />
        
        <motion.img
          src={moonpupSticker04}
          alt="MoonPup Astronaut"
          className="absolute -right-10 bottom-1/4 w-32 h-32 object-contain hidden lg:block"
          initial={{ opacity: 0, x: 50, rotate: 10 }}
          animate={{ opacity: 0.9, x: 0, rotate: 10 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ filter: "drop-shadow(0 0 15px rgba(146, 81, 255, 0.4))" }}
        />
        
        {/* CTA Button */}
        <div className="text-center mt-16">
          <a 
            href="https://discord.gg/moonpup" 
            target="_blank" 
            rel="noopener noreferrer"
            className="button-3d px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-lg"
          >
            Join Our Discord
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 
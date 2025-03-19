import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/moonpup_logo.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: 'Home', link: '#' },
    { name: 'Tokenomics', link: '#tokenomics' },
    { name: 'Roadmap', link: '#roadmap' },
    { name: 'Community', link: '#community' },
    { name: 'FAQ', link: '#faq' },
  ];

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    },
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 0 15px rgba(146, 81, 255, 0.5)',
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95 
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 py-3 px-6 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md shadow-xl' : 'bg-transparent'
      }`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          variants={itemVariants}
          initial="initial"
          animate="animate"
          custom={0}
        >
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="MoonPup Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold font-revamped bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">
              MOONPUP
            </span>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              className="text-gray-300 hover:text-white transition-colors text-md tracking-wider font-medium interactive"
              variants={itemVariants}
              initial="initial"
              animate="animate"
              custom={i + 1}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-2.5 px-7 rounded-full interactive"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            custom={navItems.length + 1}
          >
            Buy $MPUP
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <motion.div 
          className="md:hidden" 
          variants={itemVariants}
          initial="initial"
          animate="animate"
          custom={1}
        >
          <button 
            onClick={toggleMobileMenu}
            className="text-white p-2 interactive"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md shadow-2xl py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-6 flex flex-col gap-4">
            {navItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                className="text-white hover:text-purple-400 py-2 transition-colors interactive"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 px-6 rounded-full mt-2 interactive"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
            >
              Buy $MPUP
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header; 
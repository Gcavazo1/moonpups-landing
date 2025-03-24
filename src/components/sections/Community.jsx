import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import moonpup01 from '../../assets/moonpup01.png';
import moonpup02 from '../../assets/moonpup02.png';
import moonpup03 from '../../assets/moonpup03.png';
import moonpup04 from '../../assets/moonpup04.png';
import moonpup05 from '../../assets/moonpup05.png';
import moonpup06 from '../../assets/moonpup06.png';

const Community = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const teamMembers = [
    {
      name: "Captain Barkley",
      role: "Founder & Lead Developer",
      image: moonpup01,
      socialLinks: [
        { icon: "twitter", url: "#" },
        { icon: "github", url: "#" },
        { icon: "linkedin", url: "#" }
      ]
    },
    {
      name: "Luna Howlington",
      role: "Marketing & Community",
      image: moonpup02,
      socialLinks: [
        { icon: "twitter", url: "#" },
        { icon: "instagram", url: "#" },
        { icon: "linkedin", url: "#" }
      ]
    },
    {
      name: "Astro Woofstein",
      role: "Blockchain Architect",
      image: moonpup03,
      socialLinks: [
        { icon: "twitter", url: "#" },
        { icon: "github", url: "#" },
        { icon: "telegram", url: "#" }
      ]
    }
  ];
  
  const communityStats = [
    { label: "Discord Members", value: "25K+", icon: "💬" },
    { label: "Twitter Followers", value: "50K+", icon: "🐦" },
    { label: "Memes Shared", value: "9K+", icon: "🎭" },
    { label: "Countries", value: "130+", icon: "🌎" }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);
  
  return (
    <section 
      id="community" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-lighter to-gray-900 z-0"></div>
      
      {/* Floating shapes background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y, scale }}
      >
        {[moonpup04, moonpup05, moonpup06].map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt="Floating MoonPup"
            className="absolute opacity-10"
            style={{
              width: `${Math.random() * 120 + 80}px`,
              top: `${Math.random() * 70 + 10}%`,
              left: `${Math.random() * 70 + 10}%`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 10 - 5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section header */}
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <h2 className="section-title gradient-text font-revamped">
              Our Pack
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Meet the team of cosmic adventurers and join our growing community of space explorers!
            </p>
          </motion.div>
          
          {/* Team section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center font-glow">The Alpha Dogs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="glass rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl">
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-center transform transition-transform hover:scale-110 duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-1 font-glow">{member.name}</h4>
                      <p className="text-purple-300 text-sm mb-3">{member.role}</p>
                      
                      {/* Social links */}
                      <div className="flex space-x-3">
                        {member.socialLinks.map((link, i) => (
                          <a 
                            key={i} 
                            href={link.url}
                            className="text-gray-300 hover:text-white transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center hover:bg-purple-700/50 transition-colors">
                              <span className="sr-only">{link.icon}</span>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                {link.icon === "twitter" && (
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.055 10.055 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                )}
                                {link.icon === "github" && (
                                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                )}
                                {link.icon === "linkedin" && (
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                )}
                                {link.icon === "instagram" && (
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                )}
                                {link.icon === "telegram" && (
                                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                )}
                              </svg>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-full blur-xl -z-10"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Community stats */}
          <motion.div 
            className="mt-24"
            variants={itemVariants}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center font-glow">Join The Intergalactic Community</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {communityStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-xl p-6 text-center"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.5)',
                  }}
                  variants={itemVariants}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-white font-mono mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Join community CTA */}
          <motion.div 
            className="mt-24 text-center"
            variants={itemVariants}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 font-glow">Ready to Join the Pack?</h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Connect with fellow MoonPup enthusiasts from around the galaxy. Share memes, discuss tokenomics, and prepare for liftoff!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="#"
                className="bg-[#5865F2] text-white font-bold py-3 px-8 rounded-full interactive flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(88, 101, 242, 0.6)' }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
                <span>Discord</span>
              </motion.a>
              
              <motion.a
                href="#"
                className="bg-[#1DA1F2] text-white font-bold py-3 px-8 rounded-full interactive flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(29, 161, 242, 0.6)' }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.055 10.055 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span>Twitter</span>
              </motion.a>
              
              <motion.a
                href="#"
                className="bg-[#25D366] text-white font-bold py-3 px-8 rounded-full interactive flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(37, 211, 102, 0.6)' }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Telegram</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Community; 
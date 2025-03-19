import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import moonpupSticker02 from '../../assets/moonpup_sticker_nobg02.png';
import { CoinImage } from '../common/CoinImages';
import BouncyText from '../common/BouncyText';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Tokenomics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Distribution data with colors matching screenshot
  const tokenDistribution = [
    { name: 'Community', percentage: 40, color: 'rgba(168, 85, 247, 0.8)', bgColor: 'bg-purple-500', coin: 'mpup_community', borderColor: 'rgba(168, 85, 247, 1)' },
    { name: 'Meme Fund', percentage: 25, color: 'rgba(59, 130, 246, 0.8)', bgColor: 'bg-blue-400', coin: 'mpup_meme', borderColor: 'rgba(59, 130, 246, 1)' },
    { name: 'Liquidity', percentage: 15, color: 'rgba(236, 72, 153, 0.8)', bgColor: 'bg-pink-400', coin: 'mpup_main', borderColor: 'rgba(236, 72, 153, 1)' },
    { name: 'Team', percentage: 10, color: 'rgba(74, 222, 128, 0.8)', bgColor: 'bg-green-400', coin: 'mpup_gold', borderColor: 'rgba(74, 222, 128, 1)' },
    { name: 'Marketing', percentage: 7, color: 'rgba(250, 204, 21, 0.8)', bgColor: 'bg-yellow-400', coin: 'mpup_dao', borderColor: 'rgba(250, 204, 21, 1)' },
    { name: 'Reserves', percentage: 3, color: 'rgba(249, 115, 22, 0.8)', bgColor: 'bg-orange-400', coin: 'mpup_silver', borderColor: 'rgba(249, 115, 22, 1)' },
  ];

  // Prepare chart data
  const chartData = {
    labels: tokenDistribution.map(item => item.name),
    datasets: [
      {
        data: tokenDistribution.map(item => item.percentage),
        backgroundColor: tokenDistribution.map(item => item.color),
        borderColor: tokenDistribution.map(item => item.borderColor),
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: "'Revamped', sans-serif",
            size: 12
          },
          color: 'rgba(255, 255, 255, 0.8)',
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(13, 6, 32, 0.8)',
        titleFont: {
          family: "'Revamped', sans-serif",
          size: 14
        },
        bodyFont: {
          family: "'Revamped', sans-serif",
          size: 12
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2000,
    },
  };
  
  // Tokenomics features
  const tokenomicsFeatures = [
    {
      title: 'No Buy Tax',
      description: 'Zero taxes on purchases. Just pure MoonPup goodness without fees eating into your investment.',
      icon: '🔄',
      color: 'from-green-400 to-green-500',
    },
    {
      title: 'LP Locked',
      description: 'Liquidity pool tokens locked for 2 years, ensuring stability and trust in the project.',
      icon: '🔒',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      title: 'Deflationary',
      description: '2% of all sells are burned forever, creating a deflationary supply mechanism that benefits holders.',
      icon: '🔥',
      color: 'from-red-400 to-orange-500',
    },
    {
      title: 'DAO Voting',
      description: 'Hold $MPUP to vote on project decisions. The community helps guide our cosmic journey.',
      icon: '🗳️',
      color: 'from-blue-400 to-cyan-500',
    },
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: "easeOut" 
      }
    },
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (percentage) => ({
      width: `${percentage}%`,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5
      }
    }),
  };

  // Planets for the orbital chart
  const orbitalElements = [
    { coin: 'mpup_main', size: 'lg', position: { top: '50%', left: '50%' }, transform: 'translate(-50%, -50%)' },
    { coin: 'mpup_community', size: 'md', position: { top: '15%', right: '15%' }, animate: { rotate: 360, duration: 60 } },
    { coin: 'mpup_meme', size: 'md', position: { bottom: '20%', left: '10%' }, animate: { rotate: -360, duration: 40 } },
    { coin: 'mpup_dao', size: 'sm', position: { top: '30%', left: '15%' }, animate: { rotate: 360, duration: 50 } },
    { coin: 'mpup_gold', size: 'sm', position: { bottom: '10%', right: '20%' }, animate: { rotate: -360, duration: 55 } },
    { coin: 'mpup_silver', size: 'xs', position: { top: '45%', right: '5%' }, animate: { rotate: 360, duration: 45 } },
  ];
  
  return (
    <section id="tokenomics" className="py-24 mt-16 relative overflow-hidden vaporwave-grid" style={{ position: 'relative' }}>
      <div className="absolute inset-0 bg-black/90 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ position: 'relative' }}
        >
          <BouncyText
            text="Tokenomics"
            as="h2"
            className="section-title text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 neon-text font-revamped"
            staggerDuration={0.04}
            initialDelay={0.2}
            animateOnHover={false}
          />
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            MoonPup's tokenomics are designed for sustainable growth and community rewards.
            Explore the allocation of our total supply and tokenomic features.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Pie Chart Visualization */}
          <motion.div
            className="relative h-[400px] w-full"
            variants={chartVariants}
            initial="hidden"
            animate={controls}
            style={{ position: 'relative' }}
          >
            {/* Chart Decoration */}
            <motion.div 
              className="absolute -left-20 top-0 hidden lg:block"
              initial={{ opacity: 0, x: -50, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: -10 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src={moonpupSticker02} 
                alt="MoonPup Sticker" 
                className="w-32 h-auto"
                style={{ filter: "drop-shadow(0 0 10px rgba(146, 81, 255, 0.3))" }}
              />
            </motion.div>
            
            {/* Pie Chart */}
            <div className="glass rounded-xl p-6 h-full relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-purple-600/5 to-blue-600/5"></div>
              
              {/* Chart glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-b from-purple-500/10 to-blue-500/10 blur-xl"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-revamped">
                Token Distribution
              </h3>
              
              <div className="h-[280px] relative">
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>
          </motion.div>

          {/* Token Allocation - Redesigned to match screenshot */}
          <motion.div
            className="flex flex-col space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            style={{ position: 'relative' }}
          >
            <motion.h3 
              className="text-3xl font-bold mb-6 text-white neon-text" 
              variants={itemVariants}
            >
              $MPUP Allocation
            </motion.h3>

            {tokenDistribution.map((item, index) => (
              <motion.div key={index} className="flex flex-col space-y-2" variants={itemVariants}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full overflow-hidden flex items-center justify-center w-8 h-8 ${item.bgColor}`}>
                      <span className="text-lg">$</span>
                    </div>
                    <span className="text-white font-medium">{item.name}</span>
                  </div>
                  <span className="text-white font-bold">{item.percentage}%</span>
                </div>
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden" style={{ position: 'relative' }}>
                  <div 
                    className={`h-full ${item.bgColor} rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}

            {/* Character decorations - matching screenshot */}
            <motion.img 
              src={moonpupSticker02}
              alt="MoonPup Astronaut"
              className="absolute right-10 bottom-40 w-36 h-36 object-contain hidden lg:block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              style={{ filter: "drop-shadow(0 0 15px rgba(146, 81, 255, 0.4))" }}
            />
          </motion.div>
        </div>

        {/* Features */}
        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {tokenomicsFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="glass p-6 rounded-xl flex flex-col items-center text-center premium-hover"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 20px -5px rgba(146, 81, 255, 0.2)' }}
              transition={{ duration: 0.2 }}
            >
              <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center text-2xl bg-gradient-to-br ${feature.color}`}>
                {feature.icon}
              </div>
              
              <BouncyText
                text={feature.title}
                as="h3"
                className="text-xl font-bold mb-2 font-glow"
                staggerDuration={0.05}
                animateOnHover={true}
              />
              
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics; 
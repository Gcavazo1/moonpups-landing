import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import Tokenomics from './components/sections/Tokenomics'
import Roadmap from './components/sections/Roadmap'
import Community from './components/sections/Community'
import Footer from './components/layout/Footer'
import CustomCursor from './components/common/CustomCursor'
import FloatingCharacters from './components/common/FloatingCharacters'
import CoinStickers from './components/common/CoinStickers'
import StickersShowcase from './components/common/StickersShowcase'
import StarField from './components/common/StarField'
import CoinStickerManager from './components/common/CoinStickerManager'
import handleFontFallbacks from './utils/fontLoader'
import { FloatingCoinField } from './components/common/CoinImages'
import ScrollingBanner from './components/common/ScrollingBanner'

function App() {
  const [loading, setLoading] = useState(true);

  // Handle font loading and provide fallbacks
  useEffect(() => {
    const checkFonts = async () => {
      try {
        await handleFontFallbacks()
      } catch (error) {
        console.error('Font loading issue:', error)
      }
    }
    
    checkFonts()
  }, [])

  // Disable default cursor for custom cursor
  useEffect(() => {
    document.documentElement.style.cursor = 'none'
    
    // Cleanup on unmount
    return () => {
      document.documentElement.style.cursor = 'default'
    }
  }, [])

  // Simulate loading for smoother startup
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Loading screen
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 font-revamped">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
              MoonPup
            </span>
          </h1>
          <div className="w-48 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full"
              style={{ 
                width: '90%', 
                animation: 'pulse 1.5s infinite ease-in-out' 
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CoinStickerManager>
      <div className="app relative min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <StarField />
        <FloatingCoinField count={15} />
        <ScrollingBanner 
          text="$MPUP NOW LIVE" 
          borderColors={["#9333ea", "#06b6d4", "#ec4899"]} 
          speed={20}
        />
        <Header />
        <main className="relative min-h-screen">
          <Hero />
          <Features />
          <Tokenomics />
          <Roadmap />
          <StickersShowcase />
          <Community />
        </main>
        <Footer />
        <FloatingCharacters />
        <CoinStickers />
        <CustomCursor />
      </div>
    </CoinStickerManager>
  )
}

export default App

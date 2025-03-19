import { useState, useEffect, createContext, useContext } from 'react';

// Create a context to share sticker data across components
const CoinStickersContext = createContext([]);

// Custom hook to access stickers data
export const useCoinStickers = () => useContext(CoinStickersContext);

// Component to load and manage stickers
export const CoinStickerProvider = ({ children }) => {
  const [coinStickers, setCoinStickers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Function to load coin stickers
    const loadCoinStickers = async () => {
      setIsLoading(true);
      
      try {
        // This is a placeholder. When coin stickers are ready,
        // you can dynamically import them here or load from an API
        
        // Simulating some stickers loading with a timeout
        // Replace this with actual image imports when ready
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // This is where you'd load the actual stickers
        // For example:
        // const btcCoin = (await import('../../assets/btc_coin.png')).default;
        // const ethCoin = (await import('../../assets/eth_coin.png')).default;
        
        // For now we'll use empty placeholders that will be updated later
        setCoinStickers([
          // These will be replaced with actual images when available
          { id: 'btc', name: 'Bitcoin' },
          { id: 'eth', name: 'Ethereum' },
          { id: 'mpup', name: 'MoonPup' },
        ]);
      } catch (error) {
        console.error('Error loading coin stickers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCoinStickers();
  }, []);
  
  // Method to add new coin stickers
  const addCoinSticker = (sticker) => {
    setCoinStickers(prev => [...prev, sticker]);
  };
  
  // Method to update existing stickers
  const updateCoinSticker = (id, newData) => {
    setCoinStickers(prev => 
      prev.map(sticker => 
        sticker.id === id ? { ...sticker, ...newData } : sticker
      )
    );
  };
  
  return (
    <CoinStickersContext.Provider 
      value={{ 
        coinStickers, 
        isLoading,
        addCoinSticker,
        updateCoinSticker
      }}
    >
      {children}
    </CoinStickersContext.Provider>
  );
};

// Main component that wraps the CoinStickerProvider
const CoinStickerManager = ({ children }) => {
  return (
    <CoinStickerProvider>
      {children}
    </CoinStickerProvider>
  );
};

export default CoinStickerManager; 
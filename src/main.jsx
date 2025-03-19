import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import loadFonts from './utils/fontLoader.js'
import './index.css'

// Initialize fonts immediately
loadFonts();

const Root = () => {
  // Apply font loading when component mounts
  useEffect(() => {
    // Ensure fonts are loaded (or use fallbacks)
    loadFonts();
  }, []);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);

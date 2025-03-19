import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import handleFontFallbacks from './utils/fontLoader.js'
import './index.css'

// Pre-load fonts synchronously before rendering
const preloadFonts = () => {
  // Create stylesheet with font-display: swap for all fonts
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Revamped';
      src: url('/src/assets/fonts/Revamped/Revamped-X3q1a.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'NuixyberGlow';
      src: url('/src/assets/fonts/Nuixyber Glow/NuixyberGlow-x3KP8.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'NuixyberGlowNext';
      src: url('/src/assets/fonts/Nuixyber Glow/NuixyberGlowNext-3zWjZ.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
  `;
  document.head.appendChild(style);

  // Set fallback fonts as CSS variables
  document.documentElement.style.setProperty('--font-primary', 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif');
  document.documentElement.style.setProperty('--font-revamped', '"Revamped", var(--font-primary)');
  document.documentElement.style.setProperty('--font-glow', '"NuixyberGlow", var(--font-primary)');
  document.documentElement.style.setProperty('--font-glow-next', '"NuixyberGlowNext", var(--font-primary)');
};

// Initialize font fallbacks immediately
preloadFonts();
handleFontFallbacks().catch(error => {
  console.error('Failed to initialize font fallbacks:', error);
});

const Root = () => {
  // Apply font fallbacks when component mounts
  useEffect(() => {
    handleFontFallbacks().catch(error => {
      console.error('Failed to initialize font fallbacks on mount:', error);
    });
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

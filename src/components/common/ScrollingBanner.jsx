import React from 'react';

const ScrollingBanner = ({ 
  text = "$MPUP NOW LIVE", 
  backgroundColor = "#0a0a1a", 
  textColor = "#fff",
  borderColors = ["#ff4d4d", "#4d79ff", "#ffdb4d"], // Default colorful borders
  speed = 30, // Animation duration in seconds (lower = faster)
  repeat = 10 // How many times to repeat the text
}) => {
  const bannerStyle = {
    backgroundColor,
    color: textColor,
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
    borderTop: `2px solid ${borderColors[0]}`,
    borderBottom: `2px solid ${borderColors[1]}`,
  };

  const containerStyle = {
    display: 'flex',
    whiteSpace: 'nowrap',
    animation: `scroll ${speed}s linear infinite`,
  };

  const repeatedText = Array(repeat).fill(text).join(' ');
  
  return (
    <div className="scrolling-banner" style={bannerStyle}>
      <style jsx="true">{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${text.length * 2}em);
          }
        }
        
        .banner-text {
          padding: 0.5rem 1rem;
          font-family: 'Revamped', sans-serif;
          font-weight: bold;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          display: inline-block;
        }
        
        .accent {
          color: ${borderColors[0]};
        }
      `}</style>
      
      <div style={containerStyle}>
        {Array(3).fill(null).map((_, index) => (
          <div key={index} className="banner-text">
            {repeatedText.split(' ').map((word, wordIndex) => (
              <span key={wordIndex}>
                {word.startsWith('$') ? (
                  <span className="accent">{word}</span>
                ) : (
                  word
                )}
                {' '}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner; 
/**
 * Font loader utility to handle font loading issues gracefully
 */

// Function to check if a font is loaded and available
export const checkFontLoaded = (fontFamily) => {
  return new Promise((resolve) => {
    // Short timeout to allow fonts to load
    setTimeout(() => {
      if (document.fonts) {
        try {
          // Check if the font is in the loaded fonts list
          const fontLoaded = Array.from(document.fonts).some(
            font => font.family.replace(/["']/g, '').toLowerCase() === fontFamily.toLowerCase() && font.status === 'loaded'
          );
          
          if (fontLoaded) {
            resolve(true);
            return;
          }
          
          // Try alternative loading check
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          
          if (!context) {
            // If canvas isn't supported, assume font is loaded
            resolve(true);
            return;
          }
          
          // Measure with the requested font
          context.font = `16px "${fontFamily}", Arial`;
          const width1 = context.measureText('MoonPup').width;
          
          // Measure with a fallback font
          context.font = '16px Arial';
          const width2 = context.measureText('MoonPup').width;
          
          // If widths are different, the font is likely loaded
          resolve(Math.abs(width1 - width2) > 2);
        } catch (e) {
          console.warn(`Error checking font ${fontFamily}:`, e);
          resolve(false);
        }
      } else {
        // For browsers without font loading API
        resolve(true); // Assume font is loaded
      }
    }, 1000); // Give fonts more time to load
  });
};

// Function to apply fallback styles if fonts fail to load
export const handleFontFallbacks = async () => {
  try {
    const fontsToCheck = [
      { 
        name: 'Revamped', 
        fallback: 'Arial, sans-serif',
        cssVar: '--font-revamped'
      },
      { 
        name: 'NuixyberGlow', 
        fallback: 'Arial, sans-serif',
        cssVar: '--font-glow'
      },
      { 
        name: 'NuixyberGlowNext', 
        fallback: 'Arial, sans-serif',
        cssVar: '--font-glow-next'
      }
    ];
    
    // Apply fallbacks immediately to avoid FOUC
    document.documentElement.style.setProperty('--font-fallback', '"Arial", sans-serif');
    
    for (const font of fontsToCheck) {
      // First attempt direct loading using FontFace API
      try {
        if ('FontFace' in window) {
          const fontFace = new FontFace(
            font.name, 
            `url('/src/assets/fonts/${font.name === 'Revamped' ? 'Revamped/Revamped-X3q1a.ttf' : `Nuixyber Glow/${font.name === 'NuixyberGlow' ? 'NuixyberGlow-x3KP8.ttf' : 'NuixyberGlowNext-3zWjZ.ttf'}`}')`
          );
          
          await fontFace.load();
          document.fonts.add(fontFace);
          console.log(`Font ${font.name} loaded successfully via FontFace API`);
          
          // Update CSS variable
          document.documentElement.style.setProperty(
            font.cssVar,
            `"${font.name}", ${font.fallback}`
          );
          continue;
        }
      } catch (err) {
        console.warn(`Failed to load ${font.name} via FontFace API:`, err);
        // Continue to fallback method
      }
      
      // Fallback to checking if already loaded
      const isLoaded = await checkFontLoaded(font.name);
      
      if (isLoaded) {
        document.documentElement.style.setProperty(
          font.cssVar,
          `"${font.name}", ${font.fallback}`
        );
        console.log(`Font ${font.name} is loaded and ready to use`);
      } else {
        console.warn(`Font ${font.name} failed to load, using ${font.fallback} instead`);
        
        // Apply fallback styles
        document.documentElement.style.setProperty(
          font.cssVar,
          font.fallback
        );
        
        // Add a class to body to allow CSS targeting when specific fonts fail
        document.body.classList.add(`no-font-${font.name.toLowerCase().replace(/\s+/g, '-')}`);
        
        // Apply direct fallback to any elements using this font
        if (font.name === 'Revamped') {
          document.querySelectorAll('.font-revamped').forEach(el => {
            el.style.fontFamily = font.fallback;
          });
        } else if (font.name === 'NuixyberGlow' || font.name === 'NuixyberGlowNext') {
          document.querySelectorAll('.font-glow').forEach(el => {
            el.style.fontFamily = font.fallback;
          });
        }
      }
    }
  } catch (error) {
    console.error('Error handling font fallbacks:', error);
    // Apply safe fallbacks if something goes wrong
    document.documentElement.style.setProperty('--font-primary', 'Arial, sans-serif');
    document.documentElement.style.setProperty('--font-revamped', 'Arial, sans-serif');
    document.documentElement.style.setProperty('--font-glow', 'Arial, sans-serif');
    document.documentElement.style.setProperty('--font-glow-next', 'Arial, sans-serif');
  }
};

export default handleFontFallbacks; 
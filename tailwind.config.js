/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: '#9333ea', // Purple
          dark: '#7928ca',
          light: '#a855f7',
        },
        secondary: {
          DEFAULT: '#3b82f6', // Blue
          dark: '#2563eb',
          light: '#60a5fa',
        },
        accent: {
          DEFAULT: '#ec4899', // Pink
          dark: '#db2777',
          light: '#f472b6',
        },
        // Dark theme colors
        dark: {
          DEFAULT: '#0a0a0a',
          lighter: '#121212',
          light: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        // Custom fonts with proper fallbacks
        revamped: ['Revamped', 'CustomFallback', 'Arial', 'sans-serif'],
        glow: ['NuixyberGlow', 'CustomFallback', 'Arial', 'sans-serif'],
        glownext: ['NuixyberGlowNext', 'CustomFallback', 'Arial', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary.light), 0 0 20px theme(colors.primary.light)',
        'neon-secondary': '0 0 5px theme(colors.secondary.light), 0 0 20px theme(colors.secondary.light)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 
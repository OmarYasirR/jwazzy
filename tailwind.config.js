/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6',
          dark: '#60A5FA',
        },
        secondary: {
          light: '#F59E0B',
          dark: '#FBBF24',
        },
        background: {
          light: '#FFFFFF',
          dark: '#1F2937'
        },
        text: {
          light: '#1F2937',
          dark: '#F9FAFB'
        }
      },
      fontFamily: {
        // Arabic fonts with proper fallbacks
        arabic: ['"IBM Plex Sans Arabic"', '"Noto Sans Arabic"', 'Tahoma', 'Arial', 'sans-serif'],
        // English fonts
        english: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Headings font that works well in both languages
        heading: ['"IBM Plex Sans Arabic"', 'Inter', 'system-ui', 'sans-serif'],
      },
      // RTL-specific spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // RTL-specific animations
      keyframes: {
        'fade-in-rtl': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'fade-in-ltr': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      animation: {
        'fade-in-rtl': 'fade-in-rtl 0.5s ease-out',
        'fade-in-ltr': 'fade-in-ltr 0.5s ease-out'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },      colors: {
        primary: {
          100: '#E0F7FF', // Light blue
          200: '#B9F0FF',
          300: '#8DE1FF',
          400: '#5CCDFF',
          500: '#38B6FF', // Primary blue
          600: '#2293FF',
          700: '#0082FF',
          800: '#0061CC',
          900: '#004999',
        },
        accent: {
          light: '#FFD6E8', // Light pink
          DEFAULT: '#FF6EBC', // Vibrant pink
          dark: '#E93B9F', // Deep pink
        },
        secondary: {
          light: '#FFF2B4', // Light yellow
          DEFAULT: '#FFE066', // Vibrant yellow
          dark: '#FFCC00', // Deep yellow
        },
        success: {
          light: '#C9FFE5', // Light green
          DEFAULT: '#4FFFB0', // Vibrant green
          dark: '#00CC6A', // Deep green
        },
        info: {
          light: '#D6F2FF', // Light blue
          DEFAULT: '#5CB8FF', // Vibrant blue
          dark: '#0077CC', // Deep blue
        },
        warning: {
          light: '#FFECD6', // Light orange
          DEFAULT: '#FFAA5C', // Vibrant orange
          dark: '#FF8800', // Deep orange
        },
        danger: {
          light: '#FFD6D6', // Light red
          DEFAULT: '#FF6B6B', // Vibrant red
          dark: '#E53935', // Deep red
        },
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}

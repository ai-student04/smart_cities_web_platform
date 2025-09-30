/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        jordan: {
          black: '#000000',
          white: '#FFFFFF',
          red: '#CE1126',
          green: '#007A3D',
          gold: '#D4AF37',
        },
        primary: {
          50: '#f0f9f4',
          100: '#dbf0e3',
          200: '#b9e1cb',
          300: '#8bcaab',
          400: '#58ad86',
          500: '#007A3D',
          600: '#006633',
          700: '#00522a',
          800: '#004122',
          900: '#00361d',
        },
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#CE1126',
          600: '#b91020',
          700: '#9f0d1b',
          800: '#7f0b16',
          900: '#660911',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

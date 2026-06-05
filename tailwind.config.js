/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          light: '#E8F0FE',
          DEFAULT: '#1A73E8',
          dark: '#1557B0',
          apple: '#007AFF',
        },
        dark: {
          bg: '#0f0f0f',
          surface: '#1a1a1a',
          card: '#222222',
          border: '#2a2a2a',
          text: '#e5e5e5',
          muted: '#888888',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 30px rgba(0, 0, 0, 0.03)',
        'premium-hover': '0 10px 40px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
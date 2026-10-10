/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'universe-primary': '#8B5CF6',
        'galaxy-deep': '#2E1065',
        'universe-secondary': '#7C3AED',
        'lavender-mist': '#C4B5FD',
        'lavender-light': '#EDE9FE',
        'romantic-pink': '#FBCFE8',
        'blush-pink': '#F9A8D4',
        'page-bg': '#F8F5FF',
        'cream-paper': '#FFF9F0',
        'deep-text': '#3B245B',
        'glowing-accent': '#E9D5FF',
      },
      fontFamily: {
        romantic: ['"Dancing Script"', 'cursive'],
        handwritten: ['"Caveat"', 'cursive'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#1E40AF',
      },
      keyframes: {
        'flow-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'flow-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'flow-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' }
        },
        'flow-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 0.1 }
        }
      },
      animation: {
        'flow-left': 'flow-left 3s linear infinite',
        'flow-right': 'flow-right 3s linear infinite',
        'flow-up': 'flow-up 3s linear infinite',
        'flow-down': 'flow-down 3s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}


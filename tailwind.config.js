/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'spin-reverse-slow': 'spin-reverse 30s linear infinite',
        'pulse-slow': 'pulse 4s infinite ease-in-out',
        'bounce-slow': 'bounce 3s infinite',
        'orbit-1': 'orbit-1 12s infinite linear',
        'orbit-2': 'orbit-2 15s infinite linear',
        'orbit-3': 'orbit-3 18s infinite linear',
        'float': 'float 3s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'falling-leaf': 'falling-leaf var(--duration) linear infinite',
      },
      keyframes: {
        'spin-reverse': {
            from: { transform: 'rotate(360deg)' },
            to: { transform: 'rotate(0deg)' }
        },
        'orbit-1': {
            '0%, 100%': { transform: 'translateX(0) translateY(0) scale(1)', zIndex: '20' },
            '25%': { transform: 'translateX(120px) translateY(40px) scale(0.8)', zIndex: '0' },
            '50%': { transform: 'translateX(0) translateY(80px) scale(1)', zIndex: '20' },
            '75%': { transform: 'translateX(-120px) translateY(40px) scale(1.2)', zIndex: '40' },
        },
        'orbit-2': {
             '0%, 100%': { transform: 'translateX(0) translateY(0) scale(1)', zIndex: '20' },
             '25%': { transform: 'translateX(-100px) translateY(-50px) scale(1.2)', zIndex: '40' },
             '50%': { transform: 'translateX(0) translateY(-100px) scale(1)', zIndex: '20' },
             '75%': { transform: 'translateX(100px) translateY(-50px) scale(0.8)', zIndex: '0' },
        },
        'orbit-3': {
             '0%, 100%': { transform: 'translateX(0) translateY(0) scale(1)', zIndex: '20' },
             '50%': { transform: 'translateX(150px) translateY(50px) scale(0.8)', zIndex: '0' },
        },
        'blob': {
            '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
        },
        'falling-leaf': {
            '0%': { transform: 'translate(0, -10%) rotate(0deg) translateX(0)', opacity: '0' },
            '10%': { opacity: '1' },
            '100%': { transform: 'translate(0, 100vh) rotate(360deg) translateX(-50px)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}

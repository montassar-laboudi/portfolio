/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        teal: {
          DEFAULT: '#14b8a6',
          dim: '#0d9488',
          glow: 'rgba(20,184,166,0.15)',
        },
      },
    },
  },
  plugins: [],
}

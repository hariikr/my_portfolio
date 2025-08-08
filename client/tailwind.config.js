/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e9edff',
          200: '#c8d1ff',
          300: '#a6b5ff',
          400: '#8599ff',
          500: '#637dff',
          600: '#4a63e6',
          700: '#394db4',
          800: '#2a3982',
          900: '#1b2551'
        }
      }
    },
  },
  plugins: [typography],
}

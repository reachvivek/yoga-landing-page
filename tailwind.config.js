/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7cfc7',
          300: '#a1b0a1',
          400: '#7a8f7a',
          500: '#5d735d',
          600: '#485a48',
          700: '#3c4a3c',
          800: '#323d32',
          900: '#2b352b',
        },
        warm: {
          50: '#fefcf8',
          100: '#fdf6e6',
          200: '#f9e6c7',
          300: '#f4d09f',
          400: '#edb274',
          500: '#e69555',
          600: '#d67d3b',
          700: '#b3642e',
          800: '#91502a',
          900: '#764326',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia'],
      }
    },
  },
  plugins: [],
}
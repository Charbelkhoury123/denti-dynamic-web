/** @type {import('tailwindcss').Config} */
const typography = require('@tailwindcss/typography');

module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    // add any other paths you use
  ],
  theme: {
    extend: {
      // your custom theme tweaks
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    typography,
  ],
};

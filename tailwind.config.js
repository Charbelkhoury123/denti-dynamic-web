/** @type {import('tailwindcss').Config} */
const typography = require('@tailwindcss/typography');

module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    // …your other globs
  ],
  theme: {
    extend: {
      // your customizations
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    typography,
  ],
};

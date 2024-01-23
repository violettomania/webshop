/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: {
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
  },
};

// TODO: make DaisyUI work with Webpack

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-background': "url('/public/assets/home-background.jpg')",
      },
    },
  },
  plugins: [],
};

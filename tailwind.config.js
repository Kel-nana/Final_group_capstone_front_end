/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-background': "url('/public/assets/bg-home.jpg')",
      },
      spacing: {
        125: '700px',
      },
    },
  },
  plugins: [],
};

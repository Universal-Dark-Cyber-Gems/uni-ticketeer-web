/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-dark': '#3F1860',
        'primary-orange': '#FDB372',
        'primary-light': '#C5ECFA',
        'secondary-text': '#681133'
      }
    },
  },
  plugins: [],
}


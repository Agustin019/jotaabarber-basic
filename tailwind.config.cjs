/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
    
      backgroundImage:{
        'inicio':'url(https://i.ibb.co/6sRb8G7/053c2c5e-97f4-45db-9057-7923a113fdeb-min.jpg)'
      },
      fontFamily:{
        monsterrat:[ 'Montserrat', 'sans-serif']
      },
    },
  },
  plugins: [],
}
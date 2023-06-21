/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
    
      backgroundImage:{
        'inicio':'url(https://i.ibb.co/CHyrhFj/barbpesada-optimized.jpg)'
      },
      fontFamily:{
        monsterrat:[ 'Montserrat', 'sans-serif']
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
    
      backgroundImage:{
        'inicio':'url(https://i.ibb.co/6sRb8G7/053c2c5e-97f4-45db-9057-7923a113fdeb-min.jpg)',
        'barber':'url(https://i.ibb.co/gTZRmYM/ae2b7f7f-30a2-4a80-ac6a-0a5c8b6f6250-min.jpg)'
      },
      fontFamily:{
        Exo:[ 'Exo', 'sans-serif'],
        OpenSans:['Open Sans', 'sans-serif']
      },
      colors:{
        negroPrincipal:'#1C1B1E',
        blanco:'#F4EEF4',
        blancoSecundario:'#E6E1E6',
        amarillo:'#F2AF29',
        amarilloSecundario:'#F7CD78',
        negroSecundario:'#313033',
        verde:'#78BC61',
        rojo:'#E85F5C'
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    // Adicione mais caminhos conforme necessário
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Lato'],
        'overpass': ['Overpass'],
        'overpass-mono': ['Overpass Mono'],
        'russo': ['Russo One'],
        'exo': ['Exo 2'],
        'poppins':['Poppins'],
      },
    },
  },
  plugins: [],
}


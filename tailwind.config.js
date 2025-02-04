module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C099D6',
        secondary: '#F1E1B0',
        tertiary: '#FFC281',
        danger: '#E79B9B',
        background: '#FFFCF2',
        dark: '#2C2C2C',
      },
      fontFamily: {
        'staatliches': ['Staatliches', 'cursive'],
        'Afacad': ['Staatliches', 'cursive']
      }
    },
  },
  plugins: [],
}
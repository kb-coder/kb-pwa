module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Open Sans', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#400080',
          light: '#b299cc',
          25: '#27004d',
          50: '#30067',
          100: '#94ca6',
          200: '#94ca6',
          300: '#9f7fbf',
          400: '#9f7fbf',
          500: '#c5b2d8',
          600: '#d8cce5',
          700: '#ebe5f2'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}

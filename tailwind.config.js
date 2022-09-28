module.exports = {
  content: ['./dist/*.html', './src/index.js'],
  theme: {
    extend: {
      colors: {
        'very-dark-gray': '#18171F',
        'dark-gray': '#24232c',
        grey: '#817D92',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'mono'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

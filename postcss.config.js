/**
 * @type {import('postcss').ProcessOptions}
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    '@thedutchcoder/postcss-rem-to-px': {}, // you can add option like the base font size
  }
}

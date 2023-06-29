/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{html,js}", "./scripts/*.js"],
  theme: {
    fontFamily: {
      'righteous': ['Righteous-Regular', 'sans-serif'],
      'sand': ['Quicksand', 'sans-serif'],
    },
    extend: {
      colors: {
        'green': '#214e34',
        'charcoal': '#364156',
        'oxford_blue': '#011638'
      },
    },
  },
  plugins: [],
}


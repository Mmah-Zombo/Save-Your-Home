/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{html,js}", "./scripts/*.js", "./API/search_loaction.js"],
  theme: {
    extend: {
      colors: {
        'green_y': '#214e34',
        'charcoal': '#364156',
        'oxford_blue': '#011638'
      },
    },
  },
  plugins: [],
}


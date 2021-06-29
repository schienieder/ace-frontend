const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {
      width: {
        'client-profile-form-container' : '38rem',
        'custom-textarea': '32rem',
        '63': '15.25rem'
      },
      gridTemplateRows: {
          // landing page
        'hero': 'repeat(3, 1fr) 16rem 1fr 5rem',
        // custom layout
        'custom-layout': '4.5rem 1fr',
        // rows for calendar
        '7': 'repeat(7, 1fr)',
      },
      gridTemplateColumns: {
        // custom layout
        'custom-layout': '16rem 1fr',
      },
    },
    colors : {
      transparent: 'transparent',
      current: 'currentColor',
      gray : colors.coolGray,
      teal : colors.teal,
      white : colors.white,
      yellow : colors.amber,
      red : colors.rose,
      blue : colors.lightBlue,
    },
    fontFamily : {
      mont : ['Montserrat', 'sans-serif'],
      source : ['"Source Serif Pro"', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

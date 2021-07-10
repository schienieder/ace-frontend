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
      backgroundImage : theme => ({
        'about-img' : "url('/images/flowers.jpg')",
        'testimonial-img' : "url('/images/couple.jpg')",
        'award1-img' : "url('/images/award1.png')",
        'award2-img' : "url('/images/award2.png')",
        'award3-img' : "url('/images/award3.png')",
      }),
      width: {
        'rating-form' : '508px',
        'client-profile-form-container' : '38rem',
        'rating-form' : '42rem',
        'custom-textarea': '32rem',
        '63': '15.25rem'
      },
      gridTemplateRows: {
          // landing page
        'hero': 'repeat(3, 1fr) 14rem 24rem 5rem',
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
      catam : ['Catamaran', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

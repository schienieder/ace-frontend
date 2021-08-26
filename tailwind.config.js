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
        'about-main' : "url('/images/about_main.jpg')",
        'services1-img' : "url('/images/services1.jpg')",
        'services2-img' : "url('/images/services2.jpg')",
        'services3-img' : "url('/images/services3.jpg')",
        'testimonial-img1' : "url('/images/couple1.jpg')",
        'testimonial-img2' : "url('/images/couple2.jpg')",
        'testimonial-img3' : "url('/images/couple3.jpg')",
        'award1-img' : "url('/images/award1.png')",
        'award2-img' : "url('/images/award2.png')",
        'award3-img' : "url('/images/award3.png')",
        'award4-img' : "url('/images/award4.png')",
        'login-img' : "url('/images/login.jpg')",
        'register-img' : "url('/images/register.jpg')",
        'rate-img' : "url('/images/rate.jpg')",
      }),
      width: {
        'custom1' : '45rem',
        'about-img' : '485px',
        'rating-form' : '508px',
        'client-profile-form-container' : '38rem',
        'rating-form' : '42rem',
        'custom-textarea': '32rem',
        '63': '15.25rem'
      },
      gridTemplateRows: {
          // landing page
        'hero': '1fr 18rem repeat(3, 1fr) 18rem 15rem',
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
      true : colors.trueGray,
      teal : colors.teal,
      white : colors.white,
      yellow : colors.amber,
      red : colors.rose,
      pink : colors.pink,
      indigo : colors.indigo,
      blue : colors.cyan,
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

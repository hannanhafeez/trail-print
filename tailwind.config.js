/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('./src/constants/colors')

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '0.25': '1px'
      },
      width: {
        '0.25': '1px'
      },
      fontSize: {
        '10': '10px',
        '11': '11px',
        '12': '12px',
        '13': '13px',
        '14': '14px',
        '16': '16px',
        '15': '15px',
        '17': '17px',
        '18': '18px',
        '19': '19px',
        '20': '20px',
        '24px': '24px',
        '26px': '26px',
        '28px': '28px',
      },
      colors: colors,
    },
    fontFamily: {
      'mulish': ['Mulish', 'sans-serif'],
      'quicksand': ['Quicksand', 'sans-serif'], 
    },
    screens: {
      ...defaultTheme.screens,
      'xxs': '420px',
      'xs': '470px',
      /* 
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
       */
      /* Tailwing breakpoints ⬇️ */
      /* 
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1536px',
      '4xl': '1920px', 
      */
    },
  },
  plugins: [

    
  ],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flexBasis: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '100': '100',
      },
      keyframes: {
        loading: {
          '0%': { transform: 'scaleX(0)',  },
          '50%': { transform: 'scaleX(0.5)', },
          '100%': { transform: 'scaleX(1)',  },
        },
        
      },
      animation: {
        loading: 'loading 8s linear',
        
        
      },
      animatedSettings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 500,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
        classes: ['bounceInUp', 'heartBeat']
    }
    },
    // colors: {
    //   'dark-100': '#000000',
    
    // },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [
    require('tailwindcss-animation'),
    require('tailwind-animatecss')
  ],
}
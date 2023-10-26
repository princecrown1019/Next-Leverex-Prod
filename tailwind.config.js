module.exports = {
  prefix: 'tw-',
  content: [
    './public/**/*.html',
    './src/modules/**/*.tsx',
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx',
  ],
  theme: {
    colors: {
      black: '#1C1C27',
      white: '#FFF',
      'white-contrast-text': 'rgba(255, 255, 255, 0.1)',
      'white-lighter-contrast-text': 'rgba(248, 249, 251, 0.04)',

      primary: '#0085FF',
      'primary-contrast-text': 'rgba(0, 133, 255, 0.05)',
      'primary-contrast-text-dark': 'rgba(0, 133, 255, 0.3)',
      'primary-contrast-text-medium': 'rgba(0, 133, 255, 0.065)',

      warning: '#FFD000',
      'warning-contrast-text': 'rgba(255, 208, 0, 0.05)',
      'warning-contrast-text-dark': 'rgba(255, 208, 0, 0.085)',

      positive: '#25D160',
      'positive-contrast-text': 'rgba(37, 209, 96, 0.05)',
      'positive-contrast-text-dark': 'rgba(37, 209, 96, 0.085)',

      negative: '#FF2D58',
      'negative-contrast-text': 'rgba(255, 45, 88, 0.05)',
      'negative-contrast-text-dark': 'rgba(255, 45, 88, 0.085)',

      long: 'linear-gradient(45deg, #3BE300 0%, #00B2FF 100%)',
      'long-from': '#3BE300',
      'long-to': '#00B2FF',

      default: '#A07EFF',

      'long-contrast-text': 'linear-gradient(45deg, rgba(59, 227, 0, 0.2) 0%, rgba(0, 178, 255, 0.2) 100%)',
      'long-contrast-text-from': 'rgba(59, 227, 0, 0.15)',
      'long-contrast-text-to': 'rgba(0, 178, 255, 0.15)',

      'long-contrast-text-dark': 'linear-gradient(45deg, rgba(59, 227, 0, 0.3) 0%, rgba(0, 178, 255, 0.3) 100%)',
      'long-contrast-text-dark-from': 'rgba(59, 227, 0, 0.3)',
      'long-contrast-text-dark-to': 'rgba(0, 178, 255, 0.3)',

      short: 'linear-gradient(45deg, #FF0387 0%, #FE7803 100%)',
      'short-from': '#FF0387',
      'short-to': '#FE7803',

      'short-contrast-text': 'linear-gradient(45deg, rgba(255, 3, 135, 0.2) 0%, rgba(254, 120, 3, 0.2) 100%)',
      'short-contrast-text-from': 'rgba(255, 3, 135, 0.15)',
      'short-contrast-text-to': 'rgba(254, 120, 3, 0.15)',

      'short-contrast-text-dark': 'linear-gradient(45deg, rgba(255, 3, 135, 0.3) 0%, rgba(254, 120, 3, 0.3) 100%)',
      'short-contrast-text-dark-from': 'rgba(255, 3, 135, 0.3)',
      'short-contrast-text-dark-to': 'rgba(254, 120, 3, 0.3)',

      border: '#3B3B4E',
      'border-light-text-contrast': 'rgba(255, 255, 255, 0.1)',


      background: '#1C1C27',
      'background-contrast-text': 'rgba(28, 28, 39, 0.9)',
      'background-paper': '#21212E',
      'background-input': '#272736',
      'background-input-contrast-text': 'rgba(39, 39, 54, 0.4)',
      'background-input-light': '#2E2E40',

      'text-primary': '#FFF',
      'text-secondary': '#636383',
      'text-secondary-contrast-text': 'rgba(99, 99, 131, 0.25)',
      'text-grey': '#AFAFD1',
      'text-grey-light': '#A2ABB8',

      transparent: 'transparent'
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    fontSize: {
      xxs: '.65rem',
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    screens: {
      xs: { max: '480.98px' },
      s: { max: '740.98px' },
      sm: { max: '840.98px' },
      md: { max: '1100.98px' },
      // md: { raw: '(max-width: 1100.98px), (max-height: 600.98px)' },
      mdH: { raw: '(max-height: 750.98px)' },
      lg: { min: '1440.98px' },
      xl: { min: '1920.98px' },
      '2xl': { min: '2560px' }
    },
    extend: {
      boxShadow: {
        primary: '0px 0px 22px 3px #0084ff'
      },
      keyframes: {
        ripple: {
          to: {
            opacity: 0,
            transform: 'scale(2)'
          }
        },
        increaseDecrease: {
          '0%': {
            backgroundSize: '0%',
            WebkitBackgroundSize: '0%'
          },
          '25%': {
            backgroundSize: '50%',
            WebkitBackgroundSize: '50%'
          },
          '50%, 100%': {
            backgroundSize: '40%',
            WebkitBackgroundSize: '40%'
          }
        }
      },
      animation: {
        ripple: 'ripple 1s linear forwards',
        increaseDecrease: 'increaseDecrease 1.75s ease-in-out forwards',
      }
    }
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  plugins: []
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm cream canvas, used as the primary light ground
        canvas: {
          DEFAULT: '#F5F1EA',
          deep: '#ECE5D8',
          dim: '#E2DACB',
        },
        // Warm off-black, never navy or pure black
        ink: {
          DEFAULT: '#1C1A17',
          soft: '#26231F',
          raised: '#322E28',
        },
        // Deep bottle/emerald accent
        emerald: {
          DEFAULT: '#1F3D2E',
          soft: '#2C5440',
          bright: '#3A6B52',
        },
        // Warm stone greys for body copy and muted UI
        stone: {
          700: '#574F44',
          600: '#6B6357',
          500: '#857C6E',
          400: '#A39A8A',
          300: '#C4BBAB',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Editorial display sizes with tuned line-heights
        'display-xl': ['clamp(3.2rem, 8vw, 7.5rem)', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.6rem, 5.5vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.6rem, 2.6vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.005em' }],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      maxWidth: {
        shell: '88rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'rise-in': 'rise-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}

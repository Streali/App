/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'Helvetica', 'sans-serif'],
        icons: ['remixicon'],
        title: ['Clash Display', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        xxs: [
          '0.625rem',
          {
            lineHeight: '1rem',
          },
        ],
        xs: [
          '0.75rem',
          {
            lineHeight: '1rem',
            letterSpacing: '0.002em',
          },
        ],
        sm: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.0025em',
          },
        ],
        base: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.005em',
          },
        ],
      },
      colors: {
        primary: {
          100: '#ede6ff',
          200: '#c5b7ff',
          300: '#9e88f9',
          400: '#7758f4',
          500: '#5129f0',
        },
        dark: {
          100: '#56648d',
          200: '#434e6c',
          300: '#30374d',
          400: '#1d212e',
          500: '#090b11',
          600: '#040508',
        },
        secondary: {
          100: '#f3fdfd',
          200: '#e7fbfb',
          300: '#daf9f9',
          400: '#ccf7f7',
          500: '#bef6f6',
        },
        light: {
          100: '#cad0e1',
          200: '#b5bed6',
          300: '#9eaacb',
          400: '#8d98b5',
          500: '#7a839d',
        },
        error: {
          100: '#f9e5e4',
          200: '#f3c9c7',
          300: '#eea7a4',
          400: '#e87d77',
          500: '#e23b28',
        },
        warning: {
          100: '#fff1e5',
          200: '#ffe3c8',
          300: '#ffd4a7',
          400: '#ffc47d',
          500: '#ffb33a',
        },
        success: {
          100: '#ebf6e4',
          200: '#d6eec5',
          300: '#bfe5a1',
          400: '#a5dc73',
          500: '#86d313',
        },
        accent: {
          500: '#d0ff1f',
          400: '#d9ff4c',
          300: '#e3ff79',
          200: '#ecffa5',
          100: '#f6ffd2',
        },
      },
      animation: {
        dialogFadeIn: 'dialogFadeIn .3s ease-in-out',
        dialogFadeOut: 'dialogFadeOut .3s ease-in-out',
      },
      keyframes: {
        dialogFadeIn: {
          '0%': { opacity: 0, transform: 'translate(-50%, -48%)' },
          '100%': { opacity: 1, transform: 'translate(-50%, -50%)' },
        },
        dialogFadeOut: {
          '100%': { opacity: 1, transform: 'translate(-50%, -50%)' },
          '0%': { opacity: 0, transform: 'translate(-50%, -48%)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  safelist: [
    {
      pattern:
        /(bg|border|text|fill)-(violet|red|brand|error|success|bg-element-light-lighter-500|accent)(-\w+\d+)*/,
      variants: ['focus', 'hover'],
    },
    {
      pattern: /(w|h)-(\w+\d+)*/,
    },
  ],
  plugins: [require('prettier-plugin-tailwindcss')],
};

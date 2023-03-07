/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      screens: {
        sm: '540px',
        lg: '900px',
        xl: '1380px',
      },
      backgroundImage: {
        'chat-light':
          'linear-gradient(240deg, rgba(45, 212, 191, 0.8) 0%, rgba(187, 247, 208, 0.8) 40%, rgba(187, 247, 208, 0.8) 60%, rgba(45, 212, 191, 0.8) 100%)',
        'chat-dark':
          'linear-gradient(240deg, rgba(13, 148, 136, 0.5) 0%, rgba(74, 222, 128, 0.5) 40%, rgba(74, 222, 128, 0.5) 60%, rgba(13, 148, 136, 0.5) 100%);',
      },
      colors: {
        gray: {
          650: '#404A59',
          750: '#2B3645',
        },
      },
    },
  },
  plugins: [],
};

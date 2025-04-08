/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // <== critical for class detection
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        heading: ['"Montserrat"', 'sans-serif'],
        minion: ['"minion-pro"', 'serif'], // ✅ Adobe Fonts loaded in layout.tsx
      },
      colors: {
        lumen: {
          primary: '#53667d',
          secondary: '#bcc3d3',
          accent: '#b0822e',
          cream: '#d1cec9',
          ivory: '#edeceb',
          navy: '#051523',
          dark: '#162030',
          mid: '#22324b',
          tan: '#b29786',
          bronze: '#a86f44',
          richbrown: '#7a4823',
          softgold: '#fee4a3',
          gold: '#efca81',
        },
      },
    },
  },
  plugins: [],
};

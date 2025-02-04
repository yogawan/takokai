/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "serif"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 2s ease-in-out infinite",
        spin360: 'spin360 120s linear infinite',
        spin3602: 'spin360 6s linear infinite',
      },
      keyframes: {
        spin360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spin3602: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      colors: {
        white: '#EEEEEE',
        purewhite: '#DDDDDD',
        black: '#171717',
        pureblack: '#303030',
      },
      cursor: {
        "custom": "url('/assets/cursor.png'), auto",
      },

    },
  },
  plugins: [],
}


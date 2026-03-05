/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          silver: '#C0C0C0',
        },
      },
    },
  },
  darkMode: 'class',
}

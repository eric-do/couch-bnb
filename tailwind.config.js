/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        'navbar': '60',
        'overlay': '65',
        'modal': '70',
      }
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/line-clamp')],
}

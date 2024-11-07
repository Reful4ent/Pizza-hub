/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        fontFamily: {
            'Montserrat': ['Montserrat','sans-serif'],
        },
        boxShadow: {
            'custom': '0px 0px 49px 9px #00000026'
        }
    },
  },
  plugins: [],
}


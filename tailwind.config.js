/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5EFE6',
        'cream-dark': '#EDE4D6',
        'near-black': '#141414',
        'dark-gray': '#1E1E1E',
        'mid-gray': '#3A3A3A',
        accent: '#C8A97E',
        'accent-light': '#E8D5B7',
      },
      fontFamily: {
        display: ['Afacad', 'Georgia', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        subheading: ['Geologica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

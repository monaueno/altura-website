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
        'portfolio-cream': '#F3F2EF',
        'cream-dark': '#EDE4D6',
        'near-black': '#141414',
        'dark-gray': '#1E1E1E',
        'mid-gray': '#3A3A3A',
        'white': '#FFFFFF',
        'figma-gray': '#E0E0E0',
        'dark-white': '#F3F2EF',
        accent: '#A4BDE0',
        'accent-light': '#C5D6ED',
        'accent-dark': '#8DADD0',
        'blue-dark': '#5A739E',
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

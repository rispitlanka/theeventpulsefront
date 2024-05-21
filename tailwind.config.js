/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      keyframes: {
        moveUp: {
          '50%,100%': { transform: 'translateY(100px)' },
          '50%': { transform: 'translateY(-100px)' },
        },
        moveDown: {
          '50%, 100%': { transform: 'translateY(-100px)' },
          '50%': { transform: 'translateY(100px)' },
        },
      },
      animation: {
        moveUp: 'moveUp 100s infinite ',
        moveDown: 'moveDown 100s infinite ',
      },
    },
  },
  plugins: [],
};

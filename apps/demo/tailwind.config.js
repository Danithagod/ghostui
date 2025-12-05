/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ghostui/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require('ghostui-react/tailwind-preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};

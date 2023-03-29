
const pxScale = () => {
  let scale = {
    px: "1px",
  };

  for (let i = 0; i <= 3000; i++) {
    scale[i] = i / 16 + "rem";
  }

  return scale;
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}', "./node_modules/flowbite/**/*.js"],
  plugins: [require('@tailwindcss/typography'),require('flowbite/plugin')],
  darkMode: 'class',
}
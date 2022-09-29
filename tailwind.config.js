/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.html", "./src/**/*.ejs", "./src/**/*.js","./src/css/common/tailwind.css"],
      theme: {
            screens: {
          // pc 1024px以上
          tb: { max: "1023px" },
          sp: { max: "767px" },
          sm: { max: "479px" },
        },
        extend: {},
      },
      plugins: [],
    }
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        moderateBlue: "hsl(238, 40%, 52%)",
        softRed: "hsl(358, 79%, 66%)",
        lightGrayish: "hsl(239, 57%, 85%)",
        paleRed: "hsl(357, 100%, 86%)",
        darkBlue: "hsl(212, 24%, 26%)",
        grayishBlue: "hsl(211, 10%, 45%)",
        lightGray: "hsl(223, 19%, 93%)",
        veryLightGray: "hsl(228, 33%, 97%)",
      },
      screens: {
        desktop: "1440px",
      },
      keyframes: {
        drop: {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "75%": { opacity: "0", transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0%)" },
        },
        deleted: {
          "50%": { opacity: "0.4", transform: "translateX(100%)" },
          "75%": { opacity: "0.3", transform: "translateX(100%)" },
          "100%": { opacity: "0.2", transform: "translateX(0%)" },
        },
      },
      animation: {
        drop: "drop 1s ease-in",
        deleted: "deleted 0.7s ease-in-out",
      },
    },
  },
  plugins: [],
};

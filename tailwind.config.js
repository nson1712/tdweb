module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      backgroundImage: {
        "golden-gradient":
          "linear-gradient(to right, #E5A93F, #FDDC73, #FFF3D3, #E5A93F)",
      },
      colors: {
        "royal-indigo": "#4B0082",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        slide: "slide 2s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

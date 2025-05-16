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
        "bounce-low": {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        slide: "slide 2s infinite",
        "bounce-low": "bounce-low 3s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

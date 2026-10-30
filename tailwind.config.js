/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Fundo off-white quentinho
        cream: "#FBF8F3",
        // Lavanda bem clarinha
        lavender: {
          50: "#F8F5FC",
          100: "#EFE9F8",
          200: "#E0D6F1",
          300: "#CDBFE6",
          400: "#B5A2D8",
          500: "#9B85C6",
        },
        // Verde-sálvia / menta
        sage: {
          50: "#F4F8F5",
          100: "#E6EFE9",
          200: "#CFE0D5",
          300: "#B0CBBB",
          400: "#8DB19E",
          500: "#6F9A80",
          700: "#3F6150",
        },
        // Rosé gold (acentos)
        rosegold: {
          200: "#F0D5C9",
          300: "#E8C2B2",
          400: "#DCA790",
          500: "#C98F78",
          600: "#B07560",
        },
        // Textos
        ink: {
          500: "#7A7388",
          700: "#4A4458",
          900: "#2B2540",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(75, 60, 110, 0.25)",
        glass: "0 8px 32px 0 rgba(90, 70, 130, 0.18)",
      },
    },
  },
  plugins: [],
};

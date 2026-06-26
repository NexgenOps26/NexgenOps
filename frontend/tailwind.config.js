/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#020617",
          900: "#04122c",
          850: "#061b45",
        },
        electric: {
          500: "#2563eb",
          400: "#3b82f6",
          300: "#60a5fa",
        },
      },
      boxShadow: {
        "enterprise-button": "0 18px 38px rgba(2, 6, 23, 0.24)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

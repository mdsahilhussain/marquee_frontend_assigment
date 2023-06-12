/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        head: ["League Spartan", "sans-serif"],
        main: ["Poppins", "sans-serif"],
        log: ["Roboto Mono", "monospace"],
      },
      colors: {
        primary: "#6057A8",
        btncolor: "#2949FF",
        background:
          "linear-gradient(0deg,rgba(40, 44, 52, 1) 0%,rgba(17, 0, 32, 0.5) 100%)",
        text: "#121212",
        white: "#ffffff",
        "primary-box": "#3E3E3E",
      },
      backgroundColor: {
        primary: "rgba(255, 255, 255, 0.45)",
      },
      backgroundImage: {
        "primary-gradient":
          "radial-gradient(50% 50% at 50% 50%, rgba(1, 176, 238, 0.108) 0%, rgba(1, 176, 238, 0) 100%)",
      },
      boxShadow: {
        "light-shadow": "0 0 10px 1px rgba(0, 0, 0, 0.25)",
        glass: "0 7px 20px 5px #00000088",
      },
      height: {
        card: "300px",
        button: "40px",
      },
      width: {
        card: "250px",
        button: "100px",
      },
    },
  },
  plugins: [],
};

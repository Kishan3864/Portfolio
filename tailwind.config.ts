import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#0D9488",
        accent: "#DB2777",
        dark: {
          900: "#F4F6FB",
          800: "#EAEEF6",
          700: "#FFFFFF",
          600: "#E2E8F0",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "spin-slow": "spin 20s linear infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "slide-up": "slide-up 0.8s ease-out",
        "typewriter": "typewriter 3.5s steps(40) 1s forwards",
        "blink": "blink 0.75s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(79, 70, 229, 0.6)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "slide-up": {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
    },
  },
  plugins: [],
};
export default config;

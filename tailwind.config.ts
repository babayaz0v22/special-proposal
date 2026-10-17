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
        background: "#08070b",
        surface: "#121018",
        "surface-card": "rgba(23, 19, 31, 0.7)",
        neon: {
          pink: "#ff2a85",
          rose: "#f43f5e",
          purple: "#a855f7",
          glow: "rgba(255, 42, 133, 0.4)",
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2.5s infinite ease-in-out",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(255, 42, 133, 0.4), 0 0 30px rgba(255, 42, 133, 0.2)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 25px rgba(255, 42, 133, 0.8), 0 0 50px rgba(255, 42, 133, 0.4)",
            transform: "scale(1.02)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;

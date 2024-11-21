import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Custom background color variable
        foreground: "var(--foreground)", // Custom foreground color variable
        primary: "#4CAF50",  // Green color for primary elements
        secondary: "#FF4081", // Pink color for secondary elements
        accent: "#1E88E5",    // Blue color for accent elements
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'], // Custom font
      },
    },
  },
  plugins: [],
} satisfies Config;

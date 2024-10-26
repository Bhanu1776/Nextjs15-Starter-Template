/* eslint-disable */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  debugScreens: {
      position: ['bottom', 'left'],
      selector: '.debug-screens',
      style: {
        backgroundColor: 'black',
        color: 'white',
      },
    },
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
  ],
};
export default config;

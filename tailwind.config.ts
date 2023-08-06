import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#22269E",
        "secondary": "#8849FF",
        "tertiary": "#5E9CFE",
        "bit-on": "#00FF00",
        "bit-off": "#FF0000",
      }
    },
  },
  plugins: [
  ],
} satisfies Config


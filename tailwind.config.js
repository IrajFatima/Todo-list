/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Add this to ensure all classes are included during development
  safelist: [
    'bg-gradient-to-br',
    'from-slate-900',
    'via-purple-900', 
    'to-slate-900',
    'backdrop-blur-sm',
    {
      pattern: /bg-(red|green|blue|yellow|purple|gray|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(red|green|blue|yellow|purple|gray|indigo|white)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /border-(red|green|blue|yellow|purple|gray|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
    }
  ]
}
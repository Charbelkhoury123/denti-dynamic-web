module.exports = {
  // …
  theme: {
    extend: {
      colors: {
        /* this makes Tailwind emit .border-border { border-color: hsl(var(--border)); } */
        border: 'hsl(var(--border))',

        /* while you’re at it, register your other CSS‑var colors too: */
        background:        'hsl(var(--background))',
        foreground:        'hsl(var(--foreground))',
        card:              'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        // …etc
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}

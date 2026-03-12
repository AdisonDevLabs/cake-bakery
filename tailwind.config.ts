// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // These variables will be updated via JSON/CSS variables in Phase 14
        brand: {
          primary: 'var(--brand-primary, #db2777)',
          secondary: 'var(--brand-secondary, #fbcfe8)',
          accent: 'var(--brand-accent, #9d174d)',
        },
      },
      fontFamily: {
        // We'll allow the brand font to be configurable as well
        brand: ['var(--font-brand, sans-serif)'],
      },
    },
  },
  plugins: [],
};

export default config;
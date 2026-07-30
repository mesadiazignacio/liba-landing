import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#084d9b',
          light: '#1e6bc4',
        },
        coral: {
          DEFAULT: '#ed6d92',
          // Text-bearing coral surfaces. #ed6d92 only reaches 2.92:1 against
          // white, so anything carrying a label uses this instead (4.81:1).
          deep: '#cc3a66',
          // Gradient opening stop only, never a standalone fill.
          light: '#f4a0b5',
        },
        paper: {
          cool: '#f0f5fb',
          blush: '#fde4ec',
        },
        // The system's one opaque hairline tint. Named as DESIGN.md names it, so
        // `border-border-cool` and `bg-border-cool` both resolve.
        'border-cool': '#dce8f6',
        // Rating stars on real testimonials only. Never decorative.
        star: '#facc15',
      },
      fontFamily: {
        sans: ['Gotham', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Gotham', 'Inter', 'system-ui', 'sans-serif'],
        alverata: ['Alverata-Irregular', 'serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        // The documented shadow vocabulary. Inline equivalents for framer-motion
        // `whileHover` targets live in src/lib/shadows.ts, which reads from the
        // same values — a hover target cannot be a class name.
        'card': '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 12px 48px rgba(0,0,0,0.16)',
        // Where a card sits on a tinted band, the shadow is cast navy, not black.
        'card-navy': '0 12px 32px rgba(8,77,155,0.18)',
        'glow-coral': '0 0 30px rgba(237, 109, 146, 0.3)',
        'glow-navy': '0 0 30px rgba(8, 77, 155, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config

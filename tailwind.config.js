/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // `dark:` follows the navbar toggle (data-theme on <html>), not the OS setting.
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Light theme. Channel values live in src/index.css (:root) so a whole
        // palette change is one place. `white` is the strong foreground tone.
        ink: 'rgb(var(--c-bg) / <alpha-value>)',
        white: 'rgb(var(--c-fg) / <alpha-value>)',
        onbrand: 'rgb(var(--c-onbrand) / <alpha-value>)', // text on blue/cyan gradient fills
        slate: {
          100: 'rgb(var(--c-fg) / <alpha-value>)',
          200: 'rgb(var(--c-fg-2) / <alpha-value>)',
          300: 'rgb(var(--c-fg-3) / <alpha-value>)',
          400: 'rgb(var(--c-fg-4) / <alpha-value>)',
        },
        navy: {
          950: 'rgb(var(--navy-950) / <alpha-value>)',
          900: 'rgb(var(--navy-900) / <alpha-value>)',
          800: 'rgb(var(--navy-800) / <alpha-value>)',
          700: 'rgb(var(--navy-700) / <alpha-value>)',
          600: 'rgb(var(--navy-600) / <alpha-value>)',
        },
        brand: {
          blue: 'rgb(var(--brand-blue) / <alpha-value>)',
          sky: 'rgb(var(--brand-sky) / <alpha-value>)',
          cyan: 'rgb(var(--brand-cyan) / <alpha-value>)',
          teal: 'rgb(var(--brand-teal) / <alpha-value>)',
        },
      },
      fontFamily: {
        // Everything is set in Times New Roman (with metric-compatible fallbacks).
        sans: ['"Times New Roman"', 'Times', '"Liberation Serif"', '"Nimbus Roman"', 'serif'],
        display: ['"Times New Roman"', 'Times', '"Liberation Serif"', '"Nimbus Roman"', 'serif'],
        mono: ['"Times New Roman"', 'Times', '"Liberation Serif"', '"Nimbus Roman"', 'serif'],
        // Real code (editor panels, terminal, code blocks) keeps a monospace face.
        code: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 6px 18px -6px rgb(var(--glow-a) / 0.28)',
        glow: '0 10px 30px -8px rgb(var(--glow-a) / 0.45)',
        'glow-lg': '0 16px 44px -8px rgb(var(--glow-b) / 0.5)',
        glass: '0 1px 2px rgb(var(--shadow-edge) / 0.05), 0 16px 40px -16px rgb(var(--shadow-main) / var(--shadow-alpha))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(32px, -28px, 0) scale(1.08)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 16s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}

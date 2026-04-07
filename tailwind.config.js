/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['var(--font-dm-sans)',    'ui-sans-serif',  'system-ui',  'sans-serif'],
        serif: ['var(--font-playfair)',   'Georgia',        'ui-serif',   'serif'],
        mono:  ['var(--font-space-mono)', 'ui-monospace',   'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

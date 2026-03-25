import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        accent: '#1db954',
        'accent-hover': '#1ed760',
        surface: {
          50: '#1a1a1a',
          100: '#151515',
          200: '#111111',
          300: '#0d0d0d',
          400: '#0a0a0a',
        },
      },
    },
  },
  plugins: [],
}

export default config

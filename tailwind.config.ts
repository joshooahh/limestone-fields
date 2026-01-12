import type { Config } from 'tailwindcss'



const config: Config = {

  darkMode: ['class'],

  content: [

    './pages/**/*.{js,ts,jsx,tsx,mdx}',

    './components/**/*.{js,ts,jsx,tsx,mdx}',

    './app/**/*.{js,ts,jsx,tsx,mdx}',

  ],

  theme: {

    extend: {

      fontFamily: {

        // Semantic font assignments
        headline: ['var(--font-messina-modern)', 'sans-serif'],
        subhead: ['var(--font-abc-marfa-mono)', 'monospace'],
        body: ['var(--font-abc-marfa)', 'sans-serif'],
        'body-secondary': ['var(--font-pp-kyoto)', 'serif'],
        'special': ['var(--font-abc-daily-slab)', 'serif'],
        
        // Legacy mappings (keeping for backward compatibility)
        serif: ['var(--font-messina-modern)', 'serif'], // Now maps to headline
        sans: ['var(--font-abc-marfa)', 'sans-serif'], // Now maps to body
        mono: ['var(--font-abc-marfa-mono)', 'monospace'], // Now maps to subhead
        
        // Direct font access (still available)
        'abc-daily-slab': ['var(--font-abc-daily-slab)', 'serif'],
        'abc-marfa': ['var(--font-abc-marfa)', 'sans-serif'],
        'abc-marfa-mono': ['var(--font-abc-marfa-mono)', 'monospace'],
        'messina-modern': ['var(--font-messina-modern)', 'sans-serif'],
        'pp-kyoto': ['var(--font-pp-kyoto)', 'serif'],

      },

      colors: {

        limestone: {

          black: '#262624',

          'dark-blue': '#253035',

          olive: '#686121',

          'light-blue': '#B3C1CE',

          cream: '#F7F2E4',

          peach: '#F7E7D5',

        },

        border: 'hsl(var(--border))',

        input: 'hsl(var(--input))',

        ring: 'hsl(var(--ring))',

        background: 'hsl(var(--background))',

        foreground: 'hsl(var(--foreground))',

        primary: {

          DEFAULT: 'hsl(var(--primary))',

          foreground: 'hsl(var(--primary-foreground))',

        },

        secondary: {

          DEFAULT: 'hsl(var(--secondary))',

          foreground: 'hsl(var(--secondary-foreground))',

        },

        destructive: {

          DEFAULT: 'hsl(var(--destructive))',

          foreground: 'hsl(var(--destructive-foreground))',

        },

        muted: {

          DEFAULT: 'hsl(var(--muted))',

          foreground: 'hsl(var(--muted-foreground))',

        },

        accent: {

          DEFAULT: 'hsl(var(--accent))',

          foreground: 'hsl(var(--accent-foreground))',

        },

        popover: {

          DEFAULT: 'hsl(var(--popover))',

          foreground: 'hsl(var(--popover-foreground))',

        },

        card: {

          DEFAULT: 'hsl(var(--card))',

          foreground: 'hsl(var(--card-foreground))',

        },

      },

      borderRadius: {

        lg: 'var(--radius)',

        md: 'calc(var(--radius) - 2px)',

        sm: 'calc(var(--radius) - 4px)',

      },

    },

  },

  plugins: [require('tailwindcss-animate')],

}



export default config

// scripts/generate-site-updates.ts

// Run with: npx tsx scripts/generate-site-updates.ts



import * as fs from 'fs'

import * as path from 'path'



function ensureDir(dirPath: string) {

  if (!fs.existsSync(dirPath)) {

    fs.mkdirSync(dirPath, { recursive: true })

  }

}



function writeFile(filePath: string, content: string) {

  ensureDir(path.dirname(filePath))

  fs.writeFileSync(filePath, content.trim() + '\n')

  console.log(`✅ Created/Updated: ${filePath}`)

}



const files: Record<string, string> = {

  'tailwind.config.ts': `import type { Config } from 'tailwindcss'



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

        serif: ['var(--font-fraunces)', 'Georgia', 'Times New Roman', 'serif'],

        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],

        mono: ['var(--font-jetbrains)', 'Courier New', 'monospace'],

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



export default config`,



  'app/layout.tsx': `import type { Metadata } from 'next'

import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'

import './globals.css'



const fraunces = Fraunces({

  subsets: ['latin'],

  variable: '--font-fraunces',

  display: 'swap',

})



const inter = Inter({

  subsets: ['latin'],

  variable: '--font-inter',

  display: 'swap',

})



const jetbrainsMono = JetBrains_Mono({

  subsets: ['latin'],

  variable: '--font-jetbrains',

  display: 'swap',

})



export const metadata: Metadata = {

  title: 'Limestone Fields',

  description: 'A collection of cabins on Lake Limestone. Designed for rest, reflection, and the kind of clarity that comes from being still.',

}



export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html 

      lang="en" 

      className={\`\${fraunces.variable} \${inter.variable} \${jetbrainsMono.variable}\`}

    >

      <body className={inter.className}>

        <nav className="border-b border-border bg-background sticky top-0 z-50">

          <div className="container max-w-7xl mx-auto px-6 py-4">

            <div className="flex items-center justify-between">

              <a 

                href="/" 

                className="text-2xl font-serif text-foreground hover:text-muted-foreground transition-colors"

              >

                Limestone Fields

              </a>

              <div className="flex items-center gap-8">

                <div className="hidden md:flex gap-8 text-sm">

                  <a href="/stay" className="text-muted-foreground hover:text-foreground transition-colors">

                    Stay

                  </a>

                  <a href="/weddings" className="text-muted-foreground hover:text-foreground transition-colors">

                    Weddings

                  </a>

                  <a href="/buyouts" className="text-muted-foreground hover:text-foreground transition-colors">

                    Buyouts

                  </a>

                  <a href="/story" className="text-muted-foreground hover:text-foreground transition-colors">

                    Story

                  </a>

                  <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">

                    Contact

                  </a>

                </div>

                <a 

                  href="/contact"

                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-6"

                >

                  Join Waitlist

                </a>

              </div>

            </div>

          </div>

        </nav>

        {children}

      </body>

    </html>

  )

}`,



  'app/globals.css': `@tailwind base;

@tailwind components;

@tailwind utilities;



@layer base {

  :root {

    --limestone-black: 38 38 36;

    --limestone-dark-blue: 37 48 53;

    --limestone-olive: 104 97 33;

    --limestone-light-blue: 179 193 206;

    --limestone-cream: 247 242 228;

    --limestone-peach: 247 231 213;

    

    --background: 0 0% 100%;

    --foreground: 0 0% 15%;

    

    --card: 0 0% 100%;

    --card-foreground: 0 0% 15%;

    

    --popover: 0 0% 100%;

    --popover-foreground: 0 0% 15%;

    

    --primary: 28 31% 43%;

    --primary-foreground: 0 0% 98%;

    

    --secondary: 28 22% 92%;

    --secondary-foreground: 0 0% 15%;

    

    --muted: 28 22% 92%;

    --muted-foreground: 0 0% 45%;

    

    --accent: 28 22% 92%;

    --accent-foreground: 0 0% 15%;

    

    --destructive: 0 84% 60%;

    --destructive-foreground: 0 0% 98%;

    

    --border: 28 22% 88%;

    --input: 28 22% 88%;

    --ring: 28 31% 43%;

    

    --radius: 0.5rem;

  }

}



@layer base {

  * {

    @apply border-border;

  }

  body {

    @apply bg-background text-foreground;

    font-feature-settings: "rlig" 1, "calt" 1;

  }

}`,

}



console.log('🚀 Generating site updates...\n')



for (const [filePath, content] of Object.entries(files)) {

  writeFile(filePath, content)

}



console.log('\n✅ Core files updated!')

console.log('\n📝 Note: Large page files (homepage, contact, weddings) are too big for this script.')

console.log('Please copy them manually from the artifacts in our conversation:')

console.log('  - app/page.tsx (from "Navigation & Homepage Updates")')

console.log('  - app/contact/page.tsx (from "Contact Page - Complete")')

console.log('  - app/weddings/page.tsx (from "Weddings Page - Complete")')

console.log('  - app/api/faqs/route.ts (from "Contact Page - Complete")')

console.log('\n🔧 After copying those files, run:')

console.log('  npm install next@14')

console.log('  npm run dev')

console.log('\nThen test locally before pushing to GitHub!')


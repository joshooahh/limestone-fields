import type { Metadata } from 'next'

import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

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



// Custom fonts
const abcDailySlab = localFont({
  src: [
    {
      path: './fonts/ABCDailySlab-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/ABCDailySlab-RegularItalic.woff',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-abc-daily-slab',
  display: 'swap',
})

const abcMarfa = localFont({
  src: [
    {
      path: './fonts/ABCMarfa-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/ABCMarfa-Light.woff',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-abc-marfa',
  display: 'swap',
})

const abcMarfaMono = localFont({
  src: [
    {
      path: './fonts/ABCMarfaMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/ABCMarfaMono-Medium.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-abc-marfa-mono',
  display: 'swap',
})

const messinaModern = localFont({
  src: [
    {
      path: './fonts/MessinaModernWeb-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/MessinaModernWeb-Book.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-messina-modern',
  display: 'swap',
})

const ppKyoto = localFont({
  src: [
    {
      path: './fonts/PPKyoto-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/PPKyoto-Light.woff',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-pp-kyoto',
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

      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${abcDailySlab.variable} ${abcMarfa.variable} ${abcMarfaMono.variable} ${messinaModern.variable} ${ppKyoto.variable}`}

    >

      <body className={inter.className}>

        {children}

      </body>

    </html>

  )

}

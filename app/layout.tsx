import type { Metadata } from 'next'

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

      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}

    >

      <body className={inter.className}>

        {children}

      </body>

    </html>

  )

}

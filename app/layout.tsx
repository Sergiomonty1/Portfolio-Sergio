import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Navbar } from '@/app/components/navigation/Navbar'
import { PortfolioFooter } from '@/app/components/common/PortfolioFooter'

export const metadata: Metadata = {
  title: 'Sergio Montero Carmona — Game Developer',
  description: 'Desarrollador de Videojuegos Mobile especializado en Unity 3D y C#. Lead Game Developer & Co-Fundador en MakTub Games.',
  keywords: ['game developer', 'unity', 'c#', 'videojuegos', 'mobile games', 'sevilla'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="bg-black text-white">
        <Navbar />
        <main>
          {children}
        </main>
        <PortfolioFooter />
      </body>
    </html>
  )
}

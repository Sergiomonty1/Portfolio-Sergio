import type { Metadata } from 'next'
import { metadata } from '@/config/metadata'
import '@/styles/globals.css'
import { Navbar } from '@/app/components/navigation/Navbar'
import { Footer } from '@/app/components/common/Footer'

export const generateMetadata = async (): Promise<Metadata> => {
  return metadata
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
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body>
        <Navbar />
        <main className="overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Navbar } from '@/app/components/navigation/Navbar'

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
        {/* Minimal footer */}
        <footer className="py-8 px-8 sm:px-16 lg:px-24 border-t border-gray-900">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Sergio Montero Carmona. Todos los derechos reservados.
            </p>
            <p className="text-sm text-gray-600">
              Hecho con Next.js & Framer Motion
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}

'use client'

import { usePathname } from 'next/navigation'

export const PortfolioFooter: React.FC = () => {
  const pathname = usePathname()
  if (pathname.startsWith('/menu')) return null

  return (
    <footer className="py-8 pb-24 lg:pb-8 px-6 sm:px-16 lg:px-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Sergio Montero Carmona. Todos los derechos reservados.
        </p>
        <p className="text-sm text-gray-600">
          Hecho con Next.js &amp; Framer Motion
        </p>
      </div>
    </footer>
  )
}

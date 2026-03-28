import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carta — La Taberna de Sergio',
  description: 'Consulta nuestra carta de tapas y medias raciones.',
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

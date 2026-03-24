import type { Metadata } from 'next'

const APP_NAME = 'Sergio - Desarrollador de Videojuegos'
const APP_DESCRIPTION = 'Portfolio profesional de Sergio, desarrollador de videojuegos en Unity. Mostrando proyectos, experiencia y capacidades técnicas.'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-sergio.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_NAME,
    template: '%s | Sergio Portfolio',
  },
  description: APP_DESCRIPTION,
  keywords: [
    'Desarrollador',
    'Videojuegos',
    'Unity',
    'C#',
    'Programación',
    'Portfolio',
    'Desarrollo',
    'Game Developer',
  ],
  authors: [{ name: 'Sergio' }],
  creator: 'Sergio',
  publisher: 'Sergio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: APP_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${APP_URL}/og-image.png`],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow',
  },
  alternates: {
    canonical: APP_URL,
  },
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sergio',
  url: APP_URL,
  jobTitle: 'Desarrollador de Videojuegos',
  description: APP_DESCRIPTION,
  sameAs: [
    'https://github.com/sergio',
    'https://linkedin.com/in/sergio',
    'https://twitter.com/sergio',
  ],
}

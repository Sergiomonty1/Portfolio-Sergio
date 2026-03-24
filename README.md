# Portfolio Sergio - Desarrollador de Videojuegos en Unity

Portfolio profesional moderno y responsivo para mostrar proyectos, experiencia y capacidades técnicas como desarrollador de videojuegos en Unity.

## 🚀 Características

- **Diseño Moderno y Profesional**: Interfaz limpia, tecnológica y con identidad propia
- **Responsive Real**: Optimizado para desktop, tablet y smartphone
- **Firebase Integration**: Backend con Firestore, Storage y Authentication
- **Componentes Reutilizables**: Arquitectura escalable y mantenible
- **Animaciones Elegantes**: Transiciones suaves con Framer Motion
- **SEO Optimizado**: Metadatos, Open Graph y Sitemap
- **Performance**: Optimización de imágenes, lazy loading y code splitting
- **Despliegue en Vercel**: CI/CD automatizado desde GitHub

## 📋 Secciones

- **Hero**: Presentación impactante con nombre y CTA
- **About**: Descripción profesional editable desde BD
- **Experience**: Timeline de experiencia y formación
- **Projects**: Galería interactiva de proyectos con multimedia
- **Contact**: Formulario de contacto y redes sociales

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilos**: Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Storage, Auth)
- **Hosting**: Vercel
- **Versionado**: Git & GitHub

## 📦 Instalación

1. **Clonar repositorio**
```bash
git clone https://github.com/tu-usuario/portfolio-sergio.git
cd portfolio-sergio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
- Crear proyecto en Firebase Console
- Copiar credenciales
- Configurar `.env.local`

4. **Iniciar desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🔧 Configuración Firebase

### Firestore Collections

```
portfolio/
├── profile/
│   └── personal
│       ├── name: string
│       ├── title: string
│       ├── description: string
│       ├── avatar: string (URL)
│       └── socialLinks: object
│
├── experiences/
│   ├── {docId}
│   │   ├── title: string
│   │   ├── company: string
│   │   ├── startDate: timestamp
│   │   ├── endDate: timestamp (opcional)
│   │   ├── description: string
│   │   ├── technologies: array
│   │   └── current: boolean
│
└── projects/
    ├── {docId}
    │   ├── title: string
    │   ├── description: string
    │   ├── shortDescription: string
    │   ├── technologies: array
    │   ├── images: array (URLs de Storage)
    │   ├── videos: array (URLs de Storage)
    │   ├── liveUrl: string (opcional)
    │   ├── githubUrl: string (opcional)
    │   ├── featured: boolean
    │   ├── order: number
    │   ├── createdAt: timestamp
    │   └── updatedAt: timestamp
```

## 📁 Estructura del Proyecto

```
portfolio-sergio/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Home
│   ├── sitemap.ts              # SEO Sitemap
│   ├── robots.ts               # Robots.txt
│   ├── api/
│   │   └── contact.ts          # API de contacto
│   └── components/
│       ├── navigation/         # Navbar, etc
│       ├── sections/          # Hero, About, Projects, etc
│       ├── ui/                # Componentes reutilizables
│       └── common/            # Componentes comunes
├── lib/
│   ├── firebase.ts            # Configuración Firebase
│   ├── services/              # Servicios de datos
│   ├── hooks/                 # Custom hooks
│   └── utils/                 # Utilidades
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── config/
│   └── metadata.ts            # Configuración SEO
├── types/
│   └── index.ts               # TypeScript types
├── styles/
│   └── globals.css            # Estilos globales
└── .env.local                 # Variables de entorno
```

## 🚀 Despliegue

### Vercel

1. **Conectar GitHub a Vercel**
   - Ir a [vercel.com](https://vercel.com)
   - Importar repositorio
   - Configurar variables de entorno

2. **Desplegar**
   ```bash
   git push origin main
   # Vercel desplegará automáticamente
   ```

## 📊 Base de Datos - Modelo de Datos

### Profile Document
```typescript
{
  name: "Sergio Martínez",
  title: "Desarrollador de Videojuegos | Unity",
  description: "Apasionado por crear experiencias interactivas...",
  avatar: "gs://bucket/avatar.jpg",
  email: "sergio@example.com",
  socialLinks: {
    github: "https://github.com/...",
    linkedin: "https://linkedin.com/...",
    twitter: "https://twitter.com/...",
    email: "sergio@example.com"
  }
}
```

### Experience Document
```typescript
{
  title: "Desarrollador Senior Unity",
  company: "Tech Company",
  startDate: timestamp,
  endDate: timestamp | null,
  description: "Responsable de...",
  technologies: ["Unity", "C#", "Multiplayer"],
  current: true,
  order: 1
}
```

### Project Document
```typescript
{
  title: "Juego RPG Multijugador",
  shortDescription: "RPG con sistema de combate...",
  description: "Descripción completa del proyecto...",
  technologies: ["Unity", "C#", "Photon", "UI/UX"],
  images: ["gs://bucket/img1.jpg", "gs://bucket/img2.jpg"],
  videos: ["gs://bucket/video.mp4"],
  liveUrl: "https://example.com",
  githubUrl: "https://github.com/...",
  featured: true,
  order: 1,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🔐 Firebase Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access
    match /portfolio/{document=**} {
      allow read: if request.auth != null || true;
      allow create, update, delete: if request.auth != null && 
        request.auth.uid == get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.uid;
    }
  }
}
```

## 🎨 Personalización

### Colores
Edita en `tailwind.config.ts` la paleta de colores primary y secondary.

### Tipografía
Configura fuentes en `tailwind.config.ts` (actualmente Inter y Fira Code)

### Contenido
Todo el contenido se gestiona desde Firebase Firestore dinámicamente.

## 📈 SEO

- Metadatos optimizados por página
- Open Graph para compartir en redes
- Sitemap automático
- Robots.txt configurado
- Structured data (JSON-LD)

## 🔄 Workflow de Desarrollo

```bash
# Desarrollo local
npm run dev

# Build production
npm run build
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📝 Variables de Entorno

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## 📞 Contacto

Para preguntas o sugerencias contacta a través del formulario en el portfolio.

## 📄 Licencia

MIT License - Libre para usar en proyectos personales y comerciales.

---

**Hecho con ❤️ por Sergio - Desarrollador de Videojuegos en Unity**

# Arquitectura del Proyecto

## 📐 Visión General

Portfolio web profesional full-stack con:
- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Backend**: Firebase (Firestore + Storage + Auth)
- **Hosting**: Vercel
- **CI/CD**: GitHub + Vercel

## 🗂️ Estructura de Carpetas

```
portfolio-sergio/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── contact/              # Endpoint de contacto
│   ├── components/
│   │   ├── navigation/           # Navbar, etc
│   │   ├── sections/             # Secciones principales
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── ui/                   # Componentes reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   └── Container.tsx
│   │   └── common/               # Componentes globales
│   │       └── Footer.tsx
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Home page
│   ├── robots.ts                 # SEO robots.txt
│   └── sitemap.ts                # SEO sitemap
├── lib/                          # Lógica compartida
│   ├── firebase.ts               # Configuración Firebase
│   ├── services/
│   │   └── firebaseService.ts    # Funciones para datos
│   ├── hooks/                    # Custom hooks
│   │   ├── useProfile.ts
│   │   ├── useExperience.ts
│   │   └── useProjects.ts
│   └── utils/                    # Funciones utilidad
├── config/                       # Configuración global
│   └── metadata.ts               # SEO metadata
├── types/                        # TypeScript definitions
│   └── index.ts
├── styles/                       # Estilos globales
│   └── globals.css
├── public/                       # Assets estáticos
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── .env.local                    # Variables de entorno
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── README.md
├── SETUP.md
└── ARCHITECTURE.md              # Este archivo
```

## 🔄 Flujo de Datos

```
Usuario Browser
    ↓
├─ (GET) / page.tsx
│   └─ Renderiza componentes
│       ├─ HeroSection
│       ├─ AboutSection
│       │   └─ useProfile() hook → Firebase getDoc()
│       ├─ ExperienceSection
│       │   └─ useExperience() hook → Firebase getDocs()
│       ├─ ProjectsSection
│       │   └─ useFeaturedProjects() hook → Firebase query()
│       └─ ContactSection
│           └─ (POST) /api/contact
│               └─ Firebase addDoc()
│
└─ Firebase Firestore
    ├─ portfolio/profile/personal/data
    ├─ portfolio/profile/personal/experiences/
    ├─ portfolio/profile/personal/projects/
    ├─ portfolio/profile/personal/contacts/
    └─ Storage (imágenes, videos)
```

## 🎯 Componentes Principales

### Página Home (`page.tsx`)

```typescript
// Composición de secciones
<HeroSection />      // Presentación
<AboutSection />     // Perfil + skills
<ExperienceSection />// Timeline de experiencia
<ProjectsSection />  // Galería de proyectos
<ContactSection />   // Formulario contacto
```

### Componentes de UI (`components/ui/`)

**Reutilizables, agnósticos al contenido:**

- `Button`: Botones con variantes (primary, secondary, outline, ghost)
- `Card`: Tarjetas con efectos glass/gradient
- `Badge`: Etiquetas para tecnologías
- `SectionTitle`: Título de sección con gradient
- `Container`: Wrapper responsive con animaciones

### Componentes de Secciones (`components/sections/`)

**Específicos de contenido, conectados a datos:**

- `HeroSection`: Banner principal
- `AboutSection`: Perfil + skills (conectado a Profile)
- `ExperienceSection`: Timeline (conectado a Experiences)
- `ProjectsSection`: Galería (conectado a Projects)
- `ContactSection`: Formulario + info (conectado a API)

## 🔌 Integración Firebase

### Firestore Collections Path Pattern

```
portfolio/
├── profile/
│   └── personal/
│       ├── data (document)
│       ├── experiences/ (collection)
│       ├── projects/ (collection)
│       └── contacts/ (collection)
```

### Servicios Firebase (`lib/services/firebaseService.ts`)

```typescript
profileService.getProfile()              // Profile document
experienceService.getExperiences()       // Todas experiencias
experienceService.getCurrentExperience() // Experiencia actual
projectService.getProjects()             // Todos proyectos
projectService.getFeaturedProjects()     // Solo destacados
projectService.getProjectsByCategory()   // Por categoría
```

### Custom Hooks (`lib/hooks/`)

```typescript
useProfile()              // Profile + loading + error
useExperience()          // Experiencias array
useCurrentExperience()   // Una experiencia actual
useProjects()            // Todos proyectos
useFeaturedProjects()    // Proyectos destacados
useProjectById(id)       // Proyecto específico
```

## 🎨 Sistema de Diseño

### Colores

Definidos en `tailwind.config.ts`:

- **Primary**: Cyan/Sky Blue (principal)
- **Secondary**: Purple/Violet (acentos)
- **Dark**: Scales oscuras (fondo)

### Tipografía

- **Display**: Inter (para leer)
- **Mono**: Fira Code (código/tech)

### Animaciones

- Fade In
- Slide Up/Down/Left/Right
- Float
- Glow
- Scale en hover

### Glassmorphism

Efecto vidrio/translúcido en componentes:
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(8px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

## 🚀 Deployment Pipeline

```
Local Development
    ↓ (git push)
GitHub Repository
    ↓ (webhook)
Vercel
    ├─ Install: npm install
    ├─ Build: next build
    ├─ Test: npm run type-check
    └─ Deploy: Auto to production
         ↓
Live on portfolio-sergio.vercel.app
```

## 📊 Base de Datos - Modelos

### Profile Document

Path: `portfolio/profile/personal/data`

```typescript
interface Profile {
  name: string
  title: string
  description: string
  avatar?: string
  email?: string
  phone?: string
  location?: string
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
}
```

### Experience Collection

Path: `portfolio/profile/personal/experiences/{docId}`

```typescript
interface Experience {
  title: string              // "Desarrollador Senior"
  company: string            // "Tech Company"
  startDate: Timestamp       // Date object
  endDate?: Timestamp        // null si está en curso
  description: string        // Description completa
  technologies: string[]     // ["Unity", "C#"]
  current: boolean          // ¿Es actual?
  order?: number            // Orden de visualización
}
```

### Projects Collection

Path: `portfolio/profile/personal/projects/{docId}`

```typescript
interface Project {
  title: string              // "Juego RPG"
  shortDescription: string   // Resumen corto
  description: string        // Descripción completa
  technologies: string[]     // ["Unity", "C#"]
  images?: string[]         // URLs de Storage
  videos?: string[]         // URLs de Storage
  liveUrl?: string          // Link a demo
  githubUrl?: string        // Link a repo
  featured: boolean         // Para galería
  category?: string         // "Games", "Tools", etc
  order?: number            // Orden
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### Contacts Collection

Path: `portfolio/profile/personal/contacts/{docId}`

```typescript
interface Contact {
  name: string
  email: string
  subject: string
  message: string
  timestamp: Timestamp
  read: boolean
}
```

## 🔐 Seguridad

### Environment Variables

Solo valores públicos en `.env.local` (nombrados con `NEXT_PUBLIC_*`):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- etc.

### Firestore Security Rules

```javascript
// Solo lectura pública
match /portfolio/{document=**} {
  allow read: if true;
  allow write: if false;
}
```

### API Protection

- `POST /api/contact`: Validación de inputs
- Sanitización de strings
- CORS configurado automáticamente en Vercel

## ⚡ Performance

### Optimizaciones Implementadas

1. **Next.js**
   - App Router (más eficiente)
   - Image Optimization automática
   - Code splitting automático
   - API routes serverless

2. **React**
   - Componentes `'use client'` solo donde necesario
   - Lazy loading con intersection observer
   - Memoización automática

3. **CSS**
   - Tailwind CSS (purged en build)
   - Critical CSS inline
   - CSS-in-JS minimizado

4. **Firebase**
   - Lazy loading de datos
   - Queries indexadas
   - Caching automático

### Métricas Target

- FCP (First Contentful Paint): < 1.5s
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- Lighthouse Score: > 90

## 📱 Responsiveness

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Estrategia: Mobile First → Progressive Enhancement

## 🧪 Testing (Futuro)

Recomendado para agregar:
- Unit: Jest + React Testing Library
- E2E: Playwright o Cypress
- Performance: Lighthouse CI

## 📈 Escalabilidad

El proyecto está diseñado para:
- ✅ Agregar más secciones
- ✅ Escalar a múltiples idiomas
- ✅ Agregar admin panel
- ✅ Integrar más servicios
- ✅ Migrar a Supabase si es necesario

---

**Última actualización**: Marzo 2026

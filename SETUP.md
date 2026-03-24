# Portfolio Sergio - Setup Guide

Guía completa de instalación, configuración y despliegue.

## Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Firebase
- Cuenta de GitHub
- Cuenta de Vercel (para deployment)

## 1. Instalación Local

### Clonar y configurar

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/portfolio-sergio.git
cd portfolio-sergio

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env.local
```

### Configurar Firebase

1. **Crear proyecto en Firebase Console**
   - Ir a [Firebase Console](https://console.firebase.google.com)
   - Crear nuevo proyecto
   - Habilitar authentication, Firestore y Storage

2. **Obtener credenciales**
   - Settings → Project Settings
   - Copiar credenciales y pegar en `.env.local`

3. **Configurar Firestore**
   - Crear colección `portfolio`
   - Crear subcolección personalizada con estructura recomendada

### Estructura base a crear en Firestore

```
portfolio/
├── profile/
│   └── personal/
│       ├── data (documento "data")
│       ├── experiences/ (colección)
│       ├── projects/ (colección)
│       └── contacts/ (colección para formularios)
```

## 2. Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev

# La app estará disponible en http://localhost:3000
```

Acceder a la app y verificar que todos los componentes carguen correctamente.

## 3. Configurar Datos en Firebase

### Crear Documento de Perfil

```javascript
// En Firestore: portfolio/profile/personal/data

{
  name: "Sergio Martínez",
  title: "Desarrollador de Videojuegos en Unity",
  description: "Apasionado por crear experiencias interactivas inmersivas...",
  email: "sergio@example.com",
  avatar: "gs://bucket/avatar.jpg",
  socialLinks: {
    github: "https://github.com/tu-usuario",
    linkedin: "https://linkedin.com/in/tu-usuario",
    twitter: "https://twitter.com/tu-usuario"
  }
}
```

### Agregar Experiencias

```javascript
// En Firestore: portfolio/profile/personal/experiences/{docId}

{
  title: "Desarrollador Senior Unity",
  company: "Tech Company",
  startDate: timestamp,
  endDate: timestamp,
  description: "Responsable de desarrollo...",
  technologies: ["Unity", "C#", "Multiplayer"],
  current: false,
  order: 1
}
```

### Agregar Proyectos

```javascript
// En Firestore: portfolio/profile/personal/projects/{docId}

{
  title: "Juego RPG Multijugador",
  shortDescription: "RPG con sistema de combate...",
  description: "Descripción completa...",
  technologies: ["Unity", "C#", "Photon"],
  images: ["gs://bucket/img1.jpg"],
  videos: [],
  liveUrl: "https://example.com",
  githubUrl: "https://github.com/...",
  featured: true,
  category: "Games",
  order: 1,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 4. Reglas de Seguridad Firebase

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lectura pública
    match /portfolio/{document=**} {
      allow read: if true;
      // Escritura solo para admin (puedes configurar después)
      allow write: if false;
    }
  }
}
```

### Storage Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /portfolio/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## 5. Desplegar en Vercel

### Conectar GitHub a Vercel

1. **Ir a [vercel.com](https://vercel.com)**
2. **Hacer login con GitHub**
3. **Seleccionar "Import Project"**
4. **Seleccionar repositorio `portfolio-sergio`**
5. **Configurar build settings:**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: `.next`

### Configurar Variables de Entorno

En Vercel → Settings → Environment Variables, agregar:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Desplegar

```bash
# Hacer push a main para deployar automáticamente
git add .
git commit -m "Deploy inicial"
git push origin main
```

## 6. Dominio Personalizado

### Agregar dominio en Vercel

1. **Vercel Dashboard → Settings → Domains**
2. **Agregar dominio**
3. **Configurar DNS según indicaciones**
4. **Esperar validación (puede tomar hasta 48h)**

## 7. Optimizaciones para Producción

### Mejorar Performance

```bash
npm run build
npm start
```

### Verificar Lighthouse

- Chrome DevTools → Lighthouse
- Verificar Core Web Vitals
- Optimizar imágenes si es necesario

## 8. Administración de Contenido

Para editar contenido sin rehacer la web:

1. **Ir a Firebase Console**
2. **Navegar a Firestore**
3. **Editar documentos directamente**
4. **Los cambios aparecerán inmediatamente**

### Subir Imágenes a Storage

1. **Firebase Console → Storage**
2. **Subir imagen**
3. **Copiar URL pública**
4. **Pegar en Firestore document**

## 9. Scripts Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Producción local
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 10. Troubleshooting

### La app no carga datos de Firebase

- Verificar credenciales en `.env.local`
- Verificar reglas de Firestore (debe permitir read)
- Revisar console para errores

### Las imágenes no se muestran

- Verificar que las URLs tengan formato válido
- Configurar CORS en Firebase Storage si es necesario
- Verificar que el bucket sea accesible

### Errores de build en Vercel

- Verificar Node.js version (debe ser 18+)
- Revisar logs en Vercel dashboard
- Asegurar que todas las vars de entorno estén configuradas

## 11. Monitoreo

### Analytics

- Vercel Analytics (automático)
- Firebase Analytics (opcional)
- SEO: Google Search Console

## 12. Mantenimiento Continuo

- Actualizar dependencias regularmente
- Hacer backups de Firestore
- Monitorear performance
- Revisar reportes de errores

---

**Documentación completa y soporte en:**
- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Vercel Docs](https://vercel.com/docs)

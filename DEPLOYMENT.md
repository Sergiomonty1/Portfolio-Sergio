# Guía de Deployment

## 1. Preparación Previa

### Verificar que todo funciona localmente

```bash
npm install
npm run dev
npm run type-check
npm run build
```

### Git Setup

```bash
git config --global user.email "tu@email.com"
git config --global user.name "Tu Nombre"
git add .
git commit -m "Initial commit"
git branch -M main
```

## 2. GitHub Setup

### 1. Crear repositorio en GitHub

- Ir a [github.com/new](https://github.com/new)
- Nombre: `portfolio-sergio`
- Descripción: "Portfolio profesional de Sergio - Desarrollador de videojuegos en Unity"
- Público
- **No** inicializar con README (ya lo tenemos)

### 2. Empujar código

```bash
git remote add origin https://github.com/tu-usuario/portfolio-sergio.git
git push -u origin main
```

## 3. Firebase Setup Completo

### Crear Proyecto Firebase

1. **Console Firebase**: [console.firebase.google.com](https://console.firebase.google.com)
2. **"Create Project"**
3. Nombre: `portfolio-sergio`
4. **Siguiente**
5. Google Analytics: OFF (por ahora)
6. **Create Project**

### Habilitar Servicios

#### Firestore Database
```
1. Build > Firestore Database
2. Create Database
3. Location: Spain (eur1)
4. Security Rules: Start in test mode
5. Create
```

#### Storage
```
1. Build > Storage
2. Get Started
3. Location: Europe
4. Done
```

#### Authentication (Opcional)
```
1. Build > Authentication
2. Get Started
3. (Configurar después si necesitas admin panel)
```

### Obtener Credenciales

```
Settings (engranaje) > Project Settings
```

Copiar valores bajo "SDK setup and configuration":

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "portfolio-sergio-xxxxx.firebaseapp.com",
  projectId: "portfolio-sergio-xxxxx",
  storageBucket: "portfolio-sergio-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc..."
}
```

### Pegar en `.env.local`

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=portfolio-sergio-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=portfolio-sergio-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=portfolio-sergio-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc...
```

### Configurar Firestore

#### Crear estructura de base de datos

En **Firestore Console**:

1. **New Collection**: `portfolio`
2. Dentro, **New Document**: `profile`
3. Dentro, **New Collection**: `personal`
4. Dentro de `personal`, **New Document**: `data`

```json
{
  "name": "Tu Nombre",
  "title": "Desarrollador de Videojuegos en Unity",
  "description": "Tu descripción profesional...",
  "email": "tu@email.com",
  "avatar": "",
  "socialLinks": {
    "github": "https://github.com/tu-usuario",
    "linkedin": "https://linkedin.com/in/tu-usuario",
    "twitter": "https://twitter.com/tu-usuario"
  }
}
```

5. Crear subcollections en `personal`:
   - `experiences`
   - `projects`
   - `contacts`

Agregar documentos de ejemplo.

### Security Rules

En **Firestore > Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

**Publish**

En **Storage > Rules**:

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

## 4. Vercel Setup

### Conectar GitHub a Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Autorizar Vercel
4. **Add New... > Project**
5. Importar `portfolio-sergio`

### Configurar Build

En Import Project:

- **Project Name**: portfolio-sergio
- **Framework**: Next.js
- **Root Directory**: ./
- **Build Command**: `npm run build`

### Environment Variables

Antes de desplegar, añadir variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=portfolio-sergio-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=portfolio-sergio-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=portfolio-sergio-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc...
```

### Desplegar

**Deploy** - Vercel tardará ~2-5 minutos

Una vez completado:
- URL de preview: `https://portfolio-sergio.vercel.app`
- Tu portfolio estará en vivo

## 5. Dominio Personalizado (Opcional)

### Agregar Dominio

1. **Vercel Dashboard > Domains**
2. **Add Domain**
3. Ingresa tu dominio (ej: `portfolio.ejemplo.com`)
4. Vercel mostrará registros DNS

### Configurar DNS

En tu registrador (GoDaddy, Namecheap, etc):

1. Accede a DNS settings
2. Reemplaza/agrega registros que Vercel indica
3. Espera 24-48h para propagación

## 6. Optimizaciones Post-Deploy

### Verificar

```bash
# Lighthouse Check
https://portfolio-sergio.vercel.app

# SEO
https://www.seobility.net/
```

### Monitorar

- **Vercel Analytics**: Automático
- **Errors**: Vercel dashboard
- **Performance**: Lighthouse

## 7. Workflow Futuro

Cada vez que hagas cambios:

```bash
# Local
npm run dev        # Prueba
npm run build      # Verifica build

# GitHub
git add .
git commit -m "Descripción de cambios"
git push origin main

# Vercel (automático)
# → Webhook dispara build
# → Deploy automático en 2-5 min
```

## 8. Mantenimiento Continuo

### Actualizar Contenido

1. **Cambios de código**: Git → Auto-deploy
2. **Cambios de datos**: Firestore Console → Instant

### Actualizar Dependencias

```bash
npm outdated
npm update
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Backups

Vercel guarda historial. Para respaldo manual:
```bash
git clone --mirror https://github.com/tu-usuario/portfolio-sergio.git
```

## 9. Troubleshooting

### "Build failed"

Verificar:
- Node.js version (debe ser 18+)
- `npm run build` funciona localmente
- Todas las variables de entorno configuradas

### "Cannot find module"

```bash
# Reinstalar
rm -rf node_modules package-lock.json
npm install
```

### "Firebase credentials error"

Verificar:
- `.env.local` tiene todas las keys
- Variables configuradas en Vercel
- Nombre exacto de variables

### Custom Domain no funciona

- Esperar 48h desde cambio DNS
- Verificar registros en https://mxtoolbox.com
- Limpiar cache del navegador

## 10. Checklists Finales

### Pre-deploy
- [ ] npm run dev - ✓
- [ ] npm run build - ✓
- [ ] npm run type-check - ✓
- [ ] Credenciales Firebase configuradas
- [ ] Datos básicos en Firestore
- [ ] Repositorio Git creado
- [ ] Código pusheado a main

### Post-deploy
- [ ] URL de Vercel accesible
- [ ] Firestore carga datos correctamente
- [ ] Lighthouse > 80
- [ ] Mobile responsive OK
- [ ] Formulario contacto funciona
- [ ] SEO metadata presente
- [ ] Analytics activado

---

**¡Tu portfolio está listo para el mundo! 🚀**

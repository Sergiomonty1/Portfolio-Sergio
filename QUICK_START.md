# Quick Start Guide - 5 Minutos

## ✅ Checklist Rápido

### 1. Clonar y preparar (2 min)

```bash
cd c:\ProyectoIA_Web\Portfolio-Sergio
npm install
cp .env.example .env.local
```

### 2. Configurar Firebase (2 min)

Copiar credenciales desde [Firebase Console](https://console.firebase.google.com) a `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=***
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=***
NEXT_PUBLIC_FIREBASE_PROJECT_ID=***
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=***
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=***
NEXT_PUBLIC_FIREBASE_APP_ID=***
```

### 3. Crear datos de prueba en Firestore (1 min)

En [Firebase Console > Firestore](https://console.firebase.google.com):

```
Crear colección: portfolio
└─ portfolio/ (colección)
   └─ profile/ (documento)
      └─ personal/ (colección)
         ├─ data/ (documento)
         ├─ experiences/ (colección com ejemplo)
         └─ projects/ (colección con ejemplo)
```

### 4. Correr localmente (1 min)

```bash
npm run dev
# Abre http://localhost:3000
```

---

## 📋 Pasos Siguientes

### Para Desarrollo Local
- [x] Estructura creada
- [x] Firebase configurado
- [ ] Datos de prueba en Firestore
- [ ] Probar en navegador

### Para Despliegue
- [ ] Crear repositorio en GitHub
- [ ] Conectar a Vercel
- [ ] Configurar dominio (opcional)
- [ ] Activar analytics

---

## 🔗 Enlaces Importantes

| Recurso | URL |
|---------|-----|
| **Firebase Console** | https://console.firebase.google.com |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **GitHub** | https://github.com/new |
| **Documentación** | Ver archivos en proyecto |

---

## 📚 Documentos Detallados

1. **README.md** - Visión general y características
2. **SETUP.md** - Guía de instalación completa
3. **DEPLOYMENT.md** - Despliegue en Vercel paso a paso
4. **ARCHITECTURE.md** - Arquitectura técnica detallada
5. **QUICK_START.md** - Este archivo

---

## 🎯 Objetivos Completados

✅ Estructura Next.js profesional  
✅ Componentes reutilizables  
✅ Integración Firebase completa  
✅ Diseño moderno y responsive  
✅ SEO optimizado  
✅ Listo para Vercel deployment  
✅ Documentación completa  
✅ API de contacto funcional  

---

**¿Preguntas? Revisa los documentos detallados o consulta:** [GitHub Docs](https://docs.github.com)

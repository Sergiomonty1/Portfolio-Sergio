# Guía: Agregar Contenido Personalizado

Cómo reemplazar datos de ejemplo con tus propios datos.

## 1. Actualizar Perfil Personal

### En Adobe Firestore Console:

**Path**: `portfolio → profile → personal → data`

Editar documento con tus datos:

```json
{
  "name": "Tu Nombre",
  "title": "Tu Rol Profesional",
  "description": "Tu descripción personal...",
  "email": "tu@email.com",
  "phone": "+34 XXX XXX XXX",
  "location": "Tu Ubicación",
  "avatar": "URL_de_tu_foto",
  "socialLinks": {
    "github": "https://github.com/tu-usuario",
    "linkedin": "https://linkedin.com/in/tu-usuario",
    "twitter": "https://twitter.com/tu-usuario",
    "email": "tu@email.com"
  }
}
```

### Cambios se reflejan instantáneamente en:
- ✓ Sección "Sobre Mí"  
- ✓ Información de contacto

---

## 2. Agregar tu Experiencia

### En Firestore:

**Path**: `portfolio → profile → personal → experiences`

1. **Add Document** → Auto ID
2. Llenar con tus datos:

```json
{
  "title": "Tu Puesto",
  "company": "Nombre de la Empresa",
  "startDate": "2023-01-15T00:00:00Z",
  "endDate": null,  // null si continúas
  "description": "Descripción de responibilidades...",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "current": true,
  "location": "Ubicación",
  "order": 1
}
```

### Notas:
- Fechas en formato ISO 8601
- `current: true` solo para puesto actual
- `order` determina visualización (menor = primero)
- Mayor orden = más atrás en timeline

---

## 3. Agregar tus Proyectos

### En Firestore:

**Path**: `portfolio → profile → personal → projects`

1. **Add Document** → Auto ID
2. Llenar datos del proyecto:

```json
{
  "title": "Nombre del Proyecto",
  "shortDescription": "Resumen corto (una línea)",
  "description": "Descripción completa detallada...",
  "technologies": ["Tech1", "Tech2"],
  "images": [
    "URL_imagen_1",
    "URL_imagen_2"
  ],
  "videos": ["URL_video"],
  "liveUrl": "https://ejemplo.com",
  "githubUrl": "https://github.com/...",
  "featured": true,  // Para mostrar en galería
  "category": "Games",  // o "Tools", "Prototypes", etc
  "order": 1,
  "createdAt": "2024-03-15T10:00:00Z",
  "updatedAt": "2024-03-20T15:30:00Z"
}
```

### Subir Imágenes/Videos:

1. **Firebase Console → Storage**
2. Crear carpeta `portfolio/projects/`
3. Subir archivos
4. Click derecho → Copy download URL
5. Pegar en array `images` o `videos` de Firestore

---

## 4. Formulario de Contacto

El formulario automáticamente:
- ✓ Valida emails
- ✓ Guarda mensajes en Firestore
- ✓ Sanitiza inputs

**Los mensajes se guardan en**: `portfolio → profile → personal → contacts`

---

## 5. Personalizar Estilos

### Cambiar Colores

Edit `tailwind.config.ts`:

```typescript
// Cambiar Primary (azul) a otro color
primary: {
  500: '#tu-color-aqui',
  // etc
}

// Cambiar Secondary (púrpura) a otro color
secondary: {
  600: '#tu-color-aqui',
  // etc
}
```

Luego: `npm run dev`

---

## 6. Cambiar Secciones

### Ocultar Secciones

En `app/page.tsx`, comentar secciones que no quieras:

```typescript
// export default function Home() {
//   return (
//     <>
//       <HeroSection />
//       <AboutSection />
//       {/* <ExperienceSection /> */}  // ← Comentada
//       <ProjectsSection />
//       <ContactSection />
//     </>
//   )
// }
```

---

## 7. Variables de Entorno Personalizadas

Edit `.env.local`:

```env
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
```

Cambiar otros valores después del deploy.

---

## 8. Verificar Cambios

```bash
npm run dev
```

Cambios en Firebase Firestore se reflejan automáticamente.

---

## ⚠️ Notas Importantes

- ✅ Siempre hacer backup de Firestore
- ✅ Probar en local antes de ir a producción
- ✅ Imágenes máximo 5MB recomendado
- ✅ Descripción máximo 1000 caracteres
- ✅ Mantener order números secuenciales

---

**¡Tu portfolio es completamente personalizable!** 🎨

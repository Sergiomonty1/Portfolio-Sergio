# Datos de Ejemplo para Firestore

Esta es una guía para crear datos de ejemplo en Firestore para pruebas.

## 📊 Estructura a Crear

### 1. Document: `portfolio/profile/personal/data`

```json
{
  "name": "Sergio Martínez",
  "title": "Desarrollador de Videojuegos | Unity",
  "description": "Apasionado por crear experiencias interactivas inmersivas. Especializado en Unity C# con 5+ años de experiencia en desarrollo full-stack, diseño de gameplay y arquitectura de sistemas multijugador. Mi objetivo es transformar ideas imaginativas en juegos cautivadores que dejan una marca duradera en los jugadores.",
  "email": "sergio.martinez@email.com",
  "phone": "+34 XXX XXX XXX",
  "location": "España",
  "avatar": "https://firebasestorage.googleapis.com/v0/b/portfolio-sergio.appspot.com/o/avatar.jpg",
  "socialLinks": {
    "github": "https://github.com/sergiodev",
    "linkedin": "https://linkedin.com/in/sergio-martinez",
    "twitter": "https://twitter.com/sergiodev",
    "email": "sergio.martinez@email.com"
  }
}
```

### 2. Collection: `portfolio/profile/personal/experiences`

#### Document: `exp-1`

```json
{
  "title": "Desarrollador Senior Unity",
  "company": "Tech Gaming Studio",
  "startDate": "2021-01-15T00:00:00Z",
  "endDate": null,
  "description": "Líder técnico en la arquitectura y desarrollo de juegos multijugador. Responsable del sistema de red, optimización de performance y mentoring de junior developers. Trabajé en título AAA con 500K+ descargas.",
  "technologies": ["Unity", "C#", "Photon PUN2", "Mirror", "Server Architecture", "Performance Optimization"],
  "current": true,
  "location": "Madrid, España",
  "order": 1
}
```

#### Document: `exp-2`

```json
{
  "title": "Desarrollador Full Stack",
  "company": "Digital Solutions Inc",
  "startDate": "2019-06-01T00:00:00Z",
  "endDate": "2020-12-31T00:00:00Z",
  "description": "Desarrollo de aplicaciones web y mobile con React/Node.js. Implementé sistemas de pago, auth y real-time features. Trabajé con equipos ágiles en metodología Scrum.",
  "technologies": ["React", "Node.js", "Firebase", "PostgreSQL", "REST API", "Webpack"],
  "current": false,
  "location": "Barcelona, España",
  "order": 2
}
```

#### Document: `exp-3`

```json
{
  "title": "Graduado en Ingeniería Informática",
  "company": "Universidad Autónoma de Madrid",
  "startDate": "2018-09-01T00:00:00Z",
  "endDate": "2022-06-30T00:00:00Z",
  "description": "Título en Ingeniería Informática con especialización en Sistemas y Game Development. Proyectos destacados en desarrollo de juegos, sistemas distribuidos y arquitectura de software.",
  "technologies": ["Computer Science", "Game Development", "Systems Design", "Algorithms", "C++", "Java"],
  "current": false,
  "location": "Madrid, España",
  "order": 3
}
```

### 3. Collection: `portfolio/profile/personal/projects`

#### Document: `proj-1`

```json
{
  "title": "Stellar Quest - MMO Sci-Fi",
  "shortDescription": "MMO sci-fi multiplayer con sistema de combate táctico y economía player-driven",
  "description": "Juego MMO de ciencia ficción desarrollado en Unity con arquitectura servidor dedicado. Implementé sistema de combate táctico en turnos, economía de juego basada en minería/crafting, y sistemas de clan/guild. Servidor construido con Node.js + WebSocket alcanzando 5000 jugadores simultáneos.",
  "technologies": ["Unity", "C#", "Node.js", "WebSocket", "MongoDB", "Photon", "UI Framework"],
  "images": [
    "https://firebasestorage.googleapis.com/v0/b/portfolio-sergio.appspot.com/o/projects%2Fstellar-1.jpg",
    "https://firebasestorage.googleapis.com/v0/b/portfolio-sergio.appspot.com/o/projects%2Fstellar-2.jpg"
  ],
  "videos": [
    "https://firebasestorage.googleapis.com/v0/b/portfolio-sergio.appspot.com/o/projects%2Fstellar-gameplay.mp4"
  ],
  "liveUrl": "https://play.google.com/store/apps/details?id=com.stellarquest.mmo",
  "githubUrl": "https://github.com/sergiodev/stellar-quest",
  "featured": true,
  "category": "Games",
  "order": 1,
  "createdAt": "2023-06-15T10:00:00Z",
  "updatedAt": "2024-01-20T14:30:00Z"
}
```

#### Document: `proj-2`

```json
{
  "title": "Neon Parkour VR",
  "shortDescription": "Experiencia parkour en realidad virtual con componentes físicas y ambientes procedurales",
  "description": "Juego VR inmersivo de parkour en entorno cyberpunk. Desarrollé completo el sistema de locomoción basado en teleportación y grab locomotion. Implementé generación procedural de niveles para replayability infinita. Publicado en Meta Quest 3.",
  "technologies": ["Unity", "C#", "OpenXR", "HLAPI", "Procedural Generation", "Physics", "Audio 3D"],
  "images": [
    "https://firebasestorage.googleapis.com/v0/b/portfolio-sergio.appspot.com/o/projects%2Fneon-1.jpg"
  ],
  "videos": [],
  "liveUrl": "https://www.meta.com/experiences/",
  "githubUrl": "",
  "featured": true,
  "category": "VR",
  "order": 2,
  "createdAt": "2023-09-10T09:00:00Z",
  "updatedAt": "2024-02-01T11:45:00Z"
}
```

#### Document: `proj-3`

```json
{
  "title": "DungeonMaster Editor Pro",
  "shortDescription": "Herramienta de nivel design para crear dungeons en tiempo real con sistema visual scripting",
  "description": "Editor especializado para nivel design enfocado en creación de dungeons. Incluye sistema visual scripting para enemigos y eventos, exportación a múltiples formatos, y plugin architecture. Utilizado por 500+ game developers indie.",
  "technologies": ["Unity", "C#", "Editor Tools", "Visual Scripting", "Plugin System", "WinForms"],
  "images": [],
  "videos": [
    "https://firebasestorage.googleapis.com/v0/b/portfolio-sergio.appspot.com/o/projects%2Fdungeon-master-demo.mp4"
  ],
  "liveUrl": "https://dungeon-master-editor.com",
  "githubUrl": "https://github.com/sergiodev/dungeon-master",
  "featured": false,
  "category": "Tools",
  "order": 3,
  "createdAt": "2023-03-20T08:00:00Z",
  "updatedAt": "2024-01-15T16:20:00Z"
}
```

#### Document: `proj-4`

```json
{
  "title": "Prototype: Combat System",
  "shortDescription": "Prototipo de sistema de combate souls-like con parry/riposteria de reacción",
  "description": "Mecánicas souls-like con énfasis en timing y reacción. Sistema de parry/ripostería con ventanas de tiempo precisas. 15K líneas de C# bien documentadas. Código Open Source para educación.",
  "technologies": ["Unity", "C#", "Gameplay Programming", "State Machine", "Animation Blending"],
  "images": [],
  "videos": [],
  "liveUrl": "",
  "githubUrl": "https://github.com/sergiodev/combat-system-prototype",
  "featured": false,
  "category": "Prototypes",
  "order": 4,
  "createdAt": "2023-11-01T10:00:00Z",
  "updatedAt": "2024-01-22T12:00:00Z"
}
```

---

## 📝 Cómo Agregar a Firestore

### Opción 1: Manual (UI Firestore Console)

1. Ir a [Firebase Console](https://console.firebase.google.com)
2. Seleccionar proyecto
3. Firestore → Crear documento
4. Copiar JSON arriba
5. Guardar

### Opción 2: Script Admin (Recomendado)

```bash
# Instalar Firebase Admin SDK
npm install -g firebase-cli

# Login
firebase login

# Inicializar (en carpeta del proyecto)
firebase init

# Importar datos
firebase firestore:delete portfolio --recursive
# Luego de configurar auth admin
```

### Opción 3: Importar desde Archivo

Firebase Console → Firestore → Importar Colección (en beta)

---

## 🖼️ Subir Imágenes a Storage

```bash
# Crear carpeta en Storage
storage.ref('portfolio/images/').child('imagen.jpg').put(file)
```

O manualmente:
1. Firebase Console → Storage
2. Crear carpeta `portfolio`
3. Upload archivos
4. Copiar URL pública
5. Pegar en Firestore

---

## ✅ Verificación

Una vez agregados los datos:

```bash
npm run dev
```

Visita http://localhost:3000 y verifica:
- ✓ Bio carga en About
- ✓ Timeline en Experience
- ✓ Tarjetas en Projects
- ✓ Formulario en Contact funciona

---

**Ahora tu portfolio tiene datos de ejemplo listos para mostrar!** 🎉

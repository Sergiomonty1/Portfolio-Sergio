'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiX, FiPlay, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Project {
  id: string
  title: string
  shortDescription: string
  description: string
  technologies: string[]
  image: string
  color: string
  liveUrl?: string
  githubUrl?: string
  playStoreUrl?: string
  gallery?: string[]
  videoUrl?: string
}

const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Tennis Master',
    shortDescription: '1K+ descargas · 4.9/5 estrellas en Google Play',
    description: 'Juego de tenis competitivo para móviles. Compite en partidos 1v1 online, desbloquea y mejora personajes únicos con estadísticas personalizables (Resistencia, Velocidad, Agilidad, Servicio). Colecciona entrenadores, accesorios, raquetas y bolsas para potenciar a tu jugador. Sistema de torneos con diferentes canchas, progresión con recompensas y modo carrera. Monetización con AdMob e IAPs, analíticas completas con Firebase y rendimiento optimizado para dispositivos de gama baja a alta.',
    technologies: ['Unity 3D', 'C#', 'Firebase', 'Google Play', 'AdMob', 'Analytics'],
    image: '/icons/IconTennisMaster.jpeg',
    color: 'border-t-accent',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.vivastudios.tennis.masters',
    gallery: ['/images/Tennis.jpeg', '/images/Tennis1.jpeg', '/images/Tennis2.jpeg', '/images/Tennis3.jpeg'],
  },
  {
    id: '2',
    title: 'Lost in Arcade',
    shortDescription: 'Aventura 3D con minijuegos arcade y sistema de medallas',
    description: 'Proyecto 3D donde el protagonista se ha quedado encerrado en una sala de recreativos. Para escapar, deberá jugar a las distintas máquinas arcade (Pong, Tetris, Comecocos y más), ganar medallas con sus puntuaciones y acumular las suficientes para comprar la llave en la tienda y poder salir. Incluye sistema de ranking online, múltiples minijuegos con mecánicas únicas, tienda con economía interna y un entorno 3D explorable lleno de detalles retro.',
    technologies: ['Unity 3D', 'C#', 'DOTween', 'Firebase', 'JSON'],
    image: '/icons/LostInArcadeIcon.png',
    color: 'border-t-blue-400',
    gallery: ['/images/LostInArcade.png', '/images/LostInArcade1.png', '/images/LostInArcade2.png', '/images/LostInArcade3.png', '/images/LostInArcade4.png', '/images/LostInArcade5.png', '/images/LostInArcade6.png', '/images/LostInArcade7.png', '/images/LostInArcade8.png', '/images/LostInArcade9.png'],
  },
  {
    id: '3',
    title: 'Project Aster',
    shortDescription: 'Plataformas 2D con combates contra bosses épicos',
    description: 'Juego de plataformas 2D pixel art ambientado en instalaciones futuristas. Controla a un pequeño robot que debe avanzar a través de niveles con trampas, plataformas móviles y obstáculos peligrosos, enfrentándose a diversos jefes finales con patrones de ataque únicos y barras de vida. Cada boss requiere una estrategia diferente para ser derrotado. El juego incluye sistema de vidas, coleccionables y múltiples zonas con estéticas diferenciadas.',
    technologies: ['Unity 3D', 'C#', 'Pixel Art', 'Behavior Trees', 'Git'],
    image: '/icons/ProjectAsterIcon.png',
    color: 'border-t-purple-400',
    gallery: ['/images/ProjectAster.png', '/images/ProjectAster1.png', '/images/ProjectAster2.png', '/images/ProjectAster3.png', '/images/ProjectAster4.png'],
  },
  {
    id: '4',
    title: 'Multiplayer FPS Shooter',
    shortDescription: 'Shooter multijugador en tiempo real con Photon',
    description: 'Shooter en tercera persona multijugador en tiempo real. El enfoque principal del proyecto es la programación de red: sincronización de estados, netcode, sistema de nombres de jugadores, barras de vida, armas con físicas y spawning. Desarrollado con Photon PUN2.  El arte es secundario, priorizando la arquitectura de red, la latencia mínima y la experiencia de juego fluida entre múltiples jugadores conectados simultáneamente.',
    technologies: ['Unity 3D', 'C#', 'Photon PUN2', 'Networking', 'REST API'],
    image: '/icons/MultiplayerIcon.png',
    color: 'border-t-red-400',
    gallery: ['/images/Multiplayer.png', '/images/Multiplayer1.png'],
  },
]

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => (
  <motion.div
    className={`group relative bg-surface-50 overflow-hidden cursor-pointer border-t-4 ${project.color}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    whileHover={{ y: -8 }}
    onClick={onClick}
    data-cursor="pointer"
  >
    {/* Project image */}
    <div className="aspect-[4/3] bg-surface-200 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-7xl font-black text-white/5">{project.title.charAt(0)}</span>
      </div>
      {project.image ? (
        <img
          src={project.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      ) : null}
      <motion.div 
        className="absolute inset-0 bg-accent/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
    
    {/* Content */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {project.shortDescription}
      </p>
    </div>
  </motion.div>
)

const GalleryViewer: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }, [images.length])

  const next = useCallback(() => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }, [images.length])

  return (
    <div className="mb-8">
      <h4 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Galería</h4>
      
      {/* Main image viewer */}
      <div className="relative bg-surface-200 rounded-sm overflow-hidden mb-3 group">
        <div className="aspect-video relative cursor-pointer" onClick={() => setFullscreen(true)}>
          <img
            src={images[currentIndex]}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiChevronRight size={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full text-xs text-gray-300">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-20 h-14 rounded-sm overflow-hidden border-2 transition-colors ${
                idx === currentIndex ? 'border-accent' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreen(false)}
          >
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white bg-black/50 rounded-full z-10"
            >
              <FiX size={20} />
            </button>
            <img
              src={images[currentIndex]}
              alt=""
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 text-white rounded-full"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 text-white rounded-full"
                >
                  <FiChevronRight size={24} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => (
  <motion.div
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {/* Backdrop */}
    <div 
      className="absolute inset-0 bg-black/90"
      onClick={onClose}
    />
    
    {/* Modal content */}
    <motion.div
      className="relative bg-surface-100 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-sm"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors bg-black/50 rounded-full"
        data-cursor="pointer"
      >
        <FiX size={20} />
      </button>

      {/* Header image area */}
      <div className={`h-48 sm:h-64 bg-surface-200 relative border-t-4 ${project.color} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[8rem] font-black text-white/5">{project.title.charAt(0)}</span>
        </div>
        {project.image ? (
          <img
            src={project.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="p-8 sm:p-12">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{project.title}</h2>
        
        <p className="text-gray-300 text-lg leading-relaxed mb-8">{project.description}</p>

        {/* Image Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <GalleryViewer images={project.gallery} />
        )}

        {/* Technologies */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Tecnologías</h4>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-4 py-2 bg-surface-200 text-gray-300 text-sm font-medium rounded-sm border border-gray-800">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {project.playStoreUrl && (
            <a
              href={project.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-accent text-black font-semibold text-sm tracking-wide hover:bg-accent-hover transition-colors"
              data-cursor="pointer"
            >
              <FiPlay size={16} />
              Jugar Ahora
            </a>
          )}
          {project.liveUrl && !project.playStoreUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-accent text-black font-semibold text-sm tracking-wide hover:bg-accent-hover transition-colors"
              data-cursor="pointer"
            >
              <FiExternalLink size={16} />
              Ver Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 font-semibold text-sm tracking-wide hover:border-white hover:text-white transition-colors"
              data-cursor="pointer"
            >
              <FiGithub size={16} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
)

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-32 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-24">
        {/* Section tag */}
        <motion.p
          className="tag-decoration mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {'<section>'}
        </motion.p>

        <motion.h2
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-accent mb-4 tracking-tight"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Mi Portfolio
        </motion.h2>

        <motion.p
          className="text-gray-400 text-lg max-w-2xl mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Una selección de proyectos recientes. Cada uno representa un reto técnico diferente y una oportunidad de aprendizaje. Haz clic para ver más detalles.
        </motion.p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {fallbackProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <motion.p
          className="tag-decoration mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {'</section>'}
        </motion.p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}

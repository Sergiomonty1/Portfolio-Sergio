'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiX, FiPlay } from 'react-icons/fi'

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
    description: 'Juego de tenis competitivo para móviles estilo Tennis Clash. Compite en partidos 1v1 en tiempo real, desbloquea y mejora personajes únicos con estadísticas personalizables (Resistencia, Velocidad, Agilidad, Servicio). Colecciona entrenadores, accesorios, raquetas y bolsas para potenciar a tu jugador. Sistema de torneos con diferentes canchas, progresión con recompensas, modo carrera y multijugador local. Monetización con AdMob e IAPs, analíticas completas con Firebase y rendimiento optimizado para dispositivos de gama baja a alta.',
    technologies: ['Unity 3D', 'C#', 'Firebase', 'Google Play', 'AdMob', 'Analytics'],
    image: '/projects/tennis-master.jpg',
    color: 'border-t-accent',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.vivastudios.tennis.masters',
  },
  {
    id: '2',
    title: 'Lost in Arcade',
    shortDescription: 'Juego arcade retro con mecánicas innovadoras',
    description: 'Juego arcade con estética retro y mecánicas de gameplay innovadoras. Desarrollo completo desde el concepto hasta la publicación, con sistema de puntuación, niveles procedurales y optimización para dispositivos móviles. Diseñado para sesiones rápidas y adictivas.',
    technologies: ['Unity 3D', 'C#', 'DOTween', 'Firebase', 'AdMob'],
    image: '/projects/lost-in-arcade.jpg',
    color: 'border-t-blue-400',
  },
  {
    id: '3',
    title: 'Project Aster',
    shortDescription: 'Proyecto de acción / aventura en desarrollo',
    description: 'Proyecto de acción y aventura en desarrollo con enfoque en narrativa interactiva y combate dinámico. Arquitectura modular con patrones de diseño escalables, sistema de IA para enemigos con árboles de comportamiento y gestión avanzada de estados. Gráficos estilizados y optimizados para múltiples plataformas.',
    technologies: ['Unity 3D', 'C#', 'Behavior Trees', 'JSON', 'Git'],
    image: '/projects/project-aster.jpg',
    color: 'border-t-purple-400',
  },
  {
    id: '4',
    title: 'Multiplayer FPS Shooter',
    shortDescription: 'Shooter multijugador en tiempo real con Photon',
    description: 'Shooter en primera persona con modo multijugador en tiempo real utilizando Photon PUN2. Implementación de netcode, sincronización de estados, sistema de matchmaking, armas con diferentes estadísticas y modos de juego. Optimización de red para minimizar latencia y ofrecer una experiencia fluida.',
    technologies: ['Unity 3D', 'C#', 'Photon PUN2', 'Firebase', 'REST API'],
    image: '/projects/fps-shooter.jpg',
    color: 'border-t-red-400',
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
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      ) : null}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-7xl font-black text-white/5">{project.title.charAt(0)}</span>
      </div>
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
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[8rem] font-black text-white/5">{project.title.charAt(0)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 sm:p-12">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{project.title}</h2>
        
        <p className="text-gray-300 text-lg leading-relaxed mb-8">{project.description}</p>

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

'use client'

import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Lead Game Developer & Co-Fundador',
    company: 'MakTub Games',
    location: 'La Algaba, Sevilla',
    period: 'Mar 2024 - Presente',
    description: 'Co-fundador y líder del desarrollo de videojuegos móviles en Unity 3D. Desarrollo de "Tennis Master" con más de 2.000 descargas orgánicas y 4.8/5 estrellas en Google Play. Arquitectura técnica escalable, IA adaptativa, integración de monetización (AdMob, IAPs), analíticas Firebase y optimización de rendimiento. Gestión del ciclo de vida completo: diseño, desarrollo, testing, publicación y análisis post-lanzamiento.',
    technologies: ['Unity 3D', 'C#', 'Firebase', 'Google Play', 'AdMob', 'Analytics', 'JSON'],
    color: 'border-l-accent',
    current: true,
  },
  {
    title: 'Programador de Videojuegos (Gameplay & IA)',
    company: 'Cero Try Games',
    location: '',
    period: 'Mar 2023 - Mar 2024',
    description: 'Desarrollo de gameplay y sistemas de inteligencia artificial para videojuegos. Implementación de mecánicas de juego, árboles de comportamiento para NPCs, máquinas de estado finitas y optimización de rendimiento. Colaboración en equipo con control de versiones y metodologías ágiles.',
    technologies: ['Unity', 'C#', 'Git', 'Jira', 'Photon', 'REST APIs'],
    color: 'border-l-blue-400',
    current: false,
  },
]

const education = [
  {
    title: 'Técnico Superior en Animaciones 3D, Juegos y Entornos Interactivos',
    institution: 'Obicex',
    location: 'La Algaba, Sevilla',
    period: 'Sep 2021 - Jun 2023',
    description: 'Formación integral en desarrollo de videojuegos, animación 3D, modelado y programación de entornos interactivos. Proyectos prácticos con Unity, Blender y herramientas de la industria.',
    color: 'border-l-yellow-400',
  },
]

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-32 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-24">
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
          Experiencia
        </motion.h2>

        <motion.p
          className="text-gray-400 text-lg max-w-2xl mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Mi trayectoria profesional en el desarrollo de videojuegos.
        </motion.p>

        {/* Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative pl-8 border-l-2 ${exp.color} py-2`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Dot */}
              <div className={`absolute -left-[9px] top-3 w-4 h-4 rounded-full ${
                exp.current ? 'bg-accent shadow-[0_0_12px_rgba(29,185,84,0.6)]' : 'bg-gray-700'
              }`} />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.title}</h3>
                  <p className="text-accent font-medium">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                </div>
                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                  <span className="text-sm text-gray-500 font-mono">{exp.period}</span>
                  {exp.current && (
                    <span className="text-xs px-3 py-1 bg-accent/20 text-accent font-semibold rounded-sm">
                      ACTUAL
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-4 max-w-3xl">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-3 py-1 border border-gray-800 text-gray-500 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.h3
          className="text-3xl sm:text-4xl font-black text-accent mt-20 mb-8 tracking-tight"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Formación
        </motion.h3>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className={`relative pl-8 border-l-2 ${edu.color} py-2`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="absolute -left-[9px] top-3 w-4 h-4 rounded-full bg-gray-700" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{edu.title}</h3>
                  <p className="text-accent font-medium">{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</p>
                </div>
                <span className="text-sm text-gray-500 font-mono mt-2 sm:mt-0">{edu.period}</span>
              </div>

              <p className="text-gray-400 leading-relaxed max-w-3xl">{edu.description}</p>
            </motion.div>
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
    </section>
  )
}

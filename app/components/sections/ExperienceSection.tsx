'use client'

import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Lead Game Developer',
    company: 'MakTub Games',
    period: '2023 - Presente',
    description: 'Lidero el desarrollo de videojuegos móviles en Unity 3D. Desarrollo de "Tennis Master" con más de 2.000 descargas orgánicas y 4.8/5 estrellas. Arquitectura técnica escalable, IA adaptativa y optimización de rendimiento.',
    technologies: ['Unity 3D', 'C#', 'Firebase', 'Google Play', 'AdMob'],
    color: 'border-l-accent',
    current: true,
  },
  {
    title: 'Game Developer',
    company: 'Viva Games Studio',
    period: '2022 - 2023',
    description: 'Desarrollo de prototipos de juegos móviles y colaboración en proyectos financiados. Implementación de sistemas de monetización, analíticas y SDKs de terceros.',
    technologies: ['Unity', 'C#', 'Photon', 'REST APIs'],
    color: 'border-l-blue-400',
    current: false,
  },
  {
    title: 'Junior Game Developer',
    company: 'Freelance',
    period: '2020 - 2022',
    description: 'Desarrollo independiente de prototipos y gamejams. Experimentación con mecánicas innovadoras, sistemas de IA para NPCs y optimización de rendimiento en dispositivos de gama baja.',
    technologies: ['Unity', 'C#', 'Blender', 'Git'],
    color: 'border-l-yellow-400',
    current: false,
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
                  <p className="text-accent font-medium">{exp.company}</p>
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

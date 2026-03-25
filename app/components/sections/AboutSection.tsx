'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const technologies = [
  { name: 'Unity', size: 'text-4xl', color: 'text-white' },
  { name: 'C#', size: 'text-3xl', color: 'text-accent' },
  { name: 'Visual Studio', size: 'text-xl', color: 'text-blue-400' },
  { name: 'Firebase', size: 'text-2xl', color: 'text-yellow-400' },
  { name: 'Git', size: 'text-lg', color: 'text-red-400' },
  { name: 'Photon', size: 'text-2xl', color: 'text-blue-300' },
  { name: 'Android', size: 'text-xl', color: 'text-green-400' },
  { name: 'iOS', size: 'text-lg', color: 'text-gray-300' },
  { name: 'JSON', size: 'text-2xl', color: 'text-yellow-300' },
  { name: 'REST API', size: 'text-lg', color: 'text-purple-400' },
  { name: 'Blender', size: 'text-xl', color: 'text-orange-400' },
  { name: 'Shader Graph', size: 'text-lg', color: 'text-pink-400' },
  { name: 'DOTween', size: 'text-xl', color: 'text-green-300' },
  { name: 'Addressables', size: 'text-lg', color: 'text-cyan-400' },
  { name: 'SDK', size: 'text-2xl', color: 'text-red-300' },
  { name: 'Analytics', size: 'text-lg', color: 'text-blue-400' },
  { name: 'SOLID', size: 'text-xl', color: 'text-accent' },
  { name: 'MVC', size: 'text-lg', color: 'text-yellow-400' },
  { name: 'OOP', size: 'text-xl', color: 'text-white' },
  { name: 'AI', size: 'text-3xl', color: 'text-accent' },
]

const FloatingTech: React.FC<{ tech: typeof technologies[0]; index: number }> = ({ tech, index }) => {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const duration = 15 + Math.random() * 20
  const delay = Math.random() * 5

  return (
    <motion.span
      className={`absolute font-bold ${tech.size} ${tech.color} opacity-60 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap select-none`}
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
      }}
      animate={{
        x: [0, 30 * Math.sin(index), -20 * Math.cos(index), 0],
        y: [0, -20 * Math.cos(index), 30 * Math.sin(index), 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      whileHover={{ scale: 1.2, opacity: 1 }}
      data-cursor="pointer"
    >
      {tech.name}
    </motion.span>
  )
}

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-32 lg:py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-24">
        {/* Section tag */}
        <motion.p
          className="tag-decoration mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {'<h2>'}
        </motion.p>
        
        <motion.h2
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-accent mb-2 tracking-tight"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Sobre Mí
        </motion.h2>

        <motion.p
          className="tag-decoration mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {'</h2>'}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="tag-decoration mb-2">{'<p>'}</p>
            
            <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
              <p>
                Desarrollador de Videojuegos Mobile especializado en <span className="text-accent font-semibold">Unity 3D</span> y <span className="text-accent font-semibold">C#</span>. Lidero el ciclo de vida completo de desarrollo, desde la arquitectura técnica hasta la publicación y análisis de datos post-lanzamiento.
              </p>
              
              <p>
                Actualmente soy <span className="text-white font-semibold">Lead Game Developer en MakTub Games</span>, donde he desarrollado {'"'}Tennis Master{'"'} — un juego con más de <span className="text-accent font-semibold">2.000 descargas orgánicas</span> y <span className="text-accent font-semibold">4.8/5 estrellas</span> en Google Play, respaldado por Viva Games Studio.
              </p>
              
              <p>
                Mi enfoque técnico se centra en arquitectura de gameplay escalable, programación de IA adaptativa, optimización de rendimiento para dispositivos móviles e integración de SDKs y analíticas.
              </p>

              <p>
                Busco siempre resolver problemas técnicos complejos mediante código eficiente. Abierto a conectar con otros profesionales del sector y explorar nuevos retos.
              </p>
            </div>

            <p className="tag-decoration mt-2">{'</p>'}</p>
          </motion.div>

          {/* Right: Floating tech cloud */}
          <motion.div
            className="relative h-[500px] lg:h-[600px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {technologies.map((tech, index) => (
              <FloatingTech key={tech.name} tech={tech} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui'

export const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <motion.div
        className="text-center max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-primary-400 font-mono text-sm mb-4 tracking-widest uppercase">
            👋 Bienvenido a mi Portfolio
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="grad-text">Sergio Martínez</span>
            <br />
            <span className="text-gray-300">Desarrollador de Videojuegos</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Especializado en crear experiencias interactivas inmersivas en Unity. Con años de 
          experiencia en desarrollo full-stack, diseño de gameplay y arquitectura de juegos multiplayer.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-6 md:gap-12 mb-12 max-w-2xl mx-auto"
        >
          {[
            { number: '5+', label: 'Años de Experiencia' },
            { number: '20+', label: 'Proyectos Completados' },
            { number: '100K+', label: 'Descargas Totales' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold grad-text mb-2">{stat.number}</p>
              <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
            📥 Ver Mis Proyectos
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            💬 Contactarme
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-gray-400 text-sm">
            <p className="mb-2">Desplázate para explorar</p>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center mx-auto">
              <motion.div
                className="w-1 h-2 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

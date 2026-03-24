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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 -z-10">
        {/* Main Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        
        {/* Animated Orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute top-1/3 right-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;opacity=0.1')] bg-repeat" style={{backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px'}} />
      </div>

      <motion.div
        className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Intro Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div 
            className="inline-block px-6 py-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 rounded-full backdrop-blur-sm"
            whileHover={{ borderColor: '#00d9ff', scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <p className="text-primary-300 font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold">
              ✨ Bienvenido a Mi Portafolio Profesional
            </p>
          </motion.div>
        </motion.div>

        {/* Main Title with Gradient */}
        <motion.div variants={titleVariants} className="mb-6">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-4 leading-tight tracking-tight">
            <motion.span 
              className="inline-block bg-gradient-to-r from-primary-300 via-primary-200 to-secondary-300 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Sergio Martínez
            </motion.span>
            <br />
            <span className="text-2xl sm:text-4xl lg:text-5xl font-light text-gray-300 mt-4 block">
              Ingeniero de Videojuegos
            </span>
          </h1>
        </motion.div>

        {/* Divinder Line */}
        <motion.div 
          variants={itemVariants}
          className="h-1 w-20 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto mb-8"
        />

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Especializado en <span className="font-semibold text-primary-300">experiencias interactivas inmersivas</span> utilizando Unity y C#. 
          <br className="hidden sm:block" />
          Arquitecto de sistemas, diseñador de gameplay y desarrollador full-stack con experiencia en proyectos multijugador a gran escala.
        </motion.p>

        {/* Advanced Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {[
            { icon: '⚡', number: '7+', label: 'Años de Trayectoria' },
            { icon: '🎮', number: '25+', label: 'Proyectos Estelar' },
            { icon: '📊', number: '150K+', label: 'Descargas Globales' },
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              className="p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 backdrop-blur-sm group hover:border-primary-500/50 transition-all"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 217, 255, 0.1)' }}
            >
              <p className="text-4xl mb-2">{stat.icon}</p>
              <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-gray-400 text-sm sm:text-base font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all"
          >
            🚀 Ver Proyectos
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-xl border-2 border-primary-500 text-primary-300 font-bold text-lg hover:bg-primary-500/10 transition-all"
          >
            📧 Contactar
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="text-gray-400">
            <p className="text-sm mb-3 font-medium">Desplázate para descubrir más</p>
            <div className="w-8 h-12 border-2 border-gray-500 rounded-full flex justify-center mx-auto p-2">
              <motion.div
                className="w-1.5 h-2 bg-gradient-to-b from-primary-500 to-transparent rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

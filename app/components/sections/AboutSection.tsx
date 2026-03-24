'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionTitle, Container, Card, Badge } from '@/app/components/ui'
import { useProfile } from '@/lib/hooks'

export const AboutSection: React.FC = () => {
  const { profile, loading, error } = useProfile()

  const skills = [
    'Unity & C#',
    'Game Design',
    'Multiplayer Systems',
    'UI/UX Design',
    'Server Architecture',
    'Performance Optimization',
    'Procedural Generation',
    'VR Development',
    'Mobile Games',
    'Unreal Engine',
    'Photon Networking',
    'AWS & Firebase',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="about" className="py-20 md:py-40 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div 
          className="absolute -top-40 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-40 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <Container animate>
        <SectionTitle
          title="Sobre Mí"
          subtitle="Desarrollador especializado en crear experiencias interactivas de clase mundial"
        />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Main Bio Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div 
              className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 backdrop-blur-sm"
              whileHover={{ borderColor: 'rgba(0, 217, 255, 0.5)', y: -5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="space-y-6">
                {loading ? (
                  <div className="space-y-4">
                    <div className="h-8 bg-dark-700/50 rounded w-2/3 animate-pulse" />
                    <div className="h-4 bg-dark-700/50 rounded w-1/3 animate-pulse mt-4" />
                    <div className="h-24 bg-dark-700/50 rounded animate-pulse" />
                  </div>
                ) : error ? (
                  <p className="text-yellow-400 font-medium">⚠️ Cargando información del perfil...</p>
                ) : (
                  <>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        {profile?.name || 'Sergio Martínez'}
                      </h3>
                      <p className="text-xl text-primary-300 font-semibold">
                        {profile?.title || 'Ingeniero de Videojuegos'}
                      </p>
                    </div>
                    <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-secondary-500" />
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {profile?.description ||
                        'Apasionado por la programación y el desarrollo de videojuegos. Especializado en Unity C# con experiencia en desarrollo full-stack. Mi objetivo es crear experiencias interactivas inmersivas que cautiven a los jugadores y dejen una marca duradera en la industria.'}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Statistics */}
          <motion.div variants={itemVariants} className="space-y-4">
            {[
              { icon: '⚡', number: '7+', label: 'Años de Trayectoria' },
              { icon: '🎮', number: '25+', label: 'Proyectos Estelar' },
              { icon: '📊', number: '150K+', label: 'Descargas Globales' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border border-primary-500/20 backdrop-blur-sm hover:border-primary-500/50 transition-all"
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <p className="text-3xl mb-2">{stat.icon}</p>
                <p className="text-3xl font-black bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-20"
        >
          <motion.div variants={itemVariants} className="mb-10">
            <h3 className="text-4xl sm:text-5xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                Habilidades Técnicas
              </span>
            </h3>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            variants={containerVariants}
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={skill} 
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group"
              >
                <div className="p-4 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-center hover:border-primary-500/50 transition-all backdrop-blur-sm">
                  <p className="text-sm sm:text-base font-semibold text-primary-300 group-hover:text-primary-200 transition-colors">
                    {skill}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
            </Card>
          </motion.div>
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Habilidades Técnicas</h3>
          <motion.div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.div key={skill} variants={itemVariants}>
                <Badge variant="primary">{skill}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

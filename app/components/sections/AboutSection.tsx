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
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-20 md:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <Container animate>
        <SectionTitle
          title="Sobre Mí"
          subtitle="Conoce más sobre mi experiencia y especialización"
          alignment="center"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* About Card */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card variant="glass" hover>
              <div className="space-y-4">
                {loading ? (
                  <div className="h-32 bg-dark-700/50 rounded animate-pulse" />
                ) : error ? (
                  <p className="text-red-400">Error cargando perfil: {error}</p>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white">
                      {profile?.name || 'Sergio Martínez'}
                    </h3>
                    <p className="text-primary-400 font-semibold">
                      {profile?.title || 'Desarrollador de Videojuegos en Unity'}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {profile?.description ||
                        'Apasionado por la programación y el desarrollo de videojuegos. Especializado en Unity C# con experiencia en desarrollo full-stack. Mi objetivo es crear experiencias interactivas inmersivas que cautiven a los jugadores y dejen una marca duradera.'}
                    </p>
                  </>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Card variant="gradient" hover>
              <div className="text-center">
                <p className="text-4xl font-bold grad-text mb-2">5+</p>
                <p className="text-sm text-gray-400">Años de Experiencia</p>
              </div>
            </Card>
            <Card variant="gradient" hover>
              <div className="text-center">
                <p className="text-4xl font-bold grad-text mb-2">20+</p>
                <p className="text-sm text-gray-400">Proyectos Completados</p>
              </div>
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

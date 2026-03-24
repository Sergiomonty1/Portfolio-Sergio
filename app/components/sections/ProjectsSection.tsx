'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionTitle, Container, Card, Badge } from '@/app/components/ui'
import { useFeaturedProjects } from '@/lib/hooks'
import Image from 'next/image'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

export const ProjectsSection: React.FC = () => {
  const { projects, loading, error } = useFeaturedProjects()
  const [selectedCategory, setSelectedCategory] = useState('all')

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const categories = ['all', ...new Set(projects.map((p) => p.category).filter((c): c is string => Boolean(c)))]

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <Container animate>
        <SectionTitle
          title="Proyectos Destacados"
          subtitle="Una selección de mis trabajos más relevantes"
          alignment="center"
        />

        {/* Category Filter */}
        {categories.length > 1 && (
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary-500 text-white shadow-lg-glow'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
              >
                {cat === 'all' ? 'Todos' : cat}
              </button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-dark-700/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-12">{error}</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No hay proyectos disponibles aún.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card variant="gradient" hover>
                  {/* Project Image */}
                  {project.images?.[0] && (
                    <div className="relative aspect-video mb-6 overflow-hidden rounded-lg -mx-6 -mt-6 mb-6">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" size="sm">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies && project.technologies.length > 4 && (
                      <Badge variant="outline" size="sm">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-dark-600">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary-500/20 text-primary-300 rounded-lg hover:bg-primary-500/30 transition-all flex-1"
                      >
                        <FiExternalLink size={16} />
                        <span className="text-sm font-medium">Ver Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-all flex-1"
                      >
                        <FiGithub size={16} />
                        <span className="text-sm font-medium">GitHub</span>
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  )
}

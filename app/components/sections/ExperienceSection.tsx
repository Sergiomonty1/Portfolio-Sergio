'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionTitle, Container, Card, Badge } from '@/app/components/ui'
import { useExperience } from '@/lib/hooks'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const ExperienceSection: React.FC = () => {
  const { experiences, loading, error } = useExperience()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  const formatDate = (date: any) => {
    if (!date) return ''
    const dateObj = date.toDate?.() || new Date(date)
    return format(dateObj, 'MMM yyyy', { locale: es })
  }

  return (
    <section id="experience" className="py-20 md:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <Container animate>
        <SectionTitle
          title="Experiencia"
          subtitle="Mi trayectoria profesional y formación"
          alignment="center"
        />

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 bg-dark-700/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-12">{error}</div>
        ) : experiences.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No hay experiencia configurada aún.</p>
          </div>
        ) : (
          <motion.div
            className="space-y-6 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {experiences.map((exp, index) => (
              <motion.div key={exp.id} variants={itemVariants}>
                <Card variant="glass" hover={false}>
                  <div className="flex gap-6">
                    {/* Timeline connector */}
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        exp.current
                          ? 'border-primary-500 bg-primary-500 shadow-lg-glow'
                          : 'border-gray-600 bg-dark-800'
                      }`} />
                      {index < experiences.length - 1 && (
                        <div className="w-0.5 h-32 bg-gradient-to-b from-gray-600 to-transparent mt-2" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                          <p className="text-primary-400 font-semibold">{exp.company}</p>
                        </div>
                        {exp.current && (
                          <Badge variant="primary">Actual</Badge>
                        )}
                      </div>

                      <p className="text-sm text-gray-400 mb-3">
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Presente'}
                      </p>

                      <p className="text-gray-300 mb-4">{exp.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies?.map((tech) => (
                          <Badge key={tech} variant="outline" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
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

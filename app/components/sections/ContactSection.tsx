'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend, FiLinkedin, FiGithub } from 'react-icons/fi'

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormState({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-32 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-24">
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
          Contacto
        </motion.h2>

        <motion.p
          className="tag-decoration mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {'</h2>'}
        </motion.p>

        <motion.p
          className="text-gray-400 text-lg max-w-2xl mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Interesado en oportunidades freelance o colaboraciones.
          Si tienes algún proyecto o pregunta, no dudes en escribirme.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="tag-decoration mb-4">{'<form>'}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Nombre"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors font-light"
                />
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors font-light"
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleInputChange}
                required
                placeholder="Asunto"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors font-light"
              />
              <textarea
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Mensaje"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors resize-none font-light"
              />

              {submitStatus === 'success' && (
                <p className="text-accent font-medium">Mensaje enviado correctamente.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 font-medium">Error al enviar. Inténtalo de nuevo.</p>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 px-10 py-4 border border-accent text-accent text-sm font-medium tracking-[0.3em] uppercase hover:bg-accent hover:text-black transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="pointer"
              >
                <FiSend size={16} />
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </motion.button>
            </form>

            <p className="tag-decoration mt-4">{'</form>'}</p>
          </motion.div>

          {/* Right: Map + Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact info card */}
            <div className="p-6 bg-surface-50 border border-gray-800 rounded-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <FiMapPin className="text-accent" size={20} />
                  <div>
                    <p className="text-white font-semibold">Sevilla, España</p>
                    <p className="text-gray-500 text-sm">Disponible para trabajo remoto</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FiMail className="text-accent" size={20} />
                  <p className="text-gray-400">sergio.montilla@outlook.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <FiLinkedin className="text-accent" size={20} />
                  <a 
                    href="https://www.linkedin.com/in/sergio-montilla-moreno/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent transition-colors"
                    data-cursor="pointer"
                  >
                    LinkedIn
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <FiGithub className="text-accent" size={20} />
                  <a 
                    href="https://github.com/Sergiomonty1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent transition-colors"
                    data-cursor="pointer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Map - Seville, Spain */}
            <div className="relative h-[300px] sm:h-[350px] bg-surface-50 border border-gray-800 rounded-sm overflow-hidden">
              <iframe
                title="Ubicación - Sevilla, España"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-6.05%2C37.33%2C-5.85%2C37.43&layer=mapnik&marker=37.3891%2C-5.9845"
                className="w-full h-full border-0 grayscale invert opacity-80 contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {/* Map overlay pin label */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-3 rounded-sm border border-gray-800">
                <p className="text-white font-semibold text-sm">Sergio Montilla</p>
                <p className="text-gray-400 text-xs">Sevilla, España</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

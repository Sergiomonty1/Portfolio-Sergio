'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend, FiLinkedin, FiGithub, FiPhone } from 'react-icons/fi'

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

      const data = await response.json()
      if (data.success) {
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

  const inputClasses = "w-full px-0 py-3 bg-transparent border-b border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-[#1db954] transition-colors font-light appearance-none autofill:bg-transparent"

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
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#1db954] mb-2 tracking-tight"
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
                  autoComplete="off"
                  className={inputClasses}
                />
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email"
                  autoComplete="off"
                  className={inputClasses}
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleInputChange}
                required
                placeholder="Asunto"
                autoComplete="off"
                className={inputClasses}
              />
              <textarea
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Mensaje"
                autoComplete="off"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-[#1db954] transition-colors resize-none font-light"
              />

              {submitStatus === 'success' && (
                <motion.p 
                  className="text-[#1db954] font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Mensaje enviado correctamente. Te contactaré pronto.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p 
                  className="text-red-400 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Error al enviar. Puedes escribirme directamente a sergiomonterocarmona1@gmail.com
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 px-10 py-4 border border-[#1db954] text-[#1db954] text-sm font-medium tracking-[0.3em] uppercase hover:bg-[#1db954] hover:text-black transition-all duration-300 disabled:opacity-50"
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
            <div className="p-6 bg-[#111] border border-gray-800">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <FiMapPin className="text-[#1db954] flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white font-semibold">La Algaba, Sevilla, España</p>
                    <p className="text-gray-500 text-sm">Disponible para trabajo remoto</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FiPhone className="text-[#1db954] flex-shrink-0" size={20} />
                  <p className="text-gray-400">655 35 04 43</p>
                </div>
                <div className="flex items-center gap-4">
                  <FiMail className="text-[#1db954] flex-shrink-0" size={20} />
                  <a href="mailto:sergiomonterocarmona1@gmail.com" className="text-gray-400 hover:text-[#1db954] transition-colors" data-cursor="pointer">
                    sergiomonterocarmona1@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <FiLinkedin className="text-[#1db954] flex-shrink-0" size={20} />
                  <a 
                    href="https://www.linkedin.com/in/sergiomonterocarmona/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#1db954] transition-colors"
                    data-cursor="pointer"
                  >
                    LinkedIn
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <FiGithub className="text-[#1db954] flex-shrink-0" size={20} />
                  <a 
                    href="https://github.com/Sergiomonty1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#1db954] transition-colors"
                    data-cursor="pointer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Map - Seville, Spain */}
            <div className="relative h-[300px] sm:h-[350px] bg-[#111] border border-gray-800 overflow-hidden">
              <iframe
                title="Ubicación - La Algaba, Sevilla"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-6.02%2C37.44%2C-5.93%2C37.48&layer=mapnik&marker=37.4616%2C-5.9788"
                className="w-full h-full border-0 grayscale invert opacity-80 contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-3 border border-gray-800">
                <p className="text-white font-semibold text-sm">Sergio Montero Carmona</p>
                <p className="text-gray-400 text-xs">La Algaba, Sevilla</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

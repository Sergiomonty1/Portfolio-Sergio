'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiLinkedin, FiGithub, FiYoutube } from 'react-icons/fi'

const navItems = [
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
]

const socialLinks = [
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/sergio-montilla-moreno/', label: 'LinkedIn' },
  { icon: FiGithub, href: 'https://github.com/Sergiomonty1', label: 'GitHub' },
]

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  return (
    <>
      {/* Left sidebar nav - desktop only */}
      <motion.nav
        className="fixed left-0 top-0 h-full z-50 hidden lg:flex flex-col items-center justify-center w-24"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className={`text-xs font-medium tracking-widest uppercase transition-colors duration-300 writing-vertical ${
                activeSection === item.href.replace('#', '')
                  ? 'text-accent'
                  : 'text-gray-500 hover:text-white'
              }`}
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              whileHover={{ x: 5 }}
              data-cursor="pointer"
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Bottom social links - desktop */}
      <motion.div
        className="fixed left-8 bottom-8 z-50 hidden lg:flex flex-col items-center gap-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        {socialLinks.map((social) => {
          const Icon = social.icon
          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-accent transition-colors duration-300"
              whileHover={{ y: -3 }}
              aria-label={social.label}
              data-cursor="pointer"
            >
              <Icon size={18} />
            </motion.a>
          )
        })}
        <div className="w-px h-16 bg-gray-700 mt-2" />
      </motion.div>

      {/* Mobile hamburger */}
      <MobileNav />
    </>
  )
}

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        className="fixed top-6 right-6 z-[60] w-10 h-10 flex flex-col justify-center items-center gap-1.5"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <motion.span
          className="block w-6 h-0.5 bg-white"
          animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
        />
        <motion.span
          className="block w-6 h-0.5 bg-white"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        />
        <motion.span
          className="block w-6 h-0.5 bg-white"
          animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-2xl font-bold text-white hover:text-accent transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

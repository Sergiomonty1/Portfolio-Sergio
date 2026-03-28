'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiLinkedin, FiGithub, FiYoutube } from 'react-icons/fi'

const navItems = [
  { label: 'Portfolio', href: '#projects' },
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Contacto', href: '#contact' },
]

const socialLinks = [
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/sergiomonterocarmona/', label: 'LinkedIn' },
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
      { threshold: 0.15, rootMargin: '-10% 0px -60% 0px' }
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
      { threshold: 0.15, rootMargin: '-10% 0px -60% 0px' }
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  return (
    <div className="lg:hidden">
      {/* Hamburger button */}
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

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/98 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col items-start gap-6 px-12">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-4 text-white hover:text-accent transition-colors"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, ease: 'easeOut' }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-accent/40 text-sm font-mono">0{idx + 1}.</span>
                  <span className="text-3xl font-bold">{item.label}</span>
                </motion.a>
              ))}
            </nav>

            {/* Social links in mobile menu */}
            <motion.div
              className="flex items-center gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent transition-colors p-2"
                    aria-label={social.label}
                  >
                    <Icon size={22} />
                  </a>
                )
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bottom pill nav */}
      <motion.div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-surface-300/80 backdrop-blur-xl border border-gray-800/60 rounded-full px-2 py-2 shadow-lg shadow-black/40"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.href.replace('#', '')
          return (
            <a
              key={item.href}
              href={item.href}
              className={`relative px-3.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase rounded-full transition-all duration-300 ${
                isActive
                  ? 'text-black bg-accent'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          )
        })}
      </motion.div>
    </div>
  )
}

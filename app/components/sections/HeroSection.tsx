'use client'

import React from 'react'
import { motion } from 'framer-motion'

const line1 = 'Hola,'
const line2 = "Soy Sergio,"
const line3 = 'game developer'

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const AnimatedLine: React.FC<{ text: string; startIndex: number; className?: string; accentChar?: { index: number; color: string } }> = ({ 
  text, startIndex, className = '', accentChar 
}) => (
  <span className={className}>
    {text.split('').map((char, i) => (
      <motion.span
        key={`${startIndex + i}-${char}`}
        custom={startIndex + i}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className={`inline-block ${char === ' ' ? 'w-[0.3em]' : ''} ${
          accentChar && i === accentChar.index ? accentChar.color : ''
        }`}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </span>
)

export const HeroSection: React.FC = () => {
  const totalChars1 = line1.length
  const totalChars2 = line2.length
  const subtitleDelay = (totalChars1 + totalChars2 + line3.length) * 0.04 + 0.5

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Large background letter */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.02] leading-none select-none pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        S
      </motion.div>

      <div className="relative z-10 px-8 sm:px-16 lg:px-24 xl:px-32 max-w-7xl w-full">
        {/* HTML tag decoration */}
        <motion.p
          className="tag-decoration mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {'<h1>'}
        </motion.p>

        {/* Main title */}
        <h1 className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight text-white">
          <AnimatedLine text={line1} startIndex={0} />
          <br />
          <AnimatedLine 
            text={line2} 
            startIndex={totalChars1} 
            accentChar={{ index: 4, color: 'text-accent' }}
          />
          <br />
          <AnimatedLine 
            text={line3} 
            startIndex={totalChars1 + totalChars2} 
          />
        </h1>

        {/* Closing tag */}
        <motion.p
          className="tag-decoration mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: subtitleDelay - 0.3 }}
        >
          {'</h1>'}
        </motion.p>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: subtitleDelay, duration: 0.8 }}
          className="mt-10"
        >
          <p className="tag-decoration mb-1">{'<p>'}</p>
          <p className="text-gray-400 text-lg sm:text-xl max-w-xl tracking-wide font-light">
            Desarrollador de Videojuegos Mobile / Unity 3D & C#
          </p>
          <p className="tag-decoration mt-1">{'</p>'}</p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: subtitleDelay + 0.3, duration: 0.8 }}
          className="mt-12"
        >
          <motion.a
            href="#contact"
            className="inline-block px-10 py-4 border border-accent text-accent text-sm font-medium tracking-[0.3em] uppercase hover:bg-accent hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor="pointer"
          >
            Contáctame
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

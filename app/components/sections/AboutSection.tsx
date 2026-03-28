'use client'

import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'

const technologies = [
  'Unity', 'Unity 3D', 'C#', 'Firebase', 'Play Store',
  'Jira', 'GitHub', 'Trello', 'JSON', 'Visual Studio',
  'Photon', 'Android', 'REST API', 'DOTween', 'Git',
  'Analytics', 'AdMob', 'SOLID', 'OOP', 'SDK',
]

// Spread tech words on a sphere for the 3D cloud
function computeSpherePositions(count: number) {
  const positions: { x: number; y: number; z: number }[] = []
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count)
    const theta = Math.sqrt(count * Math.PI) * phi
    positions.push({
      x: Math.cos(theta) * Math.sin(phi),
      y: Math.sin(theta) * Math.sin(phi),
      z: Math.cos(phi),
    })
  }
  return positions
}

const TechCloud: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animRef = useRef<number>(0)
  const rotRef = useRef({ x: 0, y: 0 })

  const spherePositions = useMemo(() => computeSpherePositions(technologies.length), [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 })
  }, [])

  // Slowly auto-rotate + respond to mouse
  useEffect(() => {
    let running = true
    const loop = () => {
      if (!running) return
      rotRef.current.x += 0.002 + mousePos.y * 0.01
      rotRef.current.y += 0.003 + mousePos.x * 0.01
      animRef.current = requestAnimationFrame(loop)

      const container = containerRef.current
      if (!container) return
      const items = container.querySelectorAll<HTMLSpanElement>('[data-sphere-idx]')
      const radius = 180
      const cosX = Math.cos(rotRef.current.x)
      const sinX = Math.sin(rotRef.current.x)
      const cosY = Math.cos(rotRef.current.y)
      const sinY = Math.sin(rotRef.current.y)

      items.forEach((el) => {
        const idx = Number(el.dataset.sphereIdx)
        const sp = spherePositions[idx]
        // Rotate around X then Y
        const y1 = sp.y * cosX - sp.z * sinX
        const z1 = sp.y * sinX + sp.z * cosX
        const x2 = sp.x * cosY - z1 * sinY
        const z2 = sp.x * sinY + z1 * cosY

        const scale = (z2 + 1.5) / 2.5 // 0.2 to 1.0
        const opacity = Math.max(0.15, (z2 + 1) / 2)
        el.style.transform = `translate(-50%, -50%) translate(${x2 * radius}px, ${y1 * radius}px) scale(${scale})`
        el.style.opacity = `${opacity}`
        el.style.zIndex = `${Math.round(z2 * 100)}`
      })
    }
    loop()
    return () => { running = false; cancelAnimationFrame(animRef.current) }
  }, [mousePos, spherePositions])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[350px] sm:h-[500px] lg:h-[600px] flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {technologies.map((tech, index) => (
        <span
          key={tech}
          data-sphere-idx={index}
          className="absolute text-[#1db954] font-bold whitespace-nowrap select-none transition-none"
          style={{
            fontSize: index < 5 ? '1.5rem' : index < 10 ? '1.2rem' : '1rem',
            willChange: 'transform, opacity',
          }}
        >
          {tech}
        </span>
      ))}
    </div>
  )
}

// ── Text Reveal with Blur ──
const RevealParagraph: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.p
    initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
    whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: delay + 0.3, ease: 'easeOut' }}
  >
    {children}
  </motion.p>
)

// ── Animated Number Counter ──
const StatCounter: React.FC<{ value: number; suffix?: string; label: string; decimals?: number }> = ({ 
  value, suffix = '', label, decimals = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(eased * value)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-2xl sm:text-3xl font-black text-accent">
        {decimals > 0 ? displayValue.toFixed(decimals) : Math.floor(displayValue)}
        {suffix}
      </div>
      <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{label}</div>
    </motion.div>
  )
}

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 lg:py-40 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="orb w-[400px] h-[400px] bg-accent/[0.04] -top-40 -right-40" style={{ animationDelay: '0s' }} />
      <div className="orb w-[300px] h-[300px] bg-blue-500/[0.03] bottom-20 -left-32" style={{ animationDelay: '-5s' }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-16 lg:px-24 relative z-10">
        {/* Section tag */}
        <motion.p
          className="tag-decoration mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {'<h2>'}
        </motion.p>
        
        <motion.h2
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-accent mb-2 tracking-tight"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Sobre Mí
        </motion.h2>

        <motion.p
          className="tag-decoration mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {'</h2>'}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="tag-decoration mb-2">{'<p>'}</p>
            
            <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
              <RevealParagraph delay={0}>
                Desarrollador de Videojuegos Mobile especializado en <span className="text-accent font-semibold">Unity 3D</span> y <span className="text-accent font-semibold">C#</span>. Lidero el ciclo de vida completo de desarrollo, desde la arquitectura técnica hasta la publicación y análisis de datos post-lanzamiento.
              </RevealParagraph>
              
              <RevealParagraph delay={0.15}>
                Actualmente soy <span className="text-white font-semibold">Lead Game Developer & Co-Fundador en MakTub Games</span>, donde he desarrollado {'"'}Tennis Masters: Spin Champs{'"'} — un juego con más de <span className="text-accent font-semibold">1K+ descargas</span> y <span className="text-accent font-semibold">4.9/5 estrellas</span> en Google Play, respaldado por Viva Games Studio.
              </RevealParagraph>
              
              <RevealParagraph delay={0.3}>
                Mi enfoque técnico se centra en arquitectura de gameplay escalable, programación de IA adaptativa, optimización de rendimiento para dispositivos móviles e integración de SDKs y analíticas.
              </RevealParagraph>

              <RevealParagraph delay={0.45}>
                Busco siempre resolver problemas técnicos complejos mediante código eficiente. Abierto a conectar con otros profesionales del sector y explorar nuevos retos.
              </RevealParagraph>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <StatCounter value={1000} suffix="+" label="Descargas" />
              <StatCounter value={4.9} decimals={1} suffix="/5" label="Estrellas" />
              <StatCounter value={3} suffix="+" label="Proyectos" />
            </div>

            <p className="tag-decoration mt-2">{'</p>'}</p>
          </motion.div>

          {/* Right: 3D tech sphere cloud */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <TechCloud />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

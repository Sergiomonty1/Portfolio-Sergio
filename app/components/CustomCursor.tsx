'use client'

import React, { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 100

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

// Color interpolation: tail cyan → head green
function lerpColor(t: number): { r: number; g: number; b: number } {
  // Cyan (0, 210, 255) → Green (29, 185, 84)
  return {
    r: Math.round(0 + t * 29),
    g: Math.round(210 + t * (185 - 210)),
    b: Math.round(255 + t * (84 - 255)),
  }
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<{ x: number; y: number }[]>([])
  const particles = useRef<Particle[]>([])
  const mousePos = useRef({ x: -200, y: -200 })
  const prevMousePos = useRef({ x: -200, y: -200 })
  const isMoving = useRef(false)
  const isTouchDevice = useRef(false)
  const moveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animFrame = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      isTouchDevice.current = true
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      prevMousePos.current = { ...mousePos.current }
      mousePos.current = { x: e.clientX, y: e.clientY }
      isMoving.current = true
      if (moveTimeout.current) clearTimeout(moveTimeout.current)
      moveTimeout.current = setTimeout(() => {
        isMoving.current = false
      }, 120)
    }

    const spawnParticles = (x: number, y: number, speed: number) => {
      const count = Math.min(Math.floor(speed / 8), 3)
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const vel = 0.3 + Math.random() * 1.2
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
          life: 1,
          maxLife: 30 + Math.random() * 30,
          size: 1 + Math.random() * 2,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      const mx = mousePos.current.x
      const my = mousePos.current.y

      // Add points while moving
      if (isMoving.current) {
        const last = points.current[points.current.length - 1]
        const dist = last ? Math.hypot(mx - last.x, my - last.y) : 999
        if (!last || dist > 1.5) {
          points.current.push({ x: mx, y: my })
          // Spawn particles based on speed
          if (dist > 5) {
            spawnParticles(mx, my, dist)
          }
        }
      }

      // Trim trail
      while (points.current.length > TRAIL_LENGTH) {
        points.current.shift()
      }

      // Fade out when stopped
      if (!isMoving.current && points.current.length > 0) {
        points.current.shift()
        if (points.current.length > 2) points.current.shift()
        if (points.current.length > 4) points.current.shift()
      }

      const pts = points.current

      // ── Draw glow layer (wider, blurred) ──
      if (pts.length >= 3) {
        ctx.save()
        ctx.filter = 'blur(6px)'
        for (let i = 2; i < pts.length; i++) {
          const t = i / pts.length
          const opacity = t * t * 0.35
          const width = t * 12

          const p0 = pts[i - 2]
          const p1 = pts[i - 1]
          const p2 = pts[i]
          const cpX = p1.x
          const cpY = p1.y
          const endX = (p1.x + p2.x) / 2
          const endY = (p1.y + p2.y) / 2

          const c = lerpColor(t)
          ctx.beginPath()
          ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2)
          ctx.quadraticCurveTo(cpX, cpY, endX, endY)
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`
          ctx.lineWidth = width
          ctx.lineCap = 'round'
          ctx.stroke()
        }
        ctx.restore()
      }

      // ── Draw main trail ──
      if (pts.length >= 3) {
        for (let i = 2; i < pts.length; i++) {
          const t = i / pts.length
          const opacity = t * t * 0.95
          const width = 1 + t * 4

          const p0 = pts[i - 2]
          const p1 = pts[i - 1]
          const p2 = pts[i]
          const cpX = p1.x
          const cpY = p1.y
          const endX = (p1.x + p2.x) / 2
          const endY = (p1.y + p2.y) / 2

          const c = lerpColor(t)
          ctx.beginPath()
          ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2)
          ctx.quadraticCurveTo(cpX, cpY, endX, endY)
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`
          ctx.lineWidth = width
          ctx.lineCap = 'round'
          ctx.stroke()
        }

        // Bright glowing head dot
        const head = pts[pts.length - 1]
        const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 8)
        grad.addColorStop(0, 'rgba(29, 185, 84, 0.9)')
        grad.addColorStop(0.5, 'rgba(29, 185, 84, 0.3)')
        grad.addColorStop(1, 'rgba(29, 185, 84, 0)')
        ctx.beginPath()
        ctx.arc(head.x, head.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Inner bright core
        ctx.beginPath()
        ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.fill()
      }

      // ── Draw & update particles ──
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.97
        p.vy *= 0.97
        p.life++

        const lifeRatio = 1 - p.life / p.maxLife
        if (lifeRatio <= 0) {
          particles.current.splice(i, 1)
          continue
        }

        const alpha = lifeRatio * 0.7
        const size = p.size * lifeRatio
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(29, 185, 84, ${alpha})`
        ctx.fill()
      }

      // Limit particle count
      if (particles.current.length > 150) {
        particles.current.splice(0, particles.current.length - 150)
      }

      animFrame.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animFrame.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrame.current)
      if (moveTimeout.current) clearTimeout(moveTimeout.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{ willChange: 'transform' }}
    />
  )
}

'use client'

import React, { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 80

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

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      isMoving.current = true
      if (moveTimeout.current) clearTimeout(moveTimeout.current)
      moveTimeout.current = setTimeout(() => {
        isMoving.current = false
      }, 120)
    }

    const spawnParticles = (x: number, y: number, speed: number) => {
      const count = Math.min(Math.floor(speed / 12), 2)
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const vel = 0.3 + Math.random() * 1
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
          life: 1,
          maxLife: 25 + Math.random() * 20,
          size: 1 + Math.random() * 1.5,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mousePos.current.x
      const my = mousePos.current.y

      // Add points while moving
      if (isMoving.current) {
        const last = points.current[points.current.length - 1]
        const dist = last ? Math.hypot(mx - last.x, my - last.y) : 999
        if (!last || dist > 2) {
          points.current.push({ x: mx, y: my })
          if (dist > 6) spawnParticles(mx, my, dist)
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
      if (pts.length < 3) {
        // Still update particles even if no trail
        updateParticles(ctx)
        animFrame.current = requestAnimationFrame(animate)
        return
      }

      // ── Draw glow layer (wider, no filter — just opacity) ──
      for (let i = 2; i < pts.length; i++) {
        const t = i / pts.length
        const opacity = t * t * 0.2
        const width = t * 14

        const p0 = pts[i - 2]
        const p1 = pts[i - 1]
        const p2 = pts[i]
        const endX = (p1.x + p2.x) / 2
        const endY = (p1.y + p2.y) / 2

        const c = lerpColor(t)
        ctx.beginPath()
        ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2)
        ctx.quadraticCurveTo(p1.x, p1.y, endX, endY)
        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`
        ctx.lineWidth = width
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      // ── Draw main trail ──
      for (let i = 2; i < pts.length; i++) {
        const t = i / pts.length
        const opacity = t * t * 0.9
        const width = 1 + t * 3.5

        const p0 = pts[i - 2]
        const p1 = pts[i - 1]
        const p2 = pts[i]
        const endX = (p1.x + p2.x) / 2
        const endY = (p1.y + p2.y) / 2

        const c = lerpColor(t)
        ctx.beginPath()
        ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2)
        ctx.quadraticCurveTo(p1.x, p1.y, endX, endY)
        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`
        ctx.lineWidth = width
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      // Head glow
      const head = pts[pts.length - 1]
      const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 7)
      grad.addColorStop(0, 'rgba(29, 185, 84, 0.85)')
      grad.addColorStop(0.5, 'rgba(29, 185, 84, 0.25)')
      grad.addColorStop(1, 'rgba(29, 185, 84, 0)')
      ctx.beginPath()
      ctx.arc(head.x, head.y, 7, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      // Bright core
      ctx.beginPath()
      ctx.arc(head.x, head.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
      ctx.fill()

      // ── Particles ──
      updateParticles(ctx)

      animFrame.current = requestAnimationFrame(animate)
    }

    const updateParticles = (c: CanvasRenderingContext2D) => {
      const arr = particles.current
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96
        p.life++

        const lifeRatio = 1 - p.life / p.maxLife
        if (lifeRatio <= 0) {
          arr.splice(i, 1)
          continue
        }

        c.beginPath()
        c.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2)
        c.fillStyle = `rgba(29, 185, 84, ${lifeRatio * 0.6})`
        c.fill()
      }
      // Cap particles
      if (arr.length > 80) arr.splice(0, arr.length - 80)
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
    />
  )
}

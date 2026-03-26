'use client'

import React, { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 80

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<{ x: number; y: number }[]>([])
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
      }, 150)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mousePos.current.x
      const my = mousePos.current.y

      // Add points while moving
      if (isMoving.current) {
        const last = points.current[points.current.length - 1]
        if (!last || Math.hypot(mx - last.x, my - last.y) > 1.5) {
          points.current.push({ x: mx, y: my })
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
      }

      const pts = points.current
      if (pts.length >= 3) {
        // Draw a single smooth path with gradient-like segments
        for (let i = 2; i < pts.length; i++) {
          const t = i / pts.length // 0 = tail, 1 = head
          const opacity = t * t * 0.9
          const width = t * 4

          const p0 = pts[i - 2]
          const p1 = pts[i - 1]
          const p2 = pts[i]
          const cpX = p1.x
          const cpY = p1.y
          const endX = (p1.x + p2.x) / 2
          const endY = (p1.y + p2.y) / 2

          ctx.beginPath()
          ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2)
          ctx.quadraticCurveTo(cpX, cpY, endX, endY)
          ctx.strokeStyle = `rgba(29, 185, 84, ${opacity})`
          ctx.lineWidth = width
          ctx.lineCap = 'round'
          ctx.stroke()
        }

        // Bright dot at the head
        const head = pts[pts.length - 1]
        ctx.beginPath()
        ctx.arc(head.x, head.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(29, 185, 84, 0.9)'
        ctx.fill()
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

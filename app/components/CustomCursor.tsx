'use client'

import React, { useEffect, useRef, useState } from 'react'

const TRAIL_LENGTH = 50
const LINE_COLOR = '#1db954'

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<{ x: number; y: number }[]>([])
  const mousePos = useRef({ x: -100, y: -100 })
  const isMoving = useRef(false)
  const moveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animFrame = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    setIsVisible(true)

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

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add new point at mouse position
      if (isMoving.current) {
        const last = points.current[points.current.length - 1]
        const mx = mousePos.current.x
        const my = mousePos.current.y
        // Only add point if moved enough distance (prevents clustering)
        if (!last || Math.hypot(mx - last.x, my - last.y) > 2) {
          points.current.push({ x: mx, y: my })
        }
      }

      // Keep trail to max length
      while (points.current.length > TRAIL_LENGTH) {
        points.current.shift()
      }

      const pts = points.current
      if (pts.length < 2) {
        animFrame.current = requestAnimationFrame(animate)
        return
      }

      // If not moving, gradually reduce trail
      if (!isMoving.current && pts.length > 0) {
        pts.shift()
      }

      // Draw smooth curve through points
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (let i = 1; i < pts.length; i++) {
        const progress = i / pts.length
        const opacity = progress * 0.8
        const width = progress * 3.5

        ctx.beginPath()
        ctx.strokeStyle = `rgba(29, 185, 84, ${opacity})`
        ctx.lineWidth = width

        if (i === 1) {
          ctx.moveTo(pts[0].x, pts[0].y)
          ctx.lineTo(pts[1].x, pts[1].y)
        } else {
          // Use quadratic curves for smoothness
          const prev = pts[i - 1]
          const curr = pts[i]
          const midX = (prev.x + curr.x) / 2
          const midY = (prev.y + curr.y) / 2
          ctx.moveTo((pts[i - 2].x + prev.x) / 2, (pts[i - 2].y + prev.y) / 2)
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY)
        }

        ctx.stroke()
      }

      animFrame.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    animFrame.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animFrame.current)
      if (moveTimeout.current) clearTimeout(moveTimeout.current)
    }
  }, [])

  if (!isVisible) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{ willChange: 'transform' }}
    />
  )
}

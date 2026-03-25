'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useMotionValue } from 'framer-motion'

const TRAIL_LENGTH = 20

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const prevPos = useRef({ x: -100, y: -100 })
  const isMoving = useRef(false)
  const moveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const trailRef = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  )
  const trailEls = useRef<(HTMLDivElement | null)[]>([])
  const animFrame = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      isMoving.current = true

      // Reset the "stop" timer on every move
      if (moveTimeout.current) clearTimeout(moveTimeout.current)
      moveTimeout.current = setTimeout(() => {
        isMoving.current = false
      }, 80)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const animateTrail = () => {
      const cx = cursorX.get()
      const cy = cursorY.get()
      const trail = trailRef.current

      // Leader always follows cursor
      trail[0] = { x: cx, y: cy }

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const prev = trail[i - 1]
        // Slower easing for a longer, smoother trail
        const ease = 0.25
        trail[i] = {
          x: trail[i].x + (prev.x - trail[i].x) * ease,
          y: trail[i].y + (prev.y - trail[i].y) * ease,
        }
      }

      // Calculate if actually moving (distance between cursor and last known stop)
      const dx = cx - prevPos.current.x
      const dy = cy - prevPos.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      trailEls.current.forEach((el, i) => {
        if (!el) return
        const p = trail[i]
        const progress = i / TRAIL_LENGTH

        // Only show trail when moving, fade based on speed
        const moveFactor = isMoving.current ? Math.min(1, speed / 8) : 0
        const size = Math.max(1, 10 * (1 - progress) * moveFactor)
        const opacity = 0.7 * (1 - progress) * moveFactor

        el.style.transform = `translate(${p.x - size / 2}px, ${p.y - size / 2}px)`
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.opacity = `${opacity}`
      })

      prevPos.current = { x: cx, y: cy }
      animFrame.current = requestAnimationFrame(animateTrail)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    animFrame.current = requestAnimationFrame(animateTrail)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animFrame.current)
      if (moveTimeout.current) clearTimeout(moveTimeout.current)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailEls.current[i] = el }}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-[#1db954]"
          style={{ willChange: 'transform, opacity', opacity: 0 }}
        />
      ))}
    </>
  )
}

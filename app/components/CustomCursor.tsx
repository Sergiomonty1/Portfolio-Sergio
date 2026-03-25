'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const TRAIL_LENGTH = 12

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
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
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]')
      setIsPointer(!!isClickable)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Animate the trail with requestAnimationFrame
    const animateTrail = () => {
      const cx = cursorX.get()
      const cy = cursorY.get()
      const trail = trailRef.current

      // Leader follows cursor
      trail[0] = { x: cx, y: cy }
      // Each subsequent point eases toward the one before it
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const prev = trail[i - 1]
        trail[i] = {
          x: trail[i].x + (prev.x - trail[i].x) * 0.35,
          y: trail[i].y + (prev.y - trail[i].y) * 0.35,
        }
      }

      // Apply positions to DOM
      trailEls.current.forEach((el, i) => {
        if (!el) return
        const p = trail[i]
        const progress = i / TRAIL_LENGTH
        const size = Math.max(2, 8 * (1 - progress))
        const opacity = 0.6 * (1 - progress)
        el.style.transform = `translate(${p.x - size / 2}px, ${p.y - size / 2}px)`
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.opacity = `${opacity}`
      })

      animFrame.current = requestAnimationFrame(animateTrail)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    animFrame.current = requestAnimationFrame(animateTrail)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animFrame.current)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor - arrow SVG */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <svg
          width={isPointer ? 28 : 20}
          height={isPointer ? 28 : 20}
          viewBox="0 0 24 24"
          fill="none"
          className="transition-all duration-150"
          style={{ marginLeft: '-2px', marginTop: '-2px' }}
        >
          <path
            d="M5 3L19 12L12 13L9 20L5 3Z"
            fill={isPointer ? '#1db954' : '#ffffff'}
            stroke={isPointer ? '#1db954' : '#ffffff'}
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailEls.current[i] = el }}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-[#1db954]"
          style={{ willChange: 'transform, opacity' }}
        />
      ))}
    </>
  )
}

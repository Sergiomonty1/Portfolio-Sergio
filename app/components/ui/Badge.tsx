'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md'
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
}) => {
  const variants = {
    primary: 'bg-primary-500/20 text-primary-300 border border-primary-500/50',
    secondary: 'bg-secondary-500/20 text-secondary-300 border border-secondary-500/50',
    outline: 'bg-transparent text-primary-400 border border-primary-500/50',
  }

  const sizes = {
    sm: 'px-2.5 py-1 text-xs font-medium',
    md: 'px-3.5 py-1.5 text-sm font-medium',
  }

  return (
    <motion.span
      className={`inline-block rounded-full ${variants[variant]} ${sizes[size]} transition-colors`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  )
}

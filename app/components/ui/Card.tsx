'use client'

import React from 'react'
import clsx from 'clsx'

interface CardProps {
  className?: string
  children: React.ReactNode
  variant?: 'default' | 'glass' | 'gradient'
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  variant = 'default',
  hover = true,
}) => {
  const baseStyles = 'rounded-xl p-6 transition-all duration-300'

  const variants = {
    default: 'bg-dark-800 border border-dark-700',
    glass: 'glass',
    gradient: 'bg-gradient-to-br from-dark-800 to-dark-700 border border-dark-600',
  }

  const hoverStyles = hover ? 'hover:border-primary-500/50 hover:shadow-lg-glow hover:scale-105' : ''

  return (
    <div className={clsx(baseStyles, variants[variant], hoverStyles, className)}>
      {children}
    </div>
  )
}

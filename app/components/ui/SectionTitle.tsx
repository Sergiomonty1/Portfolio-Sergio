'use client'

import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  alignment?: 'left' | 'center' | 'right'
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className,
  alignment = 'center',
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const alignmentItems = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  return (
    <motion.div 
      className={clsx('mb-16', alignmentClasses[alignment], className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-4">
        {alignment === 'center' && (
          <div className="h-1 w-12 bg-gradient-to-r from-transparent to-primary-500 hidden md:block" />
        )}
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-primary-300 via-primary-200 to-secondary-300 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        {alignment === 'center' && (
          <div className="h-1 w-12 bg-gradient-to-l from-transparent to-secondary-500 hidden md:block" />
        )}
      </div>
      
      {subtitle && (
        <motion.p 
          className="text-lg sm:text-xl text-gray-300 mt-6 max-w-3xl font-light leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

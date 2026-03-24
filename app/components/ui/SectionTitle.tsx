'use client'

import React from 'react'
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

  return (
    <div className={clsx('mb-12', alignmentClasses[alignment], className)}>
      <h2 className="text-4xl md:text-5xl font-bold mb-4 grad-text">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-400 ml-0">
          {subtitle}
        </p>
      )}
    </div>
  )
}

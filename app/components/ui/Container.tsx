'use client'

import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section'
  id?: string
  animate?: boolean
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as = 'div',
  id,
  animate = false,
}) => {
  const Component = as

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const content = (
    <div className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )

  if (animate) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        id={id}
      >
        {content}
      </motion.div>
    )
  }

  return <Component id={id}>{content}</Component>
}

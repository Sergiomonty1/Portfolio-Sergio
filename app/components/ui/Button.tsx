'use client'

import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    'font-semibold rounded-lg transition-all duration-300 ease-out focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-gradient-to-r from-primary-500 to-secondary-600 text-white hover:shadow-lg-glow hover:scale-105 active:scale-95',
    secondary:
      'bg-gradient-to-r from-secondary-600 to-pink-600 text-white hover:shadow-lg-glow hover:scale-105 active:scale-95',
    outline:
      'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 hover:border-primary-400',
    ghost: 'text-primary-400 hover:bg-white/5 hover:text-primary-300',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="inline-block animate-spin mr-2">⚙️</span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

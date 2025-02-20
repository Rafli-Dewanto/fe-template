import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'fluid'
  padding?: boolean
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', padding = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full',
          {
            'max-w-screen-sm': size === 'sm',
            'max-w-screen-md': size === 'md',
            'max-w-screen-lg': size === 'lg',
            'max-w-screen-xl': size === 'xl',
            'max-w-screen-2xl': size === '2xl',
            'px-4 md:px-6': padding,
          },
          className
        )}
        {...props}
      />
    )
  }
)

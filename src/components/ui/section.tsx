import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ spacing = 'lg', className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          {
            'py-4': spacing === 'sm',
            'py-8': spacing === 'md',
            'py-12': spacing === 'lg',
            'py-16': spacing === 'xl',
          },
          className
        )}
        {...props}
      />
    )
  }
)

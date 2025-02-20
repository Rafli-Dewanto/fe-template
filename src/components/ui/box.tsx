import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef, JSX } from 'react'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Component = 'div', className, ...props }, ref) => {
    const Comp = Component as any
    return <Comp ref={ref} className={cn(className)} {...props} />
  }
)

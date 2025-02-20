import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  inline?: boolean
  gap?: number | string
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  direction?: 'row' | 'column'
  wrap?: boolean
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      inline = false,
      gap,
      align,
      justify,
      direction = 'row',
      wrap = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          inline ? 'inline-flex' : 'flex',
          direction === 'column' && 'flex-col',
          wrap && 'flex-wrap',
          align && `items-${align}`,
          justify && `justify-${justify}`,
          gap && `gap-${gap}`,
          className
        )}
        {...props}
      />
    )
  }
)

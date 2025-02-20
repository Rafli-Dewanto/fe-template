import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | string
  gap?: number | string
  flow?: 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense'
  autoFit?: boolean
  minChildWidth?: string
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    { columns = 1, gap, flow, autoFit, minChildWidth, className, ...props },
    ref
  ) => {
    const gridTemplateColumns = autoFit
      ? `repeat(auto-fit, minmax(${minChildWidth || '240px'}, 1fr))`
      : typeof columns === 'number'
      ? `repeat(${columns}, minmax(0, 1fr))`
      : columns

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          gap && `gap-${gap}`,
          flow && `grid-flow-${flow}`,
          className
        )}
        style={{ gridTemplateColumns }}
        {...props}
      />
    )
  }
)

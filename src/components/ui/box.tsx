import { ElementType, forwardRef, HTMLAttributes, JSX } from "react";

import { cn } from "@/lib/utils";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Component = "div", className, ...props }, ref) => {
    const Comp = Component as ElementType;
    return <Comp ref={ref} className={cn(className)} {...props} />;
  }
);

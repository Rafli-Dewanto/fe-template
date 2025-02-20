import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  containerId?: string
}

export const Portal = ({ children, containerId = 'portal-root' }: PortalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    let container = document.getElementById(containerId)
    if (!container) {
      container = document.createElement('div')
      container.id = containerId
      document.body.appendChild(container)
    }
    return () => {
      if (container?.childNodes.length === 0) {
        container.remove()
      }
    }
  }, [containerId])

  if (!mounted) return null
  return createPortal(children, document.getElementById(containerId)!)
}

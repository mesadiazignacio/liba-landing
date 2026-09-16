import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  /** Sin efecto: se conserva para no tocar los puntos de uso. */
  strength?: number
}

/**
 * Contenedor de botón. Antes atraía el control hacia el puntero; ahora los
 * botones de la landing no se mueven, así que es un envoltorio estático.
 */
export function MagneticButton({ children, className }: Props) {
  return <div className={className}>{children}</div>
}

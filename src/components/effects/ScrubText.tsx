import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'

interface Props {
  children: string
  className?: string
  as?: 'p' | 'h2' | 'h3' | 'div' | 'span'
  /** Opacidad de una palabra que el scroll todavía no alcanzó. */
  from?: number
}

/**
 * Texto que se enciende palabra por palabra a medida que el visitante baja.
 *
 * No es una entrada: está ligado al scroll y se lee en las dos direcciones.
 * Cada palabra pasa de apagada a plena cuando su turno llega, y el turno es la
 * posición del bloque en la ventana — así el ritmo de lectura lo marca el
 * visitante, no un temporizador. Es el mismo gesto que la barra de progreso y
 * el riel de etapas: algo avanza, y se ve hasta dónde llegó.
 *
 * Con movimiento reducido las palabras se renderizan plenas y quietas.
 */
export function ScrubText({ children, className = '', as: Tag = 'p', from = 0.16 }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    // Empieza cuando el bloque entra por abajo y termina antes de que el
    // centro pase el tercio superior, así la última palabra se enciende
    // mientras todavía está en la zona de lectura.
    offset: ['start 88%', 'end 42%'],
  })

  const words = children.split(' ')

  if (reduced) {
    const El = Tag as React.ElementType
    return <El className={className}>{children}</El>
  }

  const El = Tag as React.ElementType

  return (
    <El ref={ref} className={className}>
      {/* El texto entero, una vez, para el lector de pantalla; las palabras
          animadas quedan ocultas para él. `aria-label` no vale en un párrafo. */}
      <span className="sr-only">{children}</span>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} index={i} total={words.length} from={from}>
          {word}
        </Word>
      ))}
    </El>
  )
}

function Word({
  children,
  progress,
  index,
  total,
  from,
}: {
  children: string
  progress: MotionValue<number>
  index: number
  total: number
  from: number
}) {
  // Cada palabra ocupa su tramo y se solapa un poco con la siguiente, para que
  // el frente de lectura sea una pendiente y no un interruptor.
  const start = index / total
  const end = Math.min(1, start + 1.6 / total)
  const opacity = useTransform(progress, [start, end], [from, 1])

  return (
    <span className="inline-block" aria-hidden>
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
      {index < total - 1 ? ' ' : ''}
    </span>
  )
}

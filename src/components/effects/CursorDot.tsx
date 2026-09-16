import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { DUR, EASE, SPRING } from '../../lib/motion'

/**
 * A ring that accompanies the pointer on fine-pointer devices.
 *
 * It never replaces the native cursor, so nothing can break if it lags or
 * fails to mount: it is a companion, blended with `difference` so it reads on
 * navy, coral and white alike. Over anything interactive it grows and fills;
 * while pressed it contracts.
 */

const INTERACTIVE = 'a, button, [role=button], input, textarea, select, summary, label'

const RING_SIZE = 28
const SCALE = { rest: 1, over: 1.8, pressed: 0.8 } as const
const FILL = { rest: 'rgba(255,255,255,0)', over: 'rgba(255,255,255,0.28)' } as const

/** Above the NoiseOverlay (z-[200]); nothing sits higher. */
const Z_INDEX = 300

export function CursorDot() {
  const reduced = useReducedMotionSafe()
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const apply = () => setFine(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  if (!fine || reduced) return null
  return <Ring />
}

function Ring() {
  const x = useMotionValue(-RING_SIZE)
  const y = useMotionValue(-RING_SIZE)
  const sx = useSpring(x, SPRING.follow)
  const sy = useSpring(y, SPRING.follow)

  const [visible, setVisible] = useState(false)
  const [over, setOver] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    // relatedTarget null: the pointer left the document, not just an element.
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget === null) setVisible(false)
    }
    const onLeave = () => setVisible(false)
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null
      setOver(!!target?.closest?.(INTERACTIVE))
    }
    const onPointerOut = (e: PointerEvent) => {
      if (e.relatedTarget === null) setOver(false)
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseout', onOut)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onPointerOut)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointercancel', onUp)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseout', onOut)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onPointerOut)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointercancel', onUp)
    }
  }, [x, y])

  const scale = pressed ? SCALE.pressed : over ? SCALE.over : SCALE.rest

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 pointer-events-none text-white"
      style={{ x: sx, y: sy, zIndex: Z_INDEX, mixBlendMode: 'difference' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: DUR.state, ease: EASE.out }}
    >
      {/* x/y -50% and scale compose into one transform, so the ring stays
          centred on the pointer at every size. */}
      <motion.div
        className="rounded-full border-[1.5px] border-current"
        style={{ width: RING_SIZE, height: RING_SIZE, x: '-50%', y: '-50%' }}
        animate={{ scale, backgroundColor: over ? FILL.over : FILL.rest }}
        transition={SPRING.press}
      />
    </motion.div>
  )
}

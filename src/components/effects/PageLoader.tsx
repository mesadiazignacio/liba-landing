import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogoMark } from '../ui/LogoMark'
import { DUR, EASE } from '../../lib/motion'
import { markIntroReady } from '../../hooks/useIntroReady'

/**
 * Piso de la portada. La disponibilidad medida — fuentes resueltas más dos
 * frames — se resuelve normalmente en menos de medio segundo, así que la marca
 * alcanzaba a girar un cuarto de vuelta y ya no estaba. Acá la portada deja de
 * ser sólo el tapado del swap de fuentes y pasa a ser un momento: la marca gira
 * el tiempo suficiente para leerse como marca.
 *
 * Se mide desde el montaje, no desde que las fuentes resuelven, así que una
 * carga lenta no suma este tiempo encima — lo absorbe.
 */
const MIN_HOLD_MS = 1600

/**
 * Techo. Su trabajo sigue siendo tapar el swap de fuentes — Gotham y Alverata
 * cargan las dos la marca y las dos llegan después del primer pintado — no ser
 * la espera. Si la disponibilidad no resolvió para acá, el visitante recibe la
 * página igual.
 */
const MAX_HOLD_MS = 2200

/** Shown once per session. A returning visitor has already met the logo. */
const SEEN_KEY = 'liba:intro-seen'

function shouldShow(): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return false
  } catch {
    // Private mode can throw on sessionStorage. Showing the cover is the safe
    // fallback — it is capped either way.
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function PageLoader() {
  const [visible, setVisible] = useState(shouldShow)

  useEffect(() => {
    if (!visible) {
      markIntroReady()
      return
    }

    const mountedAt = performance.now()
    let settled = false
    let floor: ReturnType<typeof setTimeout> | undefined

    const finish = () => {
      if (settled) return
      settled = true
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        // Non-fatal: the cover simply shows again on the next navigation.
      }
      setVisible(false)
    }

    /** Disponibilidad resuelta: sale ya, o cuando se cumpla el piso. */
    const release = () => {
      const remaining = MIN_HOLD_MS - (performance.now() - mountedAt)
      if (remaining <= 0) {
        finish()
        return
      }
      floor = setTimeout(finish, remaining)
    }

    const cap = setTimeout(finish, MAX_HOLD_MS)

    // Measured readiness rather than a guessed duration: webfonts resolved, then
    // two frames so a paint with the real faces has actually happened behind the
    // cover. This is the whole reason the cover exists.
    const fonts = document.fonts?.ready ?? Promise.resolve()
    void fonts.then(() => {
      requestAnimationFrame(() => requestAnimationFrame(release))
    })

    return () => {
      clearTimeout(cap)
      if (floor) clearTimeout(floor)
    }
  }, [visible])

  return (
    <AnimatePresence onExitComplete={markIntroReady}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.exit, ease: EASE.exit }}
        >
          {/* `spinning` fijo en true: acá el giro no es una respuesta a nada,
              es el estado de la portada mientras existe. */}
          <LogoMark spinning style={{ width: 104, height: 104 }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

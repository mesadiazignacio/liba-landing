import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogoSpinner } from './LogoSpinner'
import { DUR, EASE } from '../../lib/motion'
import { markIntroReady } from '../../hooks/useIntroReady'

/**
 * Hard ceiling on the cover. Its job is to hide the webfont swap — Gotham and
 * Alverata both carry the brand and both arrive after first paint — not to be
 * the wait. If readiness has not resolved by now, the visitor gets the page.
 */
const MAX_HOLD_MS = 600

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

    let settled = false
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

    const cap = setTimeout(finish, MAX_HOLD_MS)

    // Measured readiness rather than a guessed duration: webfonts resolved, then
    // two frames so a paint with the real faces has actually happened behind the
    // cover. This is the whole reason the cover exists.
    const fonts = document.fonts?.ready ?? Promise.resolve()
    void fonts.then(() => {
      requestAnimationFrame(() => requestAnimationFrame(finish))
    })

    return () => clearTimeout(cap)
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
          <LogoSpinner size={104} duration={2.4} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { useCallback, useContext } from 'react'
import { LenisContext } from '../components/effects/SmoothScroll'
import { useReducedMotionSafe } from './useReducedMotionSafe'

/**
 * Scrolls to an element by id, through Lenis when Lenis is driving the page.
 *
 * The in-page jumps used to call `scrollIntoView({ behavior: 'smooth' })` and the
 * Trámites CTA was a bare `href="#tramites"`. Both move the document behind
 * Lenis's back: its internal offset still holds the old position, so the next
 * wheel event snaps the page back to where the visitor was before they pressed
 * the button. `LenisContext` and a `useLenis` hook were both already here for
 * exactly this and nothing consumed either.
 *
 * `prefers-reduced-motion` gets an instant jump. Note that the CSS override for
 * `scroll-behavior` does not reach a JS-requested smooth scroll, so the
 * preference has to be honoured here explicitly.
 */
export function useScrollToId() {
  const lenis = useContext(LenisContext)
  const reduced = useReducedMotionSafe()

  return useCallback(
    (id: string) => {
      const target = document.getElementById(id)
      if (!target) return

      if (lenis) {
        lenis.scrollTo(target, { immediate: reduced })
        return
      }
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    },
    [lenis, reduced],
  )
}

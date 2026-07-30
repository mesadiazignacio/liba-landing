import { useEffect, useContext, useRef } from 'react'
import { LenisContext } from './SmoothScroll'

/**
 * Resets the scroll offset on navigation.
 *
 * Rendered inside App's route-keyed element, so mounting *is* the navigation and
 * a mount-only effect is the correct trigger. Keying off `pathname` instead would
 * fire while the outgoing page is still fading out, making the jump visible.
 */
export function ScrollToTop() {
  const lenis = useContext(LenisContext)
  // Lenis is created in an effect, so it can arrive a tick after this mounts.
  // Reading it through a ref keeps the reset to a single run: re-running when the
  // instance appears would yank a visitor who had already started scrolling.
  const lenisRef = useRef(lenis)
  lenisRef.current = lenis

  useEffect(() => {
    const instance = lenisRef.current
    if (instance) instance.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [])

  return null
}

import { useEffect, useRef } from 'react'

/**
 * Pauses a CSS animation while the element is offscreen or the tab is hidden.
 *
 * A nonessential loop that runs forever costs battery and compositor work for
 * something nobody is looking at. The testimonial marquee is a 30s translate over
 * twelve cards, and it used to run from first paint until the page closed,
 * regardless of whether it was on screen.
 *
 * Returns a ref to attach to the animated element.
 */
export function usePauseOffscreen<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let onScreen = true

    const apply = () => {
      el.style.animationPlayState = onScreen && !document.hidden ? 'running' : 'paused'
    }

    const onVisibilityChange = () => apply()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) onScreen = entry.isIntersecting
        apply()
      },
      // A little slack so the loop is already moving by the time it scrolls in.
      { rootMargin: '80px' },
    )
    observer.observe(el)
    document.addEventListener('visibilitychange', onVisibilityChange)
    apply()

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return ref
}

import { useState, useEffect, useRef } from 'react'

/**
 * Whether the bar has left the top of the page, and whether it should retract.
 *
 * The handler ran on every scroll event and read `window.scrollY` in each one. It
 * is coalesced onto a frame now, so a fast wheel or a trackpad fling does one
 * layout read per painted frame instead of one per event. `lastY` also seeds from
 * the real offset, because a reload partway down a page used to compare against 0
 * and retract the bar before the visitor had scrolled at all.
 */
export function useNavbarScroll() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(typeof window === 'undefined' ? 0 : window.scrollY)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 80)
      if (y > lastY.current && y > 200) setHidden(true)
      else if (y < lastY.current) setHidden(false)
      lastY.current = y
    }

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(measure)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return { scrolled, hidden }
}

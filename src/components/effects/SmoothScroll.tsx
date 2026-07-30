import { createContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'

export const LenisContext = createContext<Lenis | null>(null)

interface Props {
  children: ReactNode
}

export function SmoothScroll({ children }: Props) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    // Hijacking the wheel is the most disorienting effect on the site for
    // motion-sensitive visitors. Leave native scrolling alone for them.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    setLenis(instance)

    let raf: number
    function animate(time: number) {
      instance.raf(time)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}

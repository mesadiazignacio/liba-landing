import { useRef, useEffect } from 'react'

interface Props {
  color?: string
  size?: number
}

/**
 * An ambient coral glow that follows the pointer across a section.
 *
 * Three things were costing more than the effect is worth: the container's rect
 * was re-read on every mousemove, the gradient was rebuilt as a new `background`
 * string each time, and `transition-all` meant the browser also tried to
 * interpolate that gradient on every change. Now the rect is cached on enter, the
 * position moves through two custom properties, writes are coalesced onto a
 * frame, and only opacity transitions.
 *
 * The default is `coral` (#ed6d92). It previously used #e8577d, a superseded
 * value DESIGN.md rules out.
 */
export function CursorGlow({ color = 'rgba(237,109,146,0.09)', size = 400 }: Props) {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const container = glow.parentElement
    if (!container) return

    let bounds = container.getBoundingClientRect()
    let frame = 0
    let nextX = 0
    let nextY = 0

    const flush = () => {
      frame = 0
      glow.style.setProperty('--glow-x', `${nextX}px`)
      glow.style.setProperty('--glow-y', `${nextY}px`)
    }

    const onEnter = () => {
      bounds = container.getBoundingClientRect()
      glow.style.opacity = '1'
    }

    const onMove = (e: MouseEvent) => {
      nextX = e.clientX - bounds.left
      nextY = e.clientY - bounds.top
      if (frame === 0) frame = requestAnimationFrame(flush)
    }

    const onLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
      glow.style.opacity = '0'
    }

    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        opacity: 0,
        transition: 'opacity 300ms ease-out',
        background: `radial-gradient(${size}px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${color}, transparent 70%)`,
      }}
    />
  )
}

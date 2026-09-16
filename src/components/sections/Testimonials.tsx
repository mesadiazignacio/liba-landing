import { motion, useAnimationFrame, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BlurReveal } from '../effects/BlurReveal'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { testimonials, type Testimonial } from '../../data/testimonials'
import { SPRING } from '../../lib/motion'
import { BAND } from '../../lib/palette'
import { SHADOW } from '../../lib/shadows'
import { PaperGround } from '../ui/PaperGround'

/**
 * Velocidad del marquee en px/s. No es una duración de motion.ts: es una
 * velocidad de desplazamiento continuo.
 */
const ROW_SPEED = 40

/** Un frame no puede saltar más que esto (ms) al volver de una pestaña oculta. */
const MAX_FRAME_MS = 64

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {/* `star` is the system's rating colour; the unearned star is a navy tint,
          because this page has no true gray surfaces. */}
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-star' : 'text-navy/15'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 32" fill="currentColor" aria-hidden>
      <path d="M0 32V19.2C0 8.533 5.867 2.133 17.6 0l2.133 3.733C13.6 5.067 10.4 8.267 9.6 13.6H16V32H0zm22.4 0V19.2C22.4 8.533 28.267 2.133 40 0l2.133 3.733c-6.133 1.334-9.333 4.534-10.133 9.867H38.4V32H22.4z" />
    </svg>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <motion.div
      className="flex-shrink-0 w-[300px] sm:w-[340px] flex flex-col bg-white border border-navy/10 rounded-2xl p-5 shadow-card-navy relative overflow-hidden"
      initial={{ boxShadow: SHADOW.cardNavy }}
      whileHover={{ y: -4, boxShadow: SHADOW.cardHover }}
      transition={SPRING.press}
    >
      <QuoteIcon className="absolute top-3 right-3 w-8 h-8 text-coral/10" />
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {t.initials}
        </div>
        <div>
          <p className="font-semibold text-navy text-sm">{t.name}</p>
          <p className="text-navy/60 text-xs">{t.location}</p>
        </div>
      </div>
      <StarRating rating={t.rating} />
      <p className="text-navy/80 text-sm leading-relaxed mt-3">"{t.text}"</p>
    </motion.div>
  )
}

interface RowProps {
  items: Testimonial[]
  /** px/s */
  speed: number
  direction: 'left' | 'right'
  /** Whether the row should be moving at all (in view, motion allowed). */
  active: boolean
  /** Pointer over the marquee: the row eases to a stop instead of snapping. */
  hovered: boolean
  /** Con movimiento reducido la fila no anda: se desplaza a mano. */
  reduced: boolean
}

/**
 * Copias de la lista. Seis reseñas de 340px son ~2100px; hacen falta viewport +
 * una copia para que nunca asome un hueco, y tres copias cubren hasta 4200px.
 */
const COPIES = 3

function MarqueeRow({ items, speed, direction, active, hovered, reduced }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const half = useRef(0)
  const x = useMotionValue(0)
  // 1 = full speed, 0 = stopped. Sprung so the pause reads as braking.
  const factor = useSpring(1, SPRING.press)

  useEffect(() => {
    factor.set(hovered ? 0 : 1)
  }, [hovered, factor])

  // One copy of the list is the wrap point.
  useLayoutEffect(() => {
    const el = rowRef.current
    if (!el) return
    const measure = () => {
      half.current = el.scrollWidth / COPIES
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (!active) return
    const w = half.current
    if (!w) return
    const dir = direction === 'left' ? 1 : -1
    const step = (dir * speed * factor.get() * Math.min(delta, MAX_FRAME_MS)) / 1000
    // Keep x in (-w, 0]: both copies are identical, so the wrap is invisible.
    const next = x.get() - step
    x.set(-((((-next) % w) + w) % w))
  })

  const repeated = Array.from({ length: COPIES }, () => items).flat()

  return (
    <div className={reduced ? 'relative overflow-x-auto' : 'relative overflow-hidden'}>
      {/* The fades have to be the band's exact fill or the marquee appears to
          run over a seam, so they read it from the same place the band does. */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10"
        style={{ background: `linear-gradient(to right, ${BAND.cool}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10"
        style={{ background: `linear-gradient(to left, ${BAND.cool}, transparent)` }}
      />
      {/* py: room for the hover lift and its shadow inside overflow-hidden. */}
      <motion.div
        ref={rowRef}
        className="flex items-stretch gap-4 px-2 py-4"
        style={{ x, width: 'max-content' }}
      >
        {repeated.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  )
}

export function Testimonials() {
  const rowsRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rowsRef, { margin: '80px' })
  const reduced = useReducedMotionSafe()
  const [hovered, setHovered] = useState(false)
  const active = inView && !reduced

  return (
    /* Segunda banda navy a sangre del home, y la que menos lo necesitaba: son
       tarjetas blancas sobre el fondo, así que el azul saturado sólo servía para
       hacerlas destellar. Sobre `paper-cool` se levantan con la sombra navy que
       el sistema documenta para banda tintada, y las estrellas y la comilla
       coral recuperan su valor en vez de competir con el fondo. */
    <section id="clientes" className="relative isolate bg-paper-cool py-10 sm:py-12 overflow-hidden">
      <PaperGround />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-6 text-center">
        <BlurReveal>
          {/* `/80`: a 20px/600 no califica como texto grande para WCAG (pide 700),
              así que el piso sigue siendo 4.5 y `/70` medía 3.78 sobre `cool`. */}
          <p className="text-navy/80 text-xl font-semibold mb-2">Lo que dicen nuestros clientes</p>
        </BlurReveal>
        <BlurReveal delay={0.08} amount={0.3}>
          <h2 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-tight block font-alverata">
            Tu opinión realmente nos importa
          </h2>
        </BlurReveal>
      </div>

      {/* Full-bleed: the rows live outside the container on purpose. Pointer
          events stay on so hovering brakes the row. */}
      <BlurReveal>
        <div
          ref={rowsRef}
          className="relative z-10 select-none"
          aria-hidden
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <MarqueeRow items={testimonials} speed={ROW_SPEED} direction="left" active={active} hovered={hovered} reduced={reduced} />
        </div>
      </BlurReveal>

      {/* The marquee above is duplicated and non-interactive, so it stays
          aria-hidden. These are the same reviews, once each, for screen
          readers — real client evidence shouldn't be inaudible. */}
      <ul className="sr-only">
        {testimonials.map((t, i) => (
          <li key={i}>
            <blockquote>"{t.text}"</blockquote>
            <p>
              {t.name}, {t.location}. {t.rating} de 5 estrellas.
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

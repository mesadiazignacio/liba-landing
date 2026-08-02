/* An accordion of cards: one trámite is open at a time and the rest are closed.
 *
 * Two constraints shaped the adaptation of the reference. First, eight lines is
 * more than a single row of cards can hold and still leave a closed one legible,
 * so they run as two rows of four and share one open card between them — hovering
 * anywhere in the set closes whatever was open. Second, an open card has to be
 * worth opening: the reference fills its expanded card with a photograph, and
 * LIBA has exactly one real photograph and no per-trámite imagery, so the space
 * goes to what the trámite actually resolves. Seven of those sentences are
 * condensed from LIBA's own copy; the eighth is flagged in `data/services.ts`.
 *
 * The set rests on transferencia — it opens closed-state-free on load and returns
 * there when the pointer leaves, so the most requested trámite is what the
 * section shows when nobody is touching it. That is the whole ranking; it needs
 * no label and no larger type to say so.
 *
 * All eight cards pointed at the same `/services` route, so a per-card link would
 * have been eight copies of the section's own button. The card is a disclosure,
 * the button below is the navigation, and neither pretends to be the other.
 */

import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BlurReveal } from '../effects/BlurReveal'
import { MagneticButton } from '../effects/MagneticButton'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { DUR, EASE, SETTLE_DELAY, SPRING } from '../../lib/motion'
import { SHADOW } from '../../lib/shadows'
import { services, type Service } from '../../data/services'
import { PaperGround } from '../ui/PaperGround'

/* Four to a row: at this container width a fifth closed card cannot hold
   "Gestión de multas e infracciones" without breaking it across five lines. */
const ROWS = [services.slice(0, 4), services.slice(4)]

/** The card the section falls back to whenever nothing is being pointed at. */
const RESTING = 0

/** No card open — only reachable by clicking the open one shut. */
const CLOSED = -1

/* Simétrica, no exponencial. La curva de entrada del sistema mete el 97% del
   recorrido en los primeros 0.2s: sirve para algo que llega desde afuera, pero
   acá las dos tarjetas ya están en pantalla y sólo se reparten el ancho. No hay
   nada que aterrizar, hay dos posiciones conocidas entre las que moverse, que es
   literalmente para lo que `inOut` está declarada en los tokens. Arrancar suave
   además es lo que hace tolerable el barrido: con la exponencial, cada tarjeta
   salía disparada apenas el puntero la rozaba. */
const EASE_EXCHANGE = `cubic-bezier(${EASE.inOut.join(',')})`

/* The open/closed change is a CSS transition rather than framer's `animate`,
   because the same state has to be reachable by pointer and by keyboard and the
   width change is expressed in a flex ratio the layout owns. Durations and curve
   still come from the motion tokens — nothing here is hand-typed.

   Todo el cambio va sobre el mismo par duración/curva — el ancho, el fondo, el
   cuerpo de texto, el signo que rota — porque la tarjeta tiene que cambiar como
   una sola cosa. Un fondo que resuelve antes que el ancho es una tarjeta que se
   pinta y después se acomoda. */
function transitions(properties: string, reduced: boolean, delay = 0): CSSProperties {
  if (reduced) return {}
  return {
    transitionProperty: properties,
    transitionDuration: `${DUR.exchange}s`,
    transitionTimingFunction: EASE_EXCHANGE,
    transitionDelay: delay ? `${delay}s` : undefined,
  }
}

/** Rotates 45° into a close mark when its card opens. */
function PlusMark({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

interface CardProps {
  service: Service
  open: boolean
  onOpen: () => void
  /* The mark on an open card is a close mark, so it has to close. Pointer users
     rarely need it — moving away is enough — but on touch there is no "away",
     and a control that draws an × and then does nothing is the worst of both. */
  onClose: () => void
  reduced: boolean
}

function ServiceCard({ service, open, onOpen, onClose, reduced }: CardProps) {
  return (
    <div
      onMouseEnter={onOpen}
      /* `flex-grow` only exists at lg, where the row becomes a flex line; below
         that the cards are grid cells and the value is inert. `basis-0` keeps the
         ratio honest, so a long label cannot widen its own closed card. */
      className="lg:basis-0 lg:min-w-0"
      style={{ flexGrow: open ? 2.4 : 1, ...transitions('flex-grow', reduced) }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={open ? onClose : onOpen}
        onFocus={onOpen}
        className={`flex h-full w-full flex-col rounded-2xl p-4 text-left lg:p-5 ${
          open ? 'bg-navy shadow-card-navy' : 'bg-paper-cool'
        }`}
        style={transitions('background-color, box-shadow', reduced)}
      >
        <span
          className={`block font-bold leading-snug ${
            open ? 'text-white text-lg lg:text-xl' : 'text-navy text-base lg:text-[15px]'
          }`}
          style={transitions('color, font-size', reduced)}
        >
          {service.label}
        </span>

        {/* 0fr → 1fr gives the panel its real height without measuring it, so the
            copy is never clipped at a guessed pixel value or stretched mid-open. */}
        <span
          className="grid"
          style={{
            gridTemplateRows: open ? '1fr' : '0fr',
            ...transitions('grid-template-rows', reduced),
          }}
        >
          <span className="overflow-hidden">
            {/* The panel takes height first and the sentence settles a beat
                behind it — the site's documented disclosure behaviour. */}
            <span
              className="block pt-3 text-sm leading-relaxed text-white/80"
              style={{
                opacity: open ? 1 : 0,
                ...transitions('opacity', reduced, open ? SETTLE_DELAY : 0),
              }}
            >
              {service.summary}
            </span>
          </span>
        </span>

        <span className="mt-auto pt-4">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full ${
              open ? 'bg-coral-deep text-white' : 'border border-navy/30 text-navy/70'
            }`}
            style={transitions('background-color, border-color, color', reduced)}
          >
            {/* Rotates into a close mark, on the same token as the fill it turns
                over, so the glyph and its circle change as one thing. */}
            <PlusMark
              className="h-4 w-4"
              style={{
                transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                ...transitions('transform', reduced),
              }}
            />
          </span>
        </span>
      </button>
    </div>
  )
}

export function Services() {
  const reduced = useReducedMotionSafe()
  const [open, setOpen] = useState(RESTING)

  return (
    <section id="servicios" className="relative isolate bg-white px-4 sm:px-6 py-14 sm:py-20 overflow-hidden">
      <PaperGround />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* A masthead rather than a centered stack: the question on the left, the
            answer's scope on the right, both hanging off the line the cards start
            from. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 mb-10 sm:mb-14">
          <BlurReveal amount={0.3} className="md:col-span-6">
            {/* Interlínea con prefijo en cada escalón: las utilidades de tamaño
                de Tailwind traen la suya, así que `md:text-4xl` le ganaba a un
                `leading-[1.08]` sin prefijo y el display salía a 1.11. */}
            <h2 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-[1.08] sm:leading-[1.08] md:leading-[1.08] text-balance block font-alverata">
              ¿Qué gestión necesitás realizar?
            </h2>
          </BlurReveal>

          {/* Steps down from the heading in weight and value instead of matching
              it in bold navy, so the two stop competing for the same voice.

              El `-mt` es la misma corrección óptica que el panel de `WhyChoose`:
              las dos columnas arrancan en el mismo borde de caja, pero cada
              cuerpo reserva la mitad de su interlínea arriba de las mayúsculas y
              la del párrafo es mucho mayor, así que su tinta caía 10px por
              debajo de la del título. Antes había un `pt-1.5` acá que empujaba
              en la dirección contraria. Sólo en `md`: apilado, el párrafo va
              debajo del título y esto sería comerse el aire entre los dos. */}
          <BlurReveal delay={0.08} className="md:col-span-6 md:-mt-1">
            <p className="text-navy/80 text-[15px] sm:text-base font-medium leading-relaxed">
              La transferencia de autos y motos es el trámite más solicitado, pero no el único.
              Trabajamos con particulares, flotas corporativas, concesionarias/reventas
              y aseguradoras en toda la Argentina.
            </p>
          </BlurReveal>
        </div>

        {/* Leaving the set returns it to transferencia rather than freezing on
            whatever the pointer happened to cross on its way out. */}
        <div className="space-y-3 sm:space-y-4" onMouseLeave={() => setOpen(RESTING)}>
          {ROWS.map((row, r) => (
            <BlurReveal key={r} delay={r * 0.08}>
              {/* Tall enough for the longest summary at the open card's width,
                  and no taller — a fixed height is what keeps the row even, not
                  a place to park empty colour. */}
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:flex lg:h-56 lg:gap-4">
                {row.map((service, i) => {
                  const index = r * ROWS[0].length + i
                  return (
                    <ServiceCard
                      key={service.label}
                      service={service}
                      open={open === index}
                      onOpen={() => setOpen(index)}
                      onClose={() => setOpen(CLOSED)}
                      reduced={reduced}
                    />
                  )
                })}
              </div>
            </BlurReveal>
          ))}
        </div>

        <BlurReveal delay={0.16}>
          <div className="mt-8 sm:mt-10 sm:flex sm:justify-end">
            <MagneticButton strength={0.15} className="w-full sm:w-auto">
              {/* inline-block + the pill radius on the anchor itself: an inline
                  <a> wrapping an inline-flex span collapses to a 20px line box,
                  so the focus ring drew a thin bar across the middle of the
                  button instead of tracing it. */}
              <Link to="/services" className="block w-full rounded-full">
                <motion.span
                  className="flex w-full items-center justify-center gap-2 bg-navy text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full"
                  whileHover={{ scale: 1.03, boxShadow: SHADOW.navyBloom }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING.press}
                >
                  Ver todos los servicios
                </motion.span>
              </Link>
            </MagneticButton>
          </div>
        </BlurReveal>

      </div>
    </section>
  )
}

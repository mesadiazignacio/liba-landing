/* El índice de trámites.
 *
 * La versión anterior era un acordeón de tarjetas que se ensanchaban y
 * angostaban al pasar el puntero: ocho cajas del mismo tono repartiéndose un
 * ancho, con el texto saltando de tamaño en cada barrido. Leía como un widget,
 * no como una lista de lo que LIBA resuelve.
 *
 * Ahora es un índice: ocho filas a toda línea, una debajo de la otra, con el
 * nombre del trámite en el cuerpo más grande que la sección permite. La fila
 * activa se pinta de navy con un barrido desde la izquierda — la misma banda
 * de color que el sistema usa para afirmar algo — y a la derecha una placa
 * fija acompaña el scroll mostrando qué resuelve ese trámite y un botón para
 * consultarlo por WhatsApp con el trámite ya nombrado en el mensaje.
 *
 * Por debajo de `md` no hay columna fija: cada fila se abre en su lugar, como
 * un desplegable, con el mismo contenido y el mismo botón.
 *
 * El índice arranca en transferencia, el trámite más pedido, y no se resetea
 * cuando el puntero se va: la placa se queda en lo último que el visitante
 * miró, que es lo que está por leer.
 */

import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BlurReveal } from '../effects/BlurReveal'
import { MagneticButton } from '../effects/MagneticButton'
import { SpotlightCard } from '../effects/SpotlightCard'
import { StaggerChildren } from '../effects/StaggerChildren'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { PaperGround } from '../ui/PaperGround'
import { WaveTexture } from '../ui/WaveTexture'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { cardVariant } from '../../lib/animations'
import { DUR, EASE, SETTLE_DELAY, SPRING, staggerStep } from '../../lib/motion'
import { SHADOW } from '../../lib/shadows'
import { whatsappUrlFor } from '../../lib/constants'
import { COLOR } from '../../lib/palette'
import { services, type Service } from '../../data/services'

/** La fila que la sección muestra cuando nadie la tocó todavía. */
const RESTING = 0

/** Navy en canales, para las alfas que framer anima. Mismo valor que `COLOR.navy`. */
const NAVY_RGB = '8, 77, 155'

function ArrowMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** El botón que cierra cada panel: consultar ese trámite, ya nombrado. */
function ConsultLink({
  service,
  tone,
  linkRef,
}: {
  service: Service
  tone: 'light' | 'dark'
  linkRef?: React.RefObject<HTMLAnchorElement>
}) {
  const dark = tone === 'dark'
  return (
    <MagneticButton strength={0.15} className="inline-block">
      <motion.a
        ref={linkRef}
        href={whatsappUrlFor(service.label)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-bold ${
          dark ? 'bg-white text-navy' : 'bg-navy text-white'
        }`}
        whileHover={{ boxShadow: dark ? SHADOW.outlinedBloom : SHADOW.navyBloom }}
        transition={SPRING.press}
      >
        Consultar por WhatsApp
        <WhatsAppIcon className="h-[18px] w-[18px] flex-shrink-0" />
      </motion.a>
    </MagneticButton>
  )
}

interface RowProps {
  service: Service
  active: boolean
  open: boolean
  panelId: string
  /** Si la fila es un desplegable (bajo `md`) o un selector de la placa fija. */
  disclosure: boolean
  onActivate: () => void
  onToggle: () => void
  reduced: boolean
}

function ServiceRow({ service, active, open, panelId, disclosure, onActivate, onToggle, reduced }: RowProps) {
  const fillTransition = reduced
    ? { duration: 0 }
    : { duration: DUR.layout, ease: EASE.out }

  return (
    <motion.li variants={cardVariant} className="relative">
      {/* El barrido navy. Vive detrás del botón y se estira desde la izquierda
          en vez de aparecer: la fila no cambia de color, se pinta. Sobresale
          16px a cada lado del texto para que la fila activa lea como una placa
          y no como una línea resaltada. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-x-3 inset-y-0 rounded-2xl bg-navy origin-left sm:-inset-x-4"
        initial={false}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0.6 }}
        transition={fillTransition}
        style={{ boxShadow: active ? SHADOW.cardNavy : 'none' }}
      />

      {/* Bajo `md` el botón abre el panel de abajo y lo dice con ARIA. En
          `md`+ el panel no existe: el botón elige qué muestra la placa fija y
          lleva el foco a su enlace, así el teclado tiene el mismo camino que el
          puntero. */}
      <button
        type="button"
        aria-expanded={disclosure ? open : undefined}
        aria-controls={disclosure ? panelId : undefined}
        aria-pressed={disclosure ? undefined : active}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onToggle}
        className="relative z-10 flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
      >
        <motion.span
          className="block text-xl font-bold leading-tight sm:text-2xl"
          initial={false}
          animate={{ color: active ? COLOR.white : COLOR.navy, x: active ? 6 : 0 }}
          transition={fillTransition}
        >
          {service.label}
        </motion.span>

        <motion.span
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border"
          initial={false}
          animate={{
            backgroundColor: active ? COLOR.coralDeep : 'rgba(255,255,255,0)',
            borderColor: active ? COLOR.coralDeep : `rgba(${NAVY_RGB},0.3)`,
            color: active ? COLOR.white : `rgba(${NAVY_RGB},0.7)`,
            rotate: disclosure && open ? 90 : 0,
          }}
          transition={fillTransition}
        >
          <ArrowMark className="h-4 w-4" />
        </motion.span>
      </button>

      {/* El panel en línea, sólo por debajo de `md`. Toma alto primero y el
          texto se asienta un instante después, como todo desplegable del sitio. */}
      <div
        id={panelId}
        className="relative z-10 grid md:hidden"
        style={{
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: reduced ? undefined : `grid-template-rows ${DUR.layout}s cubic-bezier(${EASE.out.join(',')})`,
        }}
      >
        <div className="overflow-hidden">
          <div
            className={`pb-6 pt-1 ${active ? 'text-white/85' : 'text-navy/80'}`}
            style={{
              opacity: open ? 1 : 0,
              transition: reduced
                ? undefined
                : `opacity ${open ? DUR.layout : DUR.clear}s cubic-bezier(${EASE.out.join(',')}) ${open ? SETTLE_DELAY : 0}s`,
            }}
          >
            <p className="mb-4 text-[15px] leading-relaxed">{service.summary}</p>
            <ConsultLink service={service} tone={active ? 'dark' : 'light'} />
          </div>
        </div>
      </div>

      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-navy/10" />
    </motion.li>
  )
}

/** La placa fija de escritorio: qué resuelve el trámite activo. */
function ActivePlate({
  service,
  reduced,
  linkRef,
}: {
  service: Service
  reduced: boolean
  linkRef: React.RefObject<HTMLAnchorElement>
}) {
  return (
    <SpotlightCard
      className="rounded-2xl bg-navy text-white shadow-card-navy"
      spotlightColor="rgba(255,255,255,0.10)"
      spotlightSize={380}
    >
      <WaveTexture />
      <div className="relative flex min-h-[380px] flex-col p-8 lg:p-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={service.label}
            className="flex flex-1 flex-col"
            initial={reduced ? false : { opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: DUR.layout, ease: EASE.out },
            }}
            exit={{
              opacity: 0,
              y: -6,
              filter: 'blur(4px)',
              transition: { duration: DUR.exit, ease: EASE.exit },
            }}
          >
            <h3 className="font-alverata text-2xl font-black leading-[1.06] lg:text-3xl">
              {service.label}
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-white/85 lg:text-base">
              {service.summary}
            </p>
            <div className="mt-auto pt-8">
              <ConsultLink service={service} tone="dark" linkRef={linkRef} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SpotlightCard>
  )
}

export function Services() {
  const reduced = useReducedMotionSafe()
  const baseId = useId()
  const [active, setActive] = useState(RESTING)
  const [open, setOpen] = useState<number | null>(null)
  const disclosure = !useMediaQuery('(min-width: 768px)')
  const plateLink = useRef<HTMLAnchorElement>(null)

  const toggle = (i: number) => {
    setActive(i)
    if (disclosure) {
      setOpen((current) => (current === i ? null : i))
      return
    }
    // En escritorio el clic no abre nada: la placa ya muestra el trámite, así
    // que el siguiente paso es su enlace. Esperar un frame deja que la placa
    // reciba el trámite nuevo antes de mover el foco.
    requestAnimationFrame(() => plateLink.current?.focus())
  }

  return (
    <section
      id="servicios"
      className="relative isolate overflow-clip bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <PaperGround />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-12 sm:mb-14">
          <BlurReveal amount={0.3} className="md:col-span-7">
            <h2 className="font-alverata block text-balance text-[clamp(1.5rem,5vw,3.125rem)] font-black leading-[1.06] text-navy">
              ¿Qué gestión necesitás realizar?
            </h2>
          </BlurReveal>
          <BlurReveal delay={0.08} className="md:col-span-5 md:-mt-1">
            <p className="text-[15px] font-medium leading-relaxed text-navy/80 sm:text-base">
              La transferencia de autos y motos es el trámite más solicitado, pero no el único.
              Trabajamos con particulares, flotas corporativas, concesionarias/reventas y
              aseguradoras.
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-12 lg:gap-x-16">
          <StaggerChildren
            className="md:col-span-7"
            staggerDelay={staggerStep(services.length, 0.05)}
          >
            <ol className="border-t border-navy/10" aria-label="Trámites que resolvemos">
              {services.map((service, i) => (
                <ServiceRow
                  key={service.label}
                  service={service}
                  active={active === i}
                  open={disclosure && open === i}
                  panelId={`${baseId}-panel-${i}`}
                  disclosure={disclosure}
                  onActivate={() => setActive(i)}
                  onToggle={() => toggle(i)}
                  reduced={reduced}
                />
              ))}
            </ol>
          </StaggerChildren>

          {/* La placa acompaña el scroll de la lista. `self-start` es
              obligatorio: sin él la celda de la grilla se estira al alto de la
              lista y `sticky` no tiene adónde pegarse. */}
          <div className="hidden md:col-span-5 md:block">
            <BlurReveal delay={0.12} className="sticky top-28">
              <div aria-live="polite">
                <ActivePlate service={services[active]} reduced={reduced} linkRef={plateLink} />
              </div>
            </BlurReveal>
          </div>
        </div>

        <BlurReveal delay={0.16}>
          <div className="mt-10 sm:mt-12 sm:flex sm:justify-end">
            <MagneticButton strength={0.15} className="w-full sm:w-auto">
              <Link to="/services" className="block w-full rounded-full">
                <motion.span
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white sm:text-base"
                  whileHover={{ boxShadow: SHADOW.navyBloom }}
                  transition={SPRING.press}
                >
                  Ver todos los servicios
                  <ArrowMark className="h-4 w-4" />
                </motion.span>
              </Link>
            </MagneticButton>
          </div>
        </BlurReveal>
      </div>
    </section>
  )
}

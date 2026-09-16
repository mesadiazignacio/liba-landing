import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BlurReveal } from '../components/effects/BlurReveal'
import { MaskReveal } from '../components/effects/MaskReveal'
import { MagneticButton } from '../components/effects/MagneticButton'
import { SpotlightCard } from '../components/effects/SpotlightCard'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'
import { DUR, EASE, SPRING } from '../lib/motion'
import { SHADOW } from '../lib/shadows'
import { BAND } from '../lib/palette'
import { whatsappUrlFor } from '../lib/constants'
import { CtaFooter } from '../components/sections/CtaFooter'
import { Footer } from '../components/layout/Footer'
import { PaperGround } from '../components/ui/PaperGround'
import { WaveDivider } from '../components/ui/WaveDivider'
import { WhatsAppIcon } from '../components/ui/BrandIcons'

// ── Data ──────────────────────────────────────────────────────────────────

const painPoints = [
  'Compré un auto y no sé cómo hacer la transferencia.',
  'Me robaron el auto y no sé qué hacer con el seguro.',
  'Quiero comprar, pero temo deudas o problemas.',
  'Tengo infracciones y no sé si se pueden resolver.',
  'Tengo una sucesión y no sé cómo poner el auto a mi nombre.',
]

interface ServiceCard {
  id: string
  title: string
  /** Uno o más párrafos: la sucesión lleva dos, el resto uno. Copia de LIBA, sin tocar. */
  paragraphs: string[]
  destinado: string
  /** El único aparte condicional de la página: qué pasa si todavía no hay oficio. */
  aside?: { title: string; body: string }
}

const serviceCards: ServiceCard[] = [
  {
    id: 'transferencia',
    title: 'Transferencia y regularización',
    paragraphs: [
      'Acompañamos al comprador y vendedor para que el trámite sea simple y sin sorpresas. Gestionamos el proceso ante el Registro del Automotor, verificamos la documentación y resolvemos cualquier situación en el camino.',
    ],
    destinado:
      'Compradores y vendedores de autos y motos que buscan gestionar el trámite de forma segura y sin errores.',
  },
  {
    id: 'robo',
    title: 'Gestión de robo e infracción por demora',
    paragraphs: [
      'Cuando tu aseguradora te informa que hay un trámite pendiente por robo o demoras en la baja del vehículo, nosotros nos encargamos de todo: la documentación, los plazos y la coordinación con el Registro.',
    ],
    destinado:
      'Personas con vehículos robados o con infracciones registrales vinculadas a la demora en la baja o recupero del rodado.',
  },
  {
    id: 'pack',
    title: 'Pack de asesoramiento previo a la compra de un auto',
    paragraphs: [
      'Antes de firmar cualquier documento, te protegemos. Verificamos el estado registral, impositivo y judicial del vehículo para que compres con certeza y sin sorpresas después.',
    ],
    destinado:
      'Personas que están por comprar un auto usado y quieren asegurarse de que el vehículo esté libre de deudas, inhibiciones o problemas legales.',
  },
  {
    id: 'denuncia',
    title: 'Denuncia de compra y posesión',
    paragraphs: [
      'Si ya tenés el vehículo pero aún no terminaste la transferencia, la denuncia de compra y posesión te protege legalmente. La gestionamos de forma rápida y con el respaldo normativo correspondiente.',
    ],
    destinado:
      'Compradores que tienen el vehículo en su poder pero no completaron la transferencia y necesitan resguardarse legalmente.',
  },
  {
    id: 'sucesion',
    title: 'Transferencia de vehículos por oficio de sucesión',
    paragraphs: [
      'Cuando hay necesidad de realizar una sucesión, el vehículo a tratar puede quedarse en un limbo registral durante meses (o años) si no se sabe cómo avanzar. Si ya contás con el oficio sucesorio emitido en el juzgado, nosotros nos encargamos de todo lo que sigue: la gestión ante el Registro de la Propiedad del Automotor para que el vehículo quede a nombre de los herederos o de un tercero de manera definitiva.',
      'Si es necesario trabajamos en coordinación con el abogado para que el trámite registral fluya sin fricciones y brindándote alivio en este acompañamiento.',
    ],
    destinado:
      'Herederos que ya tienen el oficio judicial de sucesión y necesitan completar el trámite registral para que el vehículo quede legalmente a su nombre, o a nombre de un tercero.',
    aside: {
      title: '¿Todavía no tenés el oficio de sucesión?',
      body: 'Este paso corresponde al proceso judicial que lleva tu abogado. Una vez que esté emitido, nosotros tomamos el trámite desde ahí. Si tenés dudas sobre en qué etapa estás, contános y te orientamos.',
    },
  },
]

// ── Hero ──────────────────────────────────────────────────────────────────


/**
 * El hero tiene profundidad ligada al scroll, no a un temporizador. El título
 * se retira más rápido que la página; la placa de la foto se retira apenas, y
 * la foto adentro de la placa se mueve más despacio que el marco que la
 * recorta, así la placa lee como una ventana a algo con fondo y no como un
 * rectángulo pegado a la hoja. La foto es una imagen de stock provisoria y se
 * presenta como tal: no es la oficina de LIBA.
 */
function ServicesHero() {
  const reduced = useReducedMotionSafe()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const plateY = useTransform(scrollYProgress, [0, 1], [0, -36])
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  // La foto va escalada un 14% y baja hasta un 7%: el margen que la escala le
  // da por arriba y por abajo es exactamente el recorrido, así nunca asoma el
  // fondo de la placa.
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '7%'])

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-white px-4 pb-14 pt-24 sm:px-6 sm:pt-28">
      <PaperGround />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="mb-6 text-center"
          style={reduced ? undefined : { y: headlineY, opacity: headlineOpacity }}
        >
          {/* La única máscara de palabras de la superficie: su afirmación de apertura. */}
          <MaskReveal
            as="h1"
            className="block font-alverata text-[clamp(1.5rem,5vw,3.125rem)] font-black leading-tight text-navy"
            stagger={0.04}
            amount={0.2}
          >
            Compra o venta de tu vehículo, sin complicaciones
          </MaskReveal>
        </motion.div>

        <BlurReveal delay={0.15}>
          <motion.div
            className="relative mb-5 w-full overflow-hidden rounded-2xl shadow-card-navy ring-1 ring-navy/10"
            style={reduced ? { aspectRatio: '16/7' } : { aspectRatio: '16/7', y: plateY, scale: plateScale }}
          >
            <motion.img
              src="/services-hero.png"
              alt="Asesoramiento en gestoría del automotor"
              className="absolute inset-0 h-full w-full object-cover object-center"
              style={reduced ? undefined : { y: photoY, scale: 1.14, willChange: 'transform' }}
            />
          </motion.div>
        </BlurReveal>

        <BlurReveal delay={0.25}>
          <div className="py-6 sm:py-7">
            <p className="mx-auto mb-5 text-center text-sm font-semibold leading-relaxed text-navy sm:text-base">
              Te ayudamos con transferencias, seguros, verificación previa a la compra e infracciones.
              Trabajamos con acompañamiento personalizado, lenguaje claro, gestión integral
              y brindándote comodidad para que no tengas que preocuparte por nada.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <MagneticButton>
                <motion.div
                  whileHover={{ boxShadow: SHADOW.navyBloom }}
                  transition={SPRING.press}
                  className="rounded-full"
                >
                  <Link
                    to="/contact-us"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-bold text-white sm:w-auto sm:text-base"
                  >
                    Consultar mi caso →
                  </Link>
                </motion.div>
              </MagneticButton>
              <MagneticButton>
                <motion.div
                  whileHover={{ boxShadow: SHADOW.outlinedBloom }}
                  transition={SPRING.press}
                  className="rounded-full"
                >
                  <Link
                    to="/procedures"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy/20 bg-white px-7 py-3 text-sm font-bold text-navy sm:w-auto sm:text-base"
                  >
                    Ver trámite en detalle →
                  </Link>
                </motion.div>
              </MagneticButton>
            </div>
          </div>
        </BlurReveal>
      </div>
    </section>
  )
}

// ── Pain points ───────────────────────────────────────────────────────────

/* Las cinco dudas son lo que la gente escribe cuando consulta, y el párrafo de
 * abajo es lo que LIBA contesta: es una conversación, y así se arma.
 *
 * Es el momento autorado de la página y corre como una sola secuencia, no como
 * cinco entradas sueltas: cuando el hilo entra en pantalla llegan las preguntas
 * una tras otra, LIBA "escribe", responde, y recién entonces cada pregunta pasa
 * a leída — la respuesta no llega sola, alcanza a cada una. Es la promesa de la
 * marca contada en cuatro compases: te escuchamos, te contestamos, no quedás en
 * visto.
 *
 * Nada se mueve de lugar. El globo de la respuesta ocupa su alto final desde el
 * primer render, invisible; el "escribiendo" flota encima, en su esquina, y la
 * respuesta crece hacia abajo desde ahí sin empujar lo que sigue.
 *
 * No hay nombres ni horas en los mensajes: serían inventados.
 */

type ThreadPhase = 'idle' | 'asking' | 'typing' | 'replied'

/** Separación entre preguntas, en s. Ritmo de chat, no de lista: más lento que un stagger. */
const MESSAGE_GAP = 0.2

/** Pausa entre la última pregunta y el "escribiendo", en ms. */
const READ_PAUSE_MS = 450

/** Cuánto dura el "escribiendo" antes de que aparezca la respuesta, en ms. */
const TYPING_MS = 1300

/** Separación entre confirmaciones de lectura, en s. */
const RECEIPT_GAP = 0.09

/** La cola del globo, arriba. Cuadra la esquina superior y se abre hacia afuera. */
function BubbleTail({ side, className }: { side: 'left' | 'right'; className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={`absolute top-0 h-5 w-5 -scale-y-100 ${side === 'left' ? '-left-1.5' : '-right-1.5 -scale-x-100'} ${className}`}
    >
      <path d="M6 0H20V20H0C4 19 6 15 6 10Z" fill="currentColor" />
    </svg>
  )
}

/**
 * El doble tilde. El primero está desde que el mensaje llega (enviado); el
 * segundo se traza cuando LIBA respondió, y los dos pasan a coral.
 */
function ReadReceipt({ read, delay, reduced }: { read: boolean; delay: number; reduced: boolean }) {
  const transition = reduced ? { duration: 0 } : { duration: DUR.layout, delay, ease: EASE.out }
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 18 11"
      className="mb-[3px] h-[11px] w-[18px] flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={false}
      animate={{ color: read ? '#cc3a66' : 'rgba(8,77,155,0.32)' }}
      transition={transition}
    >
      <path d="M1 6l3.2 3.2L11 2" />
      <motion.path
        d="M6.4 6.2l3 3L16.8 2"
        initial={false}
        animate={{ pathLength: read ? 1 : 0, opacity: read ? 1 : 0 }}
        transition={transition}
      />
    </motion.svg>
  )
}

function PainPoints() {
  const reduced = useReducedMotionSafe()
  const threadRef = useRef<HTMLDivElement>(null)
  const threadInView = useInView(threadRef, { once: true, amount: 0.35 })
  const [phase, setPhase] = useState<ThreadPhase>('idle')
  const current: ThreadPhase = reduced ? 'replied' : phase

  // La secuencia entera cuelga de una sola entrada en pantalla. Cada compás
  // agenda el siguiente, así un visitante que pasa rápido igual la ve completa.
  useEffect(() => {
    if (reduced || !threadInView) return
    let t: number
    if (phase === 'idle') {
      setPhase('asking')
    } else if (phase === 'asking') {
      const arrived = (painPoints.length - 1) * MESSAGE_GAP * 1000 + DUR.entrance * 500
      t = window.setTimeout(() => setPhase('typing'), arrived + READ_PAUSE_MS)
    } else if (phase === 'typing') {
      t = window.setTimeout(() => setPhase('replied'), TYPING_MS)
    }
    return () => window.clearTimeout(t)
  }, [reduced, threadInView, phase])

  const asked = current !== 'idle'
  const replied = current === 'replied'

  return (
    <section className="relative isolate overflow-hidden bg-paper-cool px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
      <PaperGround />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">

        <div className="lg:col-span-5 lg:self-center">
          <BlurReveal amount={0.3}>
            <h2 className="mb-5 block text-balance font-alverata text-[clamp(1.75rem,4vw,3.125rem)] font-black leading-[1.06] text-navy">
              ¿Los trámites automotores te resultan confusos?
            </h2>
          </BlurReveal>

          <BlurReveal delay={0.08}>
            <p className="max-w-md text-base leading-relaxed text-navy/80 sm:text-lg">
              No sos el único. La mayoría de las personas llega con situaciones como estas:
            </p>
          </BlurReveal>

          <BlurReveal delay={0.16} className="mt-8 hidden lg:block">
            <MagneticButton>
              <motion.div
                className="inline-block rounded-full"
                whileHover={{ boxShadow: SHADOW.navyBloom }}
                transition={SPRING.press}
              >
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-base font-bold text-white"
                >
                  Contanos tu caso →
                </Link>
              </motion.div>
            </MagneticButton>
          </BlurReveal>
        </div>

        <div ref={threadRef} className="lg:col-span-7">
          <ul className="flex flex-col gap-3 sm:gap-3.5" aria-label="Situaciones frecuentes">
            {painPoints.map((point, index) => (
              <motion.li
                key={point}
                className={`relative w-fit max-w-[90%] drop-shadow-[0_6px_14px_rgba(8,77,155,0.10)] sm:max-w-[80%] ${
                  index % 2 === 1 ? 'sm:ml-6' : ''
                }`}
                style={{ transformOrigin: 'top left' }}
                initial={false}
                animate={asked ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.94 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: DUR.entrance, delay: asked ? index * MESSAGE_GAP : 0, ease: EASE.out }
                }
              >
                <BubbleTail side="left" className="text-white" />
                <div className="relative flex items-end gap-3 rounded-2xl bg-white py-3.5 pl-5 pr-4 lg:py-4 lg:pl-6">
                  <p className="text-pretty text-[15px] font-medium leading-snug text-navy sm:text-base lg:text-[17px]">
                    {point}
                  </p>
                  <ReadReceipt
                    read={replied}
                    delay={0.35 + index * RECEIPT_GAP}
                    reduced={reduced}
                  />
                </div>
              </motion.li>
            ))}
          </ul>

          {/* La respuesta. Ocupa su lugar desde el principio para que nada salte
              cuando llega; su texto está en el DOM todo el tiempo, así el lector
              de pantalla lo lee sin esperar la secuencia. */}
          <div className="mt-8 flex items-start justify-end gap-3 sm:mt-10">
            <div className="relative max-w-[88%] sm:max-w-[85%]">
              <motion.div
                className="relative drop-shadow-[0_14px_30px_rgba(8,77,155,0.30)]"
                style={{ transformOrigin: 'top right' }}
                initial={false}
                animate={
                  replied
                    ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                    : { opacity: 0, y: -6, scale: 0.92, filter: 'blur(6px)' }
                }
                transition={reduced ? { duration: 0 } : { duration: DUR.entrance, ease: EASE.out }}
              >
                <BubbleTail side="right" className="text-navy" />
                <div className="relative overflow-hidden rounded-2xl bg-navy px-6 pb-6 pt-4 text-white sm:px-7 sm:pb-7 sm:pt-5">
                  <p className="relative mb-2 text-[13px] font-semibold text-white/70">
                    LIBA · Gestoría del Automotor
                  </p>
                  <p className="relative text-pretty text-[clamp(1.0625rem,2.2vw,1.375rem)] leading-[1.4] text-white/85">
                    Más que solo darte información,{' '}
                    <span className="font-bold text-white">te acompañamos en todo el proceso.</span>{' '}
                    Analizamos tu caso, te explicamos las opciones y gestionamos la mejor solución
                    para vos.
                  </p>
                </div>
              </motion.div>

              {/* El "escribiendo": flota sobre la esquina de la respuesta, no
                  ocupa lugar propio, así su salida no mueve nada. */}
              <AnimatePresence>
                {current === 'typing' ? (
                  <motion.div
                    key="typing"
                    aria-hidden
                    className="absolute right-0 top-0 drop-shadow-[0_8px_18px_rgba(8,77,155,0.25)]"
                    style={{ transformOrigin: 'top right' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: DUR.state, ease: EASE.out } }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: DUR.exit, ease: EASE.exit } }}
                  >
                    <BubbleTail side="right" className="text-navy" />
                    <div className="relative flex gap-1.5 rounded-2xl bg-navy px-5 py-[18px]">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-2 w-2 rounded-full bg-white"
                          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15, ease: 'easeInOut' }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* El avatar llega con el "escribiendo" y marca el momento de la
                respuesta con un solo anillo coral: un estado, no un adorno. */}
            <motion.span
              className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy ring-4 ring-paper-cool"
              initial={false}
              animate={current === 'typing' || replied ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={reduced ? { duration: 0 } : SPRING.press}
            >
              <img src="/logo-icon.png" alt="LIBA" className="h-5 w-5 object-contain" />
              {replied && !reduced ? (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full border-2 border-coral"
                  initial={{ opacity: 0.9, scale: 1 }}
                  animate={{ opacity: 0, scale: 2.1 }}
                  transition={{ duration: 0.9, ease: EASE.out }}
                />
              ) : null}
            </motion.span>
          </div>

          <div className="mt-10 lg:hidden">
            <Link
              to="/contact-us"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white active:scale-[0.97] sm:w-auto sm:text-base"
            >
              Contanos tu caso →
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

// ── Stacking plates ───────────────────────────────────────────────────────

/* Los cinco servicios, apilados.
 *
 * Eran un índice reglado: título a la izquierda, descripción a la derecha,
 * cinco veces, todo del mismo peso y sin fondo. Ahora cada servicio es una
 * placa navy que se pega al tope de la ventana mientras la siguiente le sube
 * encima — el mismo dispositivo que los diferenciadores del home — así el
 * visitante lee un servicio por vez, a pantalla completa, y la sección se
 * siente con fondo. La copia es la misma palabra por palabra; el único agregado
 * es el enlace a WhatsApp con el servicio ya nombrado en el mensaje, como en
 * el índice del home.
 *
 * La pila sólo se arma si cada placa entra entera en la ventana desde su punto
 * de pegado. Una placa más alta que la ventana quedaría pegada con el pie
 * cortado y nadie podría leerlo — y estas placas llevan más texto que las del
 * home, así que en un teléfono suelen no entrar. Ahí van en flujo, una debajo
 * de la otra, con todo el contenido a la vista.
 */

/** Cuánto se encoge una placa por cada placa que le sube encima. */
const SHRINK_PER_CARD = 0.035

/** Desfase vertical entre placas pegadas, en px: el borde que asoma. */
const STACK_OFFSET = 14

/** Distancia desde el tope de la ventana a la que se pega la primera placa. */
const STACK_TOP = 96

/** Techo del velo sobre una placa tapada. Más oscuro deja el texto bajo AA. */
const VEIL_MAX = 0.35

/** Tramo de progreso [empieza a taparse, queda tapada] de cada placa. */
type Span = [number, number]

interface StackMeasure {
  spans: Span[]
  /** Si todas las placas entran enteras en la ventana desde su punto de pegado. */
  fits: boolean
}

/**
 * Mide dónde empieza y termina el tapado de cada placa, como fracción del
 * progreso del contenedor, y si la pila cabe. La placa i+1 llega a su punto de
 * pegado después de recorrer su posición en flujo menos su desfase; la placa i
 * queda tapada del todo cuando la i+1 recorrió además la altura de la i.
 */
function useStackMeasure(container: React.RefObject<HTMLDivElement>, count: number): StackMeasure {
  const [measure, setMeasure] = useState<StackMeasure>(() => ({
    spans: Array.from({ length: count }, (_, i) => [(i + 1) / count, 1] as Span),
    fits: false,
  }))

  useLayoutEffect(() => {
    const root = container.current
    if (!root) return

    const run = () => {
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-stack-card]'))
      if (cards.length !== count) return
      const heights = cards.map((c) => c.offsetHeight)
      const margins = cards.map((c) => parseFloat(getComputedStyle(c).marginBottom) || 0)

      const fits = heights.every((h, i) => h <= window.innerHeight - (STACK_TOP + i * STACK_OFFSET))

      const travel = root.offsetHeight + STACK_TOP - window.innerHeight
      if (travel <= 0) {
        setMeasure((m) => (m.fits === fits ? m : { ...m, fits }))
        return
      }

      let flowTop = 0
      const spans: Span[] = []
      for (let i = 0; i < count; i++) {
        const nextTop = flowTop + heights[i] + margins[i]
        const start = (nextTop - (i + 1) * STACK_OFFSET) / travel
        const end = start + heights[i] / travel
        spans.push([Math.min(1, Math.max(0, start)), Math.min(1, Math.max(0, end))])
        flowTop = nextTop
      }
      // La última placa nunca queda tapada: su tramo se cierra en el final.
      spans[count - 1] = [1, 1]
      setMeasure({ spans, fits })
    }

    run()
    const ro = new ResizeObserver(run)
    ro.observe(root)
    window.addEventListener('resize', run)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', run)
    }
  }, [container, count])

  return measure
}

/** El par de acciones de siempre, más la consulta por WhatsApp con el servicio nombrado. */
function PlateActions({ card }: { card: ServiceCard }) {
  return (
    <div className="flex flex-wrap gap-2.5 border-t border-white/15 pt-5">
      <MagneticButton strength={0.1}>
        <motion.div
          whileHover={{ boxShadow: SHADOW.outlinedBloom }}
          transition={SPRING.press}
          className="rounded-full"
        >
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-navy sm:text-sm"
          >
            Consultar mi caso →
          </Link>
        </motion.div>
      </MagneticButton>
      <MagneticButton strength={0.1}>
        <motion.a
          href={whatsappUrlFor(card.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2.5 text-xs font-bold text-white sm:text-sm"
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
          transition={SPRING.press}
        >
          Consultar por WhatsApp
          <WhatsAppIcon className="h-4 w-4 flex-shrink-0" />
        </motion.a>
      </MagneticButton>
      <MagneticButton strength={0.1}>
        <motion.div
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
          transition={SPRING.press}
          className="rounded-full"
        >
          <Link
            to="/procedures"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2.5 text-xs font-bold text-white sm:text-sm"
          >
            Ver trámite en detalle →
          </Link>
        </motion.div>
      </MagneticButton>
    </div>
  )
}

interface PlateProps {
  card: ServiceCard
  index: number
  total: number
  progress: MotionValue<number>
  span: Span
  /** Si la placa se pega y se encoge, o va en flujo. */
  stacking: boolean
  reduced: boolean
}

function ServicePlate({ card, index, total, progress, span, stacking, reduced }: PlateProps) {
  const remaining = total - 1 - index
  const scale = useTransform(progress, span, [1, 1 - remaining * SHRINK_PER_CARD])
  const dim = useTransform(progress, span, [0, Math.min(VEIL_MAX, remaining * 0.14)])
  const animate = stacking && !reduced

  return (
    <div className={stacking ? 'sticky' : undefined} style={stacking ? { top: STACK_TOP + index * STACK_OFFSET } : undefined}>
      <motion.div
        data-stack-card
        style={animate ? { scale, transformOrigin: 'top center' } : undefined}
        className="mb-6 sm:mb-8"
        initial={reduced || stacking ? false : { opacity: 0, y: 12 }}
        whileInView={reduced || stacking ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: DUR.entrance, ease: EASE.out }}
      >
        <SpotlightCard
          className="rounded-2xl bg-navy text-white shadow-card-navy"
          spotlightColor="rgba(255,255,255,0.10)"
          spotlightSize={460}
        >
          <div className="relative grid grid-cols-1 items-start gap-x-10 gap-y-5 px-6 py-8 sm:px-10 sm:py-11 md:grid-cols-12 lg:py-12">
            {/* Alverata en el título: cada placa es la afirmación que abre su
                propia superficie en la pila, no una tarjeta dentro de una
                sección. La excepción está registrada en DESIGN.md. */}
            <h3 className="font-alverata text-[clamp(1.5rem,4vw,2.25rem)] font-black leading-[1.06] md:col-span-5">
              {card.title}
            </h3>

            <div className="md:col-span-7 md:-mt-[3px]">
              {card.paragraphs.map((text) => (
                <p key={text} className="mb-4 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">
                  {text}
                </p>
              ))}

              <p className="mb-5 max-w-2xl text-sm leading-relaxed text-white/85">
                <span className="font-semibold text-white">Destinado a: </span>
                {card.destinado}
              </p>

              {card.aside ? (
                /* El aparte condicional: otra clase de información, no otra
                   entrada, así que conserva su panel — en blanco sobre la placa. */
                <div className="mb-5 max-w-2xl rounded-2xl bg-white p-5 text-navy">
                  <p className="mb-1.5 text-sm font-semibold">{card.aside.title}</p>
                  <p className="text-sm leading-relaxed text-navy/80">{card.aside.body}</p>
                </div>
              ) : null}

              <PlateActions card={card} />
            </div>
          </div>

          {/* El velo que oscurece la placa cuando otra le sube encima. No es un
              estado de reposo: vale cero hasta que la pila lo pide. */}
          {animate ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl bg-black"
              style={{ opacity: dim }}
            />
          ) : null}
        </SpotlightCard>
      </motion.div>
    </div>
  )
}

function ServiceStack() {
  const reduced = useReducedMotionSafe()
  const stackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: [`start ${STACK_TOP}px`, 'end end'],
  })
  const { spans, fits } = useStackMeasure(stackRef, serviceCards.length)

  return (
    <div ref={stackRef} className="relative">
      {serviceCards.map((card, i) => (
        <ServicePlate
          key={card.id}
          card={card}
          index={i}
          total={serviceCards.length}
          progress={scrollYProgress}
          span={spans[i]}
          stacking={fits}
          reduced={reduced}
        />
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────

export function ServicesPage() {
  return (
    <div className="bg-white">

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <ServicesHero />

      {/* Cada cambio de sección es un cambio de banda con una ola entre medio.
          La página era blanca de punta a punta; ahora alterna como el home. */}
      <WaveDivider fromColor={BAND.white} toColor={BAND.cool} />

      {/* ── 2. PAIN POINTS ──────────────────────────────────────────────── */}
      <PainPoints />

      <WaveDivider fromColor={BAND.cool} toColor={BAND.white} />

      {/* ── 3. SERVICES ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-20">
        <PaperGround />
        <div className="relative z-10 mx-auto max-w-5xl">

          <div className="mb-8 text-center sm:mb-10">
            <BlurReveal amount={0.3}>
              <h2 className="block font-alverata text-[clamp(1.5rem,5vw,3.125rem)] font-black leading-[1.06] text-navy">
                ¿Qué trámites podemos resolver juntos?
              </h2>
            </BlurReveal>
          </div>

          <ServiceStack />

        </div>
      </section>

      {/* ── 4. INFO CTA ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white px-4 py-14 text-center sm:px-6">
        <PaperGround />
        <div className="relative z-10 mx-auto max-w-2xl">
          <BlurReveal amount={0.3}>
            <h2 className="mb-3 block font-alverata text-xl font-black leading-tight text-navy sm:text-2xl md:text-3xl">
              ¿Buscás información más detallada sobre algún trámite?
            </h2>
          </BlurReveal>

          <BlurReveal delay={0.08}>
            <p className="mb-6 text-sm leading-relaxed text-navy/80 sm:text-base">
              En nuestra sección de trámites explicamos paso a paso cómo funciona cada proceso:
              qué documentación necesitás, cuánto tarda y cómo lo resolvemos.
            </p>
          </BlurReveal>

          {/* The section's whole point is to send the reader to the catalog. */}
          <BlurReveal delay={0.2}>
            <MagneticButton>
              <motion.div
                className="inline-block rounded-full"
                whileHover={{ boxShadow: SHADOW.coralBloom }}
                transition={SPRING.press}
              >
                <Link
                  to="/procedures"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-deep px-7 py-3 text-sm font-bold text-white sm:text-base"
                >
                  Ver todos los trámites →
                </Link>
              </motion.div>
            </MagneticButton>
          </BlurReveal>
        </div>
      </section>

      {/* ── 5. CTA FOOTER ───────────────────────────────────────────────── */}
      <CtaFooter />
      <Footer />

    </div>
  )
}

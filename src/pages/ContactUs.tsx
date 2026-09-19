import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MaskReveal } from '../components/effects/MaskReveal'
import { BlurReveal } from '../components/effects/BlurReveal'
import { ScrubText } from '../components/effects/ScrubText'
import { SpotlightCard } from '../components/effects/SpotlightCard'
import { IntakeForm } from '../components/sections/IntakeForm'
import { CtaFooter } from '../components/sections/CtaFooter'
import { Stage, StageList, StageTrack } from '../components/ui/StageTrack'
import { WaveDivider } from '../components/ui/WaveDivider'
import { Footer } from '../components/layout/Footer'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'
import { DUR, EASE, staggerStep } from '../lib/motion'
import { BAND, COLOR } from '../lib/palette'
import { SERVICE_AREA } from '../lib/constants'
import { PaperGround } from '../components/ui/PaperGround'

// ── Mapa ───────────────────────────────────────────────────────────────────

/**
 * Recorte de OpenStreetMap centrado en Olivos.
 *
 * El `bbox` ya está centrado en el punto, así que el `&marker=` del embed sobra:
 * el marcador lo dibujamos nosotros en el centro exacto del cuadro. Esa es toda
 * la razón del cambio — el pin del embed es verde y no existe en la paleta.
 */
const OSM_EMBED =
  'https://www.openstreetmap.org/export/embed.html?bbox=-58.525%2C-34.530%2C-58.490%2C-34.500&layer=mapnik'

/**
 * Las tiles llegan con rojos, amarillos y verdes que no son de acá y que, sobre
 * la banda blush, leen como una captura de pantalla pegada en la página. El
 * filtro va sobre el propio `iframe`: el documento es de otro origen y no se
 * puede estilar desde afuera, pero un `filter` se aplica al elemento ya
 * rasterizado. El mapa queda monocromo azulado —textura, no ilustración— y el
 * único color del cuadro pasa a ser el pin.
 */
const MAP_TINT =
  'grayscale(1) sepia(0.45) hue-rotate(178deg) saturate(1.45) brightness(1.05) contrast(0.92)'

function LocationMap() {
  const reduced = useReducedMotionSafe()

  return (
    /* `--crop`: la franja de atribución del embed va impresa dentro del iframe,
       encima de las tiles, y en pantallas angostas se parte en dos renglones que
       tapan el mapa. Como es contenido de otro origen no se puede estilar, así
       que el iframe se dibuja más alto que el marco y el marco le recorta esa
       franja. El crédito no se pierde: se rearma en el pie de la tarjeta, donde
       además se lee. Al recortar sólo abajo, el centro del mapa baja media
       franja, y el pin lo sigue con el mismo `--crop`.

       `bg-paper-cool`: el marco tiene fondo propio porque el iframe carga
       diferido y es de terceros. Mientras no está, el hueco es una superficie
       del sistema y no un rectángulo blanco. */
    <div className="relative h-[260px] overflow-hidden rounded-2xl border border-navy/10 bg-paper-cool [--crop:48px] sm:h-[340px] sm:[--crop:34px]">
      <iframe
        title="Ubicación LIBA Gestoría — Olivos, Buenos Aires"
        src={OSM_EMBED}
        className="absolute inset-x-0 top-0 w-full"
        style={{ border: 0, filter: MAP_TINT, height: 'calc(100% + var(--crop))' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* El único momento con autoría de la sección: el pin cae y se apoya. La
          punta se ancla al centro del mapa con las clases del contenedor, y la
          caída vive en el `svg` de adentro — framer escribe `transform` inline y
          se comería el `-translate` de Tailwind si compartieran elemento.
          `pointer-events-none` para no robarle el arrastre al mapa. */}
      <div className="pointer-events-none absolute left-1/2 top-[calc(50%+var(--crop)/2)] -translate-x-1/2 -translate-y-full">
        <motion.svg
          width="28"
          height="37"
          viewBox="0 0 26 34"
          fill="none"
          aria-hidden
          style={{ filter: 'drop-shadow(0 6px 10px rgba(8,77,155,0.35))' }}
          initial={reduced ? undefined : { opacity: 0, y: -16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DUR.entrance, ease: EASE.out, delay: 0.18 }}
        >
          <path
            d="M13 33s11-12.5 11-20a11 11 0 1 0-22 0c0 7.5 11 20 11 20Z"
            fill={COLOR.coral}
            stroke="#fff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="13" cy="13" r="4" fill="#fff" />
        </motion.svg>
      </div>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────

const STEPS = [
  {
    title: 'Analizamos tu caso personalizadamente',
    desc: 'Analizamos tu situación y hacemos todas las preguntas relevantes. No queremos darte respuestas genéricas porque entendemos que cada caso es distinto y lo tratamos como tal.',
  },
  {
    title: 'Consultamos con informes previo al diagnóstico',
    desc: 'Te solicitamos que nos compartas toda la documentación que tengas y sacamos los informes correspondientes para revisar el estado real de tu trámite: dominios, deudas, irregularidades. No te comprometemos a nada hasta tener un diagnóstico completo y presupuesto concreto y confiable, no siendo una estimación a ciegas. Este paso posee un costo mínimo, y en caso de avanzar con nosotros en la realización del trámite, será descontado de los honorarios finales.',
  },
  {
    title: 'Te explicamos las opciones reales',
    desc: 'Podemos darte un número concreto de costos desde el inicio para que te orientes. El presupuesto final lo cerramos una vez que tengamos el informe completo. Lo hacemos así para cuidar tu inversión y para no comprometernos con números que después no se sostienen.',
  },
  {
    title: 'Definimos el camino más eficaz juntos',
    desc: 'Con el diagnóstico en mano, te presentamos el plan de acción: qué pasos seguimos, en qué tiempos y con qué costos. Vos decidís cómo avanzamos.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────

export function ContactUs() {
  const reduced = useReducedMotionSafe()
  const stepDelay = staggerStep(STEPS.length, 0.08)

  // La cabecera se retira en capas al bajar, como el hero del home: el título
  // se aleja más rápido que la hoja, que sigue con la página. Ligado al scroll,
  // no a un temporizador — y quieto con movimiento reducido.
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const headlineY = useTransform(scrollYProgress, [0, 0.5], [0, -60])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  return (
    <div className="bg-white">

      {/* ── 1. CANALES ──────────────────────────────────────────────────── */}
      {/* La página abre con los dos canales directos (WhatsApp y Calendly); el
          formulario queda debajo para quien prefiere escribir su caso. */}
      <CtaFooter contact />
      <WaveDivider fromColor={BAND.white} toColor={BAND.blush} />

      {/* ── 2. FORM ─────────────────────────────────────────────────────── */}
      {/* La banda blush —la reservada para el contacto— lleva la hoja de
          ingreso. El título queda fuera de la placa: la placa es para el
          formulario, con sombra navy y la luz del puntero sólo ahí. */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden bg-paper-blush px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14"
      >
        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.div
            className="mb-8 text-center sm:mb-10"
            style={reduced ? undefined : { y: headlineY, opacity: headlineOpacity }}
          >
            <MaskReveal
              as="h2"
              className="font-alverata mb-3 block text-[clamp(1.75rem,5vw,3.125rem)] font-black leading-[1.06] text-navy"
              stagger={0.04}
              amount={0.2}
            >
              Contanos tu caso.
            </MaskReveal>
            <BlurReveal delay={0.1}>
              <p className="mx-auto max-w-xl text-balance text-base leading-relaxed text-navy/85 sm:text-lg">
                Cuanto más detalle nos des, más preciso es el diagnóstico.
              </p>
            </BlurReveal>
          </motion.div>

          <BlurReveal delay={0.18}>
            <SpotlightCard
              className="rounded-2xl bg-white p-3 shadow-card-navy sm:p-4"
              spotlightColor="rgba(8,77,155,0.08)"
              spotlightSize={460}
            >
              <IntakeForm />
            </SpotlightCard>
          </BlurReveal>
        </div>
      </section>
      <WaveDivider fromColor={BAND.blush} toColor={BAND.white} />

      {/* ── 3. PROCESS STEPS ────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden py-14 sm:py-20 px-4 sm:px-6">
        <PaperGround />
        <div className="relative z-10 max-w-3xl mx-auto">

          <div className="text-center mb-10 sm:mb-12">
            <BlurReveal>
              <h2 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-tight block font-alverata mb-3">
                ¿Qué pasa después de que nos contactás?
              </h2>
            </BlurReveal>
            <BlurReveal delay={0.08}>
              <p className="text-navy/80 text-sm sm:text-base">
                Así funciona nuestro proceso desde el primer mensaje.
              </p>
            </BlurReveal>
          </div>

          {/* The case rail. Four independent scroll reveals used to fire here
              against a static dashed connector; now one measured rail advances
              through the four stages, which is the thing the section is about.
              La copia de cada etapa llega escalonada; el riel no cambia. */}
          <StageTrack>
            <StageList className="space-y-8 sm:space-y-9">
              {STEPS.map((step, i) => (
                <Stage key={step.title} step={i + 1}>
                  <BlurReveal delay={i * stepDelay} amount={0.3}>
                    <h3 className="text-navy font-bold text-base sm:text-[17px] leading-snug mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed">
                      {step.desc}
                    </p>
                  </BlurReveal>
                </Stage>
              ))}
            </StageList>
          </StageTrack>

        </div>
      </section>

      {/* ── 4. LOCATION ─────────────────────────────────────────────────── */}
      {/* This was the one hard horizontal edge left on the site: white butting
          straight into the blush band with no wave between them. Every other
          band change on every other surface is joined this way. */}
      <WaveDivider fromColor={BAND.white} toColor={BAND.blush} />
      {/* Dos hechos, no cuatro párrafos: dónde estamos y hasta dónde llegamos.
          El lugar lo cuenta el mapa —con su pie— y el alcance lo cuenta la losa
          navy de al lado: lo que LIBA afirma sobre su zona va en la voz de la
          norma, con la ola adentro como textura y la luz del puntero como único
          hover. El punto coral de la ficha es el mismo punto que el pin. */}
      <section className="bg-paper-blush px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">

            <BlurReveal className="lg:col-span-5">
              <SpotlightCard
                className="h-full rounded-2xl bg-navy text-white shadow-card-navy"
                spotlightColor="rgba(255,255,255,0.10)"
                spotlightSize={380}
              >
                <div className="relative flex h-full flex-col p-6 sm:p-8 lg:p-10">
                  <h2 className="mb-4 font-alverata text-[clamp(1.5rem,4vw,2.25rem)] font-black leading-tight text-white">
                    Dónde estamos y hasta dónde llegamos
                  </h2>

                  <p className="text-base leading-relaxed text-white/85 sm:text-lg">
                    Atendemos de manera presencial en{' '}
                    <strong className="font-bold text-white">Zona Norte</strong> y{' '}
                    <strong className="font-bold text-white">CABA</strong>.
                  </p>

                  <hr className="my-6 border-0 border-t border-white/15 sm:my-7" />

                  <h3 className="mb-2 text-base font-bold leading-snug text-white sm:text-[17px]">
                    ¿Tu trámite está en otra localidad?
                  </h3>
                  {/* La afirmación larga de la página se lee al ritmo del scroll,
                      como el manifiesto del home. */}
                  <ScrubText className="text-sm leading-relaxed text-white/85 sm:text-[15px]">
                    Si tu vehículo está radicado en otra jurisdicción del país, contamos con una red de colegas gestores matriculados con quienes trabajamos en conjunto para que tu trámite tenga el mismo nivel de atención, sin importar dónde esté.
                  </ScrubText>
                </div>
              </SpotlightCard>
            </BlurReveal>

            {/* Passe-partout blanco alrededor del mapa: la losa navy de al lado
                ya carga la afirmación, y el mapa es evidencia, no discurso. */}
            <BlurReveal delay={0.12} className="lg:col-span-7">
              <div className="rounded-2xl bg-white p-3 shadow-card-navy sm:p-4">
                <LocationMap />
                {/* El crédito que el recorte se llevó de adentro del iframe. La
                    licencia pide atribución visible, no una franja pisando el
                    mapa; acá se lee mejor de lo que se leía ahí. */}
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 pb-0.5 pt-3">
                  <p className="flex items-center gap-2.5 text-sm font-bold leading-snug text-navy sm:text-[15px]">
                    <span aria-hidden className="h-2 w-2 flex-shrink-0 rounded-full bg-coral" />
                    Estamos en {SERVICE_AREA}
                  </p>
                  <a
                    href="https://www.openstreetmap.org/copyright"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] leading-none text-navy/80 transition-colors duration-200 hover:text-navy"
                  >
                    © OpenStreetMap
                  </a>
                </div>
              </div>
            </BlurReveal>

          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      {/* Esta página cierra en `paper-blush`, así que la ola del footer sale de
          ahí. */}
      <Footer fromColor={BAND.blush} />

    </div>
  )
}

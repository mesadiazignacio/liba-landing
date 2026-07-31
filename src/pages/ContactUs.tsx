import { motion } from 'framer-motion'
import { MaskReveal } from '../components/effects/MaskReveal'
import { BlurReveal } from '../components/effects/BlurReveal'
import { MagneticButton } from '../components/effects/MagneticButton'
import { IntakeForm } from '../components/sections/IntakeForm'
import { Stage, StageList, StageTrack } from '../components/ui/StageTrack'
import { WaveDivider } from '../components/ui/WaveDivider'
import { Footer } from '../components/layout/Footer'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'
import { DUR, EASE, SPRING } from '../lib/motion'
import { SHADOW } from '../lib/shadows'
import { BAND, COLOR } from '../lib/palette'
import { WHATSAPP_URL, CALENDLY_URL, SERVICE_AREA } from '../lib/constants'

// ── Icons ──────────────────────────────────────────────────────────────────

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

// Decorative — the label beside it already says Calendly. An `aria-hidden` image
// with a non-empty `alt` contradicts itself; the empty alt is the working part.
function CalendlyIcon({ className }: { className?: string }) {
  return (
    <img src="/calendly-logo.png" alt="" className={className} aria-hidden />
  )
}

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
  return (
    <div className="bg-white">

      {/* ── 1. CONTACT METHODS ──────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-28 pb-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">

          <MaskReveal
            as="h1"
            className="text-navy font-black text-[clamp(1.5rem,5vw,3.125rem)] leading-tight block font-alverata mb-4"
            stagger={0.04}
            amount={0.2}
          >
            ¿Cómo preferís contactarte?
          </MaskReveal>

          <BlurReveal delay={0.1}>
            <p className="text-navy font-bold text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Elegí la forma que mejor se adapte a tu momento. Todas llevan al mismo lugar: una respuesta real a tu situación.
            </p>
          </BlurReveal>

          <BlurReveal delay={0.2}>
            <div className="bg-paper-cool rounded-2xl p-5 sm:p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="flex flex-col items-center gap-2.5">
                  <MagneticButton className="w-full">
                    <motion.a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 bg-navy text-white font-bold text-base sm:text-lg px-5 py-4 rounded-2xl"
                      whileHover={{ scale: 1.02, boxShadow: SHADOW.navyBloom }}
                      whileTap={{ scale: 0.97 }}
                      transition={SPRING.press}
                    >
                      ¿Trámite complejo? Hablemos
                      <WhatsAppIcon className="w-6 h-6 flex-shrink-0" />
                    </motion.a>
                  </MagneticButton>
                  <p className="text-navy/70 text-sm font-medium">
                    Respondemos en el día · Primer llamado sin cargo
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2.5">
                  <MagneticButton className="w-full">
                    <motion.a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 bg-white text-navy font-bold text-base sm:text-lg px-5 py-4 rounded-2xl border border-navy/15"
                      whileHover={{ scale: 1.02, boxShadow: SHADOW.outlinedBloom }}
                      whileTap={{ scale: 0.97 }}
                      transition={SPRING.press}
                    >
                      Agendar consulta en Calendly
                      <CalendlyIcon className="w-6 h-6 flex-shrink-0" />
                    </motion.a>
                  </MagneticButton>
                  <p className="text-navy/70 text-sm font-medium">
                    Te quedará asignado un llamado inicial de 20 minutos
                  </p>
                </div>

              </div>
            </div>
          </BlurReveal>

        </div>
      </section>

      {/* ── 2. FORM ─────────────────────────────────────────────────────── */}
      {/* La hoja de ingreso es una losa navy que flota como tarjeta, hermana del
          footer. Por eso la sección no cambia de banda ni lleva olas: la ola vive
          adentro de la losa, como textura. */}
      <section className="pb-14 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-8 sm:mb-10">
            <BlurReveal>
              <h2 className="text-navy font-black text-[clamp(1.5rem,4vw,2.25rem)] leading-tight font-alverata mb-3">
                Contanos tu caso.
              </h2>
            </BlurReveal>
            <BlurReveal delay={0.08}>
              <p className="text-navy/85 text-sm sm:text-base leading-relaxed text-balance">
                Cuanto más detalle nos des, más preciso es el diagnóstico.
              </p>
            </BlurReveal>
          </div>

          <BlurReveal delay={0.15}>
            <IntakeForm />
          </BlurReveal>

        </div>
      </section>


      {/* ── 3. PROCESS STEPS ────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-10">
            <BlurReveal>
              <h2 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-tight block font-alverata mb-3">
                ¿Qué pasa después de que nos contactás?
              </h2>
            </BlurReveal>
            <BlurReveal delay={0.08}>
              <p className="text-navy/70 text-sm sm:text-base">
                Así funciona nuestro proceso desde el primer mensaje.
              </p>
            </BlurReveal>
          </div>

          {/* The case rail. Four independent scroll reveals used to fire here
              against a static dashed connector; now one measured rail advances
              through the four stages, which is the thing the section is about. */}
          <StageTrack>
            <StageList className="space-y-8 sm:space-y-9">
              {STEPS.map((step, i) => (
                <Stage key={step.title} step={i + 1}>
                  <h3 className="text-navy font-bold text-base sm:text-[17px] leading-snug mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed">
                    {step.desc}
                  </p>
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
          Antes los dos vivían en la misma columna de texto corrido y el mapa
          quedaba al lado sin decir nada. Ahora el lugar lo cuenta el mapa —con
          su pie— y el alcance lo cuenta la columna, partido en los dos niveles
          que el visitante viene a distinguir: dónde vamos nosotros y dónde va la
          red. El punto coral de las fichas es el mismo punto que el pin. */}
      <section className="bg-paper-blush px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">

            <BlurReveal className="md:col-span-5">
              <h2 className="mb-4 font-alverata text-[clamp(1.5rem,4vw,2.25rem)] font-black leading-tight text-navy">
                Dónde estamos y hasta dónde llegamos
              </h2>

              <p className="text-base leading-relaxed text-navy/80 sm:text-lg">
                Atendemos de manera presencial en{' '}
                <strong className="font-bold text-navy">Zona Norte</strong> y{' '}
                <strong className="font-bold text-navy">CABA</strong>.
              </p>

              <hr className="my-7 border-0 border-t border-navy/10" />

              <h3 className="mb-2 text-base font-bold leading-snug text-navy sm:text-[17px]">
                ¿Tu trámite está en otra localidad?
              </h3>
              <p className="text-sm leading-relaxed text-navy/75 sm:text-[15px]">
                Si tu vehículo está radicado en otra jurisdicción del país, contamos con una red de colegas gestores matriculados con quienes trabajamos en conjunto para que tu trámite tenga el mismo nivel de atención, sin importar dónde esté.
              </p>
            </BlurReveal>

            {/* Passe-partout blanco, no losa navy: el footer que sigue abajo ya es
                la losa navy de la página y dos seguidas le sacan el peso. */}
            <BlurReveal delay={0.12} className="md:col-span-7">
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
          ahí. Era una franja de copyright de cinco líneas; ahora es el mismo
          piso que las otras siete rutas. */}
      <Footer fromColor={BAND.blush} />

    </div>
  )
}

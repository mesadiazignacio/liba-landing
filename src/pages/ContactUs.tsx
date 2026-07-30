import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { MaskReveal } from '../components/effects/MaskReveal'
import { BlurReveal } from '../components/effects/BlurReveal'
import { MagneticButton } from '../components/effects/MagneticButton'
import { Stage, StageList, StageTrack } from '../components/ui/StageTrack'
import { WaveDivider } from '../components/ui/WaveDivider'
import { DUR, EASE, SPRING } from '../lib/motion'
import { SHADOW } from '../lib/shadows'
import { BAND } from '../lib/palette'
import { WHATSAPP_URL, CALENDLY_URL, EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '../lib/constants'

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

// ── Sub-components ────────────────────────────────────────────────────────

// `transition-all` here also asked the browser to interpolate every other
// animatable property on a field that only ever changes its ring and border.
const INPUT_CLS =
  'w-full bg-white rounded-2xl px-4 py-3.5 text-navy text-base outline-none focus:ring-2 focus:ring-navy/20 border border-transparent focus:border-navy/20 transition-[border-color,box-shadow] duration-200 placeholder-transparent'

// ── Page ──────────────────────────────────────────────────────────────────

export function ContactUs() {
  const [form, setForm] = useState({ nombre: '', contacto: '', tramite: '', situacion: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { nombre: form.nombre, contacto: form.contacto, tramite: form.tramite, situacion: form.situacion },
        EMAILJS_PUBLIC_KEY,
      )
      setSubmitted(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setError(true)
    } finally {
      setSending(false)
    }
  }

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
      <section className="pb-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <BlurReveal>
            <p className="text-navy font-semibold text-base sm:text-lg text-center mb-8">
              Contanos tu situación: Cuanto más detalle, mejor nuestro diagnóstico.
            </p>
          </BlurReveal>

          <BlurReveal delay={0.1}>
            <div className="bg-paper-blush rounded-2xl p-6 sm:p-8">
              {/* The one outcome on this site the visitor is actually waiting on,
                  so it gets the only drawn mark: the check strokes itself once the
                  send resolves. mode="wait" keeps the panel from jumping height
                  mid-crossfade. */}
              <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="sent"
                  className="text-center py-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: DUR.state, ease: EASE.out }}
                >
                  <motion.div
                    className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ ...SPRING.press, delay: 0.04 }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                      <motion.path
                        d="M5 14L11 20L23 8"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: DUR.entrance, ease: EASE.out, delay: 0.12 }}
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-navy font-bold text-xl mb-2">¡Mensaje enviado!</h3>
                  <p className="text-navy/70 text-sm">
                    Te vamos a responder a la brevedad por WhatsApp.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  aria-busy={sending}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DUR.exit, ease: EASE.exit }}
                >
                  {/* Recomposed: four full-width rows stacked identically read as a
                      long form regardless of how little it actually asks. The two
                      short identity fields now share a row, so the visitor sees a
                      three-step form whose last step is the one that matters. */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="nombre" className="block text-navy font-semibold text-sm mb-1.5">
                        Tu nombre *
                      </label>
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.nombre}
                        onChange={handleChange}
                        className={INPUT_CLS}
                      />
                    </div>

                    <div>
                      <label htmlFor="contacto" className="block text-navy font-semibold text-sm mb-1.5">
                        Tu WhatsApp o email *
                      </label>
                      <input
                        id="contacto"
                        name="contacto"
                        type="text"
                        required
                        // The field takes a phone *or* an email, so it cannot
                        // honestly claim `tel`: that offered phone autofill to
                        // someone about to type an address.
                        autoComplete="off"
                        value={form.contacto}
                        onChange={handleChange}
                        className={INPUT_CLS}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="tramite" className="block text-navy font-semibold text-sm mb-1.5">
                      ¿Qué trámite necesitás resolver? *
                    </label>
                    <input
                      id="tramite"
                      name="tramite"
                      type="text"
                      required
                      value={form.tramite}
                      onChange={handleChange}
                      className={INPUT_CLS}
                    />
                  </div>

                  {/* The field the diagnóstico actually depends on, so it gets a
                      rule above it and the most room on the page. */}
                  <div className="mt-6 border-t border-navy/10 pt-6">
                    <label htmlFor="situacion" className="block text-navy font-semibold text-sm mb-1.5">
                      Contanos tu situación
                    </label>
                    <textarea
                      id="situacion"
                      name="situacion"
                      value={form.situacion}
                      onChange={handleChange}
                      rows={7}
                      className={INPUT_CLS + ' resize-none'}
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {error && (
                      <motion.p
                        role="alert"
                        // The message used to open flush against the textarea it
                        // was reporting on, with no space of its own.
                        className="text-center text-sm text-red-700 font-medium pt-5"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: DUR.state, ease: EASE.out }}
                      >
                        Hubo un error al enviar. Intentá de nuevo o contactanos por WhatsApp.
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <div className="flex justify-center pt-2">
                    <motion.button
                      type="submit"
                      disabled={sending}
                      className="relative overflow-hidden bg-navy text-white font-bold text-base px-12 py-4 rounded-full disabled:cursor-not-allowed"
                      whileHover={sending ? undefined : { scale: 1.03, boxShadow: SHADOW.navyBloom }}
                      whileTap={sending ? undefined : { scale: 0.97 }}
                      transition={SPRING.press}
                    >
                      {/* Pending is a real wait on a third-party send, so it gets
                          an indeterminate sweep rather than a dimmed button —
                          "Enviando..." alone leaves the visitor unsure whether
                          the press registered. */}
                      {sending && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)',
                          }}
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
                        />
                      )}
                      <span className="relative">{sending ? 'Enviando…' : 'Enviar'}</span>
                    </motion.button>
                  </div>
                </motion.form>
              )}
              </AnimatePresence>
            </div>
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
      <section className="py-14 px-4 sm:px-6 bg-paper-blush">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            <BlurReveal>
              <div>
                <h2 className="text-navy font-black text-xl sm:text-2xl leading-tight mb-4 font-alverata">
                  Dónde estamos y hasta dónde llegamos
                </h2>
                <p className="text-navy/80 text-sm sm:text-base leading-relaxed mb-6">
                  Estamos ubicados en Olivos, Zona Norte del Gran Buenos Aires. Atendemos de manera presencial en Zona Norte y CABA.
                </p>
                <p className="text-navy font-bold text-sm sm:text-base mb-2">
                  ¿Tu trámite está en otra localidad?
                </p>
                <p className="text-navy/70 text-sm sm:text-[15px] leading-relaxed">
                  Tenemos presencia directa en Zona Norte y CABA. Si tu vehículo está radicado en otra jurisdicción del país, contamos con una red de colegas gestores matriculados con quienes trabajamos en conjunto para que tu trámite tenga el mismo nivel de atención, sin importar dónde esté.
                </p>
              </div>
            </BlurReveal>

            <BlurReveal delay={0.15}>
              <div className="rounded-2xl overflow-hidden shadow-card" style={{ height: '300px' }}>
                <iframe
                  title="Ubicación LIBA Gestoría — Olivos, Buenos Aires"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-58.525%2C-34.530%2C-58.490%2C-34.500&layer=mapnik&marker=-34.515%2C-58.507"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </BlurReveal>

          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-paper-blush border-t border-navy/10 py-5 px-4 text-center">
        <p className="text-navy/60 text-xs sm:text-sm">
          Todos los derechos reservados |{' '}
          {/* Was href="#", which scrolled to the top of this same page. */}
          <Link to="/privacy" className="underline decoration-navy/30 underline-offset-2 hover:opacity-80 transition-opacity duration-200">
            Políticas de Privacidad
          </Link>{' '}
          | LIBA Gestoría {new Date().getFullYear()}
        </p>
      </footer>

    </div>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { WaveTexture } from '../ui/WaveTexture'
import { DUR, EASE, SPRING } from '../../lib/motion'
import { COLOR } from '../../lib/palette'
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from '../../lib/constants'

/**
 * La hoja de ingreso: una losa navy, hermana del footer.
 *
 * Misma gramática que `Footer` — tarjeta de 16px con la sombra de reposo,
 * flotando sobre el fondo en vez de sangrar como banda, con la ola mudada
 * adentro como textura de contorno. Por eso acá tampoco hay `WaveDivider`: la
 * ola no une dos bandas porque abajo no hay una segunda banda, hay una tarjeta.
 *
 * Los campos son renglones, no cajas. En reposo una regla `white/45` —el único
 * límite del control, así que tiene que llegar al 3:1 de contraste no textual— y
 * en foco una regla coral de 2px que se dibuja desde la izquierda y se queda
 * mientras el campo tenga contenido, de modo que la hoja muestra lo ya
 * completado. Es el mismo idioma que el subrayado coral de los enlaces del
 * footer, y respeta su regla: sobre navy el coral marca un cambio, nunca lleva
 * texto. El estado tampoco es color solo — cambian el grosor de la regla y el
 * peso de la etiqueta.
 */

// ── Sub-components ────────────────────────────────────────────────────────

/**
 * Un renglón. La regla en reposo vive en su propio `span` en lugar de en el
 * `border-bottom` del input: un borde con radio se curva en las puntas.
 */
function RuledField({
  id,
  label,
  value,
  onChange,
  required = false,
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  autoComplete?: string
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  return (
    <div className="group">
      <label
        htmlFor={id}
        className={`block text-[11px] sm:text-xs uppercase tracking-[0.18em] mb-2 transition-colors duration-200 ${
          focused ? 'text-white font-bold' : 'text-white/70 font-semibold'
        }`}
      >
        {label}
        {required && <span aria-hidden className="text-coral"> *</span>}
      </label>

      <div className="relative">
        <input
          id={id}
          name={id}
          type="text"
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          // El anillo global es `:where()`, así que basta con declarar el propio.
          className="w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 px-0 pt-0.5 pb-2.5 text-white text-[17px] font-medium leading-snug"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-white/45 group-hover:bg-white/70 transition-colors duration-200"
        />
        <motion.span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] bg-coral origin-left"
          initial={false}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: DUR.state, ease: EASE.out }}
        />
      </div>
    </div>
  )
}

// ── Form ──────────────────────────────────────────────────────────────────

export function IntakeForm() {
  const [form, setForm] = useState({
    nombre: '',
    contacto: '',
    tramite: '',
    situacion: '',
  })
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
        {
          nombre: form.nombre,
          contacto: form.contacto,
          tramite: form.tramite,
          situacion: form.situacion,
        },
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
    <div className="relative isolate overflow-hidden rounded-2xl bg-navy text-white shadow-card">
      <WaveTexture />

      {/* mode="wait" mantiene la altura estable durante el cruce. */}
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="sent"
            className="relative px-5 py-12 sm:px-10 sm:py-14 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.state, ease: EASE.out }}
          >
            {/* El único trazo dibujado del sitio. */}
            <motion.div
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-5"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ ...SPRING.press, delay: 0.04 }}
            >
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden>
                <motion.path
                  d="M5 14L11 20L23 8"
                  stroke={COLOR.navy}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: DUR.entrance, ease: EASE.out, delay: 0.12 }}
                />
              </svg>
            </motion.div>
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">
              Recibimos tu consulta
            </h3>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Te respondemos por WhatsApp a la brevedad.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            aria-busy={sending}
            className="relative px-5 py-9 sm:px-10 sm:py-11"
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.exit, ease: EASE.exit }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
              <RuledField
                id="nombre"
                label="Tu nombre"
                required
                autoComplete="name"
                value={form.nombre}
                onChange={handleChange}
              />
              <RuledField
                id="contacto"
                label="WhatsApp o email"
                required
                // El campo acepta un teléfono *o* una dirección, así que no puede
                // declarar `tel` honestamente: ofrecería autocompletado de
                // teléfono a quien está por escribir un mail.
                autoComplete="off"
                value={form.contacto}
                onChange={handleChange}
              />
            </div>

            <div className="mt-7">
              <RuledField
                id="tramite"
                label="Qué necesitás resolver"
                required
                value={form.tramite}
                onChange={handleChange}
              />
            </div>

            <div className="mt-7">
              <label
                htmlFor="situacion"
                className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/70 mb-2"
              >
                Tu situación
              </label>
              <textarea
                id="situacion"
                name="situacion"
                value={form.situacion}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white/10 rounded-2xl px-4 py-3 text-white text-base leading-relaxed outline-none resize-none border border-white/20 focus:border-coral focus:bg-white/[0.14] transition-colors duration-200"
              />
            </div>

            <AnimatePresence initial={false}>
              {error && (
                <motion.p
                  role="alert"
                  className="text-sm text-white font-medium pt-5"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: DUR.state, ease: EASE.out }}
                >
                  No pudimos enviarlo. Probá de nuevo, o escribinos por WhatsApp.
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              {/* Blanco sobre navy: la primaria del sistema en fondo navy. */}
              <motion.button
                type="submit"
                disabled={sending}
                className="relative overflow-hidden bg-white text-navy font-bold text-base px-8 py-3.5 rounded-full disabled:cursor-not-allowed flex-shrink-0"
                whileHover={sending ? undefined : { scale: 1.03 }}
                whileTap={sending ? undefined : { scale: 0.97 }}
                transition={SPRING.press}
              >
                {/* La espera es real —un envío contra un tercero— así que se
                    declara con un barrido y no con un botón atenuado. */}
                {sending && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(8,77,155,0.18) 50%, transparent 100%)',
                    }}
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
                  />
                )}
                <span className="relative">
                  {sending ? 'Enviando…' : 'Enviar consulta'}
                </span>
              </motion.button>

              <p className="text-white/70 text-[14px] leading-relaxed">
                Respondemos en el día. El primer llamado no tiene cargo.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

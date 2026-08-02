import { motion } from 'framer-motion'
import { MaskReveal } from '../components/effects/MaskReveal'
import { BlurReveal } from '../components/effects/BlurReveal'
import { MagneticButton } from '../components/effects/MagneticButton'
import { WaveDivider } from '../components/ui/WaveDivider'
import { Footer } from '../components/layout/Footer'
import { SPRING } from '../lib/motion'
import { SHADOW } from '../lib/shadows'
import { BAND } from '../lib/palette'
import { WHATSAPP_URL } from '../lib/constants'
import { PaperGround } from '../components/ui/PaperGround'

/**
 * Both footers linked "Políticas de Privacidad" at `href="#"`, which scrolled the
 * visitor to the top of the page they were already on. This is the destination.
 *
 * It deliberately does **not** contain a privacy policy. LIBA has not written one,
 * and inventing legal text on a page a client may rely on is the opposite of what
 * this business sells. What it does instead is state, accurately, what the site
 * actually does with what you send it — every claim below is verifiable from this
 * repository — and say plainly that the formal document is still pending. Naming
 * the gap is the honest version of this page; a fabricated policy is not.
 */

const HANDLING = [
  {
    title: 'El formulario de contacto',
    body: 'Lo que escribís en el formulario de Contacto (nombre, tu WhatsApp o email, el trámite y tu descripción del caso) se envía por correo a LIBA a través de EmailJS, el servicio que entrega el mensaje. No queda guardado en este sitio: no hay base de datos, ni cuentas, ni historial de casos acá.',
  },
  {
    title: 'WhatsApp y Calendly',
    body: 'Los botones de WhatsApp abren una conversación en la aplicación de WhatsApp, y el de agendar consulta abre Calendly. Desde ese momento la conversación y tus datos están en esas plataformas, sujetos a sus propias políticas, no a este sitio.',
  },
  {
    title: 'Seguimiento y publicidad',
    body: 'Este sitio no tiene analítica, ni píxeles publicitarios, ni cookies propias de seguimiento. El video del inicio se sirve desde YouTube y el mapa de Contacto desde OpenStreetMap, así que esos dos recuadros sí cargan contenido de terceros.',
  },
  {
    title: 'La documentación de tu trámite',
    body: 'La documentación de un trámite nunca se sube por este sitio. Se entrega directamente al equipo cuando la gestión ya empezó, y su tratamiento es parte de la relación profesional, no de esta página.',
  },
]

export function Privacy() {
  return (
    <div className="bg-white">

      <section className="relative isolate overflow-hidden pt-24 sm:pt-28 pb-14 px-4 sm:px-6">
        <PaperGround />
        <div className="max-w-3xl mx-auto">

          <MaskReveal
            as="h1"
            className="text-navy font-black text-[clamp(1.5rem,5vw,3.125rem)] leading-tight block font-alverata mb-5"
            stagger={0.04}
            amount={0.2}
          >
            Qué hacemos con tus datos
          </MaskReveal>

          <BlurReveal delay={0.1}>
            <p className="text-navy text-base sm:text-lg font-semibold leading-relaxed mb-4">
              Todavía no publicamos nuestra política de privacidad formal. Preferimos decirte eso
              antes que ponerte a firmar un texto que no redactamos.
            </p>
          </BlurReveal>

          <BlurReveal delay={0.18}>
            <p className="text-navy/70 text-sm sm:text-base leading-relaxed">
              Lo que sí podemos decirte hoy, con precisión, es qué hace este sitio con lo que le
              escribís. Es poco, y está todo acá abajo. Cuando el documento completo esté listo,
              va a vivir en esta misma página.
            </p>
          </BlurReveal>

        </div>
      </section>

      <WaveDivider fromColor={BAND.white} toColor={BAND.cool} />

      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-paper-cool">
        <div className="max-w-3xl mx-auto">
          <BlurReveal>
            <h2 className="text-navy font-black text-2xl sm:text-3xl leading-tight block font-alverata mb-8">
              Cómo se maneja lo que nos mandás
            </h2>
          </BlurReveal>

          <dl className="space-y-0">
            {HANDLING.map((item, i) => (
              <BlurReveal key={item.title} delay={i * 0.06}>
                <div className="border-t border-navy/10 py-6">
                  <dt className="text-navy font-bold text-[1.0625rem] sm:text-xl leading-snug mb-2">
                    {item.title}
                  </dt>
                  <dd className="text-navy/70 text-sm sm:text-[15px] leading-relaxed">
                    {item.body}
                  </dd>
                </div>
              </BlurReveal>
            ))}
          </dl>
        </div>
      </section>

      <WaveDivider fromColor={BAND.cool} toColor={BAND.white} />

      <section className="relative isolate overflow-hidden py-14 sm:py-16 px-4 sm:px-6">
        <PaperGround />
        <div className="max-w-2xl mx-auto text-center">
          <BlurReveal>
            <h2 className="text-navy font-black text-xl sm:text-2xl md:text-3xl leading-tight block font-alverata mb-3">
              ¿Querés que borremos tu consulta?
            </h2>
          </BlurReveal>
          <BlurReveal delay={0.08}>
            <p className="text-navy/70 text-sm sm:text-base leading-relaxed mb-7">
              Escribinos y la eliminamos de nuestro correo. Lo mismo si querés saber qué tenemos
              tuyo o corregir un dato: preguntanos directamente y te respondemos una persona, no
              un formulario.
            </p>
          </BlurReveal>
          <BlurReveal delay={0.16}>
            <MagneticButton>
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-navy text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full"
                whileHover={{ scale: 1.03, boxShadow: SHADOW.navyBloom }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.press}
              >
                Consultar por WhatsApp
              </motion.a>
            </MagneticButton>
          </BlurReveal>
        </div>
      </section>

      {/* La franja de copyright que cerraba esta página la cierra ahora el mismo
          footer que el resto del sitio, con el índice completo — que es
          justamente lo que le faltaba a la ruta más aislada de las ocho. */}
      <Footer />

    </div>
  )
}

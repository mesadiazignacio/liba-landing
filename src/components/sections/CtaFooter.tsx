import { motion } from 'framer-motion'
import { BlurReveal } from '../effects/BlurReveal'
import { MagneticButton } from '../effects/MagneticButton'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { SPRING } from '../../lib/motion'
import { SHADOW } from '../../lib/shadows'
import { WHATSAPP_URL, CALENDLY_URL } from '../../lib/constants'
import { PaperGround } from '../ui/PaperGround'

// Decorative: the button's own label already says Calendly, so the icon must not
// repeat it to a screen reader. `aria-hidden` with a non-empty `alt` is a
// contradiction — the empty alt is the part that does the work.
function CalendlyIcon({ className }: { className?: string }) {
  return <img src="/calendly-logo.png" alt="" className={className} aria-hidden />
}

export function CtaFooter() {
  return (
    <section id="contacto" className="relative isolate bg-white py-14 sm:py-16 overflow-hidden">
      <PaperGround />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">

        {/* This block is shared by five surfaces, each of which already spends
            its word-mask on its own h1. It closes every one of them, so it takes
            the Display step from DESIGN.md rather than the undocumented 2.6rem it
            had been hand-typing alongside two other surfaces. */}
        <BlurReveal amount={0.3}>
          <h2 className="text-navy font-black text-[clamp(1.5rem,5vw,3.125rem)] leading-tight mb-10 block font-alverata">
            ¿Querés trabajar con alguien en quien puedas confiar?
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.12}>
          <div className="bg-paper-cool rounded-2xl p-5 sm:p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* WhatsApp */}
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

              {/* Calendly */}
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

        {/* El copyright y el enlace a Privacidad vivían acá y ahora viven en
            `Footer`, que cierra las ocho rutas. Este bloque no es un footer — es
            el llamado a la acción, y el footer real va inmediatamente debajo. */}

      </div>
    </section>
  )
}

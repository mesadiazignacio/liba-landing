import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BlurReveal } from '../effects/BlurReveal'
import { MagneticButton } from '../effects/MagneticButton'
import { SPRING } from '../../lib/motion'
import { SHADOW } from '../../lib/shadows'
import { WHATSAPP_URL, CALENDLY_URL } from '../../lib/constants'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
  )
}

// Decorative: the button's own label already says Calendly, so the icon must not
// repeat it to a screen reader. `aria-hidden` with a non-empty `alt` is a
// contradiction — the empty alt is the part that does the work.
function CalendlyIcon({ className }: { className?: string }) {
  return <img src="/calendly-logo.png" alt="" className={className} aria-hidden />
}

export function CtaFooter() {
  return (
    <section id="contacto" className="relative bg-white py-14 sm:py-16 overflow-hidden">
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

        <BlurReveal delay={0.4}>
          <div className="pt-10 pb-6">
            <p className="text-navy text-sm sm:text-base font-semibold leading-tight">
              ©{new Date().getFullYear()} LIBA Gestoría - Todos los derechos reservados |{' '}
              {/* Was href="#", which jumped the visitor to the top of the page. */}
              <Link to="/privacy" className="underline decoration-navy/30 underline-offset-2 hover:opacity-70 transition-opacity duration-200">
                Políticas de Privacidad
              </Link>
            </p>
          </div>
        </BlurReveal>

      </div>
    </section>
  )
}

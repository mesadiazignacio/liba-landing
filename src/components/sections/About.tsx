import { BlurReveal } from '../effects/BlurReveal'
import { CursorGlow } from '../effects/CursorGlow'

export function About() {
  return (
    <section id="nosotros" className="relative px-5 sm:px-8 py-14 sm:py-16 overflow-hidden">
      {/* coral (#ed6d92), not the superseded #e8577d this used to pass. */}
      <CursorGlow color="rgba(237,109,146,0.11)" size={450} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* The word-mask entrance is reserved for the statement that opens a
            surface — on the home page that is the hero h1. Six of them on one
            scroll turned the page into a slideshow. */}
        <BlurReveal amount={0.3}>
          {/* The Display step from DESIGN.md verbatim. This was three hand-typed
              literals — 24/38/50 — whose endpoints already were the documented
              clamp's, with an off-ramp 38px in the middle. */}
          <h2 className="text-white font-black text-[clamp(1.5rem,5vw,3.125rem)] leading-[1.06] mb-6 sm:mb-8 block font-alverata">
            Gestoría del automotor con criterio, norma y acompañamiento humano.
          </h2>
        </BlurReveal>

        <div className="flex flex-col gap-4">
          <BlurReveal delay={0.1}>
            <p className="text-white text-[15px] sm:text-lg md:text-2xl leading-relaxed sm:leading-[1.12] font-medium">
              {/* Plural, matching the paragraph below it — this sentence was the
                  last first-person singular left in the shipped copy. */}
              Detrás de cada trámite hay una historia. Te escuchamos y actuamos con empatía y
              transparencia para brindarte la confianza que necesitás.
            </p>
          </BlurReveal>
          <BlurReveal delay={0.18}>
            <p className="text-white/85 text-[15px] sm:text-lg md:text-2xl leading-relaxed sm:leading-[1.12] font-medium">
              No sólo hacemos el trámite. Te explicamos qué pasa en cada etapa, te avisamos si hay
              un problema antes de que se agrave y buscamos todas las alternativas posibles
              para que tu caso se resuelva.
            </p>
          </BlurReveal>
        </div>
      </div>
    </section>
  )
}

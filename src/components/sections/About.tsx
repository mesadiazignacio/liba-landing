/* Esta banda era `bg-navy` a sangre: el campo saturado más alto del sitio, y
   además la voz equivocada. Lo que dice acá — "Detrás de cada trámite hay una
   historia. Te escuchamos y actuamos con empatía" — es el registro humano, que
   en este sistema es el coral, no el navy. Pintarlo sobre el azul institucional
   pleno era gritar con el timbre de la otra voz. Sobre `paper-cool` el texto va
   en navy, que es donde el navy sí significa algo: la tinta de lo que se afirma.
   El panel de la norma en `WhyChoose` queda como el único navy saturado del
   scroll, que es exactamente el reclamo que el color existe para llevar.

   Se va el `CursorGlow`: sobre el azul pleno era calidez ambiente, sobre un
   tinte pálido es una mancha rosa. Y un halo significa "esto te responde" —
   esta sección no responde a nada. En su lugar va `PaperGround`, la misma capa
   que llevan todas las bandas claras del sitio, así que la firma espacial se
   mantiene en vez de perderse. */

import { BlurReveal } from '../effects/BlurReveal'
import { PaperGround } from '../ui/PaperGround'

export function About() {
  return (
    <section id="nosotros" className="relative isolate bg-paper-cool px-5 sm:px-8 py-14 sm:py-16 overflow-hidden">
      {/* `isolate` es obligatorio y no decorativo: `PaperGround` se monta en
          `-z-10` y sin contexto de apilamiento propio se hunde detrás del fondo
          de la banda y desaparece. */}
      <PaperGround />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* The word-mask entrance is reserved for the statement that opens a
            surface — on the home page that is the hero h1. Six of them on one
            scroll turned the page into a slideshow. */}
        <BlurReveal amount={0.3}>
          {/* The Display step from DESIGN.md verbatim. This was three hand-typed
              literals — 24/38/50 — whose endpoints already were the documented
              clamp's, with an off-ramp 38px in the middle. */}
          <h2 className="text-navy font-black text-[clamp(1.5rem,5vw,3.125rem)] leading-[1.06] mb-6 sm:mb-8 block font-alverata">
            Gestoría del automotor con criterio, norma y acompañamiento humano.
          </h2>
        </BlurReveal>

        <div className="flex flex-col gap-4">
          <BlurReveal delay={0.1}>
            <p className="text-navy text-[15px] sm:text-lg md:text-2xl leading-relaxed sm:leading-[1.12] font-medium">
              {/* Plural, matching the paragraph below it — this sentence was the
                  last first-person singular left in the shipped copy. */}
              Detrás de cada trámite hay una historia. Te escuchamos y actuamos con empatía y
              transparencia para brindarte la confianza que necesitás.
            </p>
          </BlurReveal>
          <BlurReveal delay={0.18}>
            <p className="text-navy/80 text-[15px] sm:text-lg md:text-2xl leading-relaxed sm:leading-[1.12] font-medium">
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

/* El manifiesto.
 *
 * Sobre `paper-cool` y en navy: es la voz de lo que LIBA afirma de sí misma. La
 * novedad es cómo se lee. Los dos párrafos van en el mismo display serif que el
 * título, con el tamaño de la misión de «Sobre LIBA», y no llegan como una masa: se van
 * encendiendo palabra por palabra a medida que el visitante baja, en el ritmo
 * en que baja. Es un texto largo para un home y el scroll lo vuelve lectura en
 * vez de bloque — y el gesto es el mismo del sitio entero: algo avanza, y se ve
 * hasta dónde llegó.
 *
 * El título mantiene la entrada tranquila; la máscara de palabras sigue siendo
 * una sola por superficie y es la del hero. */

import { BlurReveal } from '../effects/BlurReveal'
import { ScrubText } from '../effects/ScrubText'
import { PaperGround } from '../ui/PaperGround'

export function About() {
  return (
    <section id="nosotros" className="relative isolate overflow-hidden bg-paper-cool px-5 py-16 sm:px-8 sm:py-24">
      {/* `isolate` es obligatorio: `PaperGround` se monta en `-z-10` y sin
          contexto de apilamiento propio se hunde detrás del fondo de la banda. */}
      <PaperGround />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <BlurReveal amount={0.3}>
          {/* Título de sección en el escalón Display, un paso por encima de los
              párrafos de abajo. «Nuestra misión» y «Nuestros pilares» en Sobre
              LIBA usan este mismo tamaño. */}
          <h2 className="font-alverata mb-8 block text-2xl sm:text-3xl md:text-4xl font-black leading-[1.06] text-navy sm:mb-10">
            Criterio, norma y acompañamiento humano.
          </h2>
        </BlurReveal>

        <div className="flex flex-col gap-6 sm:gap-8">
          <ScrubText className="font-alverata block text-xl font-black leading-snug text-navy sm:text-2xl md:text-3xl">
            Detrás de cada trámite hay una historia. Te escuchamos y actuamos con empatía y transparencia para brindarte la confianza que necesitás.
          </ScrubText>
          <ScrubText className="font-alverata block text-xl font-black leading-snug text-navy sm:text-2xl md:text-3xl">
            No sólo hacemos el trámite. Te explicamos qué pasa en cada etapa, te avisamos si hay un problema antes de que se agrave y buscamos todas las alternativas posibles para que tu caso se resuelva.
          </ScrubText>
        </div>
      </div>
    </section>
  )
}

/* Recomposed: the five differentiators were five identical navy cards stacked in
   one column, which gave the reader no way to tell that "respaldo normativo" is
   LIBA's lead claim and not just the first item alphabetically. Now the norm claim
   carries the section as a single large navy panel and the other four sit under it
   as a ruled two-column list. Same copy, same palette, same faces — the only thing
   that changed is what outranks what. */

import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { BlurReveal } from '../effects/BlurReveal'
import { ScrubText } from '../effects/ScrubText'
import { StaggerChildren } from '../effects/StaggerChildren'
import { SpotlightCard } from '../effects/SpotlightCard'
import { cardVariant } from '../../lib/animations'
import { DUR, EASE, staggerStep } from '../../lib/motion'
import { features } from '../../data/features'
import { PaperGround } from '../ui/PaperGround'
import { WaveTexture } from '../ui/WaveTexture'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'

const [lead, ...rest] = features

/** La regla de cada ítem se traza de izquierda a derecha al entrar, heredando
 *  el escalonado de la lista: la línea llega antes que el texto que separa. */
const ruleVariant: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: DUR.entrance * 1.6, ease: EASE.out } },
}

/** El acento coral debajo del título del panel: un trazo corto que se dibuja
 *  cuando el panel ya está a la vista. */
const accentVariant: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: DUR.entrance, ease: EASE.out, delay: 0.25 } },
}

export function WhyChoose() {
  const reduced = useReducedMotionSafe()

  // El panel se asienta con el scroll: entra apenas más chico y hundido, y
  // llega a su tamaño cuando su centro alcanza la zona de lectura. Ligado al
  // scroll —se lee en las dos direcciones— y quieto con movimiento reducido.
  const panelRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'center 60%'],
  })
  const panelScale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const panelY = useTransform(scrollYProgress, [0, 1], [48, 0])

  return (
    <section id="por-que" className="relative isolate bg-white px-4 sm:px-6 py-14 sm:py-20 overflow-hidden">
      <PaperGround />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <BlurReveal amount={0.3}>
            <h2 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-tight block font-alverata">
              ¿Por qué elegir LIBA Gestoría?
            </h2>
          </BlurReveal>
        </div>

        {/* The lead claim. Sized to be read first, and the only boxed surface in
            the section so the box itself means something. */}
        <motion.div
          ref={panelRef}
          style={reduced ? undefined : { scale: panelScale, y: panelY }}
        >
        <BlurReveal>
          <SpotlightCard
            className="rounded-2xl bg-navy shadow-card-navy"
            spotlightColor="rgba(255,255,255,0.10)"
            spotlightSize={420}
          >
            {/* La curva de nivel de las losas navy, como en el footer y la hoja
                de ingreso: el panel deja de ser un rectángulo plano. */}
            <WaveTexture />
            {/* Title and claim sit side by side on desktop so the panel is filled
                by its own content rather than by padding — a short title above two
                lines of copy left the right half of a full-width panel empty. */}
            {/* `items-start`, no `items-baseline`. Alinear por primera línea de
                base parece lo correcto y acá es exactamente lo que rompía la
                lectura: el título tiene casi el doble de cuerpo que el párrafo,
                así que con las bases en la misma línea sus alturas de mayúscula
                no pueden coincidir — la del párrafo cae tanto más abajo como
                difieran las dos. Medido, arrancaba 13px por debajo del título en
                todo ancho de dos columnas. El ojo alinea por el techo de la
                tinta, no por la base. */}
            <div className="relative px-6 py-8 sm:px-10 sm:py-11 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 items-start">
              {/* One step below the section's own h2, on the documented ladder —
                  no new type sizes were needed to make this outrank the list.

                  `md:leading-[1.06]` y no sólo `leading-[1.06]`: las utilidades
                  de tamaño de Tailwind traen su propia interlínea, así que
                  `md:text-3xl` le ganaba a la interlínea sin prefijo y el
                  display renderizaba a 1.2 en vez del 1.06 que documenta el
                  sistema. Con prefijo empatan en especificidad y gana la última,
                  que es esta. */}
              <motion.div
                className="md:col-span-5"
                initial={reduced ? undefined : 'hidden'}
                whileInView={reduced ? undefined : 'visible'}
                viewport={{ once: true, amount: 0.6 }}
              >
                <h3 className="text-white font-black font-alverata text-xl sm:text-2xl md:text-3xl leading-[1.06] sm:leading-[1.06] md:leading-[1.06]">
                  {lead.title}
                </h3>
                <motion.span
                  aria-hidden
                  variants={accentVariant}
                  className="mt-4 block h-[3px] w-12 origin-left rounded-full bg-coral sm:mt-5"
                />
              </motion.div>
              {/* Los dos bloques arrancan en el mismo borde de caja, pero no en
                  la misma tinta: cada tamaño reserva la mitad de su interlínea
                  arriba de las mayúsculas, y la del párrafo es mucho mayor. El
                  desplazamiento cancela esa diferencia medida. Va sólo en `md`,
                  que es donde existen las dos columnas — apilado, subir el
                  párrafo sería comerse el aire que lo separa del título. */}
              {/* La afirmación principal se enciende palabra por palabra al ritmo
                  del scroll, el mismo gesto que el manifiesto del home. */}
              <ScrubText
                from={0.25}
                className="md:col-span-7 md:-mt-[7px] text-white/85 text-[15px] sm:text-lg leading-relaxed"
              >
                {lead.description}
              </ScrubText>
            </div>
          </SpotlightCard>
        </BlurReveal>
        </motion.div>

        {/* The remaining four as a ruled list. Hairlines instead of card edges:
            they read as one continuous argument rather than four separate pitches,
            and nothing pretends to outrank the panel above. */}
        <StaggerChildren
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-14"
          staggerDelay={staggerStep(rest.length)}
        >
          {rest.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={cardVariant}
              // navy/10, which is what DESIGN.md prescribes for a hairline on a
              // light ground. `border-cool` is documented but has no Tailwind
              // token, so a `border-border-cool` class draws nothing.
              className={`group relative py-6 sm:py-7 ${
                // Close the list on desktop, where two columns end unevenly.
                i >= rest.length - 2 ? 'sm:border-b' : ''
              } ${i === rest.length - 1 ? 'border-b' : ''} border-navy/10`}
            >
              {/* La regla superior, trazada al entrar. Encima, un tramo coral
                  que la recorre al pasar el puntero: el único hover de la
                  lista, y dice "este es el que estás leyendo". */}
              <motion.span
                aria-hidden
                variants={ruleVariant}
                className="absolute inset-x-0 top-0 h-px origin-left bg-navy/10"
              />
              <span
                aria-hidden
                className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-coral transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
              <h3 className="text-navy font-bold text-[1.0625rem] sm:text-xl leading-snug mb-2 transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                {feature.title}
              </h3>
              {/* `/80`, no `/70`: medido, `navy/70` da 3.98:1 sobre blanco a
                  15px — bajo el piso AA de 4.5. `/80` mide 5.05:1 y la lista
                  sigue leyéndose un escalón por debajo de su título. */}
              <p className="text-navy/80 text-sm sm:text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}

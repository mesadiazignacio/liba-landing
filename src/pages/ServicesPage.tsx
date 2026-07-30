import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BlurReveal } from '../components/effects/BlurReveal'
import { MaskReveal } from '../components/effects/MaskReveal'
import { MagneticButton } from '../components/effects/MagneticButton'
import { DUR, EASE, SPRING, staggerStep } from '../lib/motion'
import { SHADOW } from '../lib/shadows'
import { CtaFooter } from '../components/sections/CtaFooter'

// ── Data ──────────────────────────────────────────────────────────────────

const painPoints = [
  '"Compré un auto y no sé cómo hacer la transferencia."',
  '"Me robaron el auto y no sé qué hacer con el seguro."',
  '"Quiero comprar, pero temo deudas o problemas."',
  '"Tengo infracciones y no sé si se pueden resolver."',
  '"Tengo una sucesión y no sé cómo poner el auto a mi nombre."',
]

const serviceCards = [
  {
    id: 'transferencia',
    title: 'Transferencia y regularización',
    description:
      'Acompañamos al comprador y vendedor para que el trámite sea simple y sin sorpresas. Gestionamos el proceso ante el Registro del Automotor, verificamos la documentación y resolvemos cualquier situación en el camino.',
    destinado:
      'Compradores y vendedores de autos y motos que buscan gestionar el trámite de forma segura y sin errores.',
  },
  {
    id: 'robo',
    title: 'Gestión de robo e infracción por demora',
    description:
      'Cuando tu aseguradora te informa que hay un trámite pendiente por robo o demoras en la baja del vehículo, nosotros nos encargamos de todo: la documentación, los plazos y la coordinación con el Registro.',
    destinado:
      'Personas con vehículos robados o con infracciones registrales vinculadas a la demora en la baja o recupero del rodado.',
  },
  {
    id: 'pack',
    title: 'Pack de asesoramiento previo a la compra de un auto',
    description:
      'Antes de firmar cualquier documento, te protegemos. Verificamos el estado registral, impositivo y judicial del vehículo para que compres con certeza y sin sorpresas después.',
    destinado:
      'Personas que están por comprar un auto usado y quieren asegurarse de que el vehículo esté libre de deudas, inhibiciones o problemas legales.',
  },
  {
    id: 'denuncia',
    title: 'Denuncia de compra y posesión',
    description:
      'Si ya tenés el vehículo pero aún no terminaste la transferencia, la denuncia de compra y posesión te protege legalmente. La gestionamos de forma rápida y con el respaldo normativo correspondiente.',
    destinado:
      'Compradores que tienen el vehículo en su poder pero no completaron la transferencia y necesitan resguardarse legalmente.',
  },
]

// ── Sub-components ────────────────────────────────────────────────────────

/**
 * The pair under every service entry.
 *
 * "Ver trámite en detalle" was a bare `<motion.button>` with no `onClick` and no
 * destination — it hovered, it pressed, and it did nothing, six times on this page
 * plus twice more in the hero and the closing CTA. The catalog it was always
 * pointing at is `/procedures`. Plain route, no `#tramites` hash: `ScrollToTop`
 * resets the offset on every route mount, so a hash would be dropped on arrival.
 */
function CardButtons() {
  return (
    <div className="flex flex-wrap gap-2 pt-4 border-t border-navy/10">
      <MagneticButton strength={0.1}>
        <motion.div
          whileHover={{ scale: 1.04, boxShadow: SHADOW.navyBloom }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING.press}
          className="rounded-full"
        >
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-1 bg-navy text-white font-semibold text-xs px-4 py-2 rounded-full"
          >
            Consultar mi caso →
          </Link>
        </motion.div>
      </MagneticButton>
      <MagneticButton strength={0.1}>
        <motion.div
          whileHover={{ scale: 1.04, boxShadow: SHADOW.outlinedBloom }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING.press}
          className="rounded-full"
        >
          <Link
            to="/procedures"
            className="inline-flex items-center gap-1 bg-white text-navy font-semibold text-xs px-4 py-2 rounded-full border border-navy/20"
          >
            Ver trámite en detalle →
          </Link>
        </motion.div>
      </MagneticButton>
    </div>
  )
}

/* Recomposed: four identical bordered cards in a 2x2 gave every service the same
   weight and squeezed four long, genuinely different descriptions into the same
   short measure. They now read as a ruled index — title held in a narrow left
   column at heading scale, description on a comfortable measure beside it — so a
   reader can scan the five titles down one edge and stop where it applies to them.
   Same copy, same tokens, no boxes, nothing added. */
/**
 * One entry in the ruled index. `title` and `children` rather than a card object,
 * because the sucesión entry below had been a hand-copied duplicate of this exact
 * markup — same grid, same column spans, same type — purely so it could carry a
 * second paragraph and an aside. Two copies of one layout is how the fifth entry
 * quietly stops matching the first four.
 */
function ServiceEntry({ title, children }: { title: string; children: ReactNode }) {
  return (
    <motion.div
      className="border-t border-navy/10 py-8 sm:py-10"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: DUR.entrance, ease: EASE.out }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4">
        <div className="md:col-span-4">
          <h3 className="text-navy font-black font-alverata text-xl sm:text-2xl leading-[1.1]">
            {title}
          </h3>
        </div>

        <div className="md:col-span-8">
          {children}
          <CardButtons />
        </div>
      </div>
    </motion.div>
  )
}

/** The "Destinado a:" line, identical on every entry. */
function DestinedFor({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm text-navy/60 leading-relaxed max-w-2xl">
      <span className="font-semibold text-navy">Destinado a: </span>
      {children}
    </p>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────

export function ServicesPage() {
  return (
    <div className="bg-white">

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-28 pb-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-6">
            <MaskReveal
              as="h1"
              className="text-navy font-black text-[clamp(1.5rem,5vw,3.125rem)] leading-tight block font-alverata"
              stagger={0.04}
              amount={0.2}
            >
              Compra o venta de tu vehículo, sin complicaciones
            </MaskReveal>
          </div>

          {/* Hero image */}
          <BlurReveal delay={0.15}>
            <div className="relative w-full rounded-2xl overflow-hidden mb-5" style={{ aspectRatio: '16/7' }}>
              <img
                src="/services-hero.png"
                alt="Asesoramiento en gestoría del automotor"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </BlurReveal>

          {/* Description + CTAs */}
          <BlurReveal delay={0.25}>
            <div className="py-6 sm:py-7">
              <p className="text-navy text-sm sm:text-base leading-relaxed text-center mb-5 font-semibold mx-auto">
                Te ayudamos con transferencias, seguros, verificación previa a la compra e infracciones.
                Trabajamos con acompañamiento personalizado, lenguaje claro, gestión integral
                y brindándote comodidad para que no tengas que preocuparte por nada.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <MagneticButton>
                  <motion.div
                    whileHover={{ scale: 1.03, boxShadow: SHADOW.navyBloom }}
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING.press}
                    className="rounded-full"
                  >
                    <Link
                      to="/contact-us"
                      className="inline-flex items-center justify-center gap-2 bg-navy text-white font-bold text-sm sm:text-base px-7 py-3 rounded-full"
                    >
                      Consultar mi caso →
                    </Link>
                  </motion.div>
                </MagneticButton>
                <MagneticButton>
                  <motion.div
                    whileHover={{ scale: 1.03, boxShadow: SHADOW.outlinedBloom }}
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING.press}
                    className="rounded-full"
                  >
                    <Link
                      to="/procedures"
                      className="inline-flex items-center justify-center gap-2 bg-white text-navy font-bold text-sm sm:text-base px-7 py-3 rounded-full border border-navy/20"
                    >
                      Ver trámite en detalle →
                    </Link>
                  </motion.div>
                </MagneticButton>
              </div>
            </div>
          </BlurReveal>

        </div>
      </section>

      {/* ── 2. PAIN POINTS ──────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">

          <BlurReveal>
            <h2 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-tight block font-alverata mb-5">
              ¿Los trámites automotores te resultan confusos?
            </h2>
          </BlurReveal>

          <BlurReveal delay={0.08}>
            <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
              No sos el único. La mayoría de las personas llega con situaciones como estas:
            </p>
          </BlurReveal>

          {/* Coral pill cards — row 1: 3 cards, row 2: 2 cards centradas.
              The rows are laid out separately but arrive as one list, so the
              delay is derived from the card's index across the whole set rather
              than hand-offset per row. */}
          <div className="mb-8 space-y-3">
            {[painPoints.slice(0, 3), painPoints.slice(3)].map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid grid-cols-1 gap-3 ${rowIndex === 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}
              >
                {row.map((point, i) => {
                  const index = rowIndex === 0 ? i : 3 + i
                  return (
                    <motion.div
                      key={point}
                      className="bg-coral-deep text-white text-sm font-medium px-5 py-4 rounded-2xl text-center leading-snug"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: DUR.entrance,
                        delay: index * staggerStep(painPoints.length),
                        ease: EASE.out,
                      }}
                    >
                      {point}
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </div>

          <BlurReveal delay={0.35}>
            <p className="text-navy font-semibold text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Más que solo darte información, te acompañamos en todo el proceso.
              Analizamos tu caso, te explicamos las opciones y gestionamos la mejor solución para vos.
            </p>
          </BlurReveal>

        </div>
      </section>

      {/* ── 3. SERVICES ─────────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-10">
            <BlurReveal>
              <h2 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-tight block font-alverata">
                ¿Qué trámites podemos resolver juntos?
              </h2>
            </BlurReveal>
          </div>

          {/* The indexed list. The sucesión service continues the same numbering
              below rather than sitting in its own wider box: it is the fifth
              entry, not a different kind of thing. */}
          <div>
            {serviceCards.map((card) => (
              <ServiceEntry key={card.id} title={card.title}>
                <p className="text-navy/70 text-sm sm:text-base leading-relaxed mb-4 max-w-2xl">
                  {card.description}
                </p>
                <DestinedFor>{card.destinado}</DestinedFor>
              </ServiceEntry>
            ))}

            {/* The fifth entry, in the same component as the other four: it is the
                next item in the index, not a different kind of thing. */}
            <ServiceEntry title="Transferencia de vehículos por oficio de sucesión">
              <p className="text-navy/70 text-sm sm:text-base leading-relaxed mb-4 max-w-2xl">
                Cuando hay necesidad de realizar una sucesión, el vehículo a tratar puede quedarse en un
                limbo registral durante meses (o años) si no se sabe cómo avanzar. Si ya contás con el
                oficio sucesorio emitido en el juzgado, nosotros nos encargamos de todo lo que sigue: la
                gestión ante el Registro de la Propiedad del Automotor para que el vehículo quede a nombre
                de los herederos o de un tercero de manera definitiva.
              </p>

              <p className="text-navy/70 text-sm sm:text-base leading-relaxed mb-4 max-w-2xl">
                Si es necesario trabajamos en coordinación con el abogado para que el trámite registral
                fluya sin fricciones y brindándote alivio en este acompañamiento.
              </p>

              <DestinedFor>
                Herederos que ya tienen el oficio judicial de sucesión y necesitan completar el trámite
                registral para que el vehículo quede legalmente a su nombre, o a nombre de un tercero.
              </DestinedFor>

              {/* The one genuinely conditional aside on the page, so it keeps its
                  panel — it is a different kind of information, not another entry. */}
              <div className="bg-paper-cool rounded-2xl p-5 mt-5 max-w-2xl">
                <p className="text-navy font-semibold text-sm mb-1.5">
                  ¿Todavía no tenés el oficio de sucesión?
                </p>
                <p className="text-navy/70 text-sm leading-relaxed">
                  Este paso corresponde al proceso judicial que lleva tu abogado. Una vez que esté emitido,
                  nosotros tomamos el trámite desde ahí. Si tenés dudas sobre en qué etapa estás,
                  contános y te orientamos.
                </p>
              </div>
            </ServiceEntry>
          </div>

        </div>
      </section>

      {/* ── 4. INFO CTA ─────────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <BlurReveal>
            <h2 className="text-navy font-black text-xl sm:text-2xl md:text-3xl leading-tight block font-alverata mb-3">
              ¿Buscás información más detallada sobre algún trámite?
            </h2>
          </BlurReveal>

          <BlurReveal delay={0.08}>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              En nuestra sección de trámites explicamos paso a paso cómo funciona cada proceso:
              qué documentación necesitás, cuánto tarda y cómo lo resolvemos.
            </p>
          </BlurReveal>

          {/* The section's whole point is to send the reader to the catalog, and
              this was the third dead button on the page. */}
          <BlurReveal delay={0.2}>
            <MagneticButton>
              <motion.div
                className="rounded-full inline-block"
                whileHover={{ scale: 1.04, boxShadow: SHADOW.coralBloom }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.press}
              >
                <Link
                  to="/procedures"
                  className="inline-flex items-center justify-center gap-2 bg-coral-deep text-white font-bold text-sm sm:text-base px-7 py-3 rounded-full"
                >
                  Ver todos los trámites →
                </Link>
              </motion.div>
            </MagneticButton>
          </BlurReveal>
        </div>
      </section>

      {/* ── 5. CTA FOOTER ───────────────────────────────────────────────── */}
      <CtaFooter />

    </div>
  )
}

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MaskReveal } from '../components/effects/MaskReveal'
import { BlurReveal } from '../components/effects/BlurReveal'
import { MagneticButton } from '../components/effects/MagneticButton'
import { Disclosure } from '../components/ui/Disclosure'
import { CtaFooter } from '../components/sections/CtaFooter'
import { Footer } from '../components/layout/Footer'
import { useScrollToId } from '../hooks/useScrollToId'
import { SPRING, staggerStep } from '../lib/motion'
import { SHADOW } from '../lib/shadows'
import { COLOR } from '../lib/palette'
import { PaperGround } from '../components/ui/PaperGround'
import {
  procedureCategories,
  type Procedure,
  type ProcedureBlock,
  type ProcedureCategory,
} from '../data/procedures'

// ── Tone helpers ─────────────────────────────────────────────────────────────

const TONE = {
  navy: { band: COLOR.paperCool, bandText: 'text-navy', card: COLOR.paperCool },
  coral: { band: COLOR.coralDeep, bandText: 'text-white', card: COLOR.paperBlush },
} as const

// ── Bloques de contenido ─────────────────────────────────────────────────────

function ProcedureBlockView({ block }: { block: ProcedureBlock }) {
  if (block.kind === 'intro') {
    return <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{block.text}</p>
  }

  if (block.kind === 'note') {
    return (
      <div className="bg-white/70 rounded-2xl p-4 border border-navy/10">
        <p className="text-navy font-bold text-sm mb-1.5">{block.heading}</p>
        <div className="space-y-1.5">
          {block.items.map((item, i) => (
            <p key={i} className="text-gray-600 text-sm leading-relaxed">
              {item}
            </p>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="text-navy font-semibold text-sm sm:text-base mb-2">{block.heading}</p>
      <ul className="flex flex-col gap-1.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-coral flex-shrink-0" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Acordeón por trámite ─────────────────────────────────────────────────────

function ProcedureItem({
  procedure,
  color,
  delay,
}: {
  procedure: Procedure
  color: string
  delay: number
}) {
  return (
    <BlurReveal delay={delay}>
      <Disclosure
        background={color}
        summary={
          <span className="min-w-0">
            <span className="block text-navy font-bold text-base sm:text-[17px] leading-snug">
              {procedure.title}
            </span>
            {procedure.subtitle && (
              <span className="block text-gray-500 text-xs sm:text-sm mt-1 leading-snug">
                {procedure.subtitle}
              </span>
            )}
          </span>
        }
      >
        <div className="flex flex-col gap-5">
          {procedure.blocks.map((block, i) => (
            <ProcedureBlockView key={i} block={block} />
          ))}
        </div>
      </Disclosure>
    </BlurReveal>
  )
}

// ── Categoría (banda + acordeones) ───────────────────────────────────────────

function CategoryBlock({ category }: { category: ProcedureCategory }) {
  const tone = TONE[category.tone]

  return (
    <div>
      <BlurReveal>
        <div
          className="rounded-2xl px-6 py-4 mb-4 sm:mb-5"
          style={{ backgroundColor: tone.band }}
        >
          <h2
            className={`${tone.bandText} font-black text-lg sm:text-xl md:text-2xl leading-tight font-alverata`}
          >
            {category.title}
          </h2>
        </div>
      </BlurReveal>

      <div className="space-y-3 sm:space-y-4">
        {category.procedures.map((procedure, i) => (
          <ProcedureItem
            key={procedure.title}
            procedure={procedure}
            color={tone.card}
            delay={i * staggerStep(category.procedures.length, 0.05)}
          />
        ))}
      </div>
    </div>
  )
}

// ── Página ───────────────────────────────────────────────────────────────────

export function Procedures() {
  const scrollToId = useScrollToId()

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden pt-24 sm:pt-28 pb-10 px-4 sm:px-6">
        <PaperGround />
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-6">
            <MaskReveal
              as="h1"
              className="text-navy font-black text-[clamp(1.5rem,5vw,3.125rem)] leading-tight block font-alverata"
              stagger={0.04}
              amount={0.2}
            >
              Todo lo que necesitás saber sobre los trámites de automotor.
            </MaskReveal>
          </div>

          {/* Placeholder de imagen (reemplazable por /procedures-hero.png).
              DESIGN.md records this coral-to-navy gradient as a stand-in awaiting
              the real photograph, not a pattern to copy. */}
          <BlurReveal delay={0.15}>
            <div
              className="relative w-full rounded-2xl overflow-hidden mb-6"
              style={{
                aspectRatio: '16/7',
                background: `linear-gradient(135deg, ${COLOR.coralLight} 0%, ${COLOR.navy} 100%)`,
              }}
            />
          </BlurReveal>

          {/* CTAs */}
          <BlurReveal delay={0.25}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
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
                {/* Was a bare href="#tramites". Lenis is driving the page, so a
                    native anchor jump left its internal offset stale and the next
                    wheel event snapped the visitor back up here. */}
                <motion.button
                  type="button"
                  onClick={() => scrollToId('tramites')}
                  className="inline-flex items-center justify-center gap-2 bg-white text-navy font-bold text-sm sm:text-base px-7 py-3 rounded-full border border-navy/20"
                  whileHover={{ scale: 1.03, boxShadow: SHADOW.outlinedBloom }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING.press}
                >
                  Ver todos los trámites →
                </motion.button>
              </MagneticButton>
            </div>
          </BlurReveal>

          {/* Subtítulo + descripción */}
          <div className="max-w-3xl mx-auto text-center">
            <BlurReveal>
              <h2 className="text-navy font-black text-xl sm:text-2xl md:text-3xl leading-tight block font-alverata mb-4">
                Hacé clic en cada trámite para ver o cerrar el detalle.
              </h2>
            </BlurReveal>
            <BlurReveal delay={0.08}>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Cada trámite tiene sus requisitos, sus tiempos y sus posibles complicaciones.
                Acá encontrás la información clara que el sistema no te da. Si tenés dudas,
                estamos a solo un mensaje de distancia.
              </p>
            </BlurReveal>
          </div>

        </div>
      </section>

      {/* ── CATEGORÍAS + TRÁMITES ────────────────────────────────────────── */}
      <section id="tramites" className="relative isolate overflow-hidden scroll-mt-24 pb-16 px-4 sm:px-6">
        <PaperGround />
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          {procedureCategories.map((category) => (
            <CategoryBlock key={category.title} category={category} />
          ))}
        </div>
      </section>

      <CtaFooter />
      <Footer />

    </div>
  )
}

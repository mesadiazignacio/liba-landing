import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MaskReveal } from '../components/effects/MaskReveal'
import { BlurReveal } from '../components/effects/BlurReveal'
import { MagneticButton } from '../components/effects/MagneticButton'
import { StaggerChildren } from '../components/effects/StaggerChildren'
import { Disclosure } from '../components/ui/Disclosure'
import { CtaFooter } from '../components/sections/CtaFooter'
import { Footer } from '../components/layout/Footer'
import { useScrollToId } from '../hooks/useScrollToId'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'
import { cardVariant } from '../lib/animations'
import { DUR, EASE, SPRING, staggerStep } from '../lib/motion'
import { SHADOW } from '../lib/shadows'
import { COLOR } from '../lib/palette'
import { PaperGround } from '../components/ui/PaperGround'
import {

  procedureCategories,
  type Procedure,
  type ProcedureBlock,
  type ProcedureCategory,
} from '../data/procedures'

/**
 * La fotografía de cabecera, cuando exista. PRODUCT.md marca que LIBA todavía
 * no tiene imagen propia para esta ruta, y no se inventa una: hasta entonces
 * la cabecera va sin placa. Poner acá `/procedures-hero.png` la devuelve.
 */
const HERO_IMAGE: string | null = null

// ── Tone helpers ─────────────────────────────────────────────────────────────

const TONE = {
  navy: { band: COLOR.navy, bandText: 'text-white', card: COLOR.paperCool },
  coral: { band: COLOR.coralDeep, bandText: 'text-white', card: COLOR.paperBlush },
} as const

// ── Categorías como destinos ─────────────────────────────────────────────────

/** `Transferencias y titularidad` → `transferencias-y-titularidad`. */
function slugify(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const CATEGORY_IDS = procedureCategories.map((c) => slugify(c.title))

/**
 * Qué categoría está a la vista. Una sola franja de observación, entre el 35%
 * y el 50% de la ventana: la categoría que la cruza es la activa, y si por un
 * instante ninguna la cruza (el hueco entre dos) se conserva la última. Con
 * varias cruzándola a la vez gana la primera en orden de lectura.
 */
function useActiveCategory(refs: React.MutableRefObject<(HTMLElement | null)[]>) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = refs.current.filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const visible = new Set<number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = els.indexOf(entry.target as HTMLElement)
          if (entry.isIntersecting) visible.add(i)
          else visible.delete(i)
        }
        if (visible.size === 0) return
        setActive(Math.min(...visible))
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [refs])

  return active
}

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

function ProcedureItem({ procedure, color }: { procedure: Procedure; color: string }) {
  const reduced = useReducedMotionSafe()

  return (
    <motion.div variants={cardVariant}>
      <Disclosure
        background={color}
        summary={(open) => (
          <span className="min-w-0">
            {/* El título de la fila abierta se subraya con un barrido coral
                desde la izquierda: la misma pincelada del índice del home,
                a escala de una línea. Coral sin texto encima — decoración. */}
            <span className="relative inline-block text-navy font-bold text-base sm:text-[17px] leading-snug">
              {procedure.title}
              <motion.span
                aria-hidden
                className="absolute left-0 -bottom-0.5 h-[2px] w-full rounded-full bg-coral origin-left"
                initial={false}
                animate={{ scaleX: open ? 1 : 0 }}
                transition={reduced ? { duration: 0 } : { duration: DUR.layout, ease: EASE.out }}
              />
            </span>
            {procedure.subtitle && (
              /* Gris sobre banda tintada: medía 4.41:1 sobre `paper-cool` y
                 4.03:1 sobre `paper-blush`, las dos bajo el piso. Y el sistema
                 no tiene superficies grises — sobre un fondo con color, el
                 secundario se saca del mismo tono, no de un gris neutro. */
              <span className="block text-navy/80 text-xs sm:text-sm mt-1 leading-snug">
                {procedure.subtitle}
              </span>
            )}
          </span>
        )}
      >
        <div className="flex flex-col gap-5">
          {procedure.blocks.map((block, i) => (
            <ProcedureBlockView key={i} block={block} />
          ))}
        </div>
      </Disclosure>
    </motion.div>
  )
}

// ── Categoría (banda + acordeones) ───────────────────────────────────────────

function CategoryBlock({
  category,
  id,
  sectionRef,
}: {
  category: ProcedureCategory
  id: string
  sectionRef: (el: HTMLElement | null) => void
}) {
  const tone = TONE[category.tone]
  const headingId = `${id}-heading`

  return (
    <section ref={sectionRef} aria-labelledby={headingId} className="relative">
      {/* El destino del salto. Lenis no lee `scroll-margin-top`, así que el
          ancla vive 112px por encima del bloque — el mismo alto en que la
          columna fija se pega — y el título llega despejado de la barra. */}
      <span id={id} aria-hidden className="absolute -top-28 left-0 h-px w-px" />

      <BlurReveal>
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-4 mb-4 sm:mb-5"
          style={{ backgroundColor: tone.band }}
        >
          <h2
            id={headingId}
            className={`relative ${tone.bandText} font-black text-lg sm:text-xl md:text-2xl leading-tight font-alverata`}
          >
            {category.title}
          </h2>
        </div>
      </BlurReveal>

      {/* Las filas llegan como lista y dentro del presupuesto: la última
          arranca a menos de 0.28s de la primera, sean las que sean. */}
      <StaggerChildren
        className="space-y-3 sm:space-y-4"
        staggerDelay={staggerStep(category.procedures.length, 0.05)}
      >
        {category.procedures.map((procedure) => (
          <ProcedureItem key={procedure.title} procedure={procedure} color={tone.card} />
        ))}
      </StaggerChildren>
    </section>
  )
}

// ── Índice de categorías ─────────────────────────────────────────────────────

interface IndexProps {
  active: number
  onSelect: (i: number) => void
}

/** La columna fija de `md`+: el relleno navy viaja entre categorías. */
function CategoryIndex({ active, onSelect }: IndexProps) {
  return (
    <nav aria-label="Categorías de trámites">
      <ul className="flex flex-col gap-1">
        {procedureCategories.map((category, i) => {
          const isActive = i === active
          return (
            <li key={category.title} className="relative">
              {isActive && (
                <motion.span
                  layoutId="procedures-category-fill"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-navy"
                  style={{ boxShadow: SHADOW.actionRest }}
                  transition={SPRING.layout}
                />
              )}
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative z-10 block w-full rounded-full px-5 py-3 text-left text-sm font-bold leading-snug lg:text-[15px] ${
                  isActive ? 'text-white' : 'text-navy/80 hover:text-navy'
                }`}
                style={{ transition: `color ${DUR.state}s cubic-bezier(${EASE.out.join(',')})` }}
              >
                {category.title}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/** Bajo `md`: la misma lista, como fila de pastillas que se desplaza. */
function CategoryChips({ active, onSelect }: IndexProps) {
  const rowRef = useRef<HTMLUListElement>(null)
  const reduced = useReducedMotionSafe()

  // La pastilla activa se acerca al centro de la fila cuando cambia. Sólo el
  // eje horizontal: `scrollIntoView` movería también la página, a espaldas
  // de Lenis.
  useEffect(() => {
    const row = rowRef.current
    const chip = row?.children[active] as HTMLElement | undefined
    if (!row || !chip) return
    const left = chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2
    row.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' })
  }, [active, reduced])

  return (
    <nav aria-label="Categorías de trámites" className="-mx-4 sm:-mx-6">
      <ul
        ref={rowRef}
        className="flex gap-2 overflow-x-auto px-4 pb-2 sm:px-6"
        style={{ scrollbarWidth: 'none' }}
      >
        {procedureCategories.map((category, i) => {
          const isActive = i === active
          return (
            <li key={category.title} className="relative flex-shrink-0">
              {isActive && (
                <motion.span
                  layoutId="procedures-category-chip"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-navy"
                  transition={SPRING.layout}
                />
              )}
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative z-10 block whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold ${
                  isActive ? 'text-white' : 'bg-paper-cool text-navy'
                }`}
                style={{ transition: `color ${DUR.state}s cubic-bezier(${EASE.out.join(',')})` }}
              >
                {category.title}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// ── Página ───────────────────────────────────────────────────────────────────

export function Procedures() {
  const scrollToId = useScrollToId()
  const reduced = useReducedMotionSafe()
  const wide = useMediaQuery('(min-width: 768px)')

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // Dos velocidades de retirada, como en el hero del home: el título se aleja
  // más rápido que la placa, y la placa más rápido que la página.
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const plateY = useTransform(scrollYProgress, [0, 1], [0, -36])
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const active = useActiveCategory(sectionRefs)

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative isolate overflow-hidden pt-24 sm:pt-28 pb-10 px-4 sm:px-6">
        <PaperGround />
        <div className="relative z-10 max-w-5xl mx-auto">

          <motion.div
            className="text-center mb-6"
            style={reduced ? undefined : { y: headlineY, opacity: headlineOpacity }}
          >
            <MaskReveal
              as="h1"
              className="text-navy font-black text-[clamp(1.5rem,5vw,3.125rem)] leading-tight block font-alverata"
              stagger={0.04}
              amount={0.2}
            >
              Todo lo que necesitás saber sobre los trámites de automotor.
            </MaskReveal>
          </motion.div>

          {/* La placa de imagen, sólo cuando hay una imagen.
              El degradado coral→navy que ocupaba este lugar era un marcador de
              posición: un rectángulo vacío de 16/7 que se comía el primer
              viewport entero para no decir nada. Un hueco anunciado pesa más
              que la ausencia. La estructura queda; apenas exista el archivo,
              basta con nombrarlo en HERO_IMAGE y la placa vuelve, con su
              paralaje y su sombra ya resueltos. */}
          {HERO_IMAGE && (
            <BlurReveal delay={0.15}>
              <motion.div
                className="relative w-full rounded-2xl overflow-hidden mb-6 shadow-card-navy"
                style={{
                  aspectRatio: '16/7',
                  ...(reduced ? {} : { y: plateY, scale: plateScale }),
                }}
              >
                <img
                  src={HERO_IMAGE}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>
            </BlurReveal>
          )}

          {/* CTAs */}
          <BlurReveal delay={0.25}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <MagneticButton>
                <motion.div
                  whileHover={{ boxShadow: SHADOW.navyBloom }}
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
                  whileHover={{ boxShadow: SHADOW.outlinedBloom }}
                  transition={SPRING.press}
                >
                  Ver todos los trámites →
                </motion.button>
              </MagneticButton>
            </div>
          </BlurReveal>

          

        </div>
      </section>

      {/* ── CATEGORÍAS + TRÁMITES ────────────────────────────────────────── */}
      {/* `overflow-clip`, no `overflow-hidden`: `hidden` convierte a la sección
          en contenedor de scroll y el índice `sticky` se pegaría a ella, que
          nunca scrollea, en vez de a la ventana. */}
      <section id="tramites" className="relative isolate overflow-clip scroll-mt-24 pb-16 px-4 sm:px-6">
        <PaperGround />
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Sólo un índice montado por corte: los dos comparten la lógica
              pero no el `layoutId`, y con `display:none` framer igual mediría
              la caja oculta. */}
          {!wide && (
            <div className="mb-8">
              <CategoryChips active={active} onSelect={(i) => scrollToId(CATEGORY_IDS[i])} />
            </div>
          )}

          <div className="grid grid-cols-1 gap-x-10 md:grid-cols-12 lg:gap-x-14">
            {wide && (
              // La celda se estira al alto de toda la lista a propósito: es el
              // recorrido del índice `sticky`. Con `self-start` medía lo mismo
              // que el índice y no tenía adónde moverse.
              <div className="md:col-span-4 lg:col-span-3">
                <BlurReveal className="sticky top-28">
                  <CategoryIndex active={active} onSelect={(i) => scrollToId(CATEGORY_IDS[i])} />
                </BlurReveal>
              </div>
            )}

            <div className="md:col-span-8 lg:col-span-9 space-y-12 sm:space-y-16">
              {procedureCategories.map((category, i) => (
                <CategoryBlock
                  key={category.title}
                  category={category}
                  id={CATEGORY_IDS[i]}
                  sectionRef={(el) => {
                    sectionRefs.current[i] = el
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaFooter />
      <Footer />
    </div>
  )
}

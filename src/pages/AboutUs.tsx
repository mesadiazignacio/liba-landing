import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BlurReveal } from '../components/effects/BlurReveal'
import { MaskReveal } from '../components/effects/MaskReveal'
import { ScrubText } from '../components/effects/ScrubText'
import { SpotlightCard } from '../components/effects/SpotlightCard'
import { StaggerChildren } from '../components/effects/StaggerChildren'
import { CtaFooter } from '../components/sections/CtaFooter'
import { Footer } from '../components/layout/Footer'
import { PaperGround } from '../components/ui/PaperGround'
import { Stage, StageList, StageTrack } from '../components/ui/StageTrack'
import { WaveDivider } from '../components/ui/WaveDivider'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'
import { cardVariant } from '../lib/animations'
import { SPRING, staggerStep } from '../lib/motion'
import { SHADOW } from '../lib/shadows'
import { BAND, COLOR } from '../lib/palette'

/**
 * Section eyebrows, in the one form DESIGN.md documents for the role: Gotham 600
 * at 11–12px, tracked 0.22em, uppercase. This page had been running three
 * different treatments for the same job — a `text-sm tracking-widest` one, a
 * `text-sm` one with no tracking at all, and a 11px one flanked by decorative
 * gradient hairlines — plus a fourth for the team roles below.
 */
function Eyebrow({ children }: { children: string }) {
  return (
    /* Navy, no `coral-deep`. Dos razones que apuntan al mismo lado: medido,
       `coral-deep` sobre `paper-cool` da 4.39:1 y no llega al piso AA a 11px —
       el 4.81 que documenta el sistema es contra blanco, no contra la banda
       tintada. Y por la Regla de las Dos Voces, un rótulo estructural
       ("Nuestros pilares") es una afirmación, no una invitación: el coral no
       era suyo. En navy mide 5.05:1 y dice lo que corresponde. */
    <p className="text-navy/80 font-semibold text-[11px] sm:text-xs tracking-[0.22em] uppercase">
      {children}
    </p>
  )
}

/**
 * Títulos de «Nuestra misión» y «Nuestros pilares»: el mismo escalón Display
 * que «Criterio, norma y acompañamiento humano» en el home.
 */
const SECTION_TITLE =
  'font-alverata mb-6 block text-2xl sm:text-3xl md:text-4xl font-black leading-[1.06] text-navy sm:mb-8'

const pillars = [
  {
    title: 'Honestidad',
    description:
      'Si tu trámite tiene un problema, te lo decimos antes de presupuestar, como también las alternativas de solución.',
  },
  {
    title: 'Empatía',
    description:
      'Somos conscientes de que detrás de cada trámite hay una historia: una compra ilusionada, una herencia difícil, una empresa que no puede parar.',
  },
  {
    title: 'Respaldo Normativo',
    description:
      'No improvisamos. Trabajamos con la norma registral como fundamento. Si un registro toma una decisión arbitraria o sin sustento sabemos cómo hacerle frente.',
  },
  {
    title: 'Acompañamiento',
    description:
      'Trabajamos con transparencia: No desaparecemos, informamos actualizaciones oportunamente, te avisamos ante cualquier cambio y estamos presentes durante todo el proceso.',
  },
]

interface TeamMember {
  name: string
  role: string
  bio: string
  initials: string
  bg: string
  /** Foto real; sin ella la tarjeta muestra las iniciales sobre su tinte. */
  photo?: string
  /** `object-position` de la foto: los retratos son verticales y la placa 4:3. */
  photoPosition?: string
}

const team: TeamMember[] = [
  {
    name: 'Florencia Marina Mesa',
    role: 'Fundadora',
    bio: 'Mandataria automotor nacional matriculada. Especialista en trámites registrales complejos, devolución de patentes, tramitación segura y atención personalizada. Licenciada en Marketing y Técnica en Hotelería.',
    initials: 'FM',
    // coral-deep, not coral: these initials are text on a near-white tint of
    // their own colour, and #ed6d92 reaches only ~2.9:1 there.
    bg: COLOR.coralDeep,
    photo: '/team/florencia-marina-mosa.jpg',
    photoPosition: '50% 18%',
  },
  {
    name: 'Franco Christ',
    role: 'Co-Fundador',
    bio: 'Dedicado a la gestión estratégica y gran colaborador operativo. MBA en Management y Marketing.',
    initials: 'FD',
    bg: COLOR.navy,
    // La foto original viene muy cerrada: se le extendió la pared a la
    // izquierda y arriba para que la cara no llene la placa.
    photo: '/team/franco-dimet.jpg',
    photoPosition: '50% 45%',
  },
  {
    name: 'Albus',
    role: 'Chief Happiness Officer',
    bio: 'Presente en cada jornada de trabajo con su apoyo, alegría y su pata-pata. Especialista en sinergia de equipo y captura de snacks.',
    initials: '🐾',
    // Outside the palette by intent, and recorded as such in DESIGN.md.
    bg: '#f59e0b',
    // Ya compuesta en 4:3: la foto original venía muy cerrada, así que va
    // más chica al centro y los costados son la misma foto desenfocada.
    photo: '/team/mascota.jpg',
  },
]

interface Pillar {
  title: string
  description: string
}

/* Recomposed: four identical white cards hung off the rail, which made the rail
   look like it was decorating a card grid rather than ordering four principles.
   Boxing them was also redundant — the rail already groups them. Now they are
   plain ruled columns, so the rail is the only structure in the section and the
   type carries the rest. Copy untouched.

   Cada columna es un nodo de variantes para que `StaggerChildren` la encuentre
   a través de los `motion.div` sin variantes que `Stage` interpone. */
function PillarColumn({ pillar }: { pillar: Pillar }) {
  return (
    <motion.div variants={cardVariant} className="h-full">
      <h3 className="text-navy font-bold text-base sm:text-lg mb-2 leading-tight">
        {pillar.title}
      </h3>
      <p className="text-navy/80 text-sm leading-relaxed">{pillar.description}</p>
    </motion.div>
  )
}

/* The vertical rail already draws a line down the left, so a row needs a rule
   above it to separate from its neighbour without re-boxing it. */
function PillarRow({ pillar }: { pillar: Pillar }) {
  return (
    <motion.div variants={cardVariant} className="border-t border-navy/10 pt-4">
      <h3 className="text-navy font-bold text-base sm:text-lg mb-2 leading-tight">
        {pillar.title}
      </h3>
      <p className="text-navy/80 text-sm leading-relaxed">{pillar.description}</p>
    </motion.div>
  )
}

/**
 * The pillars run in the order LIBA applies them, so they use the same case rail
 * as the contact process rather than a second, near-identical timeline. One
 * device for "this advances", measured the same way on both surfaces.
 *
 * The two orientations are separate tracks because each measures the markers it
 * actually renders; only one is ever mounted per breakpoint.
 *
 * Cada riel lleva su propio `StaggerChildren`: los dos están en el DOM (uno
 * oculto por breakpoint), y un solo contenedor contaría ocho hijos y le daría
 * al riel visible los índices 4 a 7.
 */
function PillarsTimeline({ items }: { items: Pillar[] }) {
  const step = staggerStep(items.length)
  return (
    <>
      <div className="hidden lg:block">
        <StaggerChildren staggerDelay={step}>
          <StageTrack orientation="horizontal">
            <StageList className="grid grid-cols-4 gap-6 items-start">
              {items.map((pillar, i) => (
                <Stage key={pillar.title} step={i + 1}>
                  <PillarColumn pillar={pillar} />
                </Stage>
              ))}
            </StageList>
          </StageTrack>
        </StaggerChildren>
      </div>

      <div className="lg:hidden">
        <StaggerChildren staggerDelay={step}>
          <StageTrack>
            <StageList className="space-y-6">
              {items.map((pillar, i) => (
                <Stage key={pillar.title} step={i + 1}>
                  <PillarRow pillar={pillar} />
                </Stage>
              ))}
            </StageList>
          </StageTrack>
        </StaggerChildren>
      </div>
    </>
  )
}


/**
 * La presentación. Misma profundidad que el hero del home: al bajar, la columna
 * de texto se retira más rápido que la placa de la foto y la placa más rápido
 * que la página, así la banda se despide en capas.
 *
 * La placa lleva la foto de la fundadora, levantada del plano como toda
 * superficie del sitio con la sombra navy.
 */
function HeroBio() {
  const reduced = useReducedMotionSafe()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const plateY = useTransform(scrollYProgress, [0, 1], [0, -36])
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-white pt-28 pb-16 px-4 sm:px-6">
      <PaperGround />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Left — text */}
          <motion.div style={reduced ? undefined : { y: textY }}>
            <MaskReveal
              as="h1"
              className="text-navy font-black text-[clamp(1.5rem,5vw,3.125rem)] leading-tight mb-5 block font-alverata"
              stagger={0.04}
              amount={0.2}
            >
              Vocación de servicio en cada trámite
            </MaskReveal>

            <BlurReveal delay={0.15}>
              <p className="text-navy font-semibold text-base sm:text-lg leading-snug mb-6">
                Soy Florencia, fundadora de LIBA Gestoría y Mandataria del Automotor. Me especializo
                en trámites registrales e impositivos con respaldo normativo, criterio profesional y
                acompañamiento cercano.
              </p>
            </BlurReveal>

            <BlurReveal delay={0.25}>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                Mi recorrido en el mundo de los servicios comenzó en la hotelería, donde aprendí la
                importancia de la responsabilidad real: las personas buscan predisposición y soluciones
                claras, no explicaciones. Esa mirada me llevó a formarme como Licenciada en Marketing,
                incorporando estrategia, comunicación y un enfoque integral poco habitual en la gestoría.
              </p>
            </BlurReveal>

            
          </motion.div>

          {/* Right — founder photo, lifted as a plate */}
          <BlurReveal delay={0.2}>
            <motion.div style={reduced ? undefined : { y: plateY, scale: plateScale }}>
              <div className="relative overflow-hidden rounded-2xl bg-coral-light shadow-card-navy ring-1 ring-navy/10">
                <img
                  src="/team/florencia-marina-mosa.jpg"
                  alt="Florencia Marina Mesa, fundadora de LIBA"
                  width={800}
                  height={1200}
                  decoding="async"
                  className="w-full aspect-[7/8] object-cover"
                  style={{ objectPosition: '50% 18%' }}
                />
              </div>
            </motion.div>
          </BlurReveal>

        </div>
      </div>
    </section>
  )
}

export function AboutUs() {
  const teamStep = staggerStep(team.length, 0.08)

  return (
    <div className="bg-white">

      {/* ── 1. HERO BIO ────────────────────────────────────────────── */}
      <HeroBio />

      {/* ── 2. MISIÓN ──────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden py-14 px-4 sm:px-6 bg-white">
        <PaperGround />
        <div className="max-w-3xl mx-auto text-center">
          <BlurReveal>
            <h2 className={SECTION_TITLE}>Nuestra misión</h2>
          </BlurReveal>
          {/* La misión se enciende palabra por palabra al ritmo del scroll, como
              el manifiesto del home. Sigue en Alverata: el trazo del display se
              hereda en cada palabra. */}
          <ScrubText className="text-navy font-black text-xl sm:text-2xl md:text-3xl leading-snug block font-alverata">
            Resolver trámites automotores de forma profesional, eficiente, humana y transparente, generando certidumbre y tranquilidad en cada cliente que confía en nosotros.
          </ScrubText>
        </div>
      </section>

      {/* ── 3. POR QUÉ ELEGIRNOS ───────────────────────────────────── */}
      <WaveDivider fromColor={BAND.white} toColor={BAND.cool} />
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 bg-paper-cool overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            {/* The eyebrow had two decorative gradient hairlines flanking it —
                the only place on the site that treatment appears. */}
            <BlurReveal>
              <h3 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-tight block font-alverata">
                ¿Por qué elegir Liba Gestoría?
              </h3>
            </BlurReveal>
            <BlurReveal delay={0.12}>
              <p className="text-navy text-sm sm:text-base mt-4 max-w-xl mx-auto">
                Cuatro principios que guían cada trámite, en el orden en que los aplicamos.
              </p>
            </BlurReveal>
          </div>

          <PillarsTimeline items={pillars} />
        </div>
      </section>
      <WaveDivider fromColor={BAND.cool} toColor={BAND.white} />

      {/* ── 4. FÓRMULA ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden py-14 px-4 sm:px-6 bg-white">
        <PaperGround />
        <div className="max-w-3xl mx-auto text-center">
          {/* Sentence case. This is an eight-word sentence, not a label, and the
              system reserves uppercase for the 11–12px micro-label role. */}
          <BlurReveal>
            <p className="text-navy font-semibold text-base sm:text-lg leading-snug mb-8">
              Nuestra forma de trabajo está basada en la siguiente premisa
            </p>
          </BlurReveal>

          {/* La premisa es una placa navy, como las del home: una superficie
              propia con la luz del puntero. Es la afirmación
              que abre esta banda, así que conserva la Alverata. El superíndice
              va en blanco al 85% (≈6.4:1): `coral-light` sobre navy mide 4.14:1
              y a 16px no llega al piso AA. */}
          <BlurReveal delay={0.15}>
            <SpotlightCard
              className="rounded-2xl bg-navy text-white shadow-card-navy mb-8"
              spotlightColor="rgba(255,255,255,0.10)"
              spotlightSize={420}
            >
              <div className="relative px-6 py-8 sm:px-10 sm:py-10">
                <p className="font-black text-xl sm:text-2xl md:text-3xl leading-snug font-alverata">
                  {/* Dos tramos que no se parten por dentro: en pantallas
                      angostas la fórmula baja de línea entre ellos y nunca deja
                      el corchete de cierre o el exponente solos. */}
                  <span className="inline-block whitespace-nowrap">[ (Conocimiento + Habilidades)</span>{' '}
                  <span className="inline-block whitespace-nowrap">
                    x Actitud ]
                    <sup className="text-white/85 text-sm sm:text-base font-bold ml-1 not-italic">Pasión</sup>
                  </span>
                </p>
              </div>
            </SpotlightCard>
          </BlurReveal>

          <BlurReveal delay={0.2}>
            <p className="text-navy/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              No solo contamos con el conocimiento y las habilidades para realizar el trabajo. También consideramos que la actitud y la pasión son nuestros valores innegociables para resolver tu caso.
            </p>
          </BlurReveal>
        </div>
      </section>

      {/* ── 5. EQUIPO ──────────────────────────────────────────────── */}
      <WaveDivider fromColor={BAND.white} toColor={BAND.cool} />
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-paper-cool">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <BlurReveal>
              <h2 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-[1.05] block font-alverata mb-4">
                El equipo detrás de Liba
              </h2>
            </BlurReveal>
            <BlurReveal delay={0.08}>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Un grupo de trabajo con nombre y apellido, donde cada caso tiene un
                responsable real y áreas de expertise bien definidas.
              </p>
            </BlurReveal>
          </div>

          {/* Team cards: one staggered entrance for the three, inside the
              stagger budget, instead of three hand-set delays. */}
          <StaggerChildren className="mx-auto grid max-w-md grid-cols-1 gap-5 md:max-w-none md:grid-cols-3" staggerDelay={teamStep}>
            {team.map((member) => (
              <motion.div key={member.name} variants={cardVariant}>
                {/* These sit on paper-cool, so they take the navy-cast lift. A
                    black `shadow-sm` over a tinted band reads muddy, and left the
                    cards looking flat against the field behind them. */}
                <motion.div
                  className="h-full bg-white rounded-2xl overflow-hidden shadow-card-navy border border-navy/5"
                  whileHover={{ y: -4, boxShadow: SHADOW.cardHover }}
                  transition={SPRING.press}
                >
                  {/* Photo area */}
                  <div
                    className="w-full aspect-[4/3] flex items-center justify-center text-5xl overflow-hidden"
                    style={{ background: member.bg + '22' }}
                  >
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: member.photoPosition }}
                      />
                    ) : member.initials.length <= 2 ? (
                      <span
                        className="font-black text-4xl select-none"
                        style={{ color: member.bg }}
                      >
                        {member.initials}
                      </span>
                    ) : (
                      <span className="text-5xl">{member.initials}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p className="text-navy font-bold text-base leading-tight">{member.name}</p>
                    {/* DESIGN.md gives team roles to the micro-label, the same
                        role the section eyebrows use. This was a fourth variant. */}
                    <div className="mt-1 mb-3">
                      <Eyebrow>{member.role}</Eyebrow>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </StaggerChildren>

        </div>
      </section>
      <WaveDivider fromColor={BAND.cool} toColor={BAND.white} />

      {/* ── CTA FOOTER ─────────────────────────────────────────────── */}
      <CtaFooter />
      <Footer />

    </div>
  )
}

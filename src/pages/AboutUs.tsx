import { motion } from 'framer-motion'
import { BlurReveal } from '../components/effects/BlurReveal'
import { MaskReveal } from '../components/effects/MaskReveal'
import { CtaFooter } from '../components/sections/CtaFooter'
import { Footer } from '../components/layout/Footer'
import { Stage, StageList, StageTrack } from '../components/ui/StageTrack'
import { WaveDivider } from '../components/ui/WaveDivider'
import { SPRING } from '../lib/motion'
import { SHADOW } from '../lib/shadows'
import { BAND, COLOR } from '../lib/palette'
import { PaperGround } from '../components/ui/PaperGround'

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

const team = [
  {
    name: 'Florencia Marina Mosa',
    role: 'Fundadora',
    bio: 'Mandataria automotor nacional matriculada. Especialista en trámites registrales complejos, devolución de patentes, tramitación segura y atención personalizada. Licenciada en Marketing.',
    initials: 'FM',
    // coral-deep, not coral: these initials are text on a near-white tint of
    // their own colour, and #ed6d92 reaches only ~2.9:1 there.
    bg: COLOR.coralDeep,
  },
  {
    name: 'Franco Dimet',
    role: 'Co-Fundador',
    bio: 'Dedicado a la gestión estratégica y gran colaborador operativo. MBA Especializado en Management y Marketing.',
    initials: 'FD',
    bg: COLOR.navy,
  },
  {
    name: 'Mascota',
    role: 'Chief Happiness Officer',
    bio: 'Presente en cada jornada de trabajo con su apoyo, alegría y ladridos. Especialista en calor y combate a clientes.',
    initials: '🐾',
    // Outside the palette by intent, and recorded as such in DESIGN.md.
    bg: '#f59e0b',
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
   type carries the rest. Copy untouched. */
function PillarColumn({ pillar }: { pillar: Pillar }) {
  return (
    <div className="h-full">
      <h3 className="text-navy font-bold text-base sm:text-lg mb-2 leading-tight">
        {pillar.title}
      </h3>
      <p className="text-navy/80 text-sm leading-relaxed">{pillar.description}</p>
    </div>
  )
}

/* The vertical rail already draws a line down the left, so a row needs a rule
   above it to separate from its neighbour without re-boxing it. */
function PillarRow({ pillar }: { pillar: Pillar }) {
  return (
    <div className="border-t border-navy/10 pt-4">
      <h3 className="text-navy font-bold text-base sm:text-lg mb-2 leading-tight">
        {pillar.title}
      </h3>
      <p className="text-navy/80 text-sm leading-relaxed">{pillar.description}</p>
    </div>
  )
}

/**
 * The pillars run in the order LIBA applies them, so they use the same case rail
 * as the contact process rather than a second, near-identical timeline. One
 * device for "this advances", measured the same way on both surfaces.
 *
 * The two orientations are separate tracks because each measures the markers it
 * actually renders; only one is ever mounted per breakpoint.
 */
function PillarsTimeline({ items }: { items: Pillar[] }) {
  return (
    <>
      <div className="hidden md:block">
        <StageTrack orientation="horizontal">
          <StageList className="grid grid-cols-4 gap-6 items-start">
            {items.map((pillar, i) => (
              <Stage key={pillar.title} step={i + 1}>
                <PillarColumn pillar={pillar} />
              </Stage>
            ))}
          </StageList>
        </StageTrack>
      </div>

      <div className="md:hidden">
        <StageTrack>
          <StageList className="space-y-6">
            {items.map((pillar, i) => (
              <Stage key={pillar.title} step={i + 1}>
                <PillarRow pillar={pillar} />
              </Stage>
            ))}
          </StageList>
        </StageTrack>
      </div>
    </>
  )
}

export function AboutUs() {
  return (
    <div className="bg-white">

      {/* ── 1. HERO BIO ────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden pt-28 pb-16 px-4 sm:px-6">
        <PaperGround />
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

            {/* Left — text */}
            <div>
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

              <BlurReveal delay={0.35}>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Luego me formé como Mandataria Automotor, un sector complejo y burocrático, con un
                  objetivo claro: ir más allá del trámite. Hoy trabajo con una premisa clara: entender
                  el sistema, hacer accesible la información y acompañar en cada caso con vocación de
                  servicio.
                </p>
              </BlurReveal>
            </div>

            {/* Right — photo placeholder */}
            <BlurReveal delay={0.2}>
              <div className="relative w-full aspect-[7/8] rounded-2xl overflow-hidden bg-coral/20 flex items-end justify-center">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${COLOR.coralLight} 0%, ${COLOR.coral} 100%)` }}
                />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <span className="text-white/40 text-7xl font-black select-none">FM</span>
                </div>
              </div>
            </BlurReveal>

          </div>
        </div>
      </section>

      {/* ── 2. MISIÓN ──────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden py-14 px-4 sm:px-6 bg-white">
        <PaperGround />
        <div className="max-w-3xl mx-auto text-center">
          <BlurReveal>
            <div className="mb-3">
              <Eyebrow>Nuestra misión</Eyebrow>
            </div>
          </BlurReveal>
          <BlurReveal delay={0.08}>
            <p className="text-navy font-black text-xl sm:text-2xl md:text-3xl leading-snug block font-alverata">
              Resolver trámites automotores de forma profesional, eficiente, humana y transparente,
              generando certidumbre y tranquilidad en cada cliente que confía en nosotros.
            </p>
          </BlurReveal>
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
              <div className="mb-4">
                <Eyebrow>Nuestros pilares</Eyebrow>
              </div>
            </BlurReveal>
            <BlurReveal>
              <h2 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-tight block font-alverata">
                ¿Por qué elegir Liba Gestoría?
              </h2>
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

          <BlurReveal delay={0.15}>
            <div className="inline-block bg-paper-cool rounded-2xl px-8 py-6 mb-8 w-full">
              <p className="text-navy font-black text-xl sm:text-2xl md:text-3xl leading-snug font-alverata">
                [ (Conocimiento + Habilidades) x Actitud ]
                <sup className="text-coral-deep text-base font-bold ml-1 not-italic">Pasión</sup>
              </p>
            </div>
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

          {/* Team cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {team.map((member, i) => (
              <BlurReveal key={member.name} delay={i * 0.1}>
                {/* These sit on paper-cool, so they take the navy-cast lift. A
                    black `shadow-sm` over a tinted band reads muddy, and left the
                    cards looking flat against the field behind them. */}
                <motion.div
                  className="bg-white rounded-2xl overflow-hidden shadow-card-navy border border-navy/5"
                  whileHover={{ y: -4, boxShadow: SHADOW.cardHover }}
                  transition={SPRING.press}
                >
                  {/* Photo area */}
                  <div
                    className="w-full aspect-[4/3] flex items-center justify-center text-5xl"
                    style={{ background: member.bg + '22' }}
                  >
                    {member.initials.length <= 2 ? (
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
              </BlurReveal>
            ))}
          </div>

        </div>
      </section>
      <WaveDivider fromColor={BAND.cool} toColor={BAND.white} />

      {/* ── CTA FOOTER ─────────────────────────────────────────────── */}
      <CtaFooter />
      <Footer />

    </div>
  )
}

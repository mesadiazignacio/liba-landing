import { motion } from 'framer-motion'
import { BlurReveal } from '../effects/BlurReveal'
import { MaskReveal } from '../effects/MaskReveal'
import { MagneticButton } from '../effects/MagneticButton'
import { Counter } from '../ui/Counter'
import { useIntroReady } from '../../hooks/useIntroReady'
import { useScrollToId } from '../../hooks/useScrollToId'
import { DUR, EASE, SPRING, staggerStep } from '../../lib/motion'
import { SHADOW } from '../../lib/shadows'
import { YOUTUBE_EMBED_URL, WHATSAPP_URL, STATS } from '../../lib/constants'

/**
 * The hero's entrance used to be a set of absolute delays (1.1s headline, 1.3s
 * video, 1.5s card, 1.7s stats) chosen to clear the loader's old 1.8s timer. Two
 * waits stacked, and the second one was a guess about the first.
 *
 * Now the cover reports when it lifts, and the cascade is expressed in its own
 * terms from that point: headline, then the video plate, then the coral card
 * rising to tuck under it, then the figures. The order is the composition's own —
 * the card genuinely overlaps the video by 4rem, so it arriving last and from
 * below is the one spatial move this layout actually has.
 */
const STEP = {
  headline: 0,
  video: 0.06,
  card: 0.14,
  stats: 0.24,
} as const

export function Hero() {
  const ready = useIntroReady()
  const scrollToId = useScrollToId()
  const statStep = staggerStep(STATS.length, 0.08)

  return (
    <section id="inicio" className="relative bg-white pt-14 overflow-hidden">

      {/* Headline */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-6 text-center">
        {/* The home page's one word-mask: its opening statement. */}
        <MaskReveal
          as="h1"
          className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-tight mb-4 block font-alverata"
          delay={STEP.headline}
          stagger={0.04}
          amount={0}
          play={ready}
        >
          Regularizá los trámites de tu vehículo con LIBA, Gestoría del automotor.
        </MaskReveal>

        <BlurReveal delay={STEP.card} play={ready}>
          <p className="text-navy/85 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {/* Plural. LIBA is a team with professionals on staff, and the first
                sentence on the site is where that has to be true. */}
            Te acompañamos en transferencias, trámites registrales e impositivos para tu vehículo,
            con respaldo normativo, sin perder tiempos innecesarios y evitando complicaciones burocráticas.
          </p>
        </BlurReveal>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Video. The plate used to carry an animated navy-to-coral gradient
            border on a 5s infinite loop — a blend of the two voices into a third
            identity, and an ungated loop besides. Depth in this system is
            structural, so the plate is lifted on a navy-cast shadow instead. */}
        <BlurReveal delay={STEP.video} play={ready} className="relative z-20">
          <motion.div
            className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-card-navy ring-1 ring-navy/10"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: DUR.state, ease: EASE.out }}
          >
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <iframe
                src={YOUTUBE_EMBED_URL}
                title="LIBA Gestoría del Automotor"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </BlurReveal>

        {/* Coral card — rises to tuck under the video plate it overlaps. */}
        <motion.div
          className="bg-coral-deep rounded-2xl px-5 sm:px-10 pt-32 pb-12 sm:pb-14 -mt-16 relative z-10 shadow-card-navy"
          initial={{ opacity: 0, y: 28 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: DUR.entrance, ease: EASE.out, delay: STEP.card }}
        >
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto">
            <MagneticButton className="flex-1">
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 bg-white rounded-2xl px-6 py-4 w-full"
                style={{ boxShadow: SHADOW.actionRest }}
                whileHover={{ scale: 1.02, boxShadow: SHADOW.actionHover }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.press}
              >
                <span className="text-navy font-bold text-base sm:text-xl md:text-3xl leading-none">Agendar consulta</span>
                <span className="text-navy/85 text-xs sm:text-sm text-center leading-tight">
                  Llamado inicial de 20 minutos sin cargo
                </span>
              </motion.a>
            </MagneticButton>
            <MagneticButton className="flex-1">
              <motion.button
                type="button"
                onClick={() => scrollToId('servicios')}
                className="flex flex-col items-center gap-1 bg-white rounded-2xl px-6 py-4 w-full"
                style={{ boxShadow: SHADOW.actionRest }}
                whileHover={{ scale: 1.02, boxShadow: SHADOW.actionHover }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.press}
              >
                <span className="text-navy font-bold text-base sm:text-xl md:text-3xl leading-none">Servicios</span>
                <span className="text-navy/85 text-xs sm:text-sm text-center leading-tight">
                  Conocé todo lo que podemos resolver por vos
                </span>
              </motion.button>
            </MagneticButton>
          </div>

          {/* Stats. These tiles used to sit on #1e5aa0 — a fourth navy the system
              never sanctioned — under a resting zero-offset halo, which is
              decoration wearing the glow's meaning. They are navy now, flat at
              rest, and the coral glow arrives on hover where it says something. */}
          <div className="grid grid-cols-3 gap-2 sm:gap-8 max-w-5xl mx-auto">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-navy rounded-2xl px-1 sm:px-3 md:px-4 py-3 sm:py-4 md:py-5 flex flex-col items-center text-center gap-1 cursor-default"
                initial={{ opacity: 0, y: 12 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{
                  duration: DUR.entrance,
                  delay: STEP.stats + i * statStep,
                  ease: EASE.out,
                }}
                whileHover={{ scale: 1.03, boxShadow: SHADOW.glowCoral }}
              >
                <span className="text-white font-black text-xl sm:text-4xl md:text-6xl leading-none">
                  {/* The figures count once the card has landed, not on a timer
                      guessed against the loader. */}
                  <Counter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={1400}
                    delay={(STEP.stats + i * statStep) * 1000}
                    play={ready}
                  />
                </span>
                {/* Walks the documented ladder as the figure grows: micro-label
                    floor (11px), label (14px), title (20px). It was at 10px on
                    mobile — below the floor this palette holds legibly, in bold
                    white on a mid-blue. */}
                <p className="text-white text-[11px] sm:text-sm md:text-xl font-bold leading-[1.08] whitespace-pre-line">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

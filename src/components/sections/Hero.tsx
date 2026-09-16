import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BlurReveal } from '../effects/BlurReveal'
import { MaskReveal } from '../effects/MaskReveal'
import { MagneticButton } from '../effects/MagneticButton'
import { Counter } from '../ui/Counter'
import { useIntroReady } from '../../hooks/useIntroReady'
import { useScrollToId } from '../../hooks/useScrollToId'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { DUR, EASE, SPRING, staggerStep } from '../../lib/motion'
import { SHADOW } from '../../lib/shadows'
import { YOUTUBE_EMBED_URL, WHATSAPP_URL, STATS } from '../../lib/constants'
import { PaperGround } from '../ui/PaperGround'

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
 *
 * Dos cosas nuevas, las dos ligadas al scroll y no a un temporizador. La placa
 * de video y el título tienen profundidad: al bajar, el título se retira más
 * rápido que la placa y la placa más rápido que la página, así el hero se
 * despide en capas en vez de subir como una hoja. Y detrás de la placa hay dos
 * halos — uno navy, uno coral — que derivan muy despacio: es el aire de las
 * dos voces del sistema, sin mezclarse en un tercer color.
 */
/* El video y su placa de acciones comparten ancho: 56rem. Sólo en una tablet
 * apaisada el tope se ata además al alto de la ventana, porque ahí un video de
 * 16:9 a todo el ancho empujaba los botones debajo del pliegue (25rem es lo que
 * ocupan la barra, el titular y la parte visible de la placa). En desktop no:
 * con el alto que deja el navegador en una laptop, el video caía a ~600px. */
const HERO_PLATE_MAX = '56rem'
const HERO_PLATE_MAX_TABLET = 'min(56rem, max(22rem, calc((100svh - 25rem) * 16 / 9)))'

const STEP = {
  headline: 0,
  video: 0.06,
  card: 0.14,
  stats: 0.24,
} as const


export function Hero() {
  const ready = useIntroReady()
  const reduced = useReducedMotionSafe()
  const scrollToId = useScrollToId()
  const statStep = staggerStep(STATS.length, 0.08)
  const tabletLandscape = useMediaQuery('(pointer: coarse) and (orientation: landscape) and (min-width: 768px)')
  const plateMax = tabletLandscape ? HERO_PLATE_MAX_TABLET : HERO_PLATE_MAX

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Tres velocidades de retirada. El título es el que más se aleja; la placa
  // lo sigue; las acciones y las cifras van con la página.
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const plateY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  return (
    <section ref={sectionRef} id="inicio" className="relative isolate bg-white pt-14 overflow-hidden">
      <PaperGround />

      {/* Headline */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-6 text-center"
        style={reduced ? undefined : { y: headlineY, opacity: headlineOpacity }}
      >
        {/* The home page's one word-mask: its opening statement. */}
        <MaskReveal
          as="h1"
          className="text-navy font-black text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.1] mb-4 block font-alverata"
          delay={STEP.headline}
          stagger={0.04}
          amount={0}
          play={ready}
        >
          Regularizá los trámites de tu vehículo con LIBA, Gestoría del automotor.
        </MaskReveal>

        <BlurReveal delay={STEP.card} play={ready}>
          <p className="text-navy/85 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Te acompañamos en transferencias, trámites registrales e impositivos para tu vehículo,
            con respaldo normativo, sin perder tiempos innecesarios y evitando complicaciones burocráticas.
          </p>
        </BlurReveal>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Video. Lifted on a navy-cast shadow; the plate retreats and shrinks a
            touch as the visitor scrolls away, so it reads as an object with
            depth rather than a rectangle glued to the page. */}
        <BlurReveal delay={STEP.video} play={ready} className="relative z-20">
          <motion.div
            className="relative mx-auto rounded-2xl overflow-hidden shadow-card-navy ring-1 ring-navy/10"
            style={reduced ? { maxWidth: plateMax } : { maxWidth: plateMax, y: plateY, scale: plateScale }}
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

        {/* La placa de acciones baja al ancho exacto del video, así que la monta
            encastre; su relleno superior es sólo el que despeja esos 64px. */}
        <div className="relative z-10 -mt-16">
          <motion.div
            className="mx-auto grid gap-3 sm:grid-cols-2 sm:gap-4 bg-white rounded-2xl border border-navy/10 shadow-card-navy px-4 sm:px-7 pt-20 pb-5"
            initial={{ opacity: 0, y: 28 }}
            style={{ maxWidth: plateMax }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: DUR.entrance, ease: EASE.out, delay: STEP.card }}
          >
            <MagneticButton className="w-full">
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 bg-coral-deep rounded-2xl px-5 py-4 w-full"
                style={{ boxShadow: SHADOW.actionRest }}
                whileHover={{ boxShadow: SHADOW.coralBloom }}
                transition={SPRING.press}
              >
                <span className="text-white font-bold text-base sm:text-lg md:text-2xl leading-none">Agendar consulta</span>
                <span className="text-white text-xs sm:text-sm text-center leading-tight">
                  Llamado inicial de 20 minutos sin cargo
                </span>
              </motion.a>
            </MagneticButton>
            <MagneticButton className="w-full">
              <motion.button
                type="button"
                onClick={() => scrollToId('servicios')}
                className="flex flex-col items-center gap-1 bg-paper-cool rounded-2xl px-5 py-4 w-full"
                style={{ boxShadow: SHADOW.actionRest }}
                whileHover={{ boxShadow: SHADOW.actionHover }}
                transition={SPRING.press}
              >
                <span className="text-navy font-bold text-base sm:text-lg md:text-2xl leading-none">Servicios</span>
                <span className="text-navy/85 text-xs sm:text-sm text-center leading-tight">
                  Conocé todo lo que podemos resolver por vos
                </span>
              </motion.button>
            </MagneticButton>
          </motion.div>

          {/* Las cifras, fuera de toda caja: evidencia, no acción. */}
          <div className="max-w-3xl mx-auto mt-8 sm:mt-10 grid grid-cols-3 border-t border-navy/10 pt-5 pb-2">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`px-2 sm:px-4 text-center ${i > 0 ? 'border-l border-navy/10' : ''}`}
                initial={{ opacity: 0, y: 12 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{
                  duration: DUR.entrance,
                  delay: STEP.stats + i * statStep,
                  ease: EASE.out,
                }}
              >
                <span className="block text-navy font-black text-xl sm:text-3xl md:text-5xl leading-none">
                  <Counter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={1400}
                    delay={(STEP.stats + i * statStep) * 1000}
                    play={ready}
                  />
                </span>
                <p className="mt-1.5 text-navy/80 text-xs sm:text-sm md:text-base font-bold leading-[1.08] whitespace-pre-line">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

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
    <section id="inicio" className="relative isolate bg-white pt-14 overflow-hidden">
      <PaperGround />


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

        {/* El bloque de contacto, partido en dos.

            Era una sola caja: un rectángulo de color con `pt-32` de relleno
            superior cuya única razón de ser era despejar el video que se le monta
            encima. Esos 128px arrancaban vacíos, y como la caja era más ancha que
            el video (`max-w-6xl` contra `max-w-4xl`), el color asomaba en alas a
            los costados. Saturada leía como losa deliberada; en tinte pálido leía
            como una caja vacía con cosas abajo.

            Ahora son dos superficies con dos trabajos distintos. La placa de
            acciones baja al ancho exacto del video, así que la superposición se
            lee como encastre y no como accidente, y su relleno superior es sólo
            el que despeja la monta. Las cifras se salen del contenedor: no son
            una acción, son evidencia, y sobre el fondo de la página con una
            capilar arriba pesan lo que tienen que pesar.

            La superposición se mantiene — el `-mt-16` sigue acá, que es la única
            idea espacial que este bloque siempre tuvo. */}
        <div className="relative z-10 -mt-16">
          {/* La placa baja al ancho exacto del video, así que la monta encastre;
              su relleno superior es sólo el que despeja esos 64px. */}
          <motion.div
            className="max-w-4xl mx-auto grid gap-3 sm:grid-cols-2 sm:gap-4 bg-white rounded-2xl border border-navy/10 shadow-card-navy px-4 sm:px-7 pt-20 pb-5"
            initial={{ opacity: 0, y: 28 }}
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
                whileHover={{ scale: 1.02, boxShadow: SHADOW.actionHover }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.press}
              >
                <span className="text-white font-bold text-base sm:text-lg md:text-2xl leading-none">Agendar consulta</span>
                {/* Blanco pleno: sobre `coral-deep` sólo el blanco entero llega
                    al 4.81:1 a este cuerpo. */}
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
                whileHover={{ scale: 1.02, boxShadow: SHADOW.actionHover }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.press}
              >
                <span className="text-navy font-bold text-base sm:text-lg md:text-2xl leading-none">Servicios</span>
                <span className="text-navy/85 text-xs sm:text-sm text-center leading-tight">
                  Conocé todo lo que podemos resolver por vos
                </span>
              </motion.button>
            </MagneticButton>
          </motion.div>

          {/* Las cifras, fuera de toda caja. No son una acción: son evidencia,
              así que van sobre el fondo de la página, separadas por la capilar
              `navy/10` que el sistema documenta para fondo claro. */}
          <div className="max-w-3xl mx-auto mt-8 sm:mt-10 grid grid-cols-3 border-t border-navy/10 pt-5">
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
                  {/* The figures count once the plate has landed, not on a timer
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
                <p className="mt-1.5 text-navy/80 text-[11px] sm:text-sm md:text-base font-bold leading-[1.08] whitespace-pre-line">
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

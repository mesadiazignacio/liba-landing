/* Recomposed: eight service lines were eight identical coral chips in a grid plus
   a ninth tile for the CTA, which flattened them into interchangeable options.
   PRODUCT.md is explicit that transferencia is the most requested trámite and the
   others are not, so the composition now says that: transferencia leads at panel
   scale and the rest read as a ruled index beside it. Copy, palette and faces are
   untouched — only the ranking changed. */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BlurReveal } from '../effects/BlurReveal'
import { StaggerChildren } from '../effects/StaggerChildren'
import { MagneticButton } from '../effects/MagneticButton'
import { cardVariant } from '../../lib/animations'
import { SPRING, staggerStep } from '../../lib/motion'
import { SHADOW } from '../../lib/shadows'
import { services } from '../../data/services'

const [lead, ...rest] = services

export function Services() {
  return (
    <section id="servicios" className="relative bg-white px-4 sm:px-6 py-14 sm:py-20 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <BlurReveal amount={0.3}>
            <h2 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-tight mb-4 block font-alverata">
              ¿Qué gestión necesitás realizar?
            </h2>
          </BlurReveal>
          <BlurReveal delay={0.08}>
            <p className="text-navy text-sm sm:text-lg font-semibold leading-relaxed max-w-4xl mx-auto">
              La transferencia de autos y motos es el trámite más solicitado, pero no el único.
              Trabajamos con particulares, flotas corporativas, concesionarias/reventas
              y aseguradoras en toda la Argentina.
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* The one people came for, at the scale the lede already claims for it.
              Scale alone does the ranking — no eyebrow, no link label, no words
              that were not already on the page. */}
          <BlurReveal className="lg:col-span-2 h-full">
            <Link to="/services" className="block h-full">
              <motion.div
                // The minimum height only matters where the panel has an index
                // column beside it to match; in a single-column stack it just
                // inflates into empty coral.
                className="bg-coral-deep rounded-2xl px-6 py-8 sm:px-8 lg:py-11 h-full lg:min-h-[13rem] flex items-center shadow-card"
                whileHover={{ y: -3, boxShadow: SHADOW.coralBloom }}
                transition={SPRING.press}
              >
                <span className="block text-white font-black font-alverata text-2xl sm:text-3xl leading-[1.04]">
                  {lead.label}
                </span>
              </motion.div>
            </Link>
          </BlurReveal>

          {/* The rest as a ruled index. No fills, so nothing competes with the
              panel, and the reader can scan seven names in one pass. */}
          <div className="lg:col-span-3">
            <StaggerChildren
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8"
              staggerDelay={staggerStep(rest.length, 0.05)}
            >
              {rest.map((service, i) => (
                <motion.div key={service.label} variants={cardVariant}>
                  <Link
                    to="/services"
                    className={`group flex items-baseline gap-3 border-t border-navy/10 py-4 ${
                      i >= rest.length - 2 ? 'sm:border-b' : ''
                    } ${i === rest.length - 1 ? 'border-b' : ''}`}
                  >
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 rounded-full bg-coral flex-shrink-0" />
                    <span className="text-navy font-semibold text-[15px] sm:text-base leading-snug group-hover:text-coral-deep transition-colors duration-200">
                      {service.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </StaggerChildren>

            <BlurReveal delay={0.12}>
              <div className="mt-7">
                <MagneticButton strength={0.15}>
                  {/* inline-block + the pill radius on the anchor itself: an
                      inline <a> wrapping an inline-flex span collapses to a 20px
                      line box, so the focus ring drew a thin bar across the middle
                      of the button instead of tracing it. */}
                  <Link to="/services" className="inline-block rounded-full">
                    <motion.span
                      className="inline-flex items-center justify-center gap-2 bg-navy text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full"
                      whileHover={{ scale: 1.03, boxShadow: SHADOW.navyBloom }}
                      whileTap={{ scale: 0.97 }}
                      transition={SPRING.press}
                    >
                      Ver todos los servicios
                    </motion.span>
                  </Link>
                </MagneticButton>
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

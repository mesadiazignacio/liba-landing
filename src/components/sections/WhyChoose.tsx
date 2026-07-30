/* Recomposed: the five differentiators were five identical navy cards stacked in
   one column, which gave the reader no way to tell that "respaldo normativo" is
   LIBA's lead claim and not just the first item alphabetically. Now the norm claim
   carries the section as a single large navy panel and the other four sit under it
   as a ruled two-column list. Same copy, same palette, same faces — the only thing
   that changed is what outranks what. */

import { motion } from 'framer-motion'
import { BlurReveal } from '../effects/BlurReveal'
import { StaggerChildren } from '../effects/StaggerChildren'
import { SpotlightCard } from '../effects/SpotlightCard'
import { cardVariant } from '../../lib/animations'
import { staggerStep } from '../../lib/motion'
import { features } from '../../data/features'

const [lead, ...rest] = features

export function WhyChoose() {
  return (
    <section id="por-que" className="relative bg-white px-4 sm:px-6 py-14 sm:py-20 overflow-hidden">
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
        <BlurReveal>
          <SpotlightCard
            className="rounded-2xl shadow-card"
            spotlightColor="rgba(255,255,255,0.10)"
            spotlightSize={420}
          >
            {/* Title and claim sit side by side on desktop so the panel is filled
                by its own content rather than by padding — a short title above two
                lines of copy left the right half of a full-width panel empty. */}
            <div className="bg-navy px-6 py-8 sm:px-10 sm:py-11 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-4 items-baseline">
              {/* One step below the section's own h2, on the documented ladder —
                  no new type sizes were needed to make this outrank the list. */}
              <h3 className="md:col-span-5 text-white font-black font-alverata text-xl sm:text-2xl md:text-3xl leading-[1.06]">
                {lead.title}
              </h3>
              <p className="md:col-span-7 text-white/85 text-[15px] sm:text-lg leading-relaxed">
                {lead.description}
              </p>
            </div>
          </SpotlightCard>
        </BlurReveal>

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
              className={`border-t border-navy/10 py-6 sm:py-7 ${
                // Close the list on desktop, where two columns end unevenly.
                i >= rest.length - 2 ? 'sm:border-b' : ''
              } ${i === rest.length - 1 ? 'border-b' : ''}`}
            >
              <h3 className="text-navy font-bold text-[1.0625rem] sm:text-xl leading-snug mb-2">
                {feature.title}
              </h3>
              <p className="text-navy/70 text-sm sm:text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}

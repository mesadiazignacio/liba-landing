import { WaveDivider } from '../components/ui/WaveDivider'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { WhyChoose } from '../components/sections/WhyChoose'
import { Testimonials } from '../components/sections/Testimonials'
import { Services } from '../components/sections/Services'
import { CtaFooter } from '../components/sections/CtaFooter'
import { Footer } from '../components/layout/Footer'
import { BAND } from '../lib/palette'

export function Home() {
  return (
    <main>
      <Hero />

      {/* Bands are the unit of composition here, and each wave has to name the
          two it actually sits between — hence BAND rather than loose hexes.

          El home alternaba blanco y navy pleno y nada en el medio: dos bandas a
          sangre de azul saturado, más la losa coral del hero, más el pie. El
          registro intermedio que DESIGN.md declara — `paper-cool` y
          `paper-blush` — no existía a nivel página, y esa binaria era el ruido.
          Ahora la banda alterna es `cool` y el navy pleno queda para una sola
          cosa por superficie: el panel de la norma en `WhyChoose`. */}
      <WaveDivider fromColor={BAND.white} toColor={BAND.cool} />
      <About />
      <WaveDivider fromColor={BAND.cool} toColor={BAND.white} />

      <WhyChoose />
      <WaveDivider fromColor={BAND.white} toColor={BAND.cool} />
      <Testimonials />
      <WaveDivider fromColor={BAND.cool} toColor={BAND.white} />
      <Services />
      <CtaFooter />
      <Footer />
    </main>
  )
}

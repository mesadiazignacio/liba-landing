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
          two it actually sits between — hence BAND rather than loose hexes. */}
      <WaveDivider fromColor={BAND.white} toColor={BAND.navy} />
      <div className="bg-navy">
        <About />
      </div>
      <WaveDivider fromColor={BAND.navy} toColor={BAND.white} />

      <WhyChoose />
      <WaveDivider fromColor={BAND.white} toColor={BAND.navy} />
      <Testimonials />
      <WaveDivider fromColor={BAND.navy} toColor={BAND.white} />
      <Services />
      <CtaFooter />
      <Footer />
    </main>
  )
}

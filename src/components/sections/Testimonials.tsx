import { BlurReveal } from '../effects/BlurReveal'
import { usePauseOffscreen } from '../../hooks/usePauseOffscreen'
import { testimonials } from '../../data/testimonials'
import { BAND } from '../../lib/palette'
import { PaperGround } from '../ui/PaperGround'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {/* `star` is the system's rating colour; the unearned star is a navy tint,
          because this page has no true gray surfaces. */}
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-star' : 'text-navy/15'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 32" fill="currentColor" aria-hidden>
      <path d="M0 32V19.2C0 8.533 5.867 2.133 17.6 0l2.133 3.733C13.6 5.067 10.4 8.267 9.6 13.6H16V32H0zm22.4 0V19.2C22.4 8.533 28.267 2.133 40 0l2.133 3.733c-6.133 1.334-9.333 4.534-10.133 9.867H38.4V32H22.4z" />
    </svg>
  )
}

const doubled = [...testimonials, ...testimonials]

export function Testimonials() {
  const marqueeRef = usePauseOffscreen<HTMLDivElement>()

  return (
    /* Segunda banda navy a sangre del home, y la que menos lo necesitaba: son
       tarjetas blancas sobre el fondo, así que el azul saturado sólo servía para
       hacerlas destellar. Sobre `paper-cool` se levantan con la sombra navy que
       el sistema documenta para banda tintada, y las estrellas y la comilla
       coral recuperan su valor en vez de competir con el fondo. */
    <section id="clientes" className="relative isolate bg-paper-cool py-10 sm:py-12 overflow-hidden">
      <PaperGround />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-10 text-center">
        <BlurReveal>
          {/* `/80`: a 20px/600 no califica como texto grande para WCAG (pide 700),
              así que el piso sigue siendo 4.5 y `/70` medía 3.78 sobre `cool`. */}
          <p className="text-navy/80 text-xl font-semibold mb-2">Lo que dicen nuestros clientes</p>
        </BlurReveal>
        <BlurReveal delay={0.08} amount={0.3}>
          <h2 className="text-navy font-black text-2xl sm:text-3xl md:text-4xl leading-tight block font-alverata">
            Tu opinión realmente nos importa
          </h2>
        </BlurReveal>
      </div>

      <BlurReveal>
        <div className="relative z-10 overflow-hidden select-none pointer-events-none max-w-5xl mx-auto" aria-hidden>
          {/* The fades have to be the band's exact fill or the marquee appears to
              run over a seam, so they read it from the same place the band does.
              Siguen a la banda: si arriba dice `cool`, acá dice `cool`. */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10"
            style={{ background: `linear-gradient(to right, ${BAND.cool}, transparent)` }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10"
            style={{ background: `linear-gradient(to left, ${BAND.cool}, transparent)` }} />

          <div
            ref={marqueeRef}
            className="flex gap-4 px-6 animate-marquee"
            style={{ width: 'max-content' }}
          >
            {doubled.map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] sm:w-[310px]">
                {/* `shadow-card-navy` y capilar `navy/10`: la tarjeta pasó a
                    estar sobre banda tintada, y ahí el sistema dicta sombra
                    navy a baja alfa — la negra sobre `paper-cool` embarra. */}
                <div className="bg-white border border-navy/10 rounded-2xl p-5 shadow-card-navy h-full relative overflow-hidden">
                  <QuoteIcon className="absolute top-3 right-3 w-8 h-8 text-coral/10" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.location}</p>
                    </div>
                  </div>
                  <StarRating rating={t.rating} />
                  <p className="text-gray-600 text-sm leading-relaxed mt-3 line-clamp-4">"{t.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlurReveal>

      {/* The marquee above is duplicated and non-interactive, so it stays
          aria-hidden. These are the same reviews, once each, for screen
          readers — real client evidence shouldn't be inaudible. */}
      <ul className="sr-only">
        {testimonials.map((t, i) => (
          <li key={i}>
            <blockquote>"{t.text}"</blockquote>
            <p>
              {t.name}, {t.location}. {t.rating} de 5 estrellas.
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

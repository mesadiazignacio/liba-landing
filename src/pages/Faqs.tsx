import { MaskReveal } from '../components/effects/MaskReveal'
import { BlurReveal } from '../components/effects/BlurReveal'
import { Disclosure } from '../components/ui/Disclosure'
import { CtaFooter } from '../components/sections/CtaFooter'
import { Footer } from '../components/layout/Footer'
import { staggerStep } from '../lib/motion'
import { COLOR } from '../lib/palette'

const FAQS = [
  {
    q: '¿Cuánto tarda una transferencia vehicular?',
    a: 'Si toda la documentación se encuentra completa, el plazo estándar es de 24 a 48 horas hábiles desde que se presenta el trámite en el Registro Automotor. Te mantenemos informado durante todo el proceso.',
  },
  {
    q: '¿Qué documentos necesito para transferir un auto?',
    a: 'Básicamente:\n• DNI de comprador y vendedor\n• Título y cédula del vehículo.\n• Formulario 08 firmado ante escribano o registro\n• Verificación policial del auto o moto.\nSegún el caso puede haber adicionales que te los detallaremos cuando nos contactás.',
  },
  {
    q: '¿Es necesario que vaya si o si al registro?',
    a: 'No necesariamente. En algunos casos podemos resolverlo con sólo brindarnos la documentación, y en situaciones específicas, existe la alternativa de firmar los formularios ante un escribano, de acuerdo a tu disponibilidad horaria. En esos casos te avisamos con anticipación.',
  },
  {
    q: '¿Trabajan en todo el GBA o sólo CABA?',
    a: 'Trabajamos en CABA y en todo el Gran Buenos Aires. Si tenés dudas sobre si cubrimos tu zona, contanos dónde estás ubicado y te lo confirmamos.',
  },
  {
    q: '¿Qué pasa si el auto tiene deudas o prenda?',
    a: 'Depende del tipo de deuda o restricción registral. En muchos casos podemos ayudarte a resolver la situación antes o durante el trámite. Contanos tu caso y te orientamos sobre los pasos a seguir.',
  },
]

/** The FAQ list alternates the two documented row fills down its length. */
const ITEM_COLORS = [COLOR.borderCool, COLOR.paperBlush]

function FaqItem({
  q,
  a,
  color,
  delay,
}: {
  q: string
  a: string
  color: string
  delay: number
}) {
  const lines = a.split('\n')

  return (
    <BlurReveal delay={delay}>
      <Disclosure
        background={color}
        summary={
          <span className="text-navy font-semibold text-base sm:text-[17px] leading-snug">
            {q}
          </span>
        }
      >
        <div className="text-navy text-sm sm:text-base leading-relaxed">
          {lines.map((line, i) => (
            <p key={i} className={i > 0 ? 'mt-1' : ''}>
              {line}
            </p>
          ))}
        </div>
      </Disclosure>
    </BlurReveal>
  )
}

export function Faqs() {
  return (
    <div className="bg-white">
      <section className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-10 sm:mb-12">
            <MaskReveal
              as="h1"
              className="text-navy font-black text-3xl sm:text-4xl md:text-5xl font-alverata leading-tight block"
              stagger={0.04}
              amount={0.2}
            >
              Todo lo que necesitás saber
            </MaskReveal>
          </div>

          {/* The list arrives as a list, but inside a fixed budget: the last row
              starts within 0.28s of the first however many there are. */}
          <div className="space-y-3 sm:space-y-4">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                delay={i * staggerStep(FAQS.length)}
                q={item.q}
                a={item.a}
                color={ITEM_COLORS[i % 2]}
              />
            ))}
          </div>

        </div>
      </section>

      <CtaFooter />
      <Footer />
    </div>
  )
}

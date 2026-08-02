import { useCallback, useContext, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BlurReveal } from '../effects/BlurReveal'
import { SOCIAL_ICONS } from '../ui/BrandIcons'
import { WaveTexture } from '../ui/WaveTexture'
import { LenisContext } from '../effects/SmoothScroll'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { BAND } from '../../lib/palette'
import { CONTACT_EMAIL, CONTACT_EMAIL_URL, SOCIAL_LINKS } from '../../lib/constants'

/**
 * El piso del sitio: una losa navy apoyada sobre la última banda de la página.
 *
 * No es una banda más — es la carta más grande del sitio, con el mismo radio de
 * 16px y la misma sombra de reposo que las demás, flotando sobre el fondo en vez
 * de sangrar hasta los bordes. Por eso acá no hay `WaveDivider`: la ola no une
 * dos bandas porque abajo ya no hay una segunda banda, hay una tarjeta. En su
 * lugar la ola se muda adentro, dibujada como textura de contorno a muy baja
 * opacidad; la firma espacial del sitio sigue presente, en otro rol.
 *
 * La marca va centrada y arriba porque el footer es lo único del sitio que existe
 * para decir quién firma todo lo anterior. Deliberadamente **no** repite el
 * llamado a la acción — `CtaFooter` ya lo hace a mayor escala justo arriba en
 * cinco rutas — ni duplica la navegación de la navbar, que está fija y disponible
 * en todo momento.
 *
 * El coral aparece únicamente como estado de hover: sobre navy mide 2.83:1, así
 * que puede marcar un cambio pero nunca llevar texto.
 */

interface Props {
  /**
   * La banda con la que termina la página que lo monta, y por lo tanto el fondo
   * sobre el que se apoya la losa. `Contacto` cierra en `paper-blush`, el resto
   * en blanco; si no coinciden, aparece un escalón de color alrededor del footer.
   */
  fromColor?: string
}

/**
 * Enlace de footer con subrayado coral que barre desde la izquierda.
 *
 * El subrayado se dibuja con un `span` escalado en X en vez de con
 * `underline`/`text-decoration` para que crezca en una dirección — un
 * `text-decoration` sólo puede aparecer, no entrar.
 */
function FooterLink({
  to,
  href,
  className = '',
  children,
}: {
  to?: string
  href?: string
  className?: string
  children: ReactNode
}) {
  const inner = (
    <span className="relative inline">
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-coral transition-transform duration-200 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </span>
  )

  // `py-1` no es aire decorativo: sin él el ancla mide 19px de alto y queda por
  // debajo del mínimo de 24px de WCAG 2.5.8, que sólo exime a los enlaces
  // embebidos en una oración. Este está solo en su celda, así que no aplica.
  const base = `group inline-block py-1 text-[14px] leading-snug text-white/75 transition-colors duration-200 hover:text-white focus-visible:text-white ${className}`

  if (to) {
    return (
      <Link to={to} className={base}>
        {inner}
      </Link>
    )
  }

  // Sin `target="_blank"`: el único uso es el `mailto`, y abrir el cliente de
  // correo en una pestaña nueva deja una pestaña en blanco atrás. Los destinos
  // externos son las redes, y esas tienen su propio componente.
  return (
    <a href={href} className={base}>
      {inner}
    </a>
  )
}

/**
 * Enlace de canal, sólo glifo — correo y redes comparten la misma fila.
 *
 * El nombre escrito y la flecha externa costaban tres renglones de altura para
 * decir lo que el glifo ya dice; el nombre sobrevive en el `aria-label`, que es
 * donde hacía falta. El área de toque es de 36px aunque el glifo mida 17.
 */
function IconLink({
  href,
  label,
  icon: Icon,
  external = false,
}: {
  href: string
  label: string
  icon: (props: { className?: string }) => JSX.Element
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:text-white"
    >
      <Icon className="h-[17px] w-[17px]" />
    </a>
  )
}

/**
 * El sobre, con el mismo peso macizo que los glifos de plataforma para que la
 * fila lea como una sola serie. El correo es el canal propio de LIBA, así que va
 * primero: es el único de los cuatro que lleva a hablar con alguien.
 */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 5h18a1 1 0 0 1 1 1v.35l-9.48 5.82a1 1 0 0 1-1.04 0L2 6.35V6a1 1 0 0 1 1-1Zm19 3.69V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8.69l9.48 5.82a1 1 0 0 0 1.04 0L22 8.69Z" />
    </svg>
  )
}

export function Footer({ fromColor = BAND.white }: Props) {
  const lenis = useContext(LenisContext)
  const reduced = useReducedMotionSafe()

  // Mismo razonamiento que `useScrollToId`: mover el documento por detrás de
  // Lenis deja su offset interno en la posición vieja y el siguiente scroll
  // devuelve al visitante de un salto adonde estaba.
  const scrollToTop = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: reduced })
      return
    }
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }, [lenis, reduced])

  return (
    <div style={{ backgroundColor: fromColor }} className="px-3 pb-3 sm:px-5 sm:pb-5">
      <footer className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-2xl bg-navy text-white shadow-card">
        <WaveTexture />

        {/* En reposo es sólo el redondel con la flecha; la etiqueta crece hacia
            la izquierda al pasar el puntero. Anclado arriba a la derecha, no en
            la fila de abajo: ahí obligaba a una segunda línea de píldoras y
            desalineaba todo el cierre. El `aria-label` es fijo, así que el
            control se anuncia igual esté la etiqueta visible o no. */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="group absolute right-4 top-4 z-10 inline-flex items-center rounded-full border border-white/15 bg-white/5 transition-colors duration-200 hover:border-coral hover:bg-white/10 sm:right-6 sm:top-6"
        >
          <span
            aria-hidden
            className="max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-bold leading-none text-white opacity-0 transition-all duration-200 ease-out group-hover:max-w-[140px] group-hover:pl-4 group-hover:opacity-100 group-focus-visible:max-w-[140px] group-focus-visible:pl-4 group-focus-visible:opacity-100"
          >
            Volver arriba
          </span>
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-white/80 transition-colors duration-200 group-hover:text-white">
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path
                d="M5 8.5V1.5M5 1.5L1.5 5M5 1.5L8.5 5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {/* Un solo `BlurReveal` para toda la losa: es la entrada tranquila del
            sistema, y partirla en dos hacía que la firma llegara y el pie ya
            estuviera ahí. Llega como una sola masa, que es lo que documenta. */}
        <BlurReveal amount={0.1} className="relative px-5 py-11 sm:px-10 sm:py-14">
          {/* ── Firma ───────────────────────────────────────────────────── */}
          {/* Ambos `alt` vacíos: el enlace ya lleva `aria-label`, que reemplaza
              al nombre accesible de su contenido — un `alt="LIBA"` acá nunca se
              anuncia y sólo compite con él. */}
          <div className="flex flex-col items-center text-center">
            <Link to="/" className="flex flex-col items-center" aria-label="LIBA Gestoría del Automotor, ir al inicio">
              <img src="/logo-icon.png" alt="" className="h-14 w-14 object-contain" />
              <img src="/logo-text.png" alt="" className="mt-3 h-[54px] w-auto object-contain" />
            </Link>
            {/* `text-indent` igual al tracking, y no es un ajuste a ojo. El
                letter-spacing se aplica también DESPUÉS de la última letra, así
                que ese espacio fantasma entra en el ancho de la línea: al
                centrarla, la tinta queda corrida media pista a la izquierda
                — 1.5px medidos, junto a un ícono y un wordmark centrados al
                pixel. Una sangría de 0.22em reequilibra la línea exactamente. */}
            <p className="mt-3 text-[12px] font-semibold uppercase leading-none tracking-[0.22em] [text-indent:0.22em] text-white/70">
              Gestoría del Automotor
            </p>
          </div>

          {/* ── El pie ────────────────────────────────────────────────────── */}
          {/* Dos renglones apilados y centrados, no tres columnas con
              encabezado. Los rótulos «Contacto» y «Seguinos» costaban una línea
              de altura cada uno para anunciar dos datos y tres glifos que ya se
              explican solos.

              Apilado en todos los anchos: la firma de arriba está centrada, así
              que los canales y el enlace legal caen sobre ese mismo eje en vez
              de repartirse a los costados. El orden también es jerárquico — los
              canales son la acción, la política es la letra chica que la cierra. */}
          <div className="mt-8 flex flex-col items-center gap-y-4 text-center sm:mt-10">

            <ul className="flex items-center gap-1">
              <li>
                {/* mailto sin `target="_blank"`: abrir el cliente de correo en
                    una pestaña nueva deja una pestaña en blanco atrás. */}
                <IconLink
                  href={CONTACT_EMAIL_URL}
                  label={`Escribinos a ${CONTACT_EMAIL}`}
                  icon={MailIcon}
                />
              </li>
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <IconLink
                    href={social.href}
                    label={`LIBA Gestoría en ${social.label}`}
                    icon={SOCIAL_ICONS[social.icon]}
                    external
                  />
                </li>
              ))}
            </ul>

            <FooterLink to="/privacy">Políticas de Privacidad</FooterLink>

          </div>
        </BlurReveal>
      </footer>
    </div>
  )
}

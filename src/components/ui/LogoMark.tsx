import { useEffect, useRef, type CSSProperties } from 'react'

/**
 * El isotipo, partido en dos por una máscara: la L queda quieta y el anillo gira.
 *
 * El PNG es una sola imagen, así que la separación no está en el archivo — se
 * dibuja dos veces y cada copia se recorta con la máscara complementaria de la
 * otra. El corte cae en el 35–39% del radio, que es el aire entre la L y el
 * anillo; los cuatro puntos de diferencia son el desvanecido que evita que el
 * borde de la máscara se lea como un filo.
 *
 * Este componente es el único lugar donde vive ese giro. Antes era `LogoSpinner`
 * y sólo lo usaba la portada de carga; ahora la navbar y el footer piden el mismo
 * movimiento al pasar el puntero, y «el mismo» sólo es verificable si es
 * literalmente el mismo código. Dos implementaciones con la misma duración son
 * dos animaciones que se separan en cuanto alguien toca una.
 */

/**
 * Una vuelta completa. La portada de carga la hereda, así que cambiar esto
 * cambia el giro en los tres lugares — que es exactamente lo que se quiere.
 */
export const SPIN_DURATION = 2.4

const INNER_MASK = 'radial-gradient(circle at center, black 35%, transparent 39%)'
const RING_MASK = 'radial-gradient(circle at center, transparent 35%, black 39%)'

/** El ángulo que el anillo tiene puesto ahora mismo, mitad de vuelta arriba o abajo. */
function currentAngle(el: HTMLElement): number {
  const { a, b } = new DOMMatrixReadOnly(getComputedStyle(el).transform)
  return ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360
}

interface Props {
  /**
   * Si el anillo debe estar girando. Es controlado desde afuera porque el
   * disparador cambia según el lugar: en la portada es «siempre», en la navbar
   * es el hover del enlace entero, en el footer el del isotipo.
   */
  spinning?: boolean
  duration?: number
  className?: string
  style?: CSSProperties
}

export function LogoMark({ spinning = false, duration = SPIN_DURATION, className = '', style }: Props) {
  const ring = useRef<HTMLDivElement>(null)

  /**
   * El ángulo en el que quedó el anillo la última vez que se frenó.
   *
   * El giro empieza y termina con el puntero, y donde termina se queda: no
   * vuelve a cero ni completa la vuelta. Eso obliga a guardarlo, porque un
   * `logo-spin` recién aplicado arranca en 0° por definición — sin esto, volver
   * a entrar al hover haría saltar la marca hacia atrás hasta el origen, que es
   * justo el rebobinado que no queremos.
   */
  const restingAngle = useRef(0)

  // El giro se maneja acá y no en el `style` del JSX porque tanto frenarlo como
  // retomarlo dependen de un valor que sólo existe a mitad de un keyframe: React
  // puede poner o sacar la animación, pero no puede leer en qué ángulo va.
  useEffect(() => {
    const el = ring.current
    if (!el) return

    if (spinning) {
      // Delay negativo: la animación arranca ya avanzada, en la fracción de
      // vuelta que corresponde al ángulo guardado. El anillo sigue de largo
      // desde donde quedó en lugar de reiniciarse — y como el movimiento es
      // lineal y de período completo, el empalme no tiene ni un frame de salto.
      const offset = (restingAngle.current / 360) * duration
      el.style.transform = ''
      el.style.animation = `logo-spin ${duration}s linear ${-offset}s infinite`
      return
    }

    // Nunca arrancó — no hay ángulo que congelar.
    if (!el.style.animation) return

    const stoppedAt = currentAngle(el)
    restingAngle.current = stoppedAt
    el.style.animation = ''
    el.style.transform = `rotate(${stoppedAt}deg)`
  }, [spinning, duration])

  return (
    <div className={className} style={{ position: 'relative', flexShrink: 0, ...style }}>
      {/* La L, quieta */}
      <img
        src="/logo-icon.png"
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          WebkitMaskImage: INNER_MASK,
          maskImage: INNER_MASK,
        }}
      />

      {/* El anillo, girando */}
      <div
        ref={ring}
        style={{
          position: 'absolute',
          inset: 0,
          WebkitMaskImage: RING_MASK,
          maskImage: RING_MASK,
        }}
      >
        <img
          src="/logo-icon.png"
          alt=""
          aria-hidden
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}

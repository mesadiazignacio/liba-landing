import { CONTOUR_ROWS, CONTOUR_TILE, contourPath } from '../../lib/contour'

/**
 * La ola de `WaveDivider` en su segundo rol: trazo en vez de relleno, repetido y
 * desfasado como una curva de nivel.
 *
 * Es la textura de las losas navy — el footer y la hoja de ingreso. Donde una
 * superficie flota como tarjeta en vez de sangrar como banda, la ola no puede
 * unir dos colores porque no hay dos bandas que unir, así que se muda adentro y
 * se vuelve fondo. Es decoración, no un divisor: no se anima ni consume el loop
 * de scroll compartido.
 *
 * Su contraparte en claro es `PaperGround`, que repite el mismo trazo en navy
 * sobre las bandas blancas. Las dos leen el dibujo de `lib/contour`.
 */
export function WaveTexture() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-white"
      viewBox={`0 0 ${CONTOUR_TILE.width} ${CONTOUR_TILE.height}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      {CONTOUR_ROWS.map((y, i) => (
        <path
          key={y}
          d={contourPath(y, i)}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity={0.07}
        />
      ))}
    </svg>
  )
}

import { CONTOUR_ROWS, CONTOUR_TILE, contourPath } from '../../lib/contour'

/**
 * El aire de las bandas blancas.
 *
 * El sistema declara un mundo de bandas tonales — `paper-cool` y `paper-blush`
 * alternando con blanco — que a nivel página nunca existió: medido, el 80% del
 * home y el 100% de `/services`, `/faqs` y `/about-us` son blanco de pantalla
 * puro. Los dos tintes sobreviven sólo adentro de componentes. Esto no inventa
 * una tercera banda: le devuelve a la banda blanca la temperatura que el sistema
 * ya tenía escrita, sin que llegue a leerse como un cambio de color.
 *
 * Dos capas, ninguna nueva:
 *
 * 1. **El charco tonal.** Navy al 4.5% en el centro de la banda, apagándose
 *    hasta cero. Su radio vertical es exactamente el 50% de la caja, así que el
 *    valor llega a cero *justo* en el borde de arriba y en el de abajo. Eso no es
 *    un ajuste estético: `WaveDivider` es una tira de 60px pintada con hexes
 *    planos, así que un degradado que llegue teñido al borde deja un escalón
 *    contra la ola. Cero en el borde es la única forma de que la costura no
 *    exista. Los costados sí terminan teñidos y no importa: ahí no hay banda
 *    vecina, hay viewport.
 *
 * 2. **La curva de nivel.** El mismo trazo que `WaveTexture` dibuja en blanco
 *    sobre las losas navy, acá en navy al 5.5% sobre el blanco. No es un
 *    dispositivo nuevo, es la firma espacial del sitio en su segunda tinta.
 *    Va como mosaico repetido en vez de un SVG estirado porque estas bandas
 *    miden entre 400 y 1800px: estirar seis olas a esa altura las volvería otra
 *    curva. Repetido, el ritmo vertical del dibujo es el mismo en toda la página.
 *
 *    El mosaico se estira al ancho del contenedor y se repite sólo hacia abajo,
 *    que es exactamente lo que hace `WaveDivider`: su período es siempre medio
 *    viewport porque su SVG va con `preserveAspectRatio="none"`. Con un mosaico
 *    de 1440px fijos, la ola de la textura y la ola del divisor coincidían en
 *    desktop y se separaban en mobile — a 390px de ancho se veía apenas el 27%
 *    del dibujo y las curvas quedaban casi rectas.
 *
 * El grano de `NoiseOverlay` (0.04, blend `overlay`, global) le hace un favor no
 * planeado a la capa 1: un degradado de 4.5% sobre 1000px es exactamente el caso
 * donde el banding de 8 bits se ve, y el ruido lo rompe.
 *
 * **Cómo se monta.** `-z-10` sobre un ancestro con `isolate`: en negativo la capa
 * pinta debajo de todo el contenido en flujo pero encima del fondo de su sección,
 * que es justo lo que hace falta y lo que un `z-0` no da — un absoluto sin
 * z-index pinta *arriba* del texto. El `isolate` es obligatorio: sin contexto de
 * apilamiento propio, el z negativo se hunde detrás del fondo blanco de la página
 * y la capa desaparece.
 */

// Navy (#084d9b) en canales, porque `rgba()` no toma hex y esto tiene que poder
// escribirse con alfa. Si el navy cambia en la paleta, cambia acá.
const NAVY_RGB = '8, 77, 155'

const FIELD = `radial-gradient(70% 50% at 50% 50%, rgba(${NAVY_RGB}, 0.045) 0%, rgba(${NAVY_RGB}, 0) 100%)`

const CONTOUR_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${CONTOUR_TILE.width}" height="${CONTOUR_TILE.height}" viewBox="0 0 ${CONTOUR_TILE.width} ${CONTOUR_TILE.height}">` +
  CONTOUR_ROWS.map(
    (y, i) =>
      `<path d="${contourPath(y, i)}" fill="none" stroke="rgb(${NAVY_RGB})" stroke-width="1.5" opacity="0.055"/>`,
  ).join('') +
  `</svg>`

const CONTOUR = `url("data:image/svg+xml,${encodeURIComponent(CONTOUR_SVG)}")`

export function PaperGround() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: `${FIELD}, ${CONTOUR}`,
        backgroundSize: `100% 100%, 100% ${CONTOUR_TILE.height}px`,
        backgroundRepeat: 'no-repeat, repeat',
        backgroundPosition: 'center center, center top',
      }}
    />
  )
}

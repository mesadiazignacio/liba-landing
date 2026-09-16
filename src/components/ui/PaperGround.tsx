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
 * **El charco tonal.** Navy al 4.5% en el centro de la banda, apagándose hasta
 * cero. Su radio vertical es exactamente el 50% de la caja, así que el valor
 * llega a cero *justo* en el borde de arriba y en el de abajo. Eso no es un
 * ajuste estético: `WaveDivider` es una tira de 60px pintada con hexes planos,
 * así que un degradado que llegue teñido al borde deja un escalón contra la ola.
 * Cero en el borde es la única forma de que la costura no exista. Los costados
 * sí terminan teñidos y no importa: ahí no hay banda vecina, hay viewport.
 *
 * El grano de `NoiseOverlay` (0.04, blend `overlay`, global) le hace un favor no
 * planeado: un degradado de 4.5% sobre 1000px es exactamente el caso donde el
 * banding de 8 bits se ve, y el ruido lo rompe.
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

export function PaperGround() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: FIELD }}
    />
  )
}

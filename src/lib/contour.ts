/**
 * La curva de nivel: la ola de `WaveDivider` en su papel de textura.
 *
 * Vivía escrita dentro de `WaveTexture`, que era su único consumidor. Ahora son
 * dos — la losa navy la dibuja como SVG y las bandas blancas la repiten como
 * mosaico de fondo — y dos copias del mismo trazo son dos olas que se separan en
 * cuanto alguien toca una. El trazo se declara acá una sola vez.
 *
 * El mosaico mide 1440 × 400 y no es arbitrario: la curva tiene un período de
 * 720 unidades, así que 1440 son exactamente dos períodos y el patrón se repite
 * en horizontal sin costura. Las seis filas caen cada 66 unidades, y del último
 * renglón al primero del mosaico siguiente hay 70 — la irregularidad de 4
 * unidades es deliberadamente inofensiva a la opacidad a la que esto se dibuja.
 */

export const CONTOUR_TILE = { width: 1440, height: 400 } as const

export const CONTOUR_ROWS = [30, 96, 162, 228, 294, 360] as const

/**
 * Cada fila arranca 40 unidades a la derecha de la anterior. Ese desfasaje es lo
 * que convierte seis olas idénticas en una curva de nivel: sin él el dibujo lee
 * como un pentagrama.
 */
export function contourPath(y: number, index: number): string {
  const x = index * 40
  return (
    `M${-120 + x},${y} ` +
    `C${120 + x},${y - 34} ${360 + x},${y + 34} ${600 + x},${y} ` +
    `C${840 + x},${y - 34} ${1080 + x},${y + 34} ${1320 + x},${y} ` +
    `C${1560 + x},${y - 34} ${1800 + x},${y + 34} ${2040 + x},${y}`
  )
}

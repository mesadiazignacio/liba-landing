/**
 * Film grain over the whole page.
 *
 * The grain used to be a live `<svg>` whose `feTurbulence` was applied to a rect
 * sized to the viewport, so the filter region was the full screen and it was
 * re-evaluated on every resize. `stitchTiles` was already there, which means the
 * noise was designed to tile — so it can be generated once at 180px as a
 * background image and repeated. Identical grain, one small rasterisation.
 */

const NOISE_TILE = 180

const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='${NOISE_TILE}' height='${NOISE_TILE}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`

export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200] select-none"
      style={{
        mixBlendMode: 'overlay',
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: `${NOISE_TILE}px ${NOISE_TILE}px`,
      }}
      aria-hidden
    />
  )
}

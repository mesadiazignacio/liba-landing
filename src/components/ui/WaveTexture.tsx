/**
 * La ola de `WaveDivider` en su segundo rol: trazo en vez de relleno, repetido y
 * desfasado como una curva de nivel.
 *
 * Es la textura de las losas navy — el footer y la hoja de ingreso. Donde una
 * superficie flota como tarjeta en vez de sangrar como banda, la ola no puede
 * unir dos colores porque no hay dos bandas que unir, así que se muda adentro y
 * se vuelve fondo. Es decoración, no un divisor: no se anima ni consume el loop
 * de scroll compartido.
 */
export function WaveTexture() {
  const rows = [30, 96, 162, 228, 294, 360]
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-white"
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      aria-hidden
    >
      {rows.map((y, i) => (
        <path
          key={y}
          d={`M${-120 + i * 40},${y} C${120 + i * 40},${y - 34} ${360 + i * 40},${y + 34} ${600 + i * 40},${y} C${840 + i * 40},${y - 34} ${1080 + i * 40},${y + 34} ${1320 + i * 40},${y} C${1560 + i * 40},${y - 34} ${1800 + i * 40},${y + 34} ${2040 + i * 40},${y}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity={0.07}
        />
      ))}
    </svg>
  )
}

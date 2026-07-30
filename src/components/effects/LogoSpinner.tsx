const INNER_MASK = 'radial-gradient(circle at center, black 35%, transparent 39%)'
const RING_MASK  = 'radial-gradient(circle at center, transparent 35%, black 39%)'

interface LogoSpinnerProps {
  size?: number
  duration?: number
}

export function LogoSpinner({ size = 120, duration = 3 }: LogoSpinnerProps) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {/* Static inner part — the L */}
      <img
        src="/logo-icon.png"
        alt=""
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

      {/* Rotating outer ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          WebkitMaskImage: RING_MASK,
          maskImage: RING_MASK,
          animation: `logo-spin ${duration}s linear infinite`,
        }}
      >
        <img
          src="/logo-icon.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}

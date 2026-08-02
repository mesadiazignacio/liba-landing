/**
 * Motion tokens.
 *
 * Timing expresses distance and consequence, so these are named after what the
 * movement explains rather than by number. Exits are always shorter than
 * entrances — arriving can be authored, leaving must never cost a wait.
 *
 * The one authored sequence on this site is the case rail (`StageTrack`): the
 * client seeing which stage their trámite is at. Everything else here exists to
 * acknowledge an action, make a state legible, or preserve continuity.
 */

type Bezier = [number, number, number, number]

export const EASE: Record<'out' | 'inOut' | 'exit', Bezier> = {
  /** Confident arrival. Exponential ease-out; the default for anything entering. */
  out: [0.16, 1, 0.3, 1],
  /** Symmetrical, for movement between two known positions. */
  inOut: [0.65, 0, 0.35, 1],
  /** Leaving. Front-loaded so the element clears the frame fast. */
  exit: [0.4, 0, 1, 1],
}

export const DUR = {
  /** Immediate acknowledgment of a press. Longer than this reads as latency. */
  feedback: 0.14,
  /** A routine state change: colour, chevron, ring, nav wash. */
  state: 0.22,
  /** Layout, disclosure, overlay, route change. */
  layout: 0.4,
  /**
   * Un intercambio de tamaño entre vecinos: una tarjeta se ensancha mientras la
   * de al lado se angosta, disparado por el puntero pasando por encima.
   *
   * Más largo que `layout` por dos razones. El visitante sigue dos movimientos
   * opuestos a la vez, así que el mismo tiempo lee como la mitad. Y sobre todo
   * el disparador es un barrido: cruzar cuatro tarjetas a la velocidad de
   * `layout` no son cuatro aperturas, son cuatro parpadeos. Este es el único
   * caso del sitio donde el movimiento tiene que sobrevivir a que lo
   * interrumpan cuatro veces seguidas.
   */
  exchange: 0.6,
  /** A deliberately authored entrance. Used sparingly. */
  entrance: 0.55,
  /** Anything leaving. */
  exit: 0.18,
  /**
   * Shorter than an exit, for content that must clear before the box holding it
   * collapses. A closing disclosure drops its text on this so the collapse never
   * squashes legible copy.
   */
  clear: 0.1,
} as const

/**
 * How far behind its container a panel's contents settle. The box takes height
 * first and the text follows, so the copy is never stretched mid-growth.
 */
export const SETTLE_DELAY = 0.08

export const SPRING = {
  /** Press and hover acknowledgment. Reassurance, not a bounce. */
  press: { type: 'spring', stiffness: 400, damping: 26 },
  /** Pointer-following: magnetic pull, tilt. */
  follow: { type: 'spring', stiffness: 300, damping: 22, mass: 0.6 },
  /** Shared-layout movement, such as the navbar active fill. */
  layout: { type: 'spring', stiffness: 380, damping: 32 },
  /** Scroll-linked progress. Slow enough to read as advancement, not tracking. */
  progress: { stiffness: 42, damping: 26, mass: 0.85, restDelta: 0.0005 },
} as const

/**
 * Total stagger budget for a group. A list should finish arriving, not perform:
 * whatever the item count, the last one starts within this many seconds of the
 * first. Long Argentine headings are the reason this cap exists — a 14-word
 * `MaskReveal` at a fixed per-word delay takes over a second to settle.
 */
export const STAGGER_BUDGET = 0.28

/** Per-child delay that keeps `count` children inside {@link STAGGER_BUDGET}. */
export function staggerStep(count: number, preferred = 0.06): number {
  if (count <= 1) return 0
  return Math.min(preferred, STAGGER_BUDGET / (count - 1))
}

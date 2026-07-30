/**
 * The shadow vocabulary as strings, for framer-motion.
 *
 * `whileHover={{ boxShadow: ... }}` needs a value, not a class, so every hover
 * lift on the site was carrying its own hand-typed shadow — `0 8px 28px
 * rgba(8,77,155,0.35)` appeared six times across four files, each an opportunity
 * to typo an alpha. The classes in tailwind.config.ts cover resting states; these
 * cover the animated ones, and the two lists describe the same vocabulary.
 *
 * DESIGN.md's rule holds throughout: over a tinted band the shadow is cast navy
 * at low alpha, never black, and a glow is a state — none of these are applied at
 * rest.
 */

export const SHADOW = {
  /** Default lift for a card on a tonal band. */
  card: '0 4px 24px rgba(0,0,0,0.08)',
  /** The hover state: a genuine jump in offset and blur. */
  cardHover: '0 12px 48px rgba(0,0,0,0.16)',
  /** For a card on a tinted band, or directly beneath a colored surface. */
  cardNavy: '0 12px 32px rgba(8,77,155,0.18)',

  /** Resting lift on the hero's stacked calls to action. */
  actionRest: '0 4px 14px rgba(8,77,155,0.14)',
  /** Their hover, and the standard bloom under a navy pill. */
  actionHover: '0 8px 28px rgba(8,77,155,0.22)',
  /** The stronger navy bloom, for primary navy buttons on white. */
  navyBloom: '0 8px 28px rgba(8,77,155,0.35)',
  /** The same gesture under an outlined button, where it must stay faint. */
  outlinedBloom: '0 8px 24px rgba(8,77,155,0.10)',
  /** Under a coral-deep surface, tinted to its own hue. */
  coralBloom: '0 12px 48px rgba(204,58,102,0.28)',

  /** Ambient coral halo. Hover only — a glow means "this responds to you". */
  glowCoral: '0 0 30px rgba(237,109,146,0.3)',
  /** The halo on a case-rail marker the coral fill has passed. */
  stageReached:
    '0 0 0 4px rgba(237,109,146,0.26), 0 10px 24px -8px rgba(237,109,146,0.75)',
} as const

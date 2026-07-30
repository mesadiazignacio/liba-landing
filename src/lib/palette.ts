/**
 * The palette as raw hex.
 *
 * Tailwind classes cover everything that resolves to a class name, but three
 * things on this site need the literal value: `WaveDivider`'s SVG `fill`, the
 * marquee's edge fades, and the row fills the FAQ list and trámite catalog pass
 * to `Disclosure` as a prop. Those were spelling the hexes out inline — eleven
 * copies of `#f0f5fb` and five of `#fde4ec` across six files, which is how a band
 * and the wave that is supposed to join it drift apart.
 *
 * Values are the same ones in tailwind.config.ts. If one changes, it changes in
 * both places or the wave stops matching the band.
 */

export const COLOR = {
  navy: '#084d9b',
  coral: '#ed6d92',
  coralDeep: '#cc3a66',
  coralLight: '#f4a0b5',
  white: '#ffffff',
  paperCool: '#f0f5fb',
  paperBlush: '#fde4ec',
  borderCool: '#dce8f6',
} as const

/**
 * The band fills, named for their role in page composition rather than by hue.
 * A `WaveDivider`'s `fromColor`/`toColor` are only correct when they are the two
 * bands it actually sits between, so the call reads as the transition it is.
 */
export const BAND = {
  white: COLOR.white,
  navy: COLOR.navy,
  cool: COLOR.paperCool,
  blush: COLOR.paperBlush,
} as const

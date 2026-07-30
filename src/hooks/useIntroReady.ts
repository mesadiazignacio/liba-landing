import { useSyncExternalStore } from 'react'

/**
 * Whether the intro cover has lifted and the page beneath is the visitor's to
 * look at.
 *
 * The hero used to hard-code its entrance delays against the loader's old 1.8s
 * timer (1.1s for the headline, 1.7s for the stats). That coupling is what made
 * the first viewport feel slow: two waits stacked, and neither one measured
 * anything real. Now the loader resolves on actual readiness and announces it
 * here, so the hero's cascade is expressed in its own terms and starts the
 * moment the cover is gone.
 *
 * The state lives at module level so a component mounting after the intro has
 * already finished gets `true` immediately instead of animating in late.
 */

const FAILSAFE_MS = 900

let ready = false
let failsafe: ReturnType<typeof setTimeout> | null = null
const listeners = new Set<() => void>()

export function markIntroReady() {
  if (ready) return
  ready = true
  if (failsafe) {
    clearTimeout(failsafe)
    failsafe = null
  }
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Nothing that gates visible content may depend on another component behaving.
  // If the loader is removed, errors, or never resolves, the page arrives anyway.
  if (!ready && failsafe === null) {
    failsafe = setTimeout(markIntroReady, FAILSAFE_MS)
  }
  return () => {
    listeners.delete(listener)
  }
}

export function useIntroReady(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => ready,
    () => true,
  )
}

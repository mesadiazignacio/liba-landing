/**
 * One requestAnimationFrame loop and one scroll listener, shared.
 *
 * The wave dividers are the site's signature transition and the home page has
 * four of them; About has three more. Each used to own a rAF loop and its own
 * passive scroll listener. They are visibility-gated, so the count on screen was
 * bounded, but there is no reason for two dividers in view to schedule two frames
 * to write two transforms — one callback list on one frame does it.
 */

type Subscriber = (deltaSeconds: number) => void

const subscribers = new Set<Subscriber>()
let frame = 0
let lastTime = 0

/** Cap the delta so a backgrounded tab does not resume with a visible jump. */
const MAX_DELTA = 1 / 30

function tick(now: number) {
  const delta = Math.min((now - lastTime) / 1000, MAX_DELTA)
  lastTime = now
  for (const subscriber of subscribers) subscriber(delta)
  frame = subscribers.size > 0 ? requestAnimationFrame(tick) : 0
}

/** Subscribe to the shared frame loop. Returns an unsubscribe function. */
export function onFrame(subscriber: Subscriber): () => void {
  subscribers.add(subscriber)
  if (frame === 0) {
    lastTime = performance.now()
    frame = requestAnimationFrame(tick)
  }
  return () => {
    subscribers.delete(subscriber)
    if (subscribers.size === 0 && frame !== 0) {
      cancelAnimationFrame(frame)
      frame = 0
    }
  }
}

let scrollY = typeof window === 'undefined' ? 0 : window.scrollY
let listening = false

function onScroll() {
  scrollY = window.scrollY
}

/**
 * The current scroll offset, read from one shared passive listener.
 *
 * Callers read this inside their frame callback rather than reading
 * `window.scrollY` themselves, which keeps the layout read to once per frame
 * instead of once per subscriber.
 */
export function getScrollY(): number {
  if (!listening && typeof window !== 'undefined') {
    listening = true
    window.addEventListener('scroll', onScroll, { passive: true })
  }
  return scrollY
}

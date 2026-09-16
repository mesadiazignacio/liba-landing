import { useSyncExternalStore } from 'react'

/**
 * Un `matchMedia` como estado de React, sin parpadeo: el valor inicial se lee
 * en el primer render y los cambios llegan por el listener del propio query.
 * En servidor devuelve `false`.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined') return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => (typeof window === 'undefined' ? false : window.matchMedia(query).matches),
    () => false,
  )
}

import { useId, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DUR, EASE, SETTLE_DELAY } from '../../lib/motion'
import { SHADOW } from '../../lib/shadows'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'

/**
 * The disclosure used by both the FAQ list and the trámite catalog, which had
 * carried two verbatim copies of the same chevron and height tween.
 *
 * The motion says "this row opened", in three coordinated parts: the panel takes
 * height, the row lifts onto the system's card shadow because it is now the
 * active object on the band, and the content settles a beat behind the height so
 * the text is not stretched while the box is still growing. Closing reverses it
 * faster and drops the content first — a row on its way out should not hold the
 * visitor's attention.
 */

function ChevronCircle({ open }: { open: boolean }) {
  const reduced = useReducedMotionSafe()
  return (
    <div className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-navy text-navy flex items-center justify-center">
      <motion.svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
        animate={{ rotate: open ? 180 : 0 }}
        transition={reduced ? { duration: 0 } : { duration: DUR.state, ease: EASE.out }}
      >
        {/* Upward chevron ∧ — rotates 180° to ∨ when open. `currentColor` so the
            stroke and the ring around it can never drift apart. */}
        <path
          d="M2 9L7 4L12 9"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  )
}

interface Props {
  /** The always-visible row content, rendered inside the trigger. */
  summary: ReactNode
  children: ReactNode
  /** Row fill. The catalog tones its rows by category, the FAQ list alternates. */
  background: string
  className?: string
}

export function Disclosure({ summary, children, background, className = '' }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const reduced = useReducedMotionSafe()

  return (
    <motion.div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{ backgroundColor: background }}
      animate={{
        boxShadow: open ? SHADOW.cardNavy : '0 0 0 rgba(8,77,155,0)',
      }}
      transition={{ duration: DUR.state, ease: EASE.out }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left cursor-pointer"
        aria-expanded={open}
        aria-controls={panelId}
      >
        {summary}
        <ChevronCircle open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            initial={{ height: 0 }}
            animate={{
              height: 'auto',
              transition: reduced ? { duration: 0 } : { duration: DUR.layout, ease: EASE.out },
            }}
            exit={{
              height: 0,
              transition: reduced ? { duration: 0 } : { duration: DUR.exit, ease: EASE.exit },
            }}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: reduced
                  ? { duration: 0 }
                  : { duration: DUR.state, ease: EASE.out, delay: SETTLE_DELAY },
              }}
              // Leaving, the content clears before the box does so the collapse
              // never squashes legible text.
              exit={{
                opacity: 0,
                y: -4,
                transition: reduced ? { duration: 0 } : { duration: DUR.clear, ease: EASE.exit },
              }}
              className="px-5 sm:px-6 pb-6 pt-1"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

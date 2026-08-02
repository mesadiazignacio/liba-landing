import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, type NavLink } from '../../lib/constants'
import { DUR, EASE, SPRING } from '../../lib/motion'
import { COLOR } from '../../lib/palette'
import { useNavbarScroll } from '../../hooks/useNavbarScroll'
import { LogoMark } from '../ui/LogoMark'

/**
 * El disparador es el enlace entero, no el glifo de 20px: la marca, el wordmark
 * y «| Gestoría» son un solo objeto que lleva al inicio, y pedirle al visitante
 * que acierte veinte píxeles para que algo responda es una recompensa que casi
 * nadie encuentra. El foco de teclado lo dispara igual — es el mismo estado.
 */
function Logo() {
  const [active, setActive] = useState(false)

  return (
    <Link
      to="/"
      className="flex flex-row items-center p-4 h-full flex-shrink-0"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <LogoMark spinning={active} style={{ width: 20, height: 20 }} />
      <img src="/logo-text.png" alt="LIBA" style={{ width: 40, height: 40 }} className="object-contain mx-1 flex-shrink-0" />
      <span className="text-white/75 text-[14px] font-normal leading-none flex-shrink-0">| Gestoría</span>
    </Link>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className="ml-1.5 flex-shrink-0"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: DUR.state, ease: EASE.out }}
    >
      <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

function isLinkActive(link: NavLink, pathname: string) {
  return pathname === link.to || (link.children?.some((c) => pathname === c.to) ?? false)
}

function DesktopNavItem({ link, isActive }: { link: NavLink; isActive: boolean }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const hasChildren = !!link.children?.length

  const trigger = (
    <Link
      to={link.to}
      className="relative h-full px-4 text-[14px] font-bold leading-none whitespace-nowrap transition-colors duration-200 text-white hover:bg-white/10 overflow-hidden flex items-center justify-center"
      aria-haspopup={hasChildren ? 'menu' : undefined}
      aria-expanded={hasChildren ? open : undefined}
    >
      {isActive && (
        <motion.span
          layoutId="navbar-pill"
          className="absolute inset-0 bg-white"
          style={{ borderRadius: 0 }}
          transition={SPRING.layout}
        />
      )}
      <span className={`relative z-10 flex items-center ${isActive ? 'text-navy' : 'text-white'}`}>
        {link.label}
        {hasChildren && <Chevron open={open} />}
      </span>
    </Link>
  )

  if (!hasChildren) return trigger

  return (
    <div
      className="relative h-full flex items-stretch"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      {trigger}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-1/2 pt-2 z-50"
            initial={{ opacity: 0, y: 8, x: '-50%' }}
            animate={{
              opacity: 1,
              y: 0,
              x: '-50%',
              transition: { duration: DUR.state, ease: EASE.out },
            }}
            exit={{
              opacity: 0,
              y: 8,
              x: '-50%',
              transition: { duration: DUR.exit, ease: EASE.exit },
            }}
          >
            <div
              className="min-w-[180px] rounded-2xl border border-white/10 overflow-hidden shadow-lg py-1.5"
              style={{
                background: 'rgba(8,77,155,0.92)',
                backdropFilter: 'blur(12px) saturate(180%)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
              }}
            >
              {link.children!.map((child) => {
                const active = pathname === child.to
                return (
                  <Link
                    key={child.to}
                    to={child.to}
                    className={`block px-4 py-2.5 text-[14px] font-semibold transition-colors duration-200 ${
                      active ? 'bg-white text-navy' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {child.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrolled, hidden } = useNavbarScroll()
  const { pathname } = useLocation()

  // Escape closes the menu. A panel that covers the page and can only be
  // dismissed by hitting the same small button again is a trap for anyone not
  // using a mouse.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // The bar retracts on scroll-down. With the menu open it used to take the open
  // panel offscreen with it, leaving the visitor on a page whose navigation had
  // vanished mid-gesture. Closing the menu is the honest response to the scroll.
  useEffect(() => {
    if (hidden) setMenuOpen(false)
  }, [hidden])

  return (
    <motion.header
      className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center"
      initial={{ y: -80 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: DUR.layout, ease: EASE.out }}
    >
      <nav
        // Not overflow-hidden: the Servicios dropdown is absolutely positioned
        // inside this element and clipping the bar would clip the menu with it.
        // The square active fill is inset from both ends, so it never reaches a
        // corner to paint over.
        className="max-w-[960px] w-full rounded-2xl flex items-center transition-all duration-300"
        style={{
          height: scrolled ? 46 : 52,
          background: scrolled ? 'rgba(8,77,155,0.82)' : COLOR.navy,
          backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
          boxShadow: scrolled
            ? '0 2px 24px rgba(8,30,70,0.4), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 2px 12px rgba(8,30,70,0.25)',
        }}
      >
        <Logo />

        <div className="hidden md:flex flex-1 items-stretch h-full justify-evenly relative">
          {NAV_LINKS.map((link) => (
            <DesktopNavItem key={link.to} link={link} isActive={isLinkActive(link, pathname)} />
          ))}
        </div>

        <button
          className="md:hidden ml-auto flex items-center px-4 h-full"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="relative block h-3.5 w-5" aria-hidden>
            <span className={`absolute left-0 h-[2px] w-5 bg-white transition-all duration-200 ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-1.5 h-[2px] w-5 bg-white transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 h-[2px] w-5 bg-white transition-all duration-200 ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden absolute left-4 right-4 max-w-[960px] mx-auto rounded-2xl border border-white/10 overflow-hidden shadow-lg"
            // Sits a fixed 10px below the bar, whatever height the bar currently
            // is. Hard-coding 62px meant the gap grew to 16px once the bar shrank.
            style={{
              top: (scrolled ? 46 : 52) + 10,
              background: 'rgba(8,77,155,0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              transition: { duration: DUR.layout, ease: EASE.out },
            }}
            // A menu the visitor has just dismissed should get out of the way,
            // not ease out over the same 400ms it took to open.
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: DUR.exit, ease: EASE.exit },
            }}
          >
            {NAV_LINKS.map((link) => (
              <div key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-5 py-3 text-[14px] font-bold border-b border-white/10 ${
                    isLinkActive(link, pathname) ? 'bg-white text-navy' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    onClick={() => setMenuOpen(false)}
                    className="block pl-9 pr-5 py-2.5 text-[14px] font-medium text-white/80 border-b border-white/10"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

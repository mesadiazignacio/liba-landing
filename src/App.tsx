import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { SmoothScroll } from './components/effects/SmoothScroll'
import { ScrollToTop } from './components/effects/ScrollToTop'
import { PageLoader } from './components/effects/PageLoader'
import { NoiseOverlay } from './components/effects/NoiseOverlay'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { Navbar } from './components/layout/Navbar'
import { DUR, EASE } from './lib/motion'
import { Home } from './pages/Home'
import { AboutUs } from './pages/AboutUs'
import { ServicesPage } from './pages/ServicesPage'
import { Procedures } from './pages/Procedures'
import { Faqs } from './pages/Faqs'
import { ContactUs } from './pages/ContactUs'
import { Privacy } from './pages/Privacy'

export default function App() {
  const location = useLocation()

  return (
    <SmoothScroll>
      <PageLoader />
      <NoiseOverlay />
      <ScrollProgress />
      <Navbar />

      {/* Six routes used to swap with no transition at all, which read as six
          separate documents rather than one site. `mode="wait"` matters here:
          the outgoing page is fully transparent before the incoming one mounts,
          so ScrollToTop can reset the offset without the jump being visible.
          That is also why ScrollToTop lives inside the keyed element — a fresh
          mount is the navigation. `initial={false}` keeps the first load silent,
          since the intro cover already owns that moment. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: DUR.state, ease: EASE.out } }}
          // Leaving is faster than arriving, and it must finish before the next
          // page mounts, or the scroll reset becomes visible.
          exit={{ opacity: 0, transition: { duration: DUR.exit, ease: EASE.exit } }}
        >
          <ScrollToTop />
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:tipo" element={<ServicesPage />} />
            <Route path="/procedures" element={<Procedures />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </SmoothScroll>
  )
}

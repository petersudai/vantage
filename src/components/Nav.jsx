import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Wordmark from './Wordmark.jsx'

const links = [
  { to: '/residences', label: 'Residences' },
  { to: '/team', label: 'Team' },
  { to: '/about', label: 'About' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Overlay (transparent over a dark hero) only where a dark hero exists.
  const isHome = pathname === '/'
  const isDetail = pathname.startsWith('/residences/') && pathname !== '/residences'
  const overlay = isHome || isDetail

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const transparent = overlay && !scrolled
  const tone = transparent ? 'light' : 'ink'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial ${
          transparent
            ? 'bg-transparent'
            : 'bg-canvas/90 backdrop-blur-md border-b border-ink/10'
        }`}
      >
        <nav className="shell flex h-20 items-center justify-between">
          <Wordmark tone={tone} />

          <div className="hidden items-center gap-10 md:flex">
            <ul className="flex items-center gap-9">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `relative font-sans text-sm tracking-wide transition-colors duration-300 ${
                        transparent ? 'text-canvas/80 hover:text-canvas' : 'text-ink/70 hover:text-ink'
                      } ${isActive ? '!text-current after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-current' : ''}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link
              to="/residences"
              className={
                transparent ? 'btn-primary-on-dark !px-6 !py-2.5' : 'btn-primary !px-6 !py-2.5'
              }
            >
              Enquire
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className={`md:hidden ${transparent ? 'text-canvas' : 'text-ink'}`}
          >
            <span className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]">
              <span className="h-px w-6 bg-current" />
              <span className="h-px w-6 bg-current" />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink text-canvas md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shell flex h-20 items-center justify-between">
              <Wordmark tone="light" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center text-canvas"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M3 3l16 16M19 3 3 19" stroke="currentColor" strokeWidth="1.25" />
                </svg>
              </button>
            </div>
            <div className="shell mt-10 flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={l.to}
                    className="block border-b border-canvas/15 py-5 font-serif text-4xl"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/residences" className="btn-primary-on-dark mt-10 self-start">
                Enquire
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

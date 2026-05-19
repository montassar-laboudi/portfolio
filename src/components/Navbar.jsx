import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiDownload, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../context/ThemeContext'
import { personal } from '../data/content'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1))

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const ThemeToggle = ({ size = 18 }) => (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="cursor-pointer text-[var(--text-secondary)] hover:text-teal transition-colors duration-200"
    >
      <motion.div
        animate={{ rotate: theme === 'dark' ? 0 : 180, scale: 1 }}
        transition={{ type: 'spring', duration: 0.3 }}
      >
        {theme === 'dark' ? <FiSun size={size} /> : <FiMoon size={size} />}
      </motion.div>
    </button>
  )

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" aria-label="Back to top" className="flex items-center">
            <img src="/assets/logos/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1)
              const isActive = activeSection === id
              return (
                <a
                  key={href}
                  href={href}
                  className={`nav-link text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-teal active'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {label}
                </a>
              )
            })}
          </div>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle size={19} />
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--text-secondary)] hover:text-teal transition-colors"
            >
              <FiGithub size={20} />
            </a>
            <a
              href={personal.cv}
              download
              aria-label="Download CV"
              className="flex items-center gap-1.5 px-4 py-2 border border-teal/40 text-teal text-sm rounded-lg hover:bg-teal/10 transition-colors"
            >
              <FiDownload size={14} />
              Download CV
            </a>
          </div>

          {/* Mobile right actions */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle size={18} />
            <button
              className="text-[var(--text-secondary)] hover:text-teal transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="menu-overlay fixed inset-0 z-40 flex flex-col items-center justify-center gap-7"
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-display font-semibold text-[var(--text-primary)] hover:text-teal transition-colors"
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href={personal.cv}
              download
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.07 }}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-6 py-3 bg-teal text-navy font-semibold rounded-xl mt-2"
            >
              <FiDownload size={16} />
              Download CV
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

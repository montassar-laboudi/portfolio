import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'
import { personal } from '../data/content'

function ProfilePhoto() {
  const handleError = (e) => {
    e.currentTarget.style.display = 'none'
    document.getElementById('photo-fallback').style.display = 'flex'
  }

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-teal/8 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="relative w-60 h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden photo-ring border-2 border-teal/40 z-10"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05, y: -16 }}
      >
        <img
          src={personal.photo}
          alt="Montassar Laboudi"
          loading="lazy"
          onError={handleError}
          className="w-full h-full object-cover"
        />
        <div
          id="photo-fallback"
          style={{ display: 'none' }}
          className="img-fallback absolute inset-0 items-center justify-center"
        >
          <img src="/assets/logos/logo.png" alt="Logo" className="w-24 h-24 object-contain opacity-80" />
        </div>
      </motion.div>
    </motion.div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 dot-grid opacity-35 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-teal/4 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <motion.div {...fadeUp(0)} className="mb-4">
            <span className="font-mono text-sm text-teal">{'< Available for Opportunities />'}</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold gradient-text mb-3 leading-tight"
          >
            {personal.name}
          </motion.h1>

          <motion.p {...fadeUp(0.18)} className="text-lg sm:text-xl font-display font-semibold text-[var(--text-secondary)] mb-1">
            {personal.title}
          </motion.p>

          <motion.p {...fadeUp(0.26)} className="text-[var(--text-secondary)] font-mono text-sm mb-4">
            {personal.subtitle}
          </motion.p>

          <motion.p {...fadeUp(0.32)} className="text-[var(--text-secondary)] text-base leading-relaxed mb-8 max-w-xl">
            {personal.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.42)} className="flex flex-wrap gap-3 mb-8">
            <a
              href="#projects"
              className="px-6 py-3 bg-teal text-[var(--text-primary)] font-semibold rounded-lg hover:bg-teal-dim transition-colors"
            >
              View Projects →
            </a>
            <a
              href={personal.cv}
              download
              aria-label="Download CV"
              className="flex items-center gap-2 px-6 py-3 border border-teal/40 text-teal rounded-lg hover:bg-teal/10 transition-colors"
            >
              <FiDownload size={16} />
              Download CV
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.52)} className="flex items-center gap-5">
            <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[var(--text-secondary)] hover:text-teal transition-colors">
              <FiGithub size={22} />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[var(--text-secondary)] hover:text-teal transition-colors">
              <FiLinkedin size={22} />
            </a>
            <a href={`mailto:${personal.email}`} aria-label="Email" className="text-[var(--text-secondary)] hover:text-teal transition-colors">
              <FiMail size={22} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:flex justify-center items-center"
        >
          <ProfilePhoto />
        </motion.div>
      </div>
    </section>
  )
}

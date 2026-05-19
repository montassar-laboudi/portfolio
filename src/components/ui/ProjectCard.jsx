import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiLock, FiAward } from 'react-icons/fi'
import Tag from './Tag'

function ConfidentialBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] border border-[var(--border-subtle)] px-2.5 py-1 rounded-md">
      <FiLock size={11} />
      Proprietary · CEA R&amp;D
    </span>
  )
}

function ImgWithFallback({ src, alt, className }) {
  const handleError = (e) => {
    e.currentTarget.style.display = 'none'
    e.currentTarget.nextElementSibling.style.display = 'flex'
  }
  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={handleError}
        className="w-full h-full object-cover"
      />
      <div
        style={{ display: 'none' }}
        className="img-fallback absolute inset-0 flex items-center justify-center text-teal font-mono font-bold text-3xl"
      >
        {alt.slice(0, 2).toUpperCase()}
      </div>
    </div>
  )
}

export default function ProjectCard({ project, featured = false }) {
  const glowEnter = (e) => (e.currentTarget.style.boxShadow = '0 0 40px rgba(20,184,166,0.2)')
  const glowLeave = (e) => (e.currentTarget.style.boxShadow = 'none')

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        whileHover={{ y: -4 }}
        onMouseEnter={glowEnter}
        onMouseLeave={glowLeave}
        className="glass-card rounded-2xl overflow-hidden border-teal/20 hover:border-teal/50 transition-all duration-300"
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <ImgWithFallback src={project.image} alt={project.title} className="h-full" />
            <div className="img-overlay-right absolute inset-0 hidden lg:block" />
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-teal border border-teal/30 px-2 py-0.5 rounded mb-3 inline-block">
                Featured Project
              </span>
              <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-3">{project.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, i) => <Tag key={t} index={i}>{t}</Tag>)}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo of ${project.title}`}
                  className="flex items-center gap-2 px-4 py-2 bg-teal text-[var(--text-primary)] font-semibold text-sm rounded-lg hover:bg-teal-dim transition-colors"
                >
                  <FiExternalLink size={14} /> Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub repo for ${project.title}`}
                  className="flex items-center gap-2 px-4 py-2 border border-teal/30 text-teal text-sm rounded-lg hover:border-teal hover:bg-teal/5 transition-colors"
                >
                  <FiGithub size={14} /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      onMouseEnter={glowEnter}
      onMouseLeave={glowLeave}
      className="glass-card rounded-xl overflow-hidden hover:border-teal/40 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <ImgWithFallback src={project.image} alt={project.title} className="h-full" />
        <div className="img-overlay-top absolute inset-0" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-2 leading-snug">{project.title}</h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t, i) => <Tag key={t} index={i}>{t}</Tag>)}
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.confidential && !project.live && !project.github && <ConfidentialBadge />}
          {project.certLink && (
            <a
              href={project.certLink}
              aria-label="View certification"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-teal/30 text-teal text-xs rounded-lg hover:border-teal hover:bg-teal/5 transition-colors"
            >
              <FiAward size={12} /> View Certification
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo — ${project.title}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal text-[var(--text-primary)] font-semibold text-xs rounded-lg hover:bg-teal-dim transition-colors"
            >
              <FiExternalLink size={12} /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub — ${project.title}`}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-teal/30 text-teal text-xs rounded-lg hover:border-teal hover:bg-teal/5 transition-colors"
            >
              <FiGithub size={12} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

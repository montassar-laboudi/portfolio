import { motion } from 'framer-motion'
import AnimatedSection from './ui/AnimatedSection'
import { certifications } from '../data/content'

function CertCard({ cert, index }) {
  const handleImgError = (e) => {
    e.currentTarget.style.display = 'none'
    e.currentTarget.nextElementSibling.style.display = 'flex'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 32px rgba(20,184,166,0.2)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
      className="glass-card rounded-xl p-5 hover:border-teal/50 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg flex-shrink-0 bg-[var(--bg-elevated)] border border-teal/20 overflow-hidden flex items-center justify-center">
          {cert.logo ? (
            <>
              <img
                src={cert.logo}
                alt={cert.issuer}
                loading="lazy"
                onError={handleImgError}
                className="w-full h-full object-contain p-1.5"
              />
              <span
                style={{ display: 'none' }}
                className="text-teal font-mono font-bold text-xs w-full h-full flex items-center justify-center"
              >
                {cert.issuer.slice(0, 2).toUpperCase()}
              </span>
            </>
          ) : (
            <span className="text-teal font-mono font-bold text-xs">
              {cert.issuer.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <p className="text-teal font-mono text-xs font-medium">{cert.issuer}</p>
          <p className="text-[var(--text-muted)] text-xs">{cert.year}</p>
        </div>
      </div>
      <h3 className="font-display font-semibold text-[var(--text-primary)] text-sm leading-snug mb-2">{cert.name}</h3>
      <p className="text-[var(--text-secondary)] text-xs leading-relaxed flex-1">{cert.description}</p>
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <span className="text-xs font-mono text-teal uppercase tracking-widest mb-2 block">Credentials</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-[var(--text-primary)] mb-2">Certifications</h2>
          <div className="w-12 h-1 bg-teal rounded mb-14" />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

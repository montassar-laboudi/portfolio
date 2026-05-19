import { motion } from 'framer-motion'
import AnimatedSection from './ui/AnimatedSection'
import { education } from '../data/content'

function LogoWithFallback({ src, alt }) {
  const handleImgError = (e) => {
    e.currentTarget.style.display = 'none'
    e.currentTarget.nextElementSibling.style.display = 'flex'
  }
  return (
    <div className="w-14 h-14 rounded-lg flex-shrink-0 bg-[var(--bg-elevated)] border border-teal/20 overflow-hidden flex items-center justify-center">
      {src ? (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={handleImgError}
            className="w-full h-full object-contain p-2"
          />
          <span
            style={{ display: 'none' }}
            className="text-teal font-mono font-bold text-sm w-full h-full flex items-center justify-center"
          >
            {alt.slice(0, 2).toUpperCase()}
          </span>
        </>
      ) : (
        <span className="text-teal font-mono font-bold text-sm">
          {alt.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  )
}

function EducationCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="glass-card rounded-xl p-6 hover:border-teal/35 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <LogoWithFallback src={item.logo} alt={item.school} />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-[var(--text-primary)] leading-snug mb-1">{item.school}</h3>
          <p className="text-teal text-sm font-medium mb-1">{item.degree}</p>
          <p className="text-[var(--text-muted)] text-xs mb-2">{item.period} · {item.location}</p>
          {item.notes && <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.notes}</p>}
        </div>
      </div>
    </motion.div>
  )
}

export default function Education() {
  return (
    <section id="education" className="section-alt py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <span className="text-xs font-mono text-teal uppercase tracking-widest mb-2 block">Academic Background</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-[var(--text-primary)] mb-2">Education</h2>
          <div className="w-12 h-1 bg-teal rounded mb-14" />
        </AnimatedSection>

        <div className="max-w-3xl space-y-5">
          {education.map((item, i) => (
            <EducationCard key={item.school} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

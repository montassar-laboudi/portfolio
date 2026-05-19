import { motion } from 'framer-motion'
import Tag from './Tag'

function LogoWithFallback({ src, alt, fallback }) {
  const handleError = (e) => {
    e.currentTarget.style.display = 'none'
    e.currentTarget.nextElementSibling.style.display = 'flex'
  }
  return (
    <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-[var(--bg-elevated)] border border-teal/20 overflow-hidden flex items-center justify-center">
      {src ? (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={handleError}
            className="w-full h-full object-contain p-1.5"
          />
          <span style={{ display: 'none' }} className="text-teal font-mono font-bold text-sm w-full h-full flex items-center justify-center">
            {fallback}
          </span>
        </>
      ) : (
        <span className="text-teal font-mono font-bold text-sm">{fallback}</span>
      )}
    </div>
  )
}

export default function TimelineItem({ item, index, featured = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-teal/60 via-teal/20 to-transparent" />
      <div
        className={`absolute -left-1 top-2 w-2.5 h-2.5 rounded-full border-2 ${
          featured ? 'bg-teal border-teal' : 'bg-[var(--bg-secondary)] border-teal/50'
        }`}
      />

      <div
        className={`glass-card rounded-xl p-6 transition-all duration-300 hover:border-teal/40 ${
          featured ? 'border-l-[3px] border-l-teal border-t-teal/20 border-r-teal/20 border-b-teal/20' : ''
        }`}
      >
        <div className="flex items-start gap-4 mb-3">
          <LogoWithFallback src={item.logo} alt={item.company} fallback={item.fallback} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="font-display font-semibold text-[var(--text-primary)]">{item.company}</h3>
              {featured && (
                <span className="text-xs font-mono text-teal border border-teal/30 px-2 py-0.5 rounded">
                  Lead Engineering Intern
                </span>
              )}
            </div>
            <p className="text-teal text-sm font-medium leading-snug">{item.title}</p>
            <p className="text-[var(--text-muted)] text-xs mt-0.5">{item.period} · {item.location}</p>
          </div>
        </div>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, i) => <Tag key={tag} index={i}>{tag}</Tag>)}
        </div>
      </div>
    </motion.div>
  )
}

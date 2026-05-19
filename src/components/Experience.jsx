import AnimatedSection from './ui/AnimatedSection'
import TimelineItem from './ui/TimelineItem'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="section-alt py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <span className="text-xs font-mono text-teal uppercase tracking-widest mb-2 block">Professional Background</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-[var(--text-primary)] mb-2">Experience</h2>
          <div className="w-12 h-1 bg-teal rounded mb-14" />
        </AnimatedSection>

        <div className="max-w-3xl">
          {experience.map((item, i) => (
            <TimelineItem key={item.company + i} item={item} index={i} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

import AnimatedSection from './ui/AnimatedSection'
import ProjectCard from './ui/ProjectCard'
import { projects } from '../data/content'

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <span className="text-xs font-mono text-teal uppercase tracking-widest mb-2 block">Selected Work</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-[var(--text-primary)] mb-2">Projects</h2>
          <div className="w-12 h-1 bg-teal rounded mb-14" />
        </AnimatedSection>

        <div className="space-y-8">
          <ProjectCard project={featured} featured />
          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

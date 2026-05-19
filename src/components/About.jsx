import { motion } from 'framer-motion'
import { FiCpu, FiBarChart2, FiEye, FiTool, FiCode } from 'react-icons/fi'
import AnimatedSection from './ui/AnimatedSection'
import Tag from './ui/Tag'
import { skills } from '../data/content'

const SKILL_ICONS = [FiCpu, FiBarChart2, FiEye, FiTool, FiCode]

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <span className="text-xs font-mono text-teal uppercase tracking-widest mb-2 block">Who I am</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-[var(--text-primary)] mb-2">About</h2>
          <div className="w-12 h-1 bg-teal rounded mb-14" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
              I am a graduate engineer from{' '}
              <span className="text-teal font-medium">Bretagne INP – ENIB</span> (Master of Science in Signal
              Processing and Telecommunications) and the{' '}
              <span className="text-teal font-medium">École Nationale d'Ingénieurs de Tunis – ENIT</span>{' '}
              (Telecommunications Engineering Degree, specialized in Data Science for Embedded Communications),
              preceded by two years of intensive preparatory classes in Physics and Technology at{' '}
              <span className="text-teal font-medium">IPEIEM, Tunis</span>.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
              I have practical experience developing and deploying machine learning and deep learning systems
              on real-world data — 3D experimental images, audio signals, infrared diagnostics, and industrial
              sensor streams — in environments with strict compute, memory, and latency constraints. I am
              comfortable operating in multidisciplinary research settings alongside engineers, researchers,
              and physicists, and I maintain a strong standard of code quality, reproducibility, and
              collaborative tooling.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              I am looking for a position in AI, signal processing, or data science where I can contribute
              to concrete technical projects and continue developing across both research and engineering
              dimensions.
            </p>
          </AnimatedSection>

          <div className="space-y-3">
            {skills.map((skill, si) => {
              const Icon = SKILL_ICONS[si] ?? FiCode
              return (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: si * 0.1, duration: 0.5 }}
                  className="glass-card rounded-xl p-5 hover:border-teal/30 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={16} className="text-teal flex-shrink-0" />
                    <h3 className="font-display font-semibold text-[var(--text-primary)] text-sm">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag, ti) => <Tag key={tag} index={ti}>{tag}</Tag>)}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

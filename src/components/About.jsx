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
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — heading + text */}
          <div>
            <AnimatedSection>
              <span className="text-xs font-mono text-teal uppercase tracking-widest mb-2 block">Who I am</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-[var(--text-primary)] mb-2">About</h2>
              <div className="w-12 h-1 bg-teal rounded mb-14" />

              <p className="text-base text-[var(--text-secondary)] leading-loose mb-6">
                AI and signal processing engineer, graduated from{' '}
                <span className="text-teal font-medium">Bretagne INP – ENIB</span> and{' '}
                <span className="text-teal font-medium">ENIT</span> (Telecommunications Engineering,
                Data Science for Embedded Communications), with preparatory classes in Physics
                and Technology at <span className="text-teal font-medium">IPEIEM, Tunis</span>.
              </p>
              <p className="text-base text-[var(--text-secondary)] leading-loose mb-6">
                I build ML and deep learning systems on real-world data — 3D images, audio signals,
                infrared diagnostics, experimental sensor streams — and deploy them under strict
                compute and latency constraints. I have worked in multidisciplinary research
                environments at the CEA alongside engineers, researchers, and physicists.
              </p>
              <p className="text-base text-[var(--text-secondary)] leading-loose">
                Open to positions in AI, signal processing, or data science where engineering
                depth and research rigor both matter.
              </p>

              <div className="mt-12 flex items-center gap-6">
                <span className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-widest">
                  French · English · Arabic
                </span>
                <span className="flex items-center gap-2 bg-teal/10 border border-teal/20 px-3 py-1 rounded-full">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                  />
                  <span className="text-sm text-teal font-mono">Available</span>
                </span>
              </div>
            </AnimatedSection>
          </div>

          {/* RIGHT — skills, starts at same level as heading */}
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

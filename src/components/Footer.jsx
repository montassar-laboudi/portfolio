import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { personal } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--text-muted)] text-sm">
        <span>© 2026 Montassar Laboudi</span>
        <div className="flex items-center gap-4">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-teal transition-colors"
          >
            <FiGithub size={18} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-teal transition-colors"
          >
            <FiLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}

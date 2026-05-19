import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { FiMail, FiLinkedin, FiGithub, FiPhone, FiMapPin, FiCopy, FiCheck, FiSend } from 'react-icons/fi'
import AnimatedSection from './ui/AnimatedSection'
import { personal } from '../data/content'

const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const formRef = useRef()
  const [copied, setCopied]       = useState(false)
  const [status, setStatus]       = useState('idle')
  const [errorMsg, setErrorMsg]   = useState('')

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = formRef.current

    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name:  form.from_name.value,
          from_email: form.from_email.value,
          reply_to:   form.from_email.value,
          subject:    form.subject.value,
          message:    form.message.value,
        },
        EJS_KEY
      )
      setStatus('success')
      form.reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setErrorMsg(err?.text || 'Failed to send. Please try again.')
    }
  }

  return (
    <section id="contact" className="section-alt py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">

        <AnimatedSection>
          <span className="text-xs font-mono text-teal uppercase tracking-widest mb-3 block">
            Get in touch
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-[var(--text-primary)] mb-12">
            Let's Work Together
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 text-left space-y-5 mb-10"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="Your name"
                  className="w-full bg-[var(--bg-elevated)] border border-teal/20 rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-teal/60 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="from_email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-[var(--bg-elevated)] border border-teal/20 rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-teal/60 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                placeholder="What's this about?"
                className="w-full bg-[var(--bg-elevated)] border border-teal/20 rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-teal/60 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                className="w-full bg-[var(--bg-elevated)] border border-teal/20 rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-teal/60 focus:outline-none transition-colors resize-none"
              />
            </div>

            {status === 'success' && (
              <p className="text-teal text-sm text-center font-medium">
                Message sent. I will get back to you soon.
              </p>
            )}

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">
                {errorMsg || 'Something went wrong. Try emailing me directly.'}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 py-3 bg-teal text-navy font-semibold rounded-lg hover:bg-teal-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FiSend size={15} />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${personal.email}`}
                aria-label="Send an email"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-teal transition-colors text-sm"
              >
                <FiMail size={18} />
                {personal.email}
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                title={copied ? 'Copied!' : 'Copy email'}
                className="text-[var(--text-muted)] hover:text-teal transition-colors"
              >
                {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
              </button>
            </div>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-teal transition-colors text-sm"
            >
              <FiLinkedin size={18} />
              LinkedIn
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-teal transition-colors text-sm"
            >
              <FiGithub size={18} />
              GitHub
            </a>

            <a
              href={`tel:${personal.phone.replace(/\s/g, '')}`}
              aria-label="Phone"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-teal transition-colors text-sm"
            >
              <FiPhone size={18} />
              {personal.phone}
            </a>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[var(--text-muted)] text-sm">
            <FiMapPin size={14} className="flex-shrink-0" />
            <span>{personal.location}</span>
          </div>

        </AnimatedSection>
      </div>
    </section>
  )
}
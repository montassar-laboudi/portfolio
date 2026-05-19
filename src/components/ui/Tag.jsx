import { motion } from 'framer-motion'

export default function Tag({ children, index = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      className="inline-block px-2.5 py-1 text-xs font-mono font-medium text-teal bg-teal/10 border border-teal/20 rounded-md hover:border-teal/50 transition-colors cursor-default"
    >
      {children}
    </motion.span>
  )
}

import { motion } from 'framer-motion'

function SplitText({ text, className = '', delay = 0.05, duration = 0.6, style = {} }) {
  const letras = text.split('')

  return (
    <span className={className} style={{ display: 'inline-block', ...style }}>
      {letras.map((letra, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: i * delay, ease: 'easeOut' }}
          style={{ display: 'inline-block', whiteSpace: letra === ' ' ? 'pre' : 'normal', ...style }}
        >
          {letra}
        </motion.span>
      ))}
    </span>
  )
}

export default SplitText
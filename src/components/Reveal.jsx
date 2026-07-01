import { motion } from 'framer-motion'

// A restrained scroll reveal. Used only on section openers and key moments,
// not on every element. Honours reduced-motion via Framer's reduced-motion support.
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 22,
  className = '',
  amount = 0.3,
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}

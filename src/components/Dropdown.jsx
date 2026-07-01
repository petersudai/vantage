import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// A styled, accessible dropdown that replaces the native select entirely.
export default function Dropdown({ label, value, options, onChange, align = 'left' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = options.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 rounded-full border border-ink/15 bg-transparent px-5 py-3 font-sans text-sm text-ink transition-colors duration-300 hover:border-ink/35"
      >
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[0.6rem] uppercase tracking-eyebrow text-stone-500">{label}</span>
          <span className="mt-0.5">{current ? current.label : 'Any'}</span>
        </span>
        <svg
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute z-30 mt-2 max-h-72 min-w-[15rem] overflow-auto rounded-xl border border-ink/10 bg-canvas p-1.5 shadow-[0_24px_60px_-30px_rgba(28,26,23,0.5)] ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            {options.map((o) => {
              const active = o.value === value
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(o.value)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left font-sans text-sm transition-colors duration-200 ${
                      active ? 'bg-emerald text-canvas' : 'text-ink/80 hover:bg-canvas-deep'
                    }`}
                  >
                    {o.label}
                    {active && (
                      <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true">
                        <path d="M1 5l3.5 3.5L12 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

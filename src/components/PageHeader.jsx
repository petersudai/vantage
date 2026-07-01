import Reveal from './Reveal.jsx'

// Opening block for interior pages. Clears the fixed nav and sets the editorial tone.
export default function PageHeader({ eyebrow, title, intro, align = 'left' }) {
  return (
    <header className={`shell pt-36 pb-12 sm:pt-44 ${align === 'center' ? 'text-center' : ''}`}>
      <Reveal>
        {eyebrow && <p className="eyebrow text-emerald">{eyebrow}</p>}
        <h1 className="mt-5 max-w-4xl text-display-md text-balance">{title}</h1>
        {intro && (
          <p
            className={`mt-6 max-w-2xl font-sans text-lg leading-relaxed text-stone-600 ${
              align === 'center' ? 'mx-auto' : ''
            }`}
          >
            {intro}
          </p>
        )}
      </Reveal>
    </header>
  )
}

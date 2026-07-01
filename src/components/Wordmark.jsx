import { Link } from 'react-router-dom'

// The Vantage wordmark. The mark is a minimal apex inside a ring: a point of vantage.
export default function Wordmark({ tone = 'ink', className = '' }) {
  const color = tone === 'light' ? 'text-canvas' : 'text-ink'
  return (
    <Link
      to="/"
      aria-label="Vantage, home"
      className={`group inline-flex items-center gap-3 ${color} ${className}`}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path
          d="M6.5 16.5 13 7l6.5 9.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="13" cy="7" r="1.1" fill="currentColor" />
      </svg>
      <span className="font-serif text-[1.35rem] leading-none tracking-tight">Vantage</span>
    </Link>
  )
}

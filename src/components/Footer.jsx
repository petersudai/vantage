import { Link } from 'react-router-dom'
import Wordmark from './Wordmark.jsx'
import { brand, communities } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-canvas">
      <div className="shell py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark tone="light" />
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-canvas/60">
              A considered collection of residences across Dubai’s established
              communities. Represented privately, by appointment.
            </p>
            <a
              href={`mailto:${brand.email}`}
              className="link-cta mt-8 text-canvas"
            >
              <span>{brand.email}</span>
              <span className="link-cta__line" />
            </a>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <p className="eyebrow text-canvas/40">Pages</p>
            <ul className="mt-5 space-y-3 font-sans text-sm">
              {[
                { to: '/residences', label: 'Residences' },
                { to: '/team', label: 'Team' },
                { to: '/about', label: 'About' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-canvas/70 transition-colors hover:text-canvas">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-canvas/40">Communities</p>
            <ul className="mt-5 space-y-3 font-sans text-sm text-canvas/70">
              {communities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-canvas/15 pt-8 font-sans text-xs text-canvas/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{brand.address}</p>
          <p>
            © {year} Vantage Residences. A concept. All listings are fictional.
          </p>
        </div>
      </div>
    </footer>
  )
}

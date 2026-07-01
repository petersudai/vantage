import { Link } from 'react-router-dom'
import SmartImage from './SmartImage.jsx'
import { formatPrice, formatSqft } from '../lib/format.js'

function specLine(p) {
  if (p.beds != null) {
    return `${p.beds} bed · ${p.baths} bath · ${formatSqft(p.sizeSqft)}`
  }
  return `${p.kind} · ${formatSqft(p.sizeSqft)}`
}

export default function PropertyCard({ property, eager = false }) {
  return (
    <Link to={`/residences/${property.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <SmartImage
          id={property.images[0]}
          alt={property.name}
          width={900}
          height={1125}
          eager={eager}
          className="h-full w-full"
          imgClassName="transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.05]"
        />
        {/* A single, quiet type label. No competing colours. */}
        <span className="absolute left-4 top-4 rounded-full bg-canvas/85 px-3 py-1 font-sans text-[0.65rem] uppercase tracking-eyebrow text-ink backdrop-blur-sm">
          {property.type}
        </span>
      </div>

      <div className="pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="eyebrow text-stone-500">{property.area}</span>
          <span className="font-serif text-lg text-ink">{formatPrice(property.price)}</span>
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-ink">{property.name}</h3>
        <p className="mt-2 font-sans text-sm text-stone-600">{specLine(property)}</p>

        <span className="link-cta mt-5 text-emerald">
          <span>View residence</span>
          <span className="link-cta__line">
            <span className="absolute inset-0 -translate-x-full bg-current transition-transform duration-500 ease-editorial group-hover:translate-x-0" />
          </span>
        </span>
      </div>
    </Link>
  )
}

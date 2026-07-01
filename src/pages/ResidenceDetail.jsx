import { Link, useParams } from 'react-router-dom'
import SmartImage from '../components/SmartImage.jsx'
import BookingFlow from '../components/BookingFlow.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import Reveal from '../components/Reveal.jsx'
import NotFound from './NotFound.jsx'
import { getProperty, properties } from '../data/properties.js'
import { getAgent } from '../data/team.js'
import { formatPriceFull, formatPrice, formatSqft } from '../lib/format.js'

export default function ResidenceDetail() {
  const { slug } = useParams()
  const property = getProperty(slug)

  if (!property) return <NotFound />

  const agent = getAgent(property.agentId)
  const gallery = property.images.slice(1)
  const others = properties.filter((p) => p.slug !== property.slug).slice(0, 3)

  const specs = [
    { label: 'Guide price', value: formatPriceFull(property.price) },
    property.beds != null
      ? { label: 'Bedrooms', value: property.beds }
      : { label: 'Configuration', value: property.kind },
    { label: property.beds != null ? 'Bathrooms' : 'Washrooms', value: property.baths },
    { label: 'Internal area', value: formatSqft(property.sizeSqft) },
    property.floor != null ? { label: 'Floor', value: property.floor } : null,
    { label: 'Aspect', value: property.view },
  ].filter(Boolean)

  return (
    <article>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-ink text-canvas">
        <div className="absolute inset-0">
          <SmartImage id={property.images[0]} alt={property.name} width={2200} eager className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
        </div>
        <div className="shell relative pb-14 pt-32">
          <Link
            to="/residences"
            className="inline-flex items-center gap-2 font-sans text-sm text-canvas/70 transition-colors hover:text-canvas"
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M5 1 1 5l4 4M1 5h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All residences
          </Link>

          <div className="mt-8 flex items-center gap-4">
            <span className="rounded-full border border-canvas/30 px-3 py-1 font-sans text-[0.65rem] uppercase tracking-eyebrow">
              {property.type}
            </span>
            <span className="eyebrow text-canvas/60">{property.area}</span>
          </div>

          <h1 className="mt-5 max-w-4xl text-display-lg text-balance">{property.name}</h1>
          <p className="mt-5 max-w-xl font-sans text-lg leading-relaxed text-canvas/75">
            {property.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-4">
            <p className="font-serif text-3xl">{formatPrice(property.price)}</p>
            <a href="#viewing" className="btn-primary-on-dark">
              Arrange a private viewing
            </a>
          </div>
        </div>
      </section>

      {/* ── Spec strip ───────────────────────────────────────── */}
      <section className="bg-canvas">
        <div className="shell grid grid-cols-2 gap-y-8 border-b border-ink/12 py-10 sm:grid-cols-3 lg:grid-cols-6">
          {specs.map((s) => (
            <div key={s.label} className="px-1">
              <p className="eyebrow text-stone-500">{s.label}</p>
              <p className="mt-2 font-serif text-xl text-ink">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Description, amenities, sticky card ───────────────── */}
      <section className="bg-canvas py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-emerald">The residence</p>
              <div className="mt-6 space-y-6 font-serif text-2xl leading-snug text-ink/90">
                {property.description.map((para, i) => (
                  <p key={i} className="text-pretty">{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-16">
              <p className="eyebrow text-emerald">Curated amenities</p>
              <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-px sm:grid-cols-2">
                {property.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-4 border-b border-ink/10 py-4 font-sans text-base text-ink/80"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sticky enquiry card */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-ink/12 bg-canvas-deep p-7">
                <p className="eyebrow text-stone-500">Guide price</p>
                <p className="mt-2 font-serif text-3xl text-ink">{formatPriceFull(property.price)}</p>
                <p className="mt-1 font-sans text-sm text-stone-600">{property.availability}</p>

                <div className="my-7 h-px bg-ink/10" />

                {agent && (
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-full">
                      <SmartImage id={agent.image} alt={agent.name} width={140} height={140} duotone className="h-full w-full" />
                    </div>
                    <div>
                      <p className="font-serif text-lg text-ink">{agent.name}</p>
                      <p className="font-sans text-sm text-stone-600">{agent.role}</p>
                    </div>
                  </div>
                )}

                <a href="#viewing" className="btn-primary mt-7 w-full">
                  Arrange a private viewing
                </a>
                {agent && (
                  <a
                    href={`mailto:${agent.email}`}
                    className="mt-3 block text-center font-sans text-sm text-stone-600 underline-offset-4 hover:underline"
                  >
                    Or email {agent.name.split(' ')[0]} directly
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────── */}
      <section className="bg-canvas-deep py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-emerald">The gallery</p>
            <h2 className="mt-4 text-display-sm">A closer look.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:gap-6">
            {gallery.map((id, i) => {
              const wide = i === 0 || i === 3
              return (
                <Reveal
                  key={`${id}-${i}`}
                  delay={(i % 2) * 0.08}
                  amount={0.15}
                  className={wide ? 'col-span-2' : 'col-span-1'}
                >
                  <div className={`overflow-hidden rounded-sm ${wide ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
                    <SmartImage id={id} alt={`${property.name}, view ${i + 2}`} width={wide ? 1800 : 900} className="h-full w-full" />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Location context ─────────────────────────────────── */}
      <section className="bg-emerald py-20 text-canvas lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-canvas/55">Within reach</p>
            <h2 className="mt-4 text-display-sm">
              Measured from
              <br />
              the door.
            </h2>
            <p className="mt-6 max-w-xs font-sans text-base leading-relaxed text-canvas/70">
              Times are approximate and assume an ordinary day, not an empty road.
            </p>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <ul>
              {property.location.map((l, i) => (
                <Reveal as="li" key={l.place} delay={i * 0.06}>
                  <div className="flex items-baseline justify-between gap-6 border-b border-canvas/20 py-6">
                    <span className="font-sans text-lg text-canvas/85">{l.place}</span>
                    <span className="font-serif text-2xl">{l.time}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Booking ──────────────────────────────────────────── */}
      <section id="viewing" className="scroll-mt-24 bg-ink py-20 text-canvas lg:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-canvas/55">By appointment</p>
            <h2 className="mt-4 text-display-md text-balance">Arrange a private viewing.</h2>
            <p className="mt-5 font-sans text-lg leading-relaxed text-canvas/70">
              Choose a day and time that suits you. We hold viewings for one party at a
              time, so the residence is yours for the hour.
            </p>
          </Reveal>
          <div className="mt-12">
            <BookingFlow property={property} />
          </div>
        </div>
      </section>

      {/* ── More residences ──────────────────────────────────── */}
      <section className="bg-canvas py-20 lg:py-28">
        <div className="shell">
          <Reveal className="flex items-end justify-between">
            <h2 className="text-display-sm">Elsewhere in the collection.</h2>
            <Link to="/residences" className="link-cta group hidden text-emerald sm:inline-flex">
              <span>All residences</span>
              <span className="link-cta__line">
                <span className="absolute inset-0 -translate-x-full bg-current transition-transform duration-500 ease-editorial group-hover:translate-x-0" />
              </span>
            </Link>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}

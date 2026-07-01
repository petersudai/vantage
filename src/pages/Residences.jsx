import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import PropertyFilters from '../components/PropertyFilters.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { properties } from '../data/properties.js'
import { applyFilters } from '../lib/filters.js'
import useDocumentTitle from '../lib/useDocumentTitle.js'

export default function Residences() {
  useDocumentTitle('Residences — Vantage')
  const [type, setType] = useState('All')
  const [area, setArea] = useState('All')
  const [band, setBand] = useState('any')

  const results = useMemo(
    () => applyFilters(properties, { type, area, band }),
    [type, area, band],
  )

  const clear = () => {
    setType('All')
    setArea('All')
    setBand('any')
  }

  return (
    <>
      <PageHeader
        eyebrow="The Collection"
        title="Every residence we currently represent."
        intro="Nine homes across five communities. Filter by what matters to you, or simply read down the list. Each is held privately and shown by appointment."
      />

      <section className="shell pb-28">
        <PropertyFilters
          type={type}
          area={area}
          band={band}
          count={results.length}
          onType={setType}
          onArea={setArea}
          onBand={setBand}
          onClear={clear}
        />

        {results.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06} amount={0.15}>
                <PropertyCard property={p} eager={i < 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-20 border-t border-ink/12 py-24 text-center">
            <p className="font-serif text-3xl text-ink">Nothing matches, for now.</p>
            <p className="mx-auto mt-4 max-w-md font-sans text-base text-stone-600">
              We place residences before they are widely listed. Tell us what you are
              after and we will look ahead of the market on your behalf.
            </p>
            <button type="button" onClick={clear} className="btn-primary mt-8">
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  )
}

import Dropdown from './Dropdown.jsx'
import { AREAS, TYPES } from '../data/properties.js'
import { PRICE_BANDS } from '../lib/filters.js'

const typeOptions = ['All', ...TYPES]

export default function PropertyFilters({
  type,
  area,
  band,
  count,
  onType,
  onArea,
  onBand,
  onClear,
}) {
  const active = type !== 'All' || area !== 'All' || band !== 'any'

  return (
    <div className="border-y border-ink/12 py-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Type as a visible segmented control, the primary filter. Scrolls as
            a single row rather than wrapping, so the pill shape stays intact
            on narrow screens. */}
        <div className="flex items-center gap-1 overflow-x-auto rounded-full border border-ink/12 p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {typeOptions.map((t) => {
            const isActive = type === t
            return (
              <button
                key={t}
                type="button"
                onClick={() => onType(t)}
                className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2 font-sans text-sm tracking-wide transition-colors duration-300 ${
                  isActive ? 'bg-ink text-canvas' : 'text-ink/60 hover:text-ink'
                }`}
              >
                {t === 'All' ? 'All residences' : t}
              </button>
            )
          })}
        </div>

        {/* Area and price as styled dropdowns, never native selects */}
        <div className="flex flex-wrap items-center gap-3">
          <Dropdown
            label="Community"
            value={area}
            onChange={onArea}
            options={[{ value: 'All', label: 'All communities' }, ...AREAS.map((a) => ({ value: a, label: a }))]}
          />
          <Dropdown
            label="Price"
            value={band}
            onChange={onBand}
            align="right"
            options={PRICE_BANDS.map((b) => ({ value: b.id, label: b.label }))}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="font-sans text-sm text-stone-600">
          <span className="font-serif text-base text-ink">{count}</span>{' '}
          {count === 1 ? 'residence' : 'residences'}
        </p>
        {active && (
          <button
            type="button"
            onClick={onClear}
            className="font-sans text-sm text-emerald underline-offset-4 transition-colors hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

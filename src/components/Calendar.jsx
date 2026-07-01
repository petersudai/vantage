import { useState } from 'react'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

// Monday-first weekday index for a given date.
const mondayIndex = (date) => (date.getDay() + 6) % 7

export default function Calendar({ selected, onSelect }) {
  const today = startOfDay(new Date())
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const firstOfMonth = new Date(view.year, view.month, 1)
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const leading = mondayIndex(firstOfMonth)

  const atCurrentMonth = view.year === today.getFullYear() && view.month === today.getMonth()

  const step = (dir) => {
    setView((v) => {
      const m = v.month + dir
      if (m < 0) return { year: v.year - 1, month: 11 }
      if (m > 11) return { year: v.year + 1, month: 0 }
      return { ...v, month: m }
    })
  }

  const cells = []
  for (let i = 0; i < leading; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.year, view.month, d))

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-serif text-xl text-ink">
          {MONTHS[view.month]} <span className="text-stone-500">{view.year}</span>
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atCurrentMonth}
            aria-label="Previous month"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden="true">
              <path d="M7 1 1 6.5 7 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next month"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40"
          >
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden="true">
              <path d="m1 1 6 5.5L1 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((w) => (
          <div key={w} className="pb-2 text-center font-sans text-[0.65rem] uppercase tracking-wide text-stone-500">
            {w}
          </div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={`x-${i}`} />
          const isPast = date < today
          const isSunday = date.getDay() === 0 // closed on Sundays
          const disabled = isPast || isSunday
          const isSelected = sameDay(date, selected)
          const isToday = sameDay(date, today)
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`relative aspect-square rounded-lg font-sans text-sm transition-colors duration-200 ${
                isSelected
                  ? 'bg-emerald text-canvas'
                  : disabled
                  ? 'cursor-not-allowed text-stone-300'
                  : 'text-ink hover:bg-canvas-deep'
              }`}
            >
              {date.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald" />
              )}
            </button>
          )
        })}
      </div>
      <p className="mt-4 font-sans text-xs text-stone-500">Viewings are held Monday to Saturday.</p>
    </div>
  )
}

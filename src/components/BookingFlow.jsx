import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Calendar from './Calendar.jsx'
import SmartImage from './SmartImage.jsx'
import { formatPrice } from '../lib/format.js'

const TIME_SLOTS = ['10:00', '11:30', '13:00', '15:30', '17:00']

const steps = [
  { id: 1, label: 'Date & time' },
  { id: 2, label: 'Your details' },
  { id: 3, label: 'Confirmed' },
]

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
}

function formatLongDate(date) {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const emailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export default function BookingFlow({ property }) {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', note: '' })
  const [errors, setErrors] = useState({})

  // Deterministic "taken" slots so availability feels real, not random per render.
  const takenSlots = useMemo(() => {
    if (!date) return new Set()
    const taken = new Set()
    TIME_SLOTS.forEach((slot, i) => {
      if ((date.getDate() + i) % 4 === 0) taken.add(slot)
    })
    return taken
  }, [date])

  const onPickDate = (d) => {
    setDate(d)
    setTime(null) // re-choose time when the day changes
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please add your name.'
    if (!emailValid(form.email)) next.email = 'A valid email, please.'
    if (form.phone.trim().length < 6) next.phone = 'A number we can reach you on.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (validate()) setStep(3)
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-canvas text-ink">
      {/* Step indicator: a genuine three-part sequence, so numbers carry meaning */}
      <div className="flex border-b border-ink/10">
        {steps.map((s) => {
          const state = step === s.id ? 'current' : step > s.id ? 'done' : 'todo'
          return (
            <div
              key={s.id}
              className={`flex flex-1 items-center gap-3 px-5 py-4 sm:px-7 ${
                state === 'todo' ? 'opacity-40' : ''
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-sans text-xs ${
                  state === 'current'
                    ? 'bg-emerald text-canvas'
                    : state === 'done'
                    ? 'bg-ink text-canvas'
                    : 'border border-ink/30 text-ink'
                }`}
              >
                {state === 'done' ? (
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
                    <path d="M1 4.5 4.5 8 11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  String(s.id).padStart(2, '0')
                )}
              </span>
              <span className="hidden font-sans text-sm sm:block">{s.label}</span>
            </div>
          )
        })}
      </div>

      <div className="p-6 sm:p-9">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" {...fade} className="grid gap-10 lg:grid-cols-2">
              <Calendar selected={date} onSelect={onPickDate} />
              <div>
                <p className="eyebrow text-stone-500">Available times</p>
                <p className="mt-2 font-sans text-sm text-stone-600">
                  {date ? formatLongDate(date) : 'Select a day to see available viewing times.'}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {TIME_SLOTS.map((slot) => {
                    const taken = takenSlots.has(slot)
                    const isActive = time === slot
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!date || taken}
                        onClick={() => setTime(slot)}
                        className={`rounded-lg border px-3 py-3 font-sans text-sm transition-colors duration-200 ${
                          isActive
                            ? 'border-emerald bg-emerald text-canvas'
                            : taken || !date
                            ? 'cursor-not-allowed border-ink/10 text-stone-300'
                            : 'border-ink/15 text-ink hover:border-ink/40'
                        }`}
                      >
                        {slot}
                        {taken && date && <span className="ml-1 text-[0.6rem] align-top">taken</span>}
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  disabled={!date || !time}
                  onClick={() => setStep(2)}
                  className="btn-primary mt-8 w-full sm:w-auto"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.form key="step2" {...fade} onSubmit={submit} className="max-w-xl">
              <div className="mb-7 flex items-center justify-between rounded-xl bg-canvas-deep px-5 py-4">
                <div>
                  <p className="eyebrow text-stone-500">Your viewing</p>
                  <p className="mt-1 font-serif text-lg">
                    {formatLongDate(date)} at {time}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-sans text-sm text-emerald underline-offset-4 hover:underline"
                >
                  Change
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  value={form.name}
                  error={errors.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />
                <Field
                  label="Phone"
                  type="tel"
                  value={form.phone}
                  error={errors.phone}
                  onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    error={errors.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block font-sans text-sm text-stone-600">
                    Anything we should know <span className="text-stone-400">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={form.note}
                    onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                    className="field resize-none"
                    placeholder="Timing, who will attend, particular questions."
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button type="submit" className="btn-primary">
                  Request this viewing
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-sans text-sm text-stone-600 underline-offset-4 hover:underline"
                >
                  Back
                </button>
              </div>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div key="step3" {...fade} className="grid gap-8 sm:grid-cols-[auto,1fr] sm:items-center">
              <div className="h-28 w-28 overflow-hidden rounded-xl">
                <SmartImage id={property.images[0]} alt={property.name} width={300} height={300} className="h-full w-full" />
              </div>
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald text-canvas">
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                    <path d="M1 6l4.5 4.5L15 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-4 font-serif text-3xl">Your viewing is requested.</h3>
                <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-stone-600">
                  {form.name.split(' ')[0] || 'Thank you'}, we have your request for{' '}
                  <span className="text-ink">{property.name}</span> on{' '}
                  <span className="text-ink">{formatLongDate(date)} at {time}</span>. Søren from client
                  relations will confirm within the hour and meet you there.
                </p>
                <p className="mt-4 font-sans text-sm text-stone-500">
                  {formatPrice(property.price)} · {property.area}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, error, type = 'text' }) {
  return (
    <div>
      <label className="mb-1.5 block font-sans text-sm text-stone-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`field ${error ? '!border-emerald-bright' : ''}`}
      />
      {error && <p className="mt-1.5 font-sans text-xs text-emerald-soft">{error}</p>}
    </div>
  )
}

// Price shown the way a brokerage writes it: "AED 3.6M", not 3,600,000.
export function formatPrice(value) {
  if (value == null) return 'On application'
  if (value >= 1_000_000) {
    const m = value / 1_000_000
    const text = m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)
    return `AED ${text}M`
  }
  return `AED ${value.toLocaleString('en-US')}`
}

export function formatPriceFull(value) {
  if (value == null) return 'Price on application'
  return `AED ${value.toLocaleString('en-US')}`
}

export function formatSqft(value) {
  return `${value.toLocaleString('en-US')} sqft`
}

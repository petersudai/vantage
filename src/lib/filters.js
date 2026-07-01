export const PRICE_BANDS = [
  { id: 'any', label: 'Any price', min: 0, max: Infinity },
  { id: 'under-2', label: 'Under 2M', min: 0, max: 2_000_000 },
  { id: '2-4', label: '2 – 4M', min: 2_000_000, max: 4_000_000 },
  { id: '4-6', label: '4 – 6M', min: 4_000_000, max: 6_000_000 },
  { id: '6-plus', label: '6M and above', min: 6_000_000, max: Infinity },
]

export function bandById(id) {
  return PRICE_BANDS.find((b) => b.id === id) || PRICE_BANDS[0]
}

export function applyFilters(list, { type = 'All', area = 'All', band = 'any' }) {
  const b = bandById(band)
  return list.filter((p) => {
    if (type !== 'All' && p.type !== type) return false
    if (area !== 'All' && p.area !== area) return false
    if (p.price < b.min || p.price >= b.max) return false
    return true
  })
}

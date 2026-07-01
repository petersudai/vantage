// Resolve an Unsplash photo ID to a sized, cropped URL.
// Centralised so we can tune quality/sizing in one place.
const BASE = 'https://images.unsplash.com/photo-'

export function img(id, { w = 1600, h, q = 80 } = {}) {
  const params = new URLSearchParams({
    q: String(q),
    w: String(w),
    auto: 'format',
    fit: 'crop',
  })
  if (h) params.set('h', String(h))
  return `${BASE}${id}?${params.toString()}`
}

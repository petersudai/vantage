// Shared brand facts and the trust/stats figures, kept in one place so the
// homepage and about page can present the same numbers differently.

export const stats = [
  { value: '2009', label: 'Established', note: 'In practice for sixteen years' },
  { value: 'AED 4.2B', label: 'Placed', note: 'In residences, to date' },
  { value: '320', label: 'Residences', note: 'Represented across the city' },
  { value: '5', label: 'Communities', note: 'Known house by house' },
]

export const communities = [
  'Downtown Dubai',
  'Palm Jumeirah',
  'Dubai Hills Estate',
  'Business Bay',
  'Jumeirah Village Circle',
]

export const brand = {
  name: 'Vantage',
  line: 'Residences of Dubai',
  email: 'private@vantage.ae',
  phone: '+971 4 000 0000',
  address: 'Floor 31, Solene Tower, Downtown Dubai',
}

// Credit shown quietly in the footer, since this is pitch collateral, not
// Vantage's real site. Edit freely: name, email, and the line itself.
export const builder = {
  name: 'Peter Sudai',
  email: 'psudai@gmail.com',
  note: 'A concept built by',
}

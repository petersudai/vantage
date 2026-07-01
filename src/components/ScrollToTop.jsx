import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Reset scroll on route change, except when navigating to an in-page hash.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])
  return null
}

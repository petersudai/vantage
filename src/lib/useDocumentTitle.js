import { useEffect } from 'react'

// Sets the browser tab title per route. React Router doesn't touch
// document.title on navigation in an SPA, so each page sets its own.
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}

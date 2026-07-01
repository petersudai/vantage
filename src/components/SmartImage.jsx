import { useState } from 'react'
import { img } from '../lib/images.js'

// An image that fails gracefully. If the source does not load, it resolves to a
// quiet in-brand gradient rather than a broken-image icon, so the layout holds.
export default function SmartImage({
  id,
  alt = '',
  className = '',
  imgClassName = '',
  width = 1600,
  height,
  eager = false,
  duotone = false,
}) {
  const [status, setStatus] = useState('loading') // loading | ready | error

  return (
    <div className={`relative overflow-hidden bg-canvas-dim ${className}`}>
      {/* Soft placeholder wash while the photograph resolves */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-700 ${
          status === 'ready' ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background:
            'linear-gradient(135deg, #2C5440 0%, #1F3D2E 45%, #26231F 100%)',
        }}
      />
      {status !== 'error' && (
        <img
          src={img(id, { w: width, h: height })}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('error')}
          className={`relative h-full w-full object-cover transition-opacity duration-700 ${
            status === 'ready' ? 'opacity-100' : 'opacity-0'
          } ${duotone ? 'duotone' : ''} ${imgClassName}`}
        />
      )}
    </div>
  )
}

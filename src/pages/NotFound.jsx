import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-canvas">
      <div className="shell text-center">
        <p className="eyebrow text-emerald">404</p>
        <h1 className="mt-5 text-display-md">This address is not on our books.</h1>
        <p className="mx-auto mt-5 max-w-md font-sans text-lg text-stone-600">
          The page you were after has moved or never existed. The collection, however,
          is exactly where you left it.
        </p>
        <Link to="/" className="btn-primary mt-9">
          Return home
        </Link>
      </div>
    </section>
  )
}

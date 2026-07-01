import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SmartImage from '../components/SmartImage.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { properties, featuredProperty } from '../data/properties.js'
import { stats } from '../data/site.js'
import { formatPrice, formatSqft } from '../lib/format.js'
import useDocumentTitle from '../lib/useDocumentTitle.js'

const loadContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const loadItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
}

const processSteps = [
  {
    n: '01',
    title: 'The brief',
    body: 'We begin with what you are actually after, not a search filter. Budget, yes, but also light, floor, distance, and the way you intend to live.',
  },
  {
    n: '02',
    title: 'The shortlist',
    body: 'We return a small, honest selection. Often three. We will tell you what is wrong with each, because something always is.',
  },
  {
    n: '03',
    title: 'The viewing',
    body: 'Private, unhurried, and timed for the right light. You see the residence as it is, with the person who knows it best.',
  },
  {
    n: '04',
    title: 'The acquisition',
    body: 'Negotiation, paperwork, and handover, handled quietly on your behalf. We stay on after the keys change hands.',
  },
]

export default function Home() {
  useDocumentTitle('Vantage — Residences of Dubai')
  const flagship = featuredProperty

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-canvas">
        <div className="absolute inset-0">
          <SmartImage
            id={flagship.images[0]}
            alt={flagship.name}
            width={2200}
            eager
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
        </div>

        <motion.div
          variants={loadContainer}
          initial="hidden"
          animate="show"
          className="shell relative pb-12 pt-32"
        >
          <motion.p variants={loadItem} className="eyebrow text-canvas/70">
            Residences of Dubai · Established 2009
          </motion.p>
          <motion.h1
            variants={loadItem}
            className="mt-7 max-w-5xl text-display-xl text-balance"
          >
            Fewer homes,
            <br />
            <span className="italic text-canvas/90">known completely.</span>
          </motion.h1>
          <motion.p
            variants={loadItem}
            className="mt-8 max-w-xl font-sans text-lg leading-relaxed text-canvas/75"
          >
            Vantage represents a deliberately narrow collection of residences across
            Dubai’s established communities. Each one seen, measured and understood
            before it reaches you.
          </motion.p>

          {/* Flagship strip: the featured residence, identified as part of the hero */}
          <motion.div
            variants={loadItem}
            className="mt-12 border-t border-canvas/20 pt-6"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
                <div>
                  <p className="eyebrow text-canvas/50">Flagship residence</p>
                  <p className="mt-2 font-serif text-2xl">{flagship.name}</p>
                </div>
                <div className="flex gap-x-10">
                  <Spec label="Guide" value={formatPrice(flagship.price)} />
                  <Spec label="Bedrooms" value={flagship.beds} />
                  <Spec label="Internal" value={formatSqft(flagship.sizeSqft)} />
                </div>
              </div>
              <Link to={`/residences/${flagship.slug}`} className="btn-primary-on-dark shrink-0">
                View the flagship
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <div className="shell relative pb-8">
          <span className="font-sans text-xs uppercase tracking-eyebrow text-canvas/40">
            Scroll
          </span>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────────── */}
      <section className="bg-emerald text-canvas">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-12 py-16 lg:grid-cols-4 lg:py-20">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="border-l border-canvas/20 pl-5">
                <p className="font-serif text-5xl leading-none lg:text-6xl">{s.value}</p>
                <p className="mt-4 font-sans text-sm font-medium tracking-wide">{s.label}</p>
                <p className="mt-1 font-sans text-sm text-canvas/55">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── The Collection ───────────────────────────────────── */}
      <section className="bg-canvas py-24 lg:py-32">
        <div className="shell">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-emerald">The Collection</p>
              <h2 className="mt-4 max-w-xl text-display-md text-balance">
                A short list, by design.
              </h2>
            </div>
            <p className="max-w-sm font-sans text-base leading-relaxed text-stone-600">
              Nine residences, currently. We would rather represent a handful well
              than a thousand at arm’s length.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08} amount={0.15}>
                <PropertyCard property={p} eager={i < 3} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 flex justify-center">
            <Link to="/residences" className="link-cta group text-emerald">
              <span>Filter the full collection</span>
              <span className="link-cta__line">
                <span className="absolute inset-0 -translate-x-full bg-current transition-transform duration-500 ease-editorial group-hover:translate-x-0" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section className="bg-ink py-24 text-canvas lg:py-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-canvas/50">The engagement</p>
            <h2 className="mt-4 max-w-2xl text-display-md text-balance">
              How an acquisition with Vantage actually goes.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-canvas/12 bg-canvas/12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="bg-ink">
                <div className="h-full p-8">
                  <p className="font-serif text-4xl text-emerald-bright">{s.n}</p>
                  <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-canvas/60">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── About teaser ─────────────────────────────────────── */}
      <section className="bg-canvas-deep py-24 lg:py-32">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow text-emerald">About Vantage</p>
            <h2 className="mt-4 text-display-md text-balance">
              A brokerage built around restraint.
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-stone-600">
              <p>
                We started in 2009 with a contrarian idea: that the way to represent
                property well is to represent less of it. No wall of listings, no
                competing for attention.
              </p>
              <p>
                What we offer instead is judgement. We know the buildings we sell from
                the inside, and we will tell you when the answer is no.
              </p>
            </div>
            <Link to="/about" className="link-cta group mt-8 text-emerald">
              <span>Read our story</span>
              <span className="link-cta__line">
                <span className="absolute inset-0 -translate-x-full bg-current transition-transform duration-500 ease-editorial group-hover:translate-x-0" />
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="aspect-[4/5] overflow-hidden rounded-sm lg:aspect-[5/6]">
              <SmartImage id="1493809842364-78817add7ffb" alt="A Vantage interior" width={1100} className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Spec({ label, value }) {
  return (
    <div>
      <p className="eyebrow text-canvas/50">{label}</p>
      <p className="mt-2 font-serif text-2xl">{value}</p>
    </div>
  )
}

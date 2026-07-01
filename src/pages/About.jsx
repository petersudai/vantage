import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import SmartImage from '../components/SmartImage.jsx'
import Reveal from '../components/Reveal.jsx'
import { stats } from '../data/site.js'

const principles = [
  {
    title: 'We represent less',
    body: 'A short list is not a limitation. It is the product. We turn away more than we take on, and we are comfortable telling you why.',
  },
  {
    title: 'We know the buildings',
    body: 'Not the brochure version. We have stood in the rooms at different hours, ridden the lifts, and met the people who run them.',
  },
  {
    title: 'We stay on',
    body: 'The relationship does not end at handover. Most of our work now comes from people we sold to years ago.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Vantage"
        title="A brokerage built around restraint."
        intro="We started in 2009 with a contrarian idea: that the way to represent property well is to represent less of it."
      />

      {/* Statement + image */}
      <section className="shell grid items-center gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="space-y-6 font-serif text-2xl leading-snug text-ink/90">
            <p className="text-pretty">
              Most portals compete on volume. Thousands of listings, a wall of cards,
              every one shouting a little louder than the last.
            </p>
            <p className="text-pretty">
              We went the other way. Fewer homes, seen properly, sold by people who can
              answer the second question as easily as the first. It is slower. It is also,
              we think, the only honest way to do this.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <div className="aspect-[4/5] overflow-hidden rounded-sm">
            <SmartImage id="1600596542815-ffad4c1539a9" alt="A Vantage residence" width={1100} className="h-full w-full" />
          </div>
        </Reveal>
      </section>

      {/* Stats, restated as a ledger */}
      <section className="bg-ink py-20 text-canvas lg:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-canvas/50">The record, briefly</p>
          </Reveal>
          <dl className="mt-10">
            {stats.map((s, i) => (
              <Reveal as="div" key={s.label} delay={i * 0.06}>
                <div className="grid grid-cols-1 items-baseline gap-2 border-t border-canvas/15 py-7 sm:grid-cols-12">
                  <dd className="font-serif text-5xl leading-none sm:col-span-4 lg:text-6xl">{s.value}</dd>
                  <dt className="font-sans text-base font-medium sm:col-span-3">{s.label}</dt>
                  <p className="font-sans text-sm text-canvas/55 sm:col-span-5">{s.note}</p>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-canvas py-24 lg:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-emerald">How we work</p>
            <h2 className="mt-4 max-w-2xl text-display-md text-balance">Three things we hold to.</h2>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="border-t border-ink/15 pt-6">
                  <p className="font-serif text-3xl text-emerald">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-5 font-serif text-2xl text-ink">{p.title}</h3>
                  <p className="mt-3 font-sans text-base leading-relaxed text-stone-600">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-emerald py-24 text-canvas lg:py-28">
        <div className="shell text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-display-md text-balance">
              When you are ready, we will already know the right three.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/residences" className="btn-primary-on-dark">
                View the collection
              </Link>
              <Link to="/team" className="link-cta group text-canvas">
                <span>Meet the team</span>
                <span className="link-cta__line">
                  <span className="absolute inset-0 -translate-x-full bg-current transition-transform duration-500 ease-editorial group-hover:translate-x-0" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

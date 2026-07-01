import PageHeader from '../components/PageHeader.jsx'
import SmartImage from '../components/SmartImage.jsx'
import Reveal from '../components/Reveal.jsx'
import { team } from '../data/team.js'

export default function Team() {
  return (
    <>
      <PageHeader
        eyebrow="The people"
        title="A small team, by intention."
        intro="Six people, each responsible for what they know best. You will deal with one of us throughout, and we will not pass you down a chain."
      />

      <section className="shell pb-28">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 0.08} amount={0.2}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ink">
                  <SmartImage
                    id={m.image}
                    alt={m.name}
                    width={900}
                    height={1125}
                    duotone
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between border-b border-ink/12 pb-3">
                  <h2 className="font-serif text-2xl text-ink">{m.name}</h2>
                  <span className="font-sans text-xs uppercase tracking-eyebrow text-stone-500">
                    Since {m.since}
                  </span>
                </div>
                <p className="mt-3 font-sans text-sm font-medium text-emerald">{m.role}</p>
                <p className="mt-1 font-sans text-sm text-stone-600">{m.focus}</p>
                <p className="mt-4 font-serif text-lg leading-snug text-ink/80 text-pretty">
                  {m.note}
                </p>
                <a href={`mailto:${m.email}`} className="link-cta group mt-5 text-emerald">
                  <span>{m.email}</span>
                  <span className="link-cta__line">
                    <span className="absolute inset-0 -translate-x-full bg-current transition-transform duration-500 ease-editorial group-hover:translate-x-0" />
                  </span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

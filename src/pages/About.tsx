import { useLang } from '../lib/i18n'
import Words from '../components/Words'
import Photo from '../components/Photo'
import Arrow from '../components/Arrow'
import { PageHeader, SectionLabel } from '../components/Blocks'
import { frameNo, getPhoto } from '../lib/photos'
import { DOCS_ACTIVE } from '../lib/content'

// foto che riempie la card (formato uniforme), soggetto tenuto al centro-alto
function TeamPhoto({ name, alt }: { name: string; alt: string }) {
  const p = getPhoto(name)
  return (
    <picture>
      {Object.entries(p.sources).map(([type, srcset]) => <source key={type} type={`image/${type}`} srcSet={srcset} sizes="(min-width: 768px) 30vw, 100vw" />)}
      <img src={p.img.src} width={p.img.w} height={p.img.h} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '50% 35%' }} />
    </picture>
  )
}

export function Story() {
  const { t } = useLang()
  const s = t.story
  return (
    <>
      <PageHeader label={s.label} title={s.title} intro={s.intro} />
      <section className="py-20 md:py-32">
        <div className="wrap">
          <ol className="relative">
            {s.events.map((e, i) => (
              <li key={e.year} className="grid md:grid-cols-12 gap-4 md:gap-6 py-12 md:py-20 border-t border-[var(--line)]">
                <div className="md:col-span-4">
                  <p className="font-serif leading-none num md:sticky md:top-28 rv" style={{ fontSize: 'clamp(3.4rem, 7vw, 7rem)', color: i === s.events.length - 1 ? 'var(--accent)' : undefined }}>{e.year}</p>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <Words as="h2" text={e.title} className="h3" />
                  {e.body.map((para, j) => <p key={j} className="mt-5 text-[18px] md:text-[19px] leading-relaxed max-w-2xl rv" style={{ ['--d' as string]: j }}>{para}</p>)}
                  {'photo' in e && e.photo && (
                    <Photo name={e.photo} alt={e.title} wipe className="mt-10 md:w-[85%]" sizes="(min-width: 768px) 50vw, 100vw" />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}

export function Mission() {
  const { t } = useLang()
  const m = t.mission
  return (
    <>
      <PageHeader label={m.label} title={m.title} photo="triride-forest" photoAlt="Lorenzo con il Triride nel bosco" />
      <section className="py-24 md:py-36">
        <div className="wrap">
          <div className="grid md:grid-cols-12 gap-8">
            <p className="md:col-span-10 lead rv" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 3rem)' }}>{m.body[0]}</p>
            <div className="md:col-start-6 md:col-span-7 flex flex-col gap-8 mt-6 md:mt-10">
              {m.body.slice(1).map((p, i) => <p key={i} className="text-[19px] md:text-[21px] leading-relaxed rv" style={{ ['--d' as string]: i }}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>
      <section className="light py-24 md:py-32">
        <div className="wrap">
          <SectionLabel>{m.pillarsLabel}</SectionLabel>
          <div className="mt-12 grid md:grid-cols-3 gap-12 md:gap-10">
            {m.pillars.map((p, i) => (
              <div key={p.title} className="rv" style={{ ['--d' as string]: i }}>
                <span className="label num" style={{ color: 'var(--accent)' }}>0{i + 1}</span>
                <h3 className="h2 mt-4">{p.title}</h3>
                <p className="mt-5 text-[17px] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function Team() {
  const { t } = useLang()
  const m = t.team
  return (
    <>
      <PageHeader label={m.label} title={m.title} />
      <section className="py-20 md:py-28">
        <div className="wrap">
          <SectionLabel>{m.foundersLabel}</SectionLabel>
          <div className="mt-12 grid md:grid-cols-3 gap-16 md:gap-8 items-start">
            {m.founders.map((f, i) => (
              <article key={f.name}>
                {/* tutte le card nello stesso formato 4:5 */}
                <figure className="m-0">
                  <div className="relative rv" style={{ aspectRatio: '4 / 5', background: 'var(--bg-2)', ['--d' as string]: i }}>
                    {f.photo
                      ? <TeamPhoto name={f.photo} alt={f.name} />
                      : <span className="absolute left-5 bottom-5 label muted">{t.common.photoSoon}</span>}
                    <span className="marks" aria-hidden="true" />
                  </div>
                  <figcaption className="frame-no"><span>{f.photo ? frameNo(f.photo) : '—'}</span></figcaption>
                </figure>
                <p className="label muted mt-6 rv md:min-h-[3.4em] xl:min-h-0">{f.role}</p>
                <h2 className="mt-3 rv whitespace-nowrap font-[family-name:var(--font-display)] uppercase leading-none" style={{ fontSize: 'clamp(2rem, 2.9vw, 3.1rem)' }}>{f.name}</h2>
                <p className="mt-4 text-[17px] leading-relaxed rv">{f.body}</p>
                {f.link && <a href={f.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rv"><span className="ulink">LinkedIn</span><Arrow size={14} /></a>}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-24 md:pb-36">
        <div className="wrap">
          <SectionLabel>{m.athletesLabel}</SectionLabel>
          <div className="mt-12 grid md:grid-cols-2 gap-16 md:gap-10 items-start">
            {t.athletes.map((a, i) => (
              <article key={a.name}>
                <Photo name={a.teamPhoto} alt={a.name} wipe delay={i} frame sizes="(min-width: 768px) 45vw, 100vw" />
                <h2 className="h2 mt-6 rv">{a.name}</h2>
                <p className="mt-4 text-[17px] leading-relaxed max-w-lg rv">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function Transparency() {
  const { t } = useLang()
  const m = t.transparency
  return (
    <>
      <PageHeader label={m.label} title={m.title} intro={m.intro} />
      <section className="py-20 md:py-32">
        <div className="wrap grid md:grid-cols-12 gap-16 md:gap-6">
          <div className={DOCS_ACTIVE ? 'md:col-span-6' : 'md:col-span-8'}>
            <SectionLabel>{m.infoLabel}</SectionLabel>
            <dl className="mt-8">
              {m.info.map(r => (
                <div key={r.k} className="rv grid grid-cols-[1fr_1.4fr] gap-4 py-4 border-b border-[var(--line)]">
                  <dt className="muted">{r.k}</dt>
                  <dd className="num">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {DOCS_ACTIVE && <div className="md:col-start-8 md:col-span-5">
            <SectionLabel>{m.docsLabel}</SectionLabel>
            <ul className="mt-8">
              {m.docs.map(d => (
                <li key={d.title} className="rv flex items-center justify-between gap-4 py-5 border-b border-[var(--line)]">
                  <div>
                    <p className="text-[18px]">{d.title}</p>
                    <p className="muted text-[14px] num">{d.year}</p>
                  </div>
                  <span className="label px-3 py-1.5 rounded-full border border-[var(--line)] muted">{t.common.soon}</span>
                </li>
              ))}
            </ul>
          </div>}
        </div>
      </section>
    </>
  )
}

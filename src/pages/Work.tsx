import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import Words from '../components/Words'
import Photo from '../components/Photo'
import Arrow from '../components/Arrow'
import Gallery from '../components/Gallery'
import { ContactBand, Facts, PageHeader, SectionLabel } from '../components/Blocks'

export function Sport() {
  const { t } = useLang()
  const s = t.sport
  return (
    <>
      <PageHeader label={s.label} title={s.title} intro={s.intro} />
      <section className="py-20 md:py-32">
        <div className="wrap flex flex-col gap-20 md:gap-32">
          {t.home.activities.items.map((a, i) => (
            <Link key={a.key} to={a.to} data-cursor={t.common.discover} className="group grid md:grid-cols-12 gap-8 md:gap-6 items-center">
              <Photo name={a.photo} alt={a.title} wipe className={`md:col-span-7 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`} sizes="(min-width: 768px) 58vw, 100vw" />
              <div className={`md:col-span-4 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-9'}`}>
                <span className="label num" style={{ color: 'var(--accent)' }}>0{i + 1}</span>
                <h2 className="h1 mt-3 rv">{a.title}</h2>
                <p className="mt-5 text-[18px] leading-relaxed rv">{a.body}</p>
                <span className="mt-8 inline-flex items-center gap-3 font-medium rv"><span className="ulink">{t.common.discover}</span><Arrow /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export function Activity({ which }: { which: 'ski' | 'canoe' | 'hiking' }) {
  const { t } = useLang()
  const a = t[which]
  return (
    <>
      <PageHeader label={a.label} title={a.title} photo={a.hero} photoAlt={a.title} />
      <section className="py-20 md:py-32">
        <div className="wrap">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-start-5 md:col-span-8">
              <p className="lead rv">{a.body[0]}</p>
              {a.body.slice(1).map((para, i) => <p key={i} className="mt-6 text-[18px] md:text-[19px] leading-relaxed rv" style={{ ['--d' as string]: i + 1 }}>{para}</p>)}
            </div>
          </div>
          {a.facts.length > 0 && <div className="mt-16 md:mt-24"><Facts items={a.facts} /></div>}
        </div>
      </section>
      {a.gallery.length > 0 && (
        <section className="pb-24 md:pb-36">
          <div className="wrap">
            <SectionLabel>{t.home.archive.label}</SectionLabel>
            <div className="mt-10"><Gallery names={a.gallery} rowHeight={300} /></div>
          </div>
        </section>
      )}
      <NextActivity current={which} />
    </>
  )
}

function NextActivity({ current }: { current: 'ski' | 'canoe' | 'hiking' }) {
  const { t } = useLang()
  const items = t.home.activities.items
  const idx = items.findIndex(i => i.key === current)
  const next = items[(idx + 1) % items.length]
  return (
    <Link to={next.to} className="block dark group" data-cursor={t.common.discover}>
      <div className="wrap py-20 md:py-28 flex items-end justify-between gap-6">
        <div>
          <p className="label muted">{t.nav.activities} →</p>
          <p className="display mt-4 transition-transform duration-700 group-hover:translate-x-4">{next.title}</p>
        </div>
        <span className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-[var(--line-strong)] flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)]"><Arrow size={24} /></span>
      </div>
    </Link>
  )
}

export function Events() {
  const { t } = useLang()
  const e = t.events
  return (
    <>
      <PageHeader label={e.label} title={e.title} intro={e.intro} />
      <section className="py-20 md:py-32">
        <div className="wrap flex flex-col">
          {e.items.map((it, i) => (
            <article key={it.title} className="grid md:grid-cols-12 gap-8 md:gap-6 py-14 md:py-20 border-t border-[var(--line)] items-start">
              <span className="md:col-span-1 label num" style={{ color: 'var(--accent)' }}>0{i + 1}</span>
              <div className="md:col-span-5">
                <Words text={it.title} className="h2" />
                {it.body.map((para, j) => <p key={j} className="mt-5 text-[18px] leading-relaxed max-w-md rv" style={{ ['--d' as string]: j }}>{para}</p>)}
              </div>
              {it.photo && <Photo name={it.photo} alt={it.title} wipe className="md:col-start-7 md:col-span-6" sizes="(min-width: 768px) 50vw, 100vw" />}
            </article>
          ))}
        </div>
      </section>
      <ContactBand text={e.cta} />
    </>
  )
}

export function Education() {
  const { t } = useLang()
  const e = t.education
  return (
    <>
      <PageHeader label={e.label} title={e.title} intro={e.intro} />
      <section className="py-20 md:py-32">
        <div className="wrap grid md:grid-cols-12 gap-12 md:gap-6 items-start">
          <Photo name={e.school.photo} alt={e.school.title} wipe frame className="md:col-span-6" sizes="(min-width: 768px) 50vw, 100vw" />
          <article className="md:col-start-8 md:col-span-5">
            <span className="label num" style={{ color: 'var(--accent)' }}>01</span>
            <Words text={e.school.title} className="h2 mt-3" />
            {e.school.body.map((para, i) => <p key={i} className="mt-5 text-[18px] leading-relaxed rv" style={{ ['--d' as string]: i }}>{para}</p>)}
            <ul className="mt-8 border-t border-[var(--line)]">
              {e.school.points.map(pt => <li key={pt} className="rv py-4 border-b border-[var(--line)] flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />{pt}</li>)}
            </ul>

          </article>

          {/* seguito di "Nelle scuole", a zig-zag: testo sotto la foto, foto sotto il testo */}
          <div className="md:col-span-5 mt-8 md:mt-24 md:row-start-2">
            <span className="label num" style={{ color: 'var(--accent)' }}>02</span>
            <Words as="h3" text={`*${e.future.title}*`} className="h3 mt-3" />
            {e.future.body.map((para, i) => <p key={i} className="mt-4 text-[17px] leading-relaxed muted rv" style={{ ['--d' as string]: i }}>{para}</p>)}
          </div>
          <Photo name={e.future.photo} alt={e.future.title} wipe frame className="md:col-start-7 md:col-span-6 md:mt-24 md:row-start-2" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      </section>
      <ContactBand text={e.cta} />
    </>
  )
}
